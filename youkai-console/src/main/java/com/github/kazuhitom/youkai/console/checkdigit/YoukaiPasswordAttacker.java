package com.github.kazuhitom.youkai.console.checkdigit;

import com.github.kazuhitom.youkai.console.checkdigit.state.A31F;
import com.github.kazuhitom.youkai.console.checkdigit.state.AttackCharacters;

import java.io.PrintStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

public class YoukaiPasswordAttacker {
    private final CheckDigitCalculator calculator;
    private final boolean oneHitExitMode;

    private boolean cancellation = false;

    private static final double PROGRESS_OUTPUT_INTERVAL_MS = 115856201D;

    public List<AttackCharacters> execute(A31F attackTargetCheckDigit, AttackCharacters startPassword, Consumer<AttackCharacters> hitPasswordEvent) {
        List<AttackCharacters> results = new ArrayList<>();
        AttackCharacters password = startPassword;
        AttackCharacters minimum = startPassword.minimum();
        cancellation = false;
        double checkedCount = 0;
        try {
            // a31DCにターゲット桁数の数値を入れて回転させて、値が一致するまでアタック
            while (true) {
                ++checkedCount;

                // 以下メインルーチン
                final A31F currentCheckDigit = calculator.calculate(password);

                // ESCキー判定。65535回に1度しかチェックしない
                if (checkedCount % PROGRESS_OUTPUT_INTERVAL_MS == 0 || cancellation) {
                    dumpContinueCommand(password, attackTargetCheckDigit, checkedCount);
                    if (cancellation) {
                        printf("キャンセルされました。\n");
                        break;
                    }
                }

                // 検算終了後にチェック
                if (attackTargetCheckDigit.equals(currentCheckDigit)) {
                    results.add(password);

                    printTime();
                    printf("Hit! : %s = %s (%,.0f 回目)\n", password.dumpHexText(), password, checkedCount);

                    hitPasswordEvent.accept(password);

                    if (oneHitExitMode) {
                        printf("見つかったので、処理を終了します。\n");
                        break;
                    }
                }

                // 0x00-0x35の範囲でループさせる
                password = password.increment();
                if (password.equals(minimum)) {
                    printCount(checkedCount);
                    printf("End.\n");
                    break;
                }
            }
        } catch (Exception e) {
            e.printStackTrace(System.out);
        }
        return results;
    }

    public List<AttackCharacters> execute(A31F attackTargetCheckDigit, AttackCharacters startPassword) {
        return execute(attackTargetCheckDigit, startPassword, (hit) -> {
        });
    }

    private PrintStream printf(String format, Object... args) {
        return System.out.printf(format, args);
    }

    private void printCount(double checkedCount) {
        printTime();
        printf("%,.0f 回目\n", checkedCount);
    }

    private void printTime() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        printf(LocalDateTime.now().format(formatter) + " - ");
    }

    private void dumpContinueCommand(AttackCharacters password, A31F attackTargetCheckDigit, double checkedCount) {
        printTime();
        printf("continue param : %s %s (%,.0f 回目,文字列: %s)\n", attackTargetCheckDigit, password.dumpHexText(), checkedCount, password);
    }

    public void cancel() {
        cancellation = true;
    }

    public YoukaiPasswordAttacker(CheckDigitCalculator calculator, boolean oneHitExitMode) {
        this.calculator = calculator;
        this.oneHitExitMode = oneHitExitMode;
    }
}
