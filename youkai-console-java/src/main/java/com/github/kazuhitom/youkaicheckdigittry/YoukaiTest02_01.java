package com.github.kazuhitom.youkaicheckdigittry;

import com.github.kazuhitom.youkaicheckdigittry.checkdigit.converter.TextToCodeConverter;

import java.util.Scanner;

public class YoukaiTest02_01 {
    private final static TextToCodeConverter converter = new TextToCodeConverter();

    static char[] a31DC = new char[256];
    static int i = 0;
    static int stackApos = 0, stackXpos = 0, stackYpos = 0;
    static int[] stackA = new int[256];

    static int A = 0, X = 0, Y = 0, C = 0, Z = 0;
    static int a31F6 = 0; // 文字列長さ
    static int a31F4 = 0, a31F5 = 0, a31F7 = 0, a31F8 = 0, a31F9 = 0, a31FA = 0, a31FB = 0;
    static int ror = 0;
    static int loopmode = 0;

    public static void main(String[] args) {
        if (args.length == 0) {
            System.out.println("yokai-test02 check digit $31F4 $31F5 simulator");
            loopmode = 1;
        } else {
            a31DC = args[0].trim().toCharArray();
        }

        LOOP();
    }

    public static String execute(String password) {
        loopmode = 0;
        a31DC = password.trim().toCharArray();
        return LOOP();
    }

    private static String LOOP() {
        String input = "";
        if (loopmode == 1) {
            System.out.print("INPUT PASSWORD:");
            Scanner scanner = new Scanner(System.in);
            input = scanner.nextLine();
            if (input.isBlank()) return "";
        } else {
            input = String.valueOf(a31DC);
        }
        a31F6 = input.length();
        // ここで文字コードをコンバートしておく
        a31DC = converter.convert(input);

        // スタート
        X = 0;
        C = 0;
        a31F4 = 0;
        a31F5 = 0;
        a31F7 = 0;
        a31F8 = 0;
        a31F9 = 0;
        a31FB = 0;
        A = 1;
        a31FA = A;

        return D86B();
    }

    private static String D86B() {
        A = a31DC[X];

        D8BD:
        stackA[stackApos++] = A;
        Y = 8;

        return D8C0();
    }

    private static String D8C0() {
        A = A << 1;

        if (A > 0xFF) {
            C = 1;
            A = A & 0xFF;
        } else {
            C = 0;
        }
        stackA[stackApos++] = A;

        // 31F4と31F5を右1ビットローテート
        ror = a31F4 & 0x01;
        a31F4 = a31F4 >> 1;
        a31F4 = a31F4 | (C << 7); // C0000000
        C = ror;

        ror = a31F5 & 0x01;
        a31F5 = a31F5 >> 1;
        a31F5 = a31F5 | (C << 7); // C0000000
        C = ror;

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
        A = A ^ a31F4;
        a31F4 = A;
        A = stackA[--stackApos];
        A = A & 0x08;
        A = A ^ a31F5;
        a31F5 = A;
        A = stackA[--stackApos];
        Y--;
        if (Y > 0) {
            return D8C0();
        }
        A = stackA[--stackApos]; // ここまでで31F4と31F5算出完了

        D8A4:
        // 31F7と31F8を生成(Complete)
        stackA[stackApos++] = A;
        stackA[stackApos++] = A;
        A = a31F4;
        if (A >= 0xE5) {
            C = 1;
        } else C = 0; //C5の値でキャリーを生成
        A = stackA[--stackApos];
        A = A + a31F7 + C;
        if (A > 0xFF) { // ADCのキャリー処理
            A = A & 0xFF;
            C = 1;
        } else C = 0;
        a31F7 = A;
        A = a31F8;
        A = A + a31F5 + C;
        if (A > 0xFF) { // ADCのキャリー処理
            A = A & 0xFF;
            C = 1;
        } else C = 0;
        a31F8 = A;
        A = stackA[--stackApos];

        D89B:
        // 31F9を生成(Complete)
        stackA[stackApos++] = A;
        A = A ^ a31F9;
        a31F9 = A;
        A = stackA[--stackApos];

// ここから下にまだバグがある

        D88F:
        // 31FAを生成
        stackA[stackApos++] = A;
        // 31FAをローテート
        ror = a31FA & 0x01;
        a31FA = a31FA >> 1;
        a31FA = a31FA | (C << 7); // $31F8のCがここで入る
        C = ror;
        A = A + a31FA + C;
        if (A > 0xFF) { // ADCのキャリー処理
            A = A & 0xFF;
            C = 1;
        } else C = 0;
        a31FA = A;

        A = stackA[--stackApos];

        D87F:
        stackA[stackApos++] = A;

        return D880();
    }

    private static String D880() {
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
        A = a31FB;
        A = A + C;
        if (A > 0xFF) { // ADCのキャリー処理
            A = A & 0xFF;
            C = 1;
        } else C = 0;
        a31FB = A;

        A = stackA[--stackApos];
        if (Z == 0) {
            return D880(); // ローテ終わるまでループ
        }
        //printf("a31FB=%x ",a31FB);

        A = stackA[--stackApos];

// 文字数分だけ演算をカウント
        X++;
        if (a31F6 != X) {
            return D86B();
        }

        System.out.printf("31F4 31F5 31F6 31F7 31F8 31F9 31FA 31FB\n");
        System.out.printf("  %02X   %02X   %02X   %02X   %02X   %02X   %02X   %02X\n"
                , a31F4, a31F5, a31F6, a31F7, a31F8, a31F9, a31FA, a31FB);

        String result = String.format("%02X %02X %02X %02X %02X %02X %02X %02X"
                , a31F4, a31F5, a31F6, a31F7, a31F8, a31F9, a31FA, a31FB);

        System.out.println("CheckDigit:" + result);

/*
	printf("31F4 31F5 31F6 31F7 31F8 31F9\n");
	printf("  %02X   %02X   %02X   %02X   %02X   %02X\n"
		,a31F4,a31F5,a31F6,a31F7,a31F8,a31F9);
*/
        if (loopmode == 1) return LOOP();

        return result;
    }
}
