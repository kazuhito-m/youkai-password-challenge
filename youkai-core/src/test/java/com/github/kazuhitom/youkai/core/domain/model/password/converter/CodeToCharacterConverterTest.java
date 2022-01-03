package com.github.kazuhitom.youkai.core.domain.model.password.converter;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class CodeToCharacterConverterTest {
    @Test
    public void インクリメント用の_次の値_テーブルを作り_次のコードが取得できる() {
        var charTable = "****16******27******38******49******50*****-*******.**";
        var sut = new CodeToCharacterConverter(charTable);

        assertEquals(4, sut.incrementCode(0));
        assertEquals(4, sut.incrementCode(1));
        assertEquals(4, sut.incrementCode(2));
        assertEquals(4, sut.incrementCode(3));
        assertEquals(5, sut.incrementCode(4));
        assertEquals(12, sut.incrementCode(5));
        assertEquals(12, sut.incrementCode(6));

        assertEquals(12, sut.incrementCode(10));
        assertEquals(12, sut.incrementCode(11));
        assertEquals(13, sut.incrementCode(12));
        assertEquals(20, sut.incrementCode(13));
        assertEquals(20, sut.incrementCode(14));

        assertEquals(51, sut.incrementCode(49));
        assertEquals(51, sut.incrementCode(50));
        assertEquals(4, sut.incrementCode(51));
        assertEquals(4, sut.incrementCode(52));
        assertEquals(4, sut.incrementCode(53));

        var tableSize = charTable.length();
        assertEquals(4, sut.incrementCode(tableSize - 1));
        assertEquals(4, sut.incrementCode(tableSize));
        assertEquals(4, sut.incrementCode(tableSize + 1));
    }
}