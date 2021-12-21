package com.github.kazuhitom.youkaicheckdigittry.checkdigit;

import com.github.kazuhitom.youkaicheckdigittry.checkdigit.state.A31F;
import com.github.kazuhitom.youkaicheckdigittry.checkdigit.state.AttackCharacters;

public class CheckDigitCalculator {
    private int A = 0;

    public A31F calculate(AttackCharacters password) {
        final A31F currentCheckDigit = A31F.prototypeOf(password.charLength());
        final int D87F = subroutineD8C0(currentCheckDigit, password.getOf(0));
        D880(currentCheckDigit, password, D87F);
        return currentCheckDigit;
    }

    private int subroutineD8C0(A31F a31f, int targetCharCode) {
        A = targetCharCode;
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

        A = targetCharCode; // ここまでで31F4と31F5算出完了

//D8A4: // 31F7と31F8を生成(Complete)
//        stackA.push(A);
//        stackA.push(A);
        final int a3Work = A;
        final int a4Work = A;
        A = a31f.a31F4;

        int C3 = 0;
        if (A >= 0xE5) {
            C3 = 1;
        } //C5の値でキャリーを生成
//        A = stackA.pop();
        A = a4Work;
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
//        A = stackA.pop();
        A = a3Work;

        //D89B: // 31F9を生成(Complete)
//        stackA.push(A);
        final int a5Work = A;
        A = A ^ a31f.a31F9;
        a31f.a31F9 = A;
//        A = stackA.pop();
        A = a5Work;

        // ここから下にまだバグがある

        //D88F: // 31FAを生成
//        stackA.push(A);
        final int a6Work = A;
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

//        A = stackA.pop();
        A = a6Work;
        //D87F:
        return A;
    }

    private void D880(A31F a31f, AttackCharacters password, int D87F) {
        int C1 = 0;
        for (int X = 0; X < a31f.charLength(); X++) {
            // 文字数分だけ演算をカウント
            if (X > 0) {
                A = password.getOf(X);
                D87F = subroutineD8C0(a31f, A);
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

//                stackA.push(A); // スタックに値を保存
                final int a1Work = A;
                A = a31f.a31FB;
                A = A + C1;

                C1 = 0;
                if (A > 0xFF) { // ADCのキャリー処理
                    A = A & 0xFF;
                    C1 = 1;
                }
                a31f.a31FB = A;

                A = a1Work;
            } while (!Z);   // ローテ終わるまでループ
            //printf("a31FB=%x ",a31FB);

            A = D87F;
        }
    }
}
