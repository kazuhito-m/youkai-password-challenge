package com.github.kazuhitom.youkaicheckdigittry.converter;

import java.util.stream.IntStream;

/**
 * 文字コード変換テーブル。
 */
public class CodeToCharacterConverter {
    private final String charTable;
    private final char[] codeToChar;
    private final int[] incrementNextCodeTable;

    private static final char INVALID_CHAR = '*';
    private static final String DEFAULT_CHAR_TABLE = "AHOV16**BIPW27**CJQX38**DKRY49**ELSZ50**FMT-n!**GNU.mc";

    public char convert(int code) {
        return codeToChar[code];
    }

    public int incrementCode(int code) {
        int index = incrementNextCodeTable.length - 1;
        if (code <= index) index = code;
        return incrementNextCodeTable[index];
    }

    public int minCode() {
        return incrementNextCodeTable[incrementNextCodeTable.length - 1];
    }

    public boolean isInvalidCharCode(int code) {
        return INVALID_CHAR == convert(code);
    }

    private int[] createIncrementNextCodeTable(char[] codeToChar) {
        int firstValidCharCode = IntStream.range(0, codeToChar.length)
                .filter(i -> codeToChar[i] != INVALID_CHAR)
                .findFirst()
                .orElse(0);

        int[] result = new int[codeToChar.length];
        int currentIncrementCode = firstValidCharCode;
        for (int i = codeToChar.length - 1; i >= 0; i--) {
            result[i] = currentIncrementCode;
            if (codeToChar[i] != INVALID_CHAR) currentIncrementCode = i;
        }

        return result;
    }

    public CodeToCharacterConverter() {
        this(DEFAULT_CHAR_TABLE);
    }

    public CodeToCharacterConverter(String charTable) {
        this.charTable = charTable;
        this.codeToChar = charTable.toCharArray();
        this.incrementNextCodeTable = createIncrementNextCodeTable(this.codeToChar);
    }
}
