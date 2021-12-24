package com.github.kazuhitom.youkai.console.checkdigit.state;

import com.github.kazuhitom.youkai.console.checkdigit.converter.CodeToCharacterConverter;

import java.util.Arrays;
import java.util.stream.IntStream;

import static java.util.stream.Collectors.joining;

public class AttackCharacters {
    private final int[] charCodes;
    private final CodeToCharacterConverter converter;

    public int getOf(int index) {
        return charCodes[index];
    }

    public int charLength() {
        return charCodes.length;
    }

    public AttackCharacters increment() {
        int[] newCodes = Arrays.copyOf(charCodes, charCodes.length);
        for (int i = 0; i < newCodes.length; i++) {
            int before = newCodes[i];
            newCodes[i] = converter.incrementCode(before);
            if (newCodes[i] > before) break; // 繰り上がりなし
        }
        return new AttackCharacters(converter, newCodes);
    }

    public AttackCharacters fixInvalid() {
        if (!isInvalid()) return this;

        int[] newCodes = Arrays.copyOf(charCodes, charCodes.length);
        for (int i = 0; i < newCodes.length; i++) {
            if (!converter.isInvalidCharCode(newCodes[i])) continue;
            newCodes[i] = converter.incrementCode(newCodes[i]);
        }
        return new AttackCharacters(converter, newCodes);
    }

    public boolean isInvalid() {
        return Arrays.stream(charCodes)
                .anyMatch(converter::isInvalidCharCode);
    }

    public String dumpHexText() {
        return Arrays.stream(charCodes)
                .mapToObj(code -> String.format("%02X", code))
                .collect(joining(" "));
    }

    @Override
    public String toString() {
        return Arrays.stream(charCodes)
                .mapToObj(converter::convert)
                .map(c -> c.toString())
                .collect(joining());
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AttackCharacters that = (AttackCharacters) o;
        return Arrays.equals(charCodes, that.charCodes);
    }

    @Override
    public int hashCode() {
        return Arrays.hashCode(charCodes);
    }

    public AttackCharacters minimum() {
        return initialize(charCodes.length, converter);
    }

    public static AttackCharacters initialize(int charCount) {
        return new AttackCharacters(new int[charCount]);
    }

    public static AttackCharacters initialize(int charCount, CodeToCharacterConverter converter) {
        int initialCode = converter.minCode();
        int[] values = IntStream.range(0, charCount)
                .map(i -> initialCode)
                .toArray();
        return new AttackCharacters(converter, values);
    }


    public static AttackCharacters withText(String passwordText) {
        return withText(passwordText, new CodeToCharacterConverter());
    }

    public static AttackCharacters withText(String passwordText, CodeToCharacterConverter converter) {
        int[] codes = passwordText.chars()
                .map(oneCher -> converter.reverceConvert((char) oneCher))
                .toArray();
        return new AttackCharacters(converter, codes);
    }

    public AttackCharacters(int... charCodes) {
        this(new CodeToCharacterConverter(), charCodes);
    }

    public AttackCharacters(CodeToCharacterConverter converter, int... charCodes) {
        this.converter = converter;
        this.charCodes = charCodes;
    }
}
