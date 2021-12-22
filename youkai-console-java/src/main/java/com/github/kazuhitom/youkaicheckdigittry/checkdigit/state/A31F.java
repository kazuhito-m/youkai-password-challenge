package com.github.kazuhitom.youkaicheckdigittry.checkdigit.state;

import java.util.Objects;
import java.util.stream.Stream;

import static java.util.stream.Collectors.joining;

public class A31F {
    public int a31F4 = 0;
    public int a31F5 = 0;
    public int a31F7 = 0;
    public int a31F8 = 0;
    public int a31F9 = 0;
    public int a31FA = 1;
    public int a31FB = 0;

    private final int charLength;   // 文字列長さ

    public int charLength() {
        return charLength;
    }

    public int rotateRightOneBit31F4(int flag) {
        final int beforFirstBit = a31F4 & 0x01;
        a31F4 = (a31F4 >> 1) | (flag << 7); // C0000000
        return beforFirstBit;
    }

    public int rotateRightOneBit31F5(int flag) {
        final int beforFirstBit = a31F5 & 0x01;
        a31F5 = (a31F5 >> 1) | (flag << 7); // C0000000
        return beforFirstBit;
    }

    public static A31F createFromHexStrings8(String... hexStrings8) {
        A31F o = new A31F(hexToInt(hexStrings8[2]));
        o.a31F4 = hexToInt(hexStrings8[0]);
        o.a31F5 = hexToInt(hexStrings8[1]);
        o.a31F7 = hexToInt(hexStrings8[3]);
        o.a31F8 = hexToInt(hexStrings8[4]);
        o.a31F9 = hexToInt(hexStrings8[5]);
        o.a31FA = hexToInt(hexStrings8[6]);
        o.a31FB = hexToInt(hexStrings8[7]);
        return o;
    }

    public static A31F createFromHexText(String hexText) {
        String[] hexString8 = hexText.split(" ");
        return createFromHexStrings8(hexString8);
    }

    private static int hexToInt(String hex) {
        return Integer.parseInt(hex, 16);
    }

    public static A31F prototypeOf(int charLength) {
        return new A31F(charLength);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        A31F t = (A31F) o;
        return a31F4 == t.a31F4
                && a31F5 == t.a31F5
                && charLength == t.charLength
                && a31F7 == t.a31F7
                && a31F8 == t.a31F8
                && a31F9 == t.a31F9
                && a31FA == t.a31FA
                && a31FB == t.a31FB;
    }

    @Override
    public int hashCode() {
        return Objects.hash(a31F4, a31F5, a31F7, a31F8, a31F9, a31FA, a31FB);
    }

    @Override
    public String toString() {
        return Stream.of(a31F4, a31F5, charLength, a31F7, a31F8, a31F9, a31FA, a31FB)
                .map(code -> String.format("%02x ", code))
                .collect(joining())
                .toUpperCase()
                .trim();
    }

    private A31F(int charLength) {
        this.charLength = charLength;
    }
}
