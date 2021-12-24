package com.github.kazuhitom.youkai.console.state;

import com.github.kazuhitom.youkai.console.checkdigit.converter.CodeToCharacterConverter;
import com.github.kazuhitom.youkai.console.checkdigit.state.AttackCharacters;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class AttackCharactersTest {
    @Test
    public void 文字列の初期化時に_有効な文字コード中で一番低い値_で初期化される() {
        var charTable = "****16******27******38******49******50*****-*******.**";
        var converter = new CodeToCharacterConverter(charTable);

        var actual = AttackCharacters.initialize(4, converter);

        assertEquals("04 04 04 04", actual.dumpHexText());
    }

    @Test
    public void インクリメントすると無効文字列を飛ばして次のコードに上がる() {
        var charTable = "****16******27******38******49******50*****-*******.**";
        var converter = new CodeToCharacterConverter(charTable);

        var firstCode = new AttackCharacters(converter, 4, 4);
        assertEquals("04 04", firstCode.dumpHexText());

        var actual = firstCode.increment();

        assertEquals("05 04", actual.dumpHexText());

        var actual2 = actual.increment();

        assertEquals("0C 04", actual2.dumpHexText());
    }

    @Test
    public void インクリメントすると無効文字列を飛ばして繰り上がりも意識して上がる() {
        var charTable = "****16******27******38******49******50*****-*******.**";
        var converter = new CodeToCharacterConverter(charTable);

        var firstCode = new AttackCharacters(converter, 51, 51, 4);
        assertEquals("33 33 04", firstCode.dumpHexText());

        var actual = firstCode.increment();

        assertEquals("04 04 05", actual.dumpHexText());
    }

    @Test
    public void 最大値の時にインクリメントすると最小値に成る() {
        var charTable = "****16******27******38******49******50*****-*******.**";
        var converter = new CodeToCharacterConverter(charTable);

        var minimum = AttackCharacters.initialize(6, converter);

        var firstCode = new AttackCharacters(converter, 51, 51, 51, 51, 51, 51);
        assertEquals("33 33 33 33 33 33", firstCode.dumpHexText());

        var actual = firstCode.increment();

        assertEquals("04 04 04 04 04 04", actual.dumpHexText());
        assertEquals(minimum, actual);
    }

    @Test
    public void 無効値のコードを含む値の場合インクリメントで直近の有効値まで引き上げる() {
        var charTable = "****16******27******38******49******50*****-*******.**";
        var converter = new CodeToCharacterConverter(charTable);

        var firstCode = new AttackCharacters(converter, 0, 1, 2, 3);
        assertEquals("00 01 02 03", firstCode.dumpHexText());

        var actual = firstCode.fixInvalid();

        assertEquals("04 04 04 04", actual.dumpHexText());
    }

    @Test
    public void パスワードテキストからバイナリコードに変換出来る() {
        assertEquals("22 0A 20 20 18 2B 32 0A", AttackCharacters.withText("SPEED-UP").dumpHexText());
        assertEquals("02 01 00 1B 02 32 19 00 0B 00 18 00", AttackCharacters.withText("OHAYOUKAWADA").dumpHexText());
        assertEquals("32 18 00 18 00 30 00 0B 00", AttackCharacters.withText("UDADAGAWA").dumpHexText());
        assertEquals("22 33 05 0C 33 25 15 33 0C 0C", AttackCharacters.withText("S.62.08.22").dumpHexText());
        assertEquals("19 02 08 00 1B 00 22 01 09", AttackCharacters.withText("KOBAYASHI").dumpHexText());
        assertEquals("19 00 0B 00 18 00", AttackCharacters.withText("KAWADA").dumpHexText());
        assertEquals("0A 10 2B 20 31 30 09 31 20", AttackCharacters.withText("PC-ENGINE").dumpHexText());
        assertEquals("31 20 10", AttackCharacters.withText("NEC").dumpHexText());
        assertEquals("29 09 23 32 31 02", AttackCharacters.withText("MIZUNO").dumpHexText());
        assertEquals("05 15 25 1D", AttackCharacters.withText("6809").dumpHexText());
        assertEquals("29 02 31 09 2A 02 1A", AttackCharacters.withText("MONITOR").dumpHexText());
        assertEquals("1B 00 29 00 22 01 09 2A 00", AttackCharacters.withText("YAMASHITA").dumpHexText());
        assertEquals("29 09 10 01 09 1B 02", AttackCharacters.withText("MICHIYO").dumpHexText());
        assertEquals("1B 00 30 09", AttackCharacters.withText("YAGI").dumpHexText());
        assertEquals("1B 32 19 09 01 09 19 02", AttackCharacters.withText("YUKIHIKO").dumpHexText());
        assertEquals("19 02 29 00 09", AttackCharacters.withText("KOMAI").dumpHexText());
        assertEquals("19 00 23 32 01 09 19 02", AttackCharacters.withText("KAZUHIKO").dumpHexText());
        assertEquals("0D 24 05 2B 0C 14 04 04", AttackCharacters.withText("756-2311").dumpHexText());
        assertEquals("31 00 29 10 02", AttackCharacters.withText("NAMCO").dumpHexText());
        assertEquals("31 00 29 10 02 2A", AttackCharacters.withText("NAMCOT").dumpHexText());
        assertEquals("31 00 30 00 29 00 2A 22 32", AttackCharacters.withText("NAGAMATSU").dumpHexText());
        assertEquals("00 19 09 1A 00", AttackCharacters.withText("AKIRA").dumpHexText());
        assertEquals("31 00 32 22 09 10 00 00", AttackCharacters.withText("NAUSICAA").dumpHexText());
        assertEquals("21 00 0A 32 2A 00", AttackCharacters.withText("LAPUTA").dumpHexText());
        assertEquals("05 15 25 25 25", AttackCharacters.withText("68000").dumpHexText());
        assertEquals("05 24 25 0C", AttackCharacters.withText("6502").dumpHexText());
        assertEquals("01 00 21", AttackCharacters.withText("HAL").dumpHexText());
        assertEquals("19 09 18", AttackCharacters.withText("KID").dumpHexText());
        assertEquals("19 32 29 09 33 01 00 31 00 02 19 00", AttackCharacters.withText("KUMI.HANAOKA").dumpHexText());
        assertEquals("01 00 1A 32 01 09 22 00 33 32 18 00 30 00 0B 00", AttackCharacters.withText("HARUHISA.UDAGAWA").dumpHexText());
    }
}
