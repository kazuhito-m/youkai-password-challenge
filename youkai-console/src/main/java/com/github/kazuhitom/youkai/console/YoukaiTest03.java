package com.github.kazuhitom.youkai.console;

import com.github.kazuhitom.youkai.core.domain.model.attack.YoukaiPasswordAttacker;
import com.github.kazuhitom.youkai.core.domain.model.checkdigit.A31F;
import com.github.kazuhitom.youkai.core.domain.model.checkdigit.CheckDigitCalculator;
import com.github.kazuhitom.youkai.core.domain.model.password.AttackCharacters;
import com.github.kazuhitom.youkai.core.domain.model.password.converter.CodeToCharacterConverter;
import sun.misc.Signal;

import java.io.PrintStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;

public class YoukaiTest03 {
    public static void main(String[] args) {
        // アタック目標値を設定
        if (args.length < 8) {
            printf("usage:yokai03.exe $31F4 $31F5 $31F6 $31F7 $31F8 $31F9 $31FA $31FB {continue param}\n");
            printf("(例) java -jar youkai-console-java-1.0.0.jar 00 08 03 22 88 20 .. パスワード<HAL>を検出\n");
            printf("continue paramを指定すると続きから再開できます。\n");
            printf("yokai03.しexe \n");
            return;
        }

        // 引数を各ターゲットに割り当て
        A31F attackTargetCheckDigit = A31F.createFromHexStrings8(args);
        printf("解析パスワード文字数 : %d 文字\n", attackTargetCheckDigit.charLength());

        // スタック配列クリア
        CodeToCharacterConverter converter = new CodeToCharacterConverter();
        AttackCharacters password = AttackCharacters.initialize(attackTargetCheckDigit.charLength(), converter);

        printTime();
        printf("解析開始(Cntl + C でコンテニュー値を表示して終了)\n");

        // コンテニュー
        if (args.length > 8) {
            int[] continueCodes = Arrays.stream(Arrays.copyOfRange(args, 8, args.length)).mapToInt(codeText -> Integer.parseInt(codeText, 16)).toArray();
            password = new AttackCharacters(converter, continueCodes);
            printf("前回の続きからコンテニューします : %s\n", password.dumpHexText());
            if (password.isInvalid()) {
                password = password.fixInvalid();
                printf("無効な値が含まれるため修正します : %s\n", password.dumpHexText());
            }
        }

        YoukaiPasswordAttacker attacker = new YoukaiPasswordAttacker(new CheckDigitCalculator(), false);

        Signal.handle(new Signal("INT"),  // SIGINT
                signal -> attacker.cancel());

        attacker.execute(attackTargetCheckDigit, password);
    }

    private static PrintStream printf(String format, Object... args) {
        return System.out.printf(format, args);
    }

    private static void printTime() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        printf(LocalDateTime.now().format(formatter) + " - ");
    }
}
