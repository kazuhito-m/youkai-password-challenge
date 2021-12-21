import AttackCharacters from "./state/AttackCharacters";
import A31F from "./state/A31F";

export default class CheckDigitCalculator {
    private A = 0;

    public calculate(password: AttackCharacters): A31F {
        this.A = password.getOf(0);

        const currentCheckDigit = A31F.prototypeOf(password.charLength());
        const D87F = this.subroutineD8C0(currentCheckDigit, this.A);
        this.D880(currentCheckDigit, password, D87F);

        return currentCheckDigit;
    }

    private subroutineD8C0(a31f: A31F, targetCharCode: number): number {
        this.A = targetCharCode;
        for (let i = 0; i < 8; i++) {
            this.A = this.A << 1;

            let C1 = 0;
            if (this.A > 0xFF) {
                C1 = 1;
                this.A = this.A & 0xFF;
            }
            const a1Work = this.A;
            // 31F4と31F5を右1ビットローテート
            const work1 = a31f.a31F4 & 0x01;
            a31f.a31F4 = a31f.a31F4 >> 1;
            a31f.a31F4 = a31f.a31F4 | (C1 << 7); // C0000000
            C1 = work1;

            const work2 = a31f.a31F5 & 0x01;
            a31f.a31F5 = a31f.a31F5 >> 1;
            a31f.a31F5 = a31f.a31F5 | (C1 << 7); // C0000000
            C1 = work2;

            //printf("ror %02X %02X\n",a31F4,a31F5);

            this.A = 0xFF + C1;

            if (this.A > 0xFF) {
                this.A = 0;
            }

            this.A = this.A ^ 0xFF;
            const a2Work = this.A;
            this.A = this.A & 0x84;
            this.A = this.A ^ a31f.a31F4;
            a31f.a31F4 = this.A;
            this.A = a2Work;
            this.A = this.A & 0x08;
            this.A = this.A ^ a31f.a31F5;
            a31f.a31F5 = this.A;
            this.A = a1Work;
        }

        this.A = targetCharCode; // ここまでで31F4と31F5算出完了

        //D8A4: // 31F7と31F8を生成(Complete)
        //        stackA.push(A);
        //        stackA.push(A);
        const a3Work = this.A;
        const a4Work = this.A;
        this.A = a31f.a31F4;

        let C3 = 0;
        if (this.A >= 0xE5) {
            C3 = 1;
        } //C5の値でキャリーを生成
        //        A = stackA.pop();
        this.A = a4Work;
        this.A = this.A + a31f.a31F7 + C3;

        let C4 = 0;
        if (this.A > 0xFF) { // ADCのキャリー処理
            this.A = this.A & 0xFF;
            C4 = 1;
        }
        a31f.a31F7 = this.A;
        this.A = a31f.a31F8;
        this.A = this.A + a31f.a31F5 + C4;

        let C5 = 0;
        if (this.A > 0xFF) { // ADCのキャリー処理
            this.A = this.A & 0xFF;
            C5 = 1;
        }
        a31f.a31F8 = this.A;
        //        A = stackA.pop();
        this.A = a3Work;

        //D89B: // 31F9を生成(Complete)
        //        stackA.push(A);
        const a5Work = this.A;
        this.A = this.A ^ a31f.a31F9;
        a31f.a31F9 = this.A;
        //        A = stackA.pop();
        this.A = a5Work;

        // ここから下にまだバグがある

        //D88F: // 31FAを生成
        //        stackA.push(A);
        const a6Work = this.A;
        // 31FAをローテート
        const work3 = a31f.a31FA & 0x01;
        a31f.a31FA = a31f.a31FA >> 1;
        a31f.a31FA = a31f.a31FA | (C5 << 7); // $31F8のCがここで入る

        const C6 = work3;
        this.A = this.A + a31f.a31FA + C6;

        let C7 = 0;
        if (this.A > 0xFF) { // ADCのキャリー処理
            this.A = this.A & 0xFF;
            C7 = 1;
        }
        a31f.a31FA = this.A;

        //        A = stackA.pop();
        this.A = a6Work;
        //D87F:
        return this.A;
    }

    private D880(a31f: A31F, password: AttackCharacters, D87F: number): void {
        let C1 = 0;
        for (let X = 0; X < a31f.charLength; X++) {
            // 文字数分だけ演算をカウント
            if (X > 0) {
                this.A = password.getOf(X);
                D87F = this.subroutineD8C0(a31f, this.A);
            }

            // 31FBを生成
            let Z: boolean;
            do {
                // Aを左ローテート
                this.A = this.A << 1;
                if (this.A > 0xFF) { // ADCのキャリー処理
                    this.A = this.A & 0xFF;
                    C1 = 1;
                }
                Z = this.A === 0; // 演算結果がゼロの時Z=true;

                //                stackA.push(A); // スタックに値を保存
                const a1Work = this.A;
                this.A = a31f.a31FB;
                this.A = this.A + C1;

                C1 = 0;
                if (this.A > 0xFF) { // ADCのキャリー処理
                    this.A = this.A & 0xFF;
                    C1 = 1;
                }
                a31f.a31FB = this.A;

                this.A = a1Work;
            } while (!Z);   // ローテ終わるまでループ
            //printf("a31FB=%x ",a31FB);

            this.A = D87F;
        }
    }
}