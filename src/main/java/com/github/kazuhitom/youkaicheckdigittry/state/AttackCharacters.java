package com.github.kazuhitom.youkaicheckdigittry.state;

import java.util.Arrays;

import static java.util.stream.Collectors.joining;

public class AttackCharacters {
    private final int[] charCodes;

    private final CodeToCharacterConverter converter = new CodeToCharacterConverter();

    public int getOf(int index) {
        return charCodes[index];
    }

    public void increment() {
        // 0x00-0x35の範囲でループさせる
        charCodes[0]++; // 1個目をインクリメント
        for (int i = 0; i < charCodes.length; i++) {
            // 35を超えたら次の桁へ
            if (charCodes[i] > 0x35) {
                charCodes[i] = 0;
                charCodes[i + 1]++;
            }
        }
    }

    public boolean isFinalDestination() {
        return charCodes[charCodes.length - 1] == 0x36;
    }

    public void passInvalidChar() {
        for (int i = 0; i < charCodes.length; i++) {
            if (converter.isInvalidCharCode(charCodes[i])) {
                if (i == 0) {
                    charCodes[0]++;
                    return;
                }
                // 2桁目以降に出現した場合は上位インクリメントして下位をゼロクリア
                for (int j = 0; j < i; j++) {
                    charCodes[j] = 0;
                }
                charCodes[i]++;
            }
        }
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

    public AttackCharacters(int[] charCodes) {
        this.charCodes = charCodes;
    }
}
