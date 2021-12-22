import CheckDigitCalculator from "../CheckDigitCalculator";
import A31F from "../state/A31F";
import AttackCharacters from "../state/AttackCharacters";
import CorrectCheckDigit from "./CorrectCheckDigit";

export default class CorrectCheckDigits {
    constructor(
        private readonly calculator: CheckDigitCalculator,
    ) {}

    private static readonly 無敵 = CorrectCheckDigits.of("534-030.565.81", "", "");

    private static readonly CORRECTS = [
        CorrectCheckDigits.of("SPEED-UP", "", ""),
        CorrectCheckDigits.of("OHAYOUKAWADA", "", ""),
        CorrectCheckDigits.of("UDADAGAWA", "", ""),
        CorrectCheckDigits.of("S.62.08.22", "", ""),
        CorrectCheckDigits.of("KOBAYASHI", "", ""),
        CorrectCheckDigits.of("KAWADA", "", ""),
        CorrectCheckDigits.of("PC-ENGINE", "", ""),
        CorrectCheckDigits.of("NEC", "", ""),
        CorrectCheckDigits.of("MIZUNO", "", ""),
        CorrectCheckDigits.of("6809", "", ""),
        CorrectCheckDigits.of("MONITOR", "", ""),
        CorrectCheckDigits.of("YAMASHITA", "", ""),
        CorrectCheckDigits.of("MICHIYO", "", ""),
        CorrectCheckDigits.of("YAGI", "", ""),
        CorrectCheckDigits.of("YUKIHIKO", "", ""),
        CorrectCheckDigits.of("KOMAI", "", ""),
        CorrectCheckDigits.of("KAZUHIKO", "", ""),
        CorrectCheckDigits.of("756-2311", "", ""),
        CorrectCheckDigits.of("NAMCO", "", ""),
        CorrectCheckDigits.of("NAMCOT", "", ""),
        CorrectCheckDigits.of("NAGAMATSU", "", ""),
        CorrectCheckDigits.of("AKIRA", "", ""),
        CorrectCheckDigits.of("NAUSICAA", "", ""),
        CorrectCheckDigits.of("LAPUTA", "", ""),
        CorrectCheckDigits.of("68000", "", ""),
        CorrectCheckDigits.of("6502", "", ""),
        CorrectCheckDigits.of("HAL", "", ""),
        CorrectCheckDigits.of("KID", "", ""),
        CorrectCheckDigits.of("KUMI.HANAOKA", "", ""),
        CorrectCheckDigits.of("HARUHISA.UDAGAWA", "", ""),
        CorrectCheckDigits.of("HENTAIOSUGI", "", ""),
        CorrectCheckDigits.of("818-6104", "", ""),
        CorrectCheckDigits.無敵,
    ];

    private hitTest(checkDigit: A31F): boolean {
        const correct = this.pickUpCorrectDigitOf(checkDigit);
        return !correct.isEmpty();
    }

    private pickUpCorrectDigitOf(checkDigit: A31F): CorrectCheckDigit {
        for (const correct of CorrectCheckDigits.CORRECTS) {
            const correctDigit = this.calculator.calculate(correct.typicalPassowrd);
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
