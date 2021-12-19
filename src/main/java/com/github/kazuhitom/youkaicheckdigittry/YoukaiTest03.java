package com.github.kazuhitom.youkaicheckdigittry;

import com.github.kazuhitom.youkaicheckdigittry.state.A31F;
import com.github.kazuhitom.youkaicheckdigittry.state.AttackCharacters;
import com.github.kazuhitom.youkaicheckdigittry.state.IntStack;

import java.io.PrintStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;

public class YoukaiTest03 {
    static IntStack stackA;
    static int A = 0;

    static String[] argv;   // Last console args

    public static void main(String[] args) {
        argv = args;

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
        stackA = new IntStack();

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

        double checkedCount = 0;
//        Signal.handle(new Signal("INT"),  // SIGINT
//                signal -> dumpContinueCommand());

        try {
            // a31DCにターゲット桁数の数値を入れて回転させて、値が一致するまでアタック
            while (true) {
                ++checkedCount;
                // スタート
                // 試しにこのタイミングで配列を全走査して atoy[]に'*'を検出したら強制スキップさせて
                // 高速化できないか実験
                // 1桁目に出現した場合は最速スキップ
                // 2桁目以降に出現した場合は上位インクリメントして下位をゼロクリア
                if (password.isInvalid()) {
                    password = password.passInvalidChar();
                    continue;
                }

                // 以下メインルーチン
                A = password.getOf(0);

                //D8BD:
                stackA.push(A);

                A31F currentCheckDigit = attackTargetCheckDigit.prototype();
                subroutineD8C0(currentCheckDigit);
                D880(currentCheckDigit, password);


                // 検算終了後にチェック
                if (attackTargetCheckDigit.equals(currentCheckDigit)) {
                    printTime();
                    printf("Hit! : %s = %s (%,.0f 回目)\n", password.dumpHexText(), password.toString(), checkedCount);
//            printf("見つかったので、処理を終了します。\n");
//            new Exception().printStackTrace(System.out); // debug
//            return false;
                }

                // 0x00-0x35の範囲でループさせる
                password = password.increment();
                if (password.isFinalDestination()) {
                    printCount(checkedCount);
                    printf("End.\n");
                    break;
                }

                // ESCキー判定。65535回に1度しかチェックしない
                if (checkedCount % 67107840 == 0) {
                    dumpContinueCommand(password, checkedCount);
                }
            }
        } catch (Exception e) {
            e.printStackTrace(System.out);
        }
    }

    private static void subroutineD8C0(A31F a31f) {
        for (int i = 0; i < 8; i++) {
            A = A << 1;

            int C1 = 0;
            if (A > 0xFF) {
                C1 = 1;
                A = A & 0xFF;
            }
            int a1Work = A;
            // 31F4と31F5を右1ビットローテート
            int work1 = a31f.a31F4 & 0x01;
            a31f.a31F4 = a31f.a31F4 >> 1;
            a31f.a31F4 = a31f.a31F4 | (C1 << 7); // C0000000
            C1 = work1;

            int work2 = a31f.a31F5 & 0x01;
            a31f.a31F5 = a31f.a31F5 >> 1;
            a31f.a31F5 = a31f.a31F5 | (C1 << 7); // C0000000
            C1 = work2;

            //printf("ror %02X %02X\n",a31F4,a31F5);

            A = 0xFF + C1;

            if (A > 0xFF) {
                A = 0;
            }

            A = A ^ 0xFF;
            int a2Work = A;
            A = A & 0x84;
            A = A ^ a31f.a31F4;
            a31f.a31F4 = A;
            A = a2Work;
            A = A & 0x08;
            A = A ^ a31f.a31F5;
            a31f.a31F5 = A;
            A = a1Work;
        }

        A = stackA.pop(); // ここまでで31F4と31F5算出完了

//D8A4: // 31F7と31F8を生成(Complete)
        stackA.push(A);
        stackA.push(A);
        A = a31f.a31F4;

        int C3 = 0;
        if (A >= 0xE5) {
            C3 = 1;
        } //C5の値でキャリーを生成
        A = stackA.pop();
        A = A + a31f.a31F7 + C3;

        int C4 = 0;
        if (A > 0xFF) { // ADCのキャリー処理
            A = A & 0xFF;
            C4 = 1;
        }
        a31f.a31F7 = A;
        A = a31f.a31F8;
        A = A + a31f.a31F5 + C4;

        int C5 = 0;
        if (A > 0xFF) { // ADCのキャリー処理
            A = A & 0xFF;
            C5 = 1;
        }
        a31f.a31F8 = A;
        A = stackA.pop();

        //D89B: // 31F9を生成(Complete)
        stackA.push(A);
        A = A ^ a31f.a31F9;
        a31f.a31F9 = A;
        A = stackA.pop();

        // ここから下にまだバグがある

        //D88F: // 31FAを生成
        stackA.push(A);
        // 31FAをローテート
        int work3 = a31f.a31FA & 0x01;
        a31f.a31FA = a31f.a31FA >> 1;
        a31f.a31FA = a31f.a31FA | (C5 << 7); // $31F8のCがここで入る

        int C6 = work3;
        A = A + a31f.a31FA + C6;

        int C7 = 0;
        if (A > 0xFF) { // ADCのキャリー処理
            A = A & 0xFF;
            C7 = 1;
        }
        a31f.a31FA = A;

        A = stackA.pop();

        //D87F:
        stackA.push(A);
    }

    private static void D880(A31F a31f, AttackCharacters password) {
        int C1 = 0;
        for (int X = 0; X < a31f.atk_count; X++) {
            // 文字数分だけ演算をカウント
            if (X > 0) {
                A = password.getOf(X);

                //D8BD:
                stackA.push(A);

                subroutineD8C0(a31f);
            }

            // 31FBを生成
            boolean Z;
            do {
                // Aを左ローテート
                A = A << 1;
                if (A > 0xFF) { // ADCのキャリー処理
                    A = A & 0xFF;
                    C1 = 1;
                }
                Z = A == 0; // 演算結果がゼロの時Z=true;

                stackA.push(A); // スタックに値を保存
                A = a31f.a31FB;
                A = A + C1;

                C1 = 0;
                if (A > 0xFF) { // ADCのキャリー処理
                    A = A & 0xFF;
                    C1 = 1;
                }
                a31f.a31FB = A;

                A = stackA.pop();
            } while (!Z);   // ローテ終わるまでループ
            //printf("a31FB=%x ",a31FB);

            A = stackA.pop();
        }
    }

    private static PrintStream printf(String format, Object... args) {
        return System.out.printf(format, args);
    }

    private static void printCount(double checkedCount) {
        printf("%,.0f 回目\n", checkedCount);
    }

    private static void printTime() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss");
        printf(LocalDateTime.now().format(formatter) + " - ");
    }

    private static void dumpContinueCommand(AttackCharacters password, double checkedCount) {
        printf("continue command : yokai03.exe %s %s %s %s %s %s %s %s ", argv[0], argv[1], argv[2], argv[3], argv[4], argv[5], argv[6], argv[7]);
        printf("%s (%,.0f 回目)\n", password.dumpHexText(), checkedCount);
    }
}
