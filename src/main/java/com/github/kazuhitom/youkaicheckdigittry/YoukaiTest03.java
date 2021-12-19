package com.github.kazuhitom.youkaicheckdigittry;

import com.github.kazuhitom.youkaicheckdigittry.state.A31F;
import com.github.kazuhitom.youkaicheckdigittry.state.AttackCharacters;

import java.io.PrintStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;

public class YoukaiTest03 {
    static int A = 0;

    static String[] argv;   // Last console args

    public static void main(String[] args) {
        // アタック目標値を設定
        if (args.length < 8) {
            printf("usage:yokai03.exe $31F4 $31F5 $31F6 $31F7 $31F8 $31F9 $31FA $31FB {continue param}\n");
            printf("(例) yokai03.exe 00 08 03 22 88 20 .. パスワード<HAL>を検出\n");
            printf("continue paramを指定すると続きから再開できます。\n");
            printf("yokai03.exe \n");
            return;
        }

        // 引数を各ターゲットに割り当て
        A31F attackTargetCheckDigit = A31F.createFromHexStrings8(args);
        printf("解析パスワード文字数 : %d 文字\n", attackTargetCheckDigit.atk_count);

        // スタック配列クリア
        AttackCharacters password = AttackCharacters.Initialize(attackTargetCheckDigit.atk_count);

        printTime();
        printf("解析開始(Cntl + C でコンテニュー値を表示して終了)\n");

        // コンテニュー
        if (args.length > 8) {
            int[] continueCodes = Arrays.stream(Arrays.copyOfRange(args, 8, args.length))
                    .mapToInt(codeText -> Integer.parseInt(codeText, 16))
                    .toArray();
            password = new AttackCharacters(continueCodes);
            printf("前回の続きからコンテニューします : %s\n", password.dumpHexText());
        }

        YoukaiPasswordAttacker attacker = new YoukaiPasswordAttacker(false);
        attacker.execute(attackTargetCheckDigit, password);
    }

    private static PrintStream printf(String format, Object... args) {
        return System.out.printf(format, args);
    }

    private static void printTime() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss");
        printf(LocalDateTime.now().format(formatter) + " - ");
    }
}
