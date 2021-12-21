package com.github.kazuhitom.youkaicheckdigittry.checkdigit;

import com.github.kazuhitom.youkaicheckdigittry.checkdigit.state.A31F;
import com.github.kazuhitom.youkaicheckdigittry.checkdigit.state.AttackCharacters;

public class CheckDigitCalculatorVar2 {
    private int A = 0;

    private int stackApos = 0;
    private int[] stackA = new int[256];

    public A31F calculate(AttackCharacters password) {
        A31F a31f = A31F.prototypeOf(password.charLength());
        return D8C0(password, a31f, 0);
    }

    private A31F D8C0(final AttackCharacters password, final A31F a31f, final int targetCharPosition) {
        A = password.getOf(targetCharPosition);
        for (int y = 0; y < 8; y++) {
            A = A << 1;

            final int C1;
            if (A > 0xFF) {
                C1 = 1;
                A = A & 0xFF;
            } else {
                C1 = 0;
            }

            final int stackA01 = A;

            // 31F4と31F5を右1ビットローテート
            final int work1 = a31f.a31F4 & 0x01;
            a31f.a31F4 = a31f.a31F4 >> 1;
            a31f.a31F4 = a31f.a31F4 | (C1 << 7); // C0000000
            final int C2 = work1;

            final int work2 = a31f.a31F5 & 0x01;
            a31f.a31F5 = a31f.a31F5 >> 1;
            a31f.a31F5 = a31f.a31F5 | (C2 << 7); // C0000000
            final int C3 = work2;

            A = 0;
            A = 0xFF + C3;

            if (A > 0xFF) {
                A = 0;
            }

            A = A ^ 0xFF;
            final int stackA02 = A;
            A = A & 0x84;
            A = A ^ a31f.a31F4;
            a31f.a31F4 = A;

            A = stackA02;

            A = A & 0x08;
            A = A ^ a31f.a31F5;
            a31f.a31F5 = A;

            A = stackA01;
        }

        A = password.getOf(targetCharPosition); // ここまでで31F4と31F5算出完了

        // 31F7と31F8を生成(Complete)
        final int stackA03 = A;
        final int stackA04 = A;
        A = a31f.a31F4;
        final int C5;
        if (A >= 0xE5) {
            C5 = 1;
        } else C5 = 0; //C5の値でキャリーを生成
        A = stackA04;
        A = A + a31f.a31F7 + C5;

        final int C6;
        if (A > 0xFF) { // ADCのキャリー処理
            A = A & 0xFF;
            C6 = 1;
        } else C6 = 0;
        a31f.a31F7 = A;
        A = a31f.a31F8;
        A = A + a31f.a31F5 + C6;

        final int C7;
        if (A > 0xFF) { // ADCのキャリー処理
            A = A & 0xFF;
            C7 = 1;
        } else C7 = 0;
        a31f.a31F8 = A;
        A = stackA03;

        // 31F9を生成(Complete)
        final int stackA05 = A;
        A = A ^ a31f.a31F9;
        a31f.a31F9 = A;
        A = stackA05;

// ここから下にまだバグがある

        // 31FAを生成
        final int stackA06 = A;
        // 31FAをローテート
        final int work3 = a31f.a31FA & 0x01;
        a31f.a31FA = a31f.a31FA >> 1;
        a31f.a31FA = a31f.a31FA | (C7 << 7); // $31F8のCがここで入る

        A = A + a31f.a31FA + work3;

        final int C9;
        if (A > 0xFF) { // ADCのキャリー処理
            A = A & 0xFF;
            C9 = 1;
        } else C9 = 0;
        a31f.a31FA = A;

        A = stackA06;

        stackA[stackApos++] = A;

        return D880(password, a31f, C9, targetCharPosition);
    }

    private A31F D880(final AttackCharacters password, final A31F a31f, final int C_X, final int x) {
        // 31FBを生成
        // Aを左ローテート
        A = A << 1;
        int C9 = C_X;
        if (A > 0xFF) { // ADCのキャリー処理
            A = A & 0xFF;
            C9 = 1;
        }
        final int Z;
        if (A == 0) Z = 1;
        else Z = 0; // 演算結果がゼロの時Z=1;

        final int stackA06 = A; // スタックに値を保存
        A = a31f.a31FB;
        A = A + C9;

        final int C10;
        if (A > 0xFF) { // ADCのキャリー処理
            A = A & 0xFF;
            C10 = 1;
        } else C10 = 0;
        a31f.a31FB = A;

        A = stackA06;
        if (Z == 0) {
            return D880(password, a31f, C10, x); // ローテ終わるまでループ
        }
        A = stackA[--stackApos];

// 文字数分だけ演算をカウント
        final int nextX = x + 1;
        if (password.charLength() != nextX) {
            return D8C0(password, a31f, nextX);
        }

        return a31f;
    }

}
