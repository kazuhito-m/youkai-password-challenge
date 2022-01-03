package com.github.kazuhitom.youkai.core.domain.model.password;

import com.github.kazuhitom.youkai.core.domain.model.password.converter.CodeToCharacterConverter;

import java.util.Arrays;
import java.util.stream.IntStream;

import static java.util.stream.Collectors.joining;

public class Password {
    private final int[] charCodes;
    private final CodeToCharacterConverter converter;

    public int getOf(int index) {
        return charCodes[index];
    }

    public int charLength() {
        return charCodes.length;
    }

    public Password increment() {
        int[] newCodes = Arrays.copyOf(charCodes, charCodes.length);
        for (int i = 0; i < newCodes.length; i++) {
            int before = newCodes[i];
            newCodes[i] = converter.incrementCode(before);
            if (newCodes[i] > before) break; // 繰り上がりなし
        }
        return new Password(converter, newCodes);
    }

    public Password fixInvalid() {
        if (!isInvalid()) return this;

        int[] newCodes = Arrays.copyOf(charCodes, charCodes.length);
        for (int i = 0; i < newCodes.length; i++) {
            if (!converter.isInvalidCharCode(newCodes[i])) continue;
            newCodes[i] = converter.incrementCode(newCodes[i]);
        }
        return new Password(converter, newCodes);
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
        Password that = (Password) o;
        return Arrays.equals(charCodes, that.charCodes);
    }

    @Override
    public int hashCode() {
        return Arrays.hashCode(charCodes);
    }

    public Password minimum() {
        return initialize(charCodes.length, converter);
    }

    public static Password initialize(int charCount) {
        return new Password(new int[charCount]);
    }

    public static Password initialize(int charCount, CodeToCharacterConverter converter) {
        int initialCode = converter.minCode();
        int[] values = IntStream.range(0, charCount)
                .map(i -> initialCode)
                .toArray();
        return new Password(converter, values);
    }


    public static Password withText(String passwordText) {
        return withText(passwordText, new CodeToCharacterConverter());
    }

    public static Password withText(String passwordText, CodeToCharacterConverter converter) {
        int[] codes = passwordText.chars()
                .map(oneCher -> converter.reverceConvert((char) oneCher))
                .toArray();
        return new Password(converter, codes);
    }

    public Password(int... charCodes) {
        this(new CodeToCharacterConverter(), charCodes);
    }

    public Password(CodeToCharacterConverter converter, int... charCodes) {
        this.converter = converter;
        this.charCodes = charCodes;
    }
}
