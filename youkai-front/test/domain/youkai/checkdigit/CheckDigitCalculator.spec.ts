import CheckDigitCalculator from "@/domain/youkai/checkdigit/CheckDigitCalculator";
import AttackCharacters from "~/domain/youkai/checkdigit/state/AttackCharacters";

describe('CheckDigitCalculator', () => {
    const sut = new CheckDigitCalculator();

    function toCode(text: string): AttackCharacters {
        return AttackCharacters.withText(text);
    }

    test('主要なパスワードからチェックディジット変換で出来る', () => {
        // expect("ED 26 08 EE 3D 23 1D 12").toEqual(sut.calculate(toCode("SPEED-UP")).toString());
        // expect("5F 65 0C 8F 8B 22 76 13").toEqual(sut.calculate(toCode("OHAYOUKAWADA")).toString());
        expect("9A 7D 09 9E B5 09 55 0C").toEqual(sut.calculate(toCode("UDADAGAWA")).toString());
        expect("4A 89 0A 1F F5 28 7B 1C").toEqual(sut.calculate(toCode("S.62.08.22")).toString());
        expect("86 C4 09 6B 32 22 E6 0E").toEqual(sut.calculate(toCode("KOBAYASHI")).toString());
        expect("54 34 06 3C 10 0A 9F 08").toEqual(sut.calculate(toCode("KAWADA")).toString());
        expect("63 B6 09 20 B4 08 EA 13").toEqual(sut.calculate(toCode("PC-ENGINE")).toString());
        expect("46 60 03 61 EC 01 2D 05").toEqual(sut.calculate(toCode("NEC")).toString());
        expect("70 74 06 BB D6 02 4E 0F").toEqual(sut.calculate(toCode("MIZUNO")).toString());
        expect("3E 19 04 5C 5B 28 76 0C").toEqual(sut.calculate(toCode("6809")).toString());
        expect("F9 41 07 AC E5 21 83 10").toEqual(sut.calculate(toCode("MONITOR")).toString());
        expect("44 3D 09 9A 57 32 71 0F").toEqual(sut.calculate(toCode("YAMASHITA")).toString());
        expect("63 95 07 6A B1 21 44 0E").toEqual(sut.calculate(toCode("MICHIYO")).toString());
        expect("01 F7 04 54 94 22 E5 08").toEqual(sut.calculate(toCode("YAGI")).toString());
        expect("08 3A 08 94 CB 2A 78 13").toEqual(sut.calculate(toCode("YUKIHIKO")).toString());
        expect("4B 70 05 4D 96 3B 36 09").toEqual(sut.calculate(toCode("KOMAI")).toString());
        expect("D4 77 08 94 CD 1B 6A 10").toEqual(sut.calculate(toCode("KAZUHIKO")).toString());
        // expect("FA 68 08 8A 3A 1F 8D 12").toEqual(sut.calculate(toCode("756-2311")).toString());
        expect("3B EA 05 6C D2 0A D8 08").toEqual(sut.calculate(toCode("NAMCO")).toString());
        // expect("1C 6F 06 96 41 20 16 0C").toEqual(sut.calculate(toCode("NAMCOT")).toString());
        expect("F2 4A 09 0A A2 12 76 10").toEqual(sut.calculate(toCode("NAGAMATSU")).toString());
        expect("43 4C 05 3C 35 0A 93 08").toEqual(sut.calculate(toCode("AKIRA")).toString());
        expect("45 D7 08 9F AD 38 92 0B").toEqual(sut.calculate(toCode("NAUSICAA")).toString());
        expect("04 49 06 87 39 33 C4 0A").toEqual(sut.calculate(toCode("LAPUTA")).toString());
        expect("29 62 05 89 BD 35 64 0E").toEqual(sut.calculate(toCode("68000")).toString());
        expect("F8 7D 04 5B 4B 08 A9 09").toEqual(sut.calculate(toCode("6502")).toString());
        expect("00 08 03 22 88 20 22 03").toEqual(sut.calculate(toCode("HAL")).toString());
        expect("00 51 03 3A E9 08 23 07").toEqual(sut.calculate(toCode("KID")).toString());
        expect("5D 50 0C FD B4 13 63 17").toEqual(sut.calculate(toCode("KUMI.HANAOKA")).toString());
        // expect("04 76 10 32 D1 21 27 1B").toEqual(sut.calculate(toCode("HARUHISA.UDAGAWA")).toString());

        // 今回見つかった三種

        // expect("64 98 0B 15 91 18 B1 15").toEqual(sut.calculate(toCode("HENTAIOSUGI")).toString());
        // expect("DC D9 08 A3 E3 17 28 15").toEqual(sut.calculate(toCode("818-6104")).toString());
        expect("65 94 0E AC E9 07 33 25").toEqual(sut.calculate(toCode("534-030.565.81")).toString());
    });
});
