package com.github.kazuhitom.youkai.console.checkdigit;

import com.github.kazuhitom.youkai.console.checkdigit.state.A31F;
import com.github.kazuhitom.youkai.console.checkdigit.state.AttackCharacters;

public class CheckDigitCalculator {
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

            a31f.calc31F4And31F5(A02);

            shiftedCode = A01;
        }

        // ここまでで31F4と31F5算出完了

        // 31F7と31F8を生成(Complete)
        // 31F9を生成(Complete)
        final int C7 = a31f.calc31F4And31F5And31F9(targetCharCode);

// ここから下にまだバグがある

        // 31FAを生成
        // 31FAをローテート
        final int work3 = a31f.rotateRightOneBit31FA(C7); // $31F8のCがここで入る
        final int C9 = a31f.calc31FA(targetCharCode, work3);

        a31f.calc31FB(C9, targetCharCode);
    }
}
