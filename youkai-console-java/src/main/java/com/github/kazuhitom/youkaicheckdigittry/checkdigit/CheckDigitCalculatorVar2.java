package com.github.kazuhitom.youkaicheckdigittry.checkdigit;

import com.github.kazuhitom.youkaicheckdigittry.checkdigit.state.A31F;
import com.github.kazuhitom.youkaicheckdigittry.checkdigit.state.AttackCharacters;

public class CheckDigitCalculatorVar2 {
    public A31F calculate(AttackCharacters password) {
        A31F a31f = A31F.prototypeOf(password.charLength());
        for (int charPosition = 0; charPosition < password.charLength(); charPosition++) {
            D8C0(password, a31f, charPosition);  // 文字数分だけ演算をカウント
        }
        return a31f;
    }

    private void D8C0(final AttackCharacters password, final A31F a31f, final int targetCharPosition) {
        final int targetCharCode = password.getOf(targetCharPosition);
        int shiftedCode = targetCharCode;
        for (int y = 0; y < 8; y++) {
            int A01 = shiftedCode << 1;

            final int C1;
            if (A01 > 0xFF) {
                C1 = 1;
                A01 = A01 & 0xFF;
            } else {
                C1 = 0;
            }

            // 31F4と31F5を右1ビットローテート
            final int C2 = a31f.rotateRightOneBit31F4(C1);
            final int C3 = a31f.rotateRightOneBit31F5(C2);

            int A02 = 0xFF + C3;
            if (A02 > 0xFF) {
                A02 = 0;
            }

            final int stackA02 = A02 ^ 0xFF;
            a31f.a31F4 = (stackA02 & 0x84) ^ a31f.a31F4;
            a31f.a31F5 = (stackA02 & 0x08) ^ a31f.a31F5;

            shiftedCode = A01;
        }

        // ここまでで31F4と31F5算出完了

        // 31F7と31F8を生成(Complete)
        final int C5;
        if (a31f.a31F4 >= 0xE5) {
            C5 = 1;
        } else C5 = 0; //C5の値でキャリーを生成
        int A06 = targetCharCode + a31f.a31F7 + C5;

        final int C6;
        if (A06 > 0xFF) { // ADCのキャリー処理
            A06 = A06 & 0xFF;
            C6 = 1;
        } else C6 = 0;
        a31f.a31F7 = A06;
        int A07 = a31f.a31F8 + a31f.a31F5 + C6;

        final int C7;
        if (A07 > 0xFF) { // ADCのキャリー処理
            A07 = A07 & 0xFF;
            C7 = 1;
        } else C7 = 0;
        a31f.a31F8 = A07;

        // 31F9を生成(Complete)
        a31f.a31F9 = targetCharCode ^ a31f.a31F9;

// ここから下にまだバグがある

        // 31FAを生成
        // 31FAをローテート
        final int work3 = a31f.a31FA & 0x01;
        a31f.a31FA = a31f.a31FA >> 1;
        a31f.a31FA = a31f.a31FA | (C7 << 7); // $31F8のCがここで入る

        int A01 = targetCharCode + a31f.a31FA + work3;

        final int C9;
        if (A01 > 0xFF) { // ADCのキャリー処理
            A01 = A01 & 0xFF;
            C9 = 1;
        } else C9 = 0;
        a31f.a31FA = A01;

        a31f.a31FB = calc31FB_D880(a31f.a31FB, C9, targetCharCode);
    }

    private int calc31FB_D880(final int a31FB, final int C_X, int targetCharCode) {
        // 31FBを生成
        // Aを左ローテート
        int A02 = targetCharCode << 1;
        int C9 = C_X;
        if (A02 > 0xFF) { // ADCのキャリー処理
            A02 = A02 & 0xFF;
            C9 = 1;
        }
        final int stackA06 = A02; // スタックに値を保存

        int A03 = a31FB + C9;

        final int C10;
        if (A03 > 0xFF) { // ADCのキャリー処理
            A03 = A03 & 0xFF;
            C10 = 1;
        } else C10 = 0;
        final int new31FB = A03;

        // 演算結果がゼロの時;
        if (stackA06 == 0) return new31FB;

        return calc31FB_D880(new31FB, C10, stackA06); // ローテ終わるまでループ
    }
}
