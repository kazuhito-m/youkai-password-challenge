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
    public int a31FA = 0;
    public int a31FB = 0;

    public int charLength = 1;   // 文字列長さ

    public static A31F createFromHexStrings8(String... hexStrings8) {
        A31F o = new A31F();
        o.a31F4 = hexToInt(hexStrings8[0]);
        o.a31F5 = hexToInt(hexStrings8[1]);
        o.charLength = hexToInt(hexStrings8[2]);
        o.a31F7 = hexToInt(hexStrings8[3]);
        o.a31F8 = hexToInt(hexStrings8[4]);
        o.a31F9 = hexToInt(hexStrings8[5]);
        o.a31FA = hexToInt(hexStrings8[6]);
        o.a31FB = hexToInt(hexStrings8[7]);
        return o;
    }

    private static int hexToInt(String hex) {
        return Integer.parseInt(hex, 16);
    }

    public static A31F prototypeOf(int charLength) {
        A31F p = new A31F();
        p.a31FA = 1;
        p.charLength = charLength;
        return p;
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
                .trim();
    }
}
