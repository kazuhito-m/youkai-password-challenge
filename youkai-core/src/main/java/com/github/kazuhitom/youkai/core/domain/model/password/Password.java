package com.github.kazuhitom.youkai.core.domain.model.password;

import com.github.kazuhitom.youkai.core.domain.model.password.converter.CodeToCharacterConverter;

import java.util.Arrays;
import java.util.stream.IntStream;

import static java.util.stream.Collectors.joining;

public class Password {
    private final int[] charCodes;
    private final CodeToCharacterConverter converter;

    public static final int MIN_CHARS_LENGTH = 3;
    public static final int MAX_CHARS_LENGTH = 14;


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
        return new Password(newCodes, converter);
    }


    public Password incrementSpecifyPosition(int position) {
        int index = position;
        int[] newCodes = Arrays.copyOf(charCodes, charCodes.length);
        for (int i = index; i < newCodes.length; i++) {
            int before = newCodes[i];
            newCodes[i] = converter.incrementCode(before);
            if (newCodes[i] > before) break; // 繰り上がりなし
        }
        return new Password(newCodes, converter);
    }

    public Password fixInvalid() {
        if (!isInvalid()) return this;

        int[] newCodes = Arrays.copyOf(charCodes, charCodes.length);
        for (int i = 0; i < newCodes.length; i++) {
            if (!converter.isInvalidCharCode(newCodes[i])) continue;
            newCodes[i] = converter.incrementCode(newCodes[i]);
        }
        return new Password(newCodes, converter);
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
        return new Password(values, converter);
    }


    public static Password withText(String passwordText) {
        return withText(passwordText, new CodeToCharacterConverter());
    }

    public static Password withText(String passwordText, CodeToCharacterConverter converter) {
        int[] codes = passwordText.chars()
                .map(oneCher -> converter.reverceConvert((char) oneCher))
                .toArray();
        return new Password(codes, converter);
    }

    public Password(int... charCodes) {
        this(charCodes, new CodeToCharacterConverter());
    }

    public Password(int[] charCodes, CodeToCharacterConverter converter) {
        this.charCodes = charCodes;
        this.converter = converter;
    }
}
