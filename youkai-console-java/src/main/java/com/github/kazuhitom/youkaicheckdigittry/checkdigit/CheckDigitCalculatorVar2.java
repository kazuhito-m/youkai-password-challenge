package com.github.kazuhitom.youkaicheckdigittry.checkdigit;

import com.github.kazuhitom.youkaicheckdigittry.checkdigit.state.A31F;
import com.github.kazuhitom.youkaicheckdigittry.checkdigit.state.AttackCharacters;

public class CheckDigitCalculatorVar2 {
    private int A = 0;

    private int stackApos = 0;
    private int[] stackA = new int[256];

    private int X = 0, Y = 0, C = 0, Z = 0;
    private int a31F6 = 0; // 文字列長さ

    public A31F calculate(AttackCharacters password) {
        a31F6 = password.charLength();

        // スタート
        X = 0;
        C = 0;

        A31F a31f = A31F.prototypeOf(password.charLength());

        A = password.getOf(0);

        stackA[stackApos++] = password.getOf(0);
        Y = 8;

        return D8C0(password, a31f);
    }

    private A31F D8C0(AttackCharacters password, A31F a31f) {
        A = A << 1;

        if (A > 0xFF) {
            C = 1;
            A = A & 0xFF;
        } else {
            C = 0;
        }
        stackA[stackApos++] = A;

        // 31F4と31F5を右1ビットローテート
        final int work1 = a31f.a31F4 & 0x01;
        a31f.a31F4 = a31f.a31F4 >> 1;
        a31f.a31F4 = a31f.a31F4 | (C << 7); // C0000000
        C = work1;

        final int ror = a31f.a31F5 & 0x01;
        a31f.a31F5 = a31f.a31F5 >> 1;
        a31f.a31F5 = a31f.a31F5 | (C << 7); // C0000000
        C = ror;

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
        Y--;
        if (Y > 0) {
            return D8C0(password, a31f);
        }
        A = stackA[--stackApos]; // ここまでで31F4と31F5算出完了

        // 31F7と31F8を生成(Complete)
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

        // 31F9を生成(Complete)
        stackA[stackApos++] = A;
        A = A ^ a31f.a31F9;
        a31f.a31F9 = A;
        A = stackA[--stackApos];

// ここから下にまだバグがある

        // 31FAを生成
        stackA[stackApos++] = A;
        // 31FAをローテート
        final int work3 = a31f.a31FA & 0x01;
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

        stackA[stackApos++] = A;

        return D880(password, a31f);
    }

    private A31F D880(AttackCharacters password, A31F a31f) {
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
            return D880(password, a31f); // ローテ終わるまでループ
        }
        A = stackA[--stackApos];

// 文字数分だけ演算をカウント
        X++;
        if (a31F6 != X) {
            A = password.getOf(X);

            stackA[stackApos++] = A;
            Y = 8;

            return D8C0(password, a31f);
        }

        return a31f;
    }

}
