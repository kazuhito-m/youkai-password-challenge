package com.github.kazuhitom.youkaicheckdigittry.state;

import java.util.Arrays;

import static java.util.stream.Collectors.joining;

public class AttackCharacters {
    private final int[] charCodes;
    private final CodeToCharacterConverter converter;

    public int getOf(int index) {
        return charCodes[index];
    }

    public AttackCharacters increment() {
        // 0x00-0x35の範囲でループさせる
        int[] newCodes = Arrays.copyOf(charCodes, charCodes.length);
        newCodes[0]++; // 1個目をインクリメント
        for (int i = 0; i < newCodes.length; i++) {
            // 35を超えたら次の桁へ
            if (newCodes[i] > 0x35) {
                newCodes[i] = 0;
                newCodes[i + 1]++;
            }
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
                .mapToObj(code -> String.format("%02x ", code))
                .collect(joining());
    }

    @Override
    public String toString() {
        return Arrays.stream(charCodes)
                .mapToObj(converter::convert)
                .map(c -> c.toString())
                .collect(joining());
    }

    public static AttackCharacters Initialize(int charCount) {
        return new AttackCharacters(new int[charCount]);
    }

    public static AttackCharacters Initialize(int charCount, CodeToCharacterConverter converter) {
        return new AttackCharacters(converter, new int[charCount]);
    }

    public AttackCharacters(int... charCodes) {
        this(new CodeToCharacterConverter(), charCodes);
    }

    public AttackCharacters(CodeToCharacterConverter converter, int... charCodes) {
        this.converter = converter;
        this.charCodes = charCodes;
    }
}
