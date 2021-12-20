package com.github.kazuhitom.youkaicheckdigittry.state;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class AttackCharactersTest {
    @Test
    public void 文字列の初期化時に_有効な文字コード中で一番低い値_で初期化される() {
        var charTable = "****16******27******38******49******50*****-*******.**";
        var converter = new CodeToCharacterConverter(charTable);

        var actual = AttackCharacters.Initialize(4, converter);

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

        var minimum = AttackCharacters.Initialize(6, converter);

        var firstCode = new AttackCharacters(converter, 51, 51, 51, 51, 51, 51);

        assertEquals("33 33 33 33 33 33", firstCode.dumpHexText());

        var actual = firstCode.increment();

        assertEquals("04 04 04 04 04 04", actual.dumpHexText());
        assertEquals(minimum, actual);
    }
}