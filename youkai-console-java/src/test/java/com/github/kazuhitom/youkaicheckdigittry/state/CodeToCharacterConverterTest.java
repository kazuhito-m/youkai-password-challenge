package com.github.kazuhitom.youkaicheckdigittry.state;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class CodeToCharacterConverterTest {
    @Test
    public void インクリメント用の_次の値_テーブルを作る() {
        var sut = new CodeToCharacterConverter();
        char[] param = "****16******27******38******49******50*****-*******.**".toCharArray();

        int[] actual = sut.createIncrementNextCodeTable(param);

        assertEquals(54, actual.length);

        assertEquals(4, actual[0]);
        assertEquals(4, actual[1]);
        assertEquals(4, actual[2]);
        assertEquals(4, actual[3]);
        assertEquals(5, actual[4]);
        assertEquals(12, actual[5]);
        assertEquals(12, actual[6]);

        assertEquals(12, actual[10]);
        assertEquals(12, actual[11]);
        assertEquals(13, actual[12]);
        assertEquals(20, actual[13]);
        assertEquals(20, actual[14]);

        assertEquals(51, actual[49]);
        assertEquals(51, actual[50]);
        assertEquals(4, actual[51]);
        assertEquals(4, actual[52]);
        assertEquals(4, actual[53]);
    }
}