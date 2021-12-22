import AttackCharacters from "./state/AttackCharacters";
import A31F from "./state/A31F";

export default class CheckDigitCalculator {
    public calculate(password: AttackCharacters): A31F {
        const a31f = A31F.prototypeOf(password.charLength());
        for (let charPosition = 0; charPosition < password.charLength(); charPosition++) {
            this.D8C0(password, a31f, charPosition);  // 文字数分だけ演算をカウント
        }
        return a31f;
    }

    private D8C0(password: AttackCharacters, a31f: A31F, targetCharPosition: number): void {
        const targetCharCode = password.getOf(targetCharPosition);
        let shiftedCode = targetCharCode;
        for (let y = 0; y < 8; y++) {
            let A01 = shiftedCode << 1;

            let C1;
            if (A01 > 0xFF) {
                C1 = 1;
                A01 = A01 & 0xFF;
            } else {
                C1 = 0;
            }

            // 31F4と31F5を右1ビットローテート
            const C2 = a31f.rotateRightOneBit31F4(C1);
            const C3 = a31f.rotateRightOneBit31F5(C2);

            let A02 = 0xFF + C3;
            if (A02 > 0xFF) {
                A02 = 0;
            }

            a31f.calc31F4And31F5(A02);

            shiftedCode = A01;
        }

        // ここまでで31F4と31F5算出完了

        // 31F7と31F8を生成(Complete)
        // 31F9を生成(Complete)
        const C7 = a31f.calc31F4And31F5And31F9(targetCharCode);

        // ここから下にまだバグがある

        // 31FAを生成
        // 31FAをローテート
        const work3 = a31f.rotateRightOneBit31FA(C7); // $31F8のCがここで入る
        const C9 = a31f.calc31FA(targetCharCode, work3);

        a31f.calc31FB(C9, targetCharCode);
    }
}