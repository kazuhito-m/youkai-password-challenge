package com.github.kazuhitom.youkai.core.domain.model.password.converter;

import java.util.Arrays;
import java.util.stream.IntStream;
import java.util.stream.Stream;

import static java.util.stream.Collectors.joining;

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

    public int reverceConvert(char oneChar) {
        for (int i = 0; i < this.codeToChar.length; i++) {
            if (codeToChar[i] == oneChar) return i;
        }
        return -1;
    }

    public int reverceConvert(String passwordChar) {
        int oneChar = passwordChar.charAt(0); // 念の為
        for (int i = 0; i < this.codeToChar.length; i++) {
            if (this.codeToChar[i] == oneChar) return i;
        }
        return -1;
    }


    public int incrementCode(int code) {
        int index = incrementNextCodeTable.length - 1;
        if (code <= index) index = code;
        return incrementNextCodeTable[index];
    }

    public int minCode() {
        return incrementNextCodeTable[incrementNextCodeTable.length - 1];
    }

    public int maxCode() {
        return Arrays.stream(this.incrementNextCodeTable)
                .min()
                .getAsInt();
    }

    public boolean isInvalidCharCode(int code) {
        return INVALID_CHAR == convert(code);
    }


    public boolean isInvalidChar(String oneChar) {
        if (CodeToCharacterConverter.equalInvalidChar(oneChar)) return true;
        return !this.charTable.contains(oneChar);
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

    public int randomCode() {
        String validChars = this.validCharacters();
        int randomPos = (int) Math.floor(Math.random() * validChars.length());
        String oneChar = validChars.substring(randomPos, 1);
        return this.reverceConvert(oneChar);
    }

    public static boolean equalInvalidChar(String oneChar) {
        return oneChar == String.valueOf(CodeToCharacterConverter.INVALID_CHAR);
    }

    public boolean isInvalidPassword(String text) {
        if (text.trim().length() == 0) return false;
        return Arrays.stream(text.split(""))
                .anyMatch(oneChar -> isInvalidChar(oneChar));
    }

    public String fixValidPassword(String text) {
        if (text.trim().length() == 0) return "";
        return Arrays.stream(text.split(""))
                .map(oneChar -> fixValidOneChar(oneChar))
                .collect(joining());
    }

    private String fixValidOneChar(String oneChar) {
        if (!this.isInvalidChar(oneChar)) return oneChar;
        String upperChar = oneChar.toUpperCase();
        if (!this.isInvalidChar(upperChar)) return upperChar;
        return "";
    }

    public String validCharacters() {
        String invalidCharString = String.valueOf(INVALID_CHAR);
        return Stream.of(charTable.split(""))
                .filter(c -> !c.equals(invalidCharString))
                .collect(joining());
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
