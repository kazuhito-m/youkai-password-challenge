import A31F from "./state/A31F";
import AttackCharacters from "./state/AttackCharacters";

export default class YoukaiPasswordAttacker {
    constructor(private readonly oneHitExitMode: boolean) { }

    private A = 0;
    private cancellation = false;

    private static readonly DUMP_INTERVAL = 67107840;

    public execute(attackTargetCheckDigit: A31F, startPassword: AttackCharacters, hitPasswordEvent: any = () => { }): AttackCharacters[] {
        const results: AttackCharacters[] = [];
        let password = startPassword;
        const minimum = startPassword.minimum();
        this.cancellation = false;
        let checkedCount = 0;
        try {
            // a31DCにターゲット桁数の数値を入れて回転させて、値が一致するまでアタック
            while (true) {
                ++checkedCount;

                // 以下メインルーチン
                this.A = password.getOf(0);

                const currentCheckDigit = attackTargetCheckDigit.prototype();
                const D87F = this.subroutineD8C0(currentCheckDigit, this.A);
                this.D880(currentCheckDigit, password, D87F);

                if ((checkedCount % YoukaiPasswordAttacker.DUMP_INTERVAL) === 0 || this.cancellation) {
                    this.dumpContinueCommand(password, attackTargetCheckDigit, checkedCount);
                    if (this.cancellation) {
                        this.printf("キャンセルされました。\n");
                        break;
                    }
                }

                // 検算終了後にチェック
                if (attackTargetCheckDigit.equals(currentCheckDigit)) {
                    results.push(password);

                    this.printTime();
                    this.printf(`Hit! : ${password.dumpHexText()} = ${password.toString()} (${checkedCount} 回目)\n`);

                    hitPasswordEvent(password);

                    if (this.oneHitExitMode) {
                        this.printf("見つかったので、処理を終了します。\n");
                        break;
                    }
                }

                // 0x00-0x35の範囲でループさせる
                password = password.increment();
                if (password.equals(minimum)) {
                    this.printCount(checkedCount);
                    this.printf("End.\n");
                    break;
                }
            }
        } catch (e) {
            console.log(e);
        }
        return results;
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
        for (let X = 0; X < a31f.atk_count; X++) {
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

    private printf(format: string, ...args: number[]): void {
        // TOOD console.log()
        // System.out.printf(format, args);
    }

    private printCount(checkedCount: number): void {
        // printf("%,.0f 回目\n", checkedCount);
    }

    private printTime(): void {
        // DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss");
        // printf(LocalDateTime.now().format(formatter) + " - ");
    }

    private dumpContinueCommand(password: AttackCharacters, attackTargetCheckDigit: A31F, checkedCount: number): void {
        const messge = `continue parameter : ${attackTargetCheckDigit.toString()} ${password.dumpHexText()} (${checkedCount} 回目)`;
        console.log(messge);
        // printf("continue parameter : %s %s (%,.0f 回目)\n", attackTargetCheckDigit, password.dumpHexText(), checkedCount);
    }

    public cancel(): void {
        this.cancellation = true;
    }
}