package com.github.kazuhitom.youkaicheckdigittry;

import com.github.kazuhitom.youkaicheckdigittry.state.A31F;
import sun.misc.Signal;

import java.io.PrintStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class YoukaiTest03 {
    // 文字コード変換テーブル
    static char[] atoy = {
            'A', 'H', 'O', 'V', '1', '6', '*', '*', 'B', 'I', 'P', 'W', '2', '7', '*', '*', 'C', 'J', 'Q', 'X', '3', '8', '*', '*', 'D', 'K', 'R', 'Y', '4', '9', '*', '*', 'E', 'L', 'S', 'Z', '5', '0', '*', '*', 'F', 'M', 'T', '-', 'n', '!', '*', '*', 'G', 'N', 'U', '.', 'm', 'c'
    };

    static char[] a31DC = new char[256];
    static int stackApos = 0;
    static int[] stackA = new int[256];

    static A31F atk;
    static A31F a31f;

    static int A = 0;
    static int X = 0;
    static int C = 0;
    static int Z = 0;


    static int continue_count = 0;

    static String[] argv;   // Last console args
    static double checkedCount = 0;

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
        atk = A31F.createFromHexStrings8(args);
        printf("解析パスワード文字数 : %d 文字\n", atk.atk_count);

        // スタック配列クリア
        a31DC = new char[256];
        stackA = new int[256];

        printTime();
        printf("解析開始(Cntl + C でコンテニュー値を表示して終了)\n");

        // コンテニュー
        if (args.length > 8) {
            continue_count = args.length - 8;
            printf("前回の続きからコンテニューします : ");
            for (int i = 0; i < continue_count; i++) {
                a31DC[i] = (char) Integer.parseInt(args[8 + i], 16);
                printf("%02X ", (int) a31DC[i]);
            }
            printf("\n");
        }

        Signal.handle(new Signal("INT"),  // SIGINT
                signal -> dumpContinueCommand());

        try {
            while (LOOP()) {
            }
        } catch (Exception e) {
            e.printStackTrace(System.out);
        }
    }

    /**
     * a31DCにターゲット桁数の数値を入れて回転させて、値が一致するまでアタック
     */
    private static boolean LOOP() {
        ++checkedCount;
        // スタート
        a31f = new A31F();
        X = 0;
        A = 1;
        a31f.a31FA = A;
        stackApos = 0;
        C = 0;

        // 試しにこのタイミングで配列を全走査して atoy[]に'*'を検出したら強制スキップさせて
        // 高速化できないか実験
        // 1桁目に出現した場合は最速スキップ
        if (atoy[a31DC[0]] == '*') {
            a31DC[0]++;
            return true;
        }
        // 2桁目以降に出現した場合は上位インクリメントして下位をゼロクリア
        for (int i = 1; i < atk.atk_count; i++) {
            if (atoy[a31DC[i]] == '*') {
                for (int j = 0; j < i; j++) {
                    a31DC[j] = 0;
                }
                a31DC[i]++;
                return true;
            }
        }

        // 以下メインルーチン
        A = a31DC[X];

        //D8BD:
        stackA[stackApos++] = A;

        return D8C0();
    }

    private static boolean D8C0() {
        A = a31DC[X];

        //D8BD:
        stackA[stackApos++] = A;


        for (int i = 0; i < 8; i++) {
            A = A << 1;

            if (A > 0xFF) {
                C = 1;
                A = A & 0xFF;
            } else {
                C = 0;
            }
            stackA[stackApos++] = A;
            // 31F4と31F5を右1ビットローテート
            int work1 = a31f.a31F4 & 0x01;
            a31f.a31F4 = a31f.a31F4 >> 1;
            a31f.a31F4 = a31f.a31F4 | (C << 7); // C0000000
            C = work1;

            int work2 = a31f.a31F5 & 0x01;
            a31f.a31F5 = a31f.a31F5 >> 1;
            a31f.a31F5 = a31f.a31F5 | (C << 7); // C0000000
            C = work2;

            //printf("ror %02X %02X\n",a31F4,a31F5);

            A = 0;
            A = 0xFF + C;
            if (A > 0xFF) {
                A = 0;
                C = 1;
            } else C = 0;
            A = A ^ 0xFF;
            stackA[stackApos++] = A;
            A = A & 0x84;
            A = A ^ a31f.a31F4;
            a31f.a31F4 = A;
            A = stackA[--stackApos];
            A = A & 0x08;
            A = A ^ a31f.a31F5;
            a31f.a31F5 = A;
            A = stackA[--stackApos];
        }

        A = stackA[--stackApos]; // ここまでで31F4と31F5算出完了

//D8A4: // 31F7と31F8を生成(Complete)
        stackA[stackApos++] = A;
        stackA[stackApos++] = A;
        A = a31f.a31F4;
        if (A >= 0xE5) {
            C = 1;
        } else C = 0; //C5の値でキャリーを生成
        A = stackA[--stackApos];
        A = A + a31f.a31F7 + C;
        if (A > 0xFF) { // ADCのキャリー処理
            A = A & 0xFF;
            C = 1;
        } else C = 0;
        a31f.a31F7 = A;
        A = a31f.a31F8;
        A = A + a31f.a31F5 + C;
        if (A > 0xFF) { // ADCのキャリー処理
            A = A & 0xFF;
            C = 1;
        } else C = 0;
        a31f.a31F8 = A;
        A = stackA[--stackApos];

        //D89B: // 31F9を生成(Complete)
        stackA[stackApos++] = A;
        A = A ^ a31f.a31F9;
        a31f.a31F9 = A;
        A = stackA[--stackApos];

        // ここから下にまだバグがある

        //D88F: // 31FAを生成
        stackA[stackApos++] = A;
        // 31FAをローテート
        int work3 = a31f.a31FA & 0x01;
        a31f.a31FA = a31f.a31FA >> 1;
        a31f.a31FA = a31f.a31FA | (C << 7); // $31F8のCがここで入る
        C = work3;
        A = A + a31f.a31FA + C;
        if (A > 0xFF) { // ADCのキャリー処理
            A = A & 0xFF;
            C = 1;
        } else C = 0;
        a31f.a31FA = A;

        A = stackA[--stackApos];

        //D87F:
        stackA[stackApos++] = A;

        return D880();
    }

    private static boolean D880() {
        // 31FBを生成
        // Aを左ローテート
        A = A << 1;
        if (A > 0xFF) { // ADCのキャリー処理
            A = A & 0xFF;
            C = 1;
        }
        if (A == 0) Z = 1;
        else Z = 0; // 演算結果がゼロの時Z=1;

        stackA[stackApos++] = A; // スタックに値を保存
        A = a31f.a31FB;
        A = A + C;
        if (A > 0xFF) { // ADCのキャリー処理
            A = A & 0xFF;
            C = 1;
        } else C = 0;
        a31f.a31FB = A;

        A = stackA[--stackApos];
        if (Z == 0) {
            return D880(); // ローテ終わるまでループ
        }
        //printf("a31FB=%x ",a31FB);

        A = stackA[--stackApos];

        // 文字数分だけ演算をカウント
        X++;

        if (atk.atk_count != X) {
            A = a31DC[X];

            //D8BD:
            stackA[stackApos++] = A;

            return D8C0();
        }

        // 検算終了後にチェック
        if (a31f.equals(atk)) {
            printCount();

            printTime();
            printf("Hit! : ");
            for (int i = 0; i < atk.atk_count; i++) {
                printf("%02X ", (int) a31DC[i]);
            }
            printf("= ");
            for (int i = 0; i < atk.atk_count; i++) {
                printf("%c", atoy[a31DC[i]]);
            }
            printf("\n");
            printf("見つかったので、処理を終了します。\n");

            // debug
            new Exception().printStackTrace(System.out);

            return false;
        }

        // 0x00-0x35の範囲でループさせる
        a31DC[0]++; // 1個目をインクリメント

        for (int i = 0; i < atk.atk_count; i++) {
            // 35を超えたら次の桁へ
            if (a31DC[i] > 0x35) {
                a31DC[i] = 0;
                a31DC[i + 1]++;
            }
            // 最終桁が36になった瞬間に脱出
            if (a31DC[atk.atk_count - 1] == 0x36) {
                printCount();
                printf("End.\n");
                return false;
            }
        }


        // ESCキー判定。65535回に1度しかチェックしない
        if (checkedCount % 4294836225D == 0) {
            dumpContinueCommand();
        }

        return true;
    }

    private static PrintStream printf(String format, Object... args) {
        return System.out.printf(format, args);
    }

    private static void printCount() {
        printf("%,.0f 回目\n", checkedCount);
    }

    private static void printTime() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss");
        printf(LocalDateTime.now().format(formatter) + " - ");
    }

    private static void dumpContinueCommand() {
        printCount();
        printf("continue command : yokai03.exe %s %s %s %s %s %s %s %s ", argv[0], argv[1], argv[2], argv[3], argv[4], argv[5], argv[6], argv[7]);
        for (int i = 0; i < atk.atk_count; i++) {
            printf("%02X ", (int) a31DC[i]);
        }
        printf("\n");
    }
}
