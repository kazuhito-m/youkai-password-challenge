package com.github.kazuhitom.youkaicheckdigittry.state;

import java.util.Arrays;
import java.util.stream.IntStream;

import static java.util.stream.Collectors.joining;

public class AttackCharacters {
    private final int[] charCodes;
    private final CodeToCharacterConverter converter;

    public int getOf(int index) {
        return charCodes[index];
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

    public boolean isFinalDestination() {
        return charCodes[charCodes.length - 1] == 0x36;
    }

    public AttackCharacters passInvalidChar() {
        int[] newCodes = Arrays.copyOf(charCodes, charCodes.length);
        for (int i = 0; i < newCodes.length; i++) {
            if (!converter.isInvalidCharCode(newCodes[i])) continue;

            if (i == 0) {
                newCodes[0]++;
                break;
            }
            // 2桁目以降に出現した場合は上位インクリメントして下位をゼロクリア
            for (int j = 0; j < i; j++) {
                newCodes[j] = 0;
            }
            newCodes[i]++;
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

    public static AttackCharacters Initialize(int charCount) {
        return new AttackCharacters(new int[charCount]);
    }

    public static AttackCharacters Initialize(int charCount, CodeToCharacterConverter converter) {
        int initialCode = converter.minCode();
        int[] values = IntStream.range(0, charCount)
                .map(i -> initialCode)
                .toArray();
        return new AttackCharacters(converter, values);
    }

    public AttackCharacters(int... charCodes) {
        this(new CodeToCharacterConverter(), charCodes);
    }

    public AttackCharacters(CodeToCharacterConverter converter, int... charCodes) {
        this.converter = converter;
        this.charCodes = charCodes;
    }
}
