import CheckDigitCalculator from "./CheckDigitCalculator";
import A31F from "./state/A31F";
import Password from "./state/Password";

export default class YoukaiPasswordAttacker {
    constructor(
        private readonly calculator: CheckDigitCalculator,
        private readonly oneHitExitMode: boolean
    ) { }

    private cancellation = false;

    private static readonly DUMP_INTERVAL = 67107840;

    public execute(attackTargetCheckDigit: A31F, startPassword: Password, hitPasswordEvent: any = () => { }): Password[] {
        const results: Password[] = [];
        let password = startPassword;
        const minimum = startPassword.minimum();
        this.cancellation = false;
        let checkedCount = 0;
        try {
            // a31DCにターゲット桁数の数値を入れて回転させて、値が一致するまでアタック
            while (true) {
                ++checkedCount;

                // 以下メインルーチン
                const currentCheckDigit = this.calculator.calculate(password);

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

    private printf(format: string, ...args: number[]): void {
        console.log(format, args);
    }

    private printCount(checkedCount: number): void {
        this.printf("%,.0f 回目\n", checkedCount);
    }

    private printTime(): void {
        this.printf(new Date() + " - ");
    }

    private dumpContinueCommand(password: Password, attackTargetCheckDigit: A31F, checkedCount: number): void {
        const messge = `continue parameter : ${attackTargetCheckDigit.toString()} ${password.dumpHexText()} (${checkedCount} 回目)`;
        console.log(messge);
        // printf("continue parameter : %s %s (%,.0f 回目)\n", attackTargetCheckDigit, password.dumpHexText(), checkedCount);
    }

    public cancel(): void {
        this.cancellation = true;
    }
}