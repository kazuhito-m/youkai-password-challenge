package com.github.kazuhitom.youkaicheckdigittry.checkdigit;

import com.github.kazuhitom.youkaicheckdigittry.checkdigit.state.AttackCharacters;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class CheckDigitCalculatorTest {
    private CheckDigitCalculator sut = new CheckDigitCalculator();

    AttackCharacters toCode(String text) {
        return AttackCharacters.withText(text);
    }

    @Test
    public void 主要なパスワードからチェックディジット変換で出来る() {
//        assertEquals("ED 26 08 EE 3D 23 1D 12", sut.calculate(toCode("SPEED-UP")).toString());
//        assertEquals("5F 65 0C 8F 8B 22 76 13", sut.calculate(toCode("OHAYOUKAWADA")).toString());
        assertEquals("9A 7D 09 9E B5 09 55 0C", sut.calculate(toCode("UDADAGAWA")).toString());
        assertEquals("4A 89 0A 1F F5 28 7B 1C", sut.calculate(toCode("S.62.08.22")).toString());
        assertEquals("86 C4 09 6B 32 22 E6 0E", sut.calculate(toCode("KOBAYASHI")).toString());
        assertEquals("54 34 06 3C 10 0A 9F 08", sut.calculate(toCode("KAWADA")).toString());
        assertEquals("63 B6 09 20 B4 08 EA 13", sut.calculate(toCode("PC-ENGINE")).toString());
        assertEquals("46 60 03 61 EC 01 2D 05", sut.calculate(toCode("NEC")).toString());
        assertEquals("70 74 06 BB D6 02 4E 0F", sut.calculate(toCode("MIZUNO")).toString());
        assertEquals("3E 19 04 5C 5B 28 76 0C", sut.calculate(toCode("6809")).toString());
        assertEquals("F9 41 07 AC E5 21 83 10", sut.calculate(toCode("MONITOR")).toString());
        assertEquals("44 3D 09 9A 57 32 71 0F", sut.calculate(toCode("YAMASHITA")).toString());
        assertEquals("63 95 07 6A B1 21 44 0E", sut.calculate(toCode("MICHIYO")).toString());
        assertEquals("01 F7 04 54 94 22 E5 08", sut.calculate(toCode("YAGI")).toString());
        assertEquals("08 3A 08 94 CB 2A 78 13", sut.calculate(toCode("YUKIHIKO")).toString());
        assertEquals("4B 70 05 4D 96 3B 36 09", sut.calculate(toCode("KOMAI")).toString());
        assertEquals("D4 77 08 94 CD 1B 6A 10", sut.calculate(toCode("KAZUHIKO")).toString());
//        assertEquals("FA 68 08 8A 3A 1F 8D 12", sut.calculate(toCode("756-2311")).toString());
        assertEquals("3B EA 05 6C D2 0A D8 08", sut.calculate(toCode("NAMCO")).toString());
//        assertEquals("1C 6F 06 96 41 20 16 0C", sut.calculate(toCode("NAMCOT")).toString());
        assertEquals("F2 4A 09 0A A2 12 76 10", sut.calculate(toCode("NAGAMATSU")).toString());
        assertEquals("43 4C 05 3C 35 0A 93 08", sut.calculate(toCode("AKIRA")).toString());
        assertEquals("45 D7 08 9F AD 38 92 0B", sut.calculate(toCode("NAUSICAA")).toString());
        assertEquals("04 49 06 87 39 33 C4 0A", sut.calculate(toCode("LAPUTA")).toString());
        assertEquals("29 62 05 89 BD 35 64 0E", sut.calculate(toCode("68000")).toString());
        assertEquals("F8 7D 04 5B 4B 08 A9 09", sut.calculate(toCode("6502")).toString());
        assertEquals("00 08 03 22 88 20 22 03", sut.calculate(toCode("HAL")).toString());
        assertEquals("00 51 03 3A E9 08 23 07", sut.calculate(toCode("KID")).toString());
        assertEquals("5D 50 0C FD B4 13 63 17", sut.calculate(toCode("KUMI.HANAOKA")).toString());
//        assertEquals("04 76 10 32 D1 21 27 1B", sut.calculate(toCode("HARUHISA.UDAGAWA")).toString());

        // 今回見つかった三種

//        assertEquals("64 98 0B 15 91 18 B1 15", sut.calculate(toCode("HENTAIOSUGI")).toString());
//        assertEquals("DC D9 08 A3 E3 17 28 15", sut.calculate(toCode("818-6104")).toString());
        assertEquals("65 94 0E AC E9 07 33 25", sut.calculate(toCode("534-030.565.81")).toString());
        assertEquals("65 94 0E AC E9 07 33 25", sut.calculate(toCode("009n251.mn3202")).toString());
    }
}