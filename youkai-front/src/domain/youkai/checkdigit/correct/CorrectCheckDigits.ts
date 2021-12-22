import CheckDigitCalculator from "../CheckDigitCalculator";
import A31F from "../state/A31F";
import AttackCharacters from "../state/AttackCharacters";
import CorrectCheckDigit from "./CorrectCheckDigit";

export default class CorrectCheckDigits {
    constructor(
        private readonly calculator: CheckDigitCalculator,
    ) { }

    private static readonly 無敵 = CorrectCheckDigits.of("534-030.565.81", "X", "Y");

    private static readonly CORRECTS = [
        CorrectCheckDigits.of("SPEED-UP", "X", "Y"),
        CorrectCheckDigits.of("OHAYOUKAWADA", "X", "Y"),
        CorrectCheckDigits.of("UDADAGAWA", "X", "Y"),
        CorrectCheckDigits.of("S.62.08.22", "X", "Y"),
        CorrectCheckDigits.of("KOBAYASHI", "X", "Y"),
        CorrectCheckDigits.of("KAWADA", "X", "Y"),
        CorrectCheckDigits.of("PC-ENGINE", "X", "Y"),
        CorrectCheckDigits.of("NEC", "X", "Y"),
        CorrectCheckDigits.of("MIZUNO", "X", "Y"),
        CorrectCheckDigits.of("6809", "X", "Y"),
        CorrectCheckDigits.of("MONITOR", "X", "Y"),
        CorrectCheckDigits.of("YAMASHITA", "X", "Y"),
        CorrectCheckDigits.of("MICHIYO", "X", "Y"),
        CorrectCheckDigits.of("YAGI", "X", "Y"),
        CorrectCheckDigits.of("YUKIHIKO", "X", "Y"),
        CorrectCheckDigits.of("KOMAI", "X", "Y"),
        CorrectCheckDigits.of("KAZUHIKO", "X", "Y"),
        CorrectCheckDigits.of("756-2311", "X", "Y"),
        CorrectCheckDigits.of("NAMCO", "X", "Y"),
        CorrectCheckDigits.of("NAMCOT", "X", "Y"),
        CorrectCheckDigits.of("NAGAMATSU", "X", "Y"),
        CorrectCheckDigits.of("AKIRA", "X", "Y"),
        CorrectCheckDigits.of("NAUSICAA", "X", "Y"),
        CorrectCheckDigits.of("LAPUTA", "X", "Y"),
        CorrectCheckDigits.of("68000", "X", "Y"),
        CorrectCheckDigits.of("6502", "X", "Y"),
        CorrectCheckDigits.of("HAL", "X", "Y"),
        CorrectCheckDigits.of("KID", "X", "Y"),
        CorrectCheckDigits.of("KUMI.HANAOKA", "X", "Y"),
        CorrectCheckDigits.of("HARUHISA.UDAGAWA", "X", "Y"),
        CorrectCheckDigits.of("HENTAIOSUGI", "X", "Y"),
        CorrectCheckDigits.of("818-6104", "X", "Y"),
        CorrectCheckDigits.無敵,
    ];

    public hitTest(checkDigit: A31F): boolean {
        const correct = this.pickUpCorrectDigitOf(checkDigit);
        console.log("hitTestの結果は？: " + correct.originalMessage)
        return !correct.isEmpty();
    }

    public pickUpCorrectDigitOf(checkDigit: A31F): CorrectCheckDigit {
        for (const correct of CorrectCheckDigits.CORRECTS) {
            const correctDigit = this.calculator.calculate(correct.typicalPassowrd);

            console.log(`正解側:${correctDigit.toString()}, チャレンジ側:${checkDigit.toString()}`);

            if (correctDigit.equals(checkDigit)) return correct;
        }
        return CorrectCheckDigit.empty();
    }

    private static of(
        typicalPassowrdText: string,
        originalMessage: string,
        description: string

    ): CorrectCheckDigit {
        return new CorrectCheckDigit(
            AttackCharacters.withText(typicalPassowrdText),
            originalMessage,
            description
        );
    }
}
