package com.github.kazuhitom.youkai.core.domain.model.checkdigit;

import java.util.Objects;
import java.util.stream.Stream;

import static java.util.stream.Collectors.joining;

public class A31F {
    private int a31F4 = 0;
    private int a31F5 = 0;
    private int a31F7 = 0;
    private int a31F8 = 0;
    private int a31F9 = 0;
    private int a31FA = 1;
    private int a31FB = 0;

    private final int charLength;   // 文字列長さ

    public int charLength() {
        return charLength;
    }

    // calculate method

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

    public int rotateRightOneBit31FA(int flag) {
        final int beforFirstBit = a31FA & 0x01;
        a31FA = (a31FA >> 1) | (flag << 7); // $31F8のCがここで入る
        return beforFirstBit;
    }

    public void calc31F4And31F5(int flag) {
        final int work8bit = flag ^ 0xFF;
        a31F4 = (work8bit & 0x84) ^ a31F4;
        a31F5 = (work8bit & 0x08) ^ a31F5;
    }

    public int calc31F4And31F5And31F9(int targetCharCode) {
        final int C5;
        if (a31F4 >= 0xE5) {
            C5 = 1;
        } else C5 = 0; //C5の値でキャリーを生成
        int A06 = targetCharCode + a31F7 + C5;

        final int C6;
        if (A06 > 0xFF) { // ADCのキャリー処理
            A06 = A06 & 0xFF;
            C6 = 1;
        } else C6 = 0;
        a31F7 = A06;
        int A07 = a31F8 + a31F5 + C6;

        final int C7;
        if (A07 > 0xFF) { // ADCのキャリー処理
            A07 = A07 & 0xFF;
            C7 = 1;
        } else C7 = 0;
        a31F8 = A07;

        a31F9 = targetCharCode ^ a31F9;

        return C7;
    }

    public int calc31FA(int flag, int targetCharCode) {
        int A01 = targetCharCode + a31FA + flag;

        final int C9;
        if (A01 > 0xFF) { // ADCのキャリー処理
            A01 = A01 & 0xFF;
            C9 = 1;
        } else C9 = 0;

        a31FA = A01;

        return C9;
    }

    // D880 とラベルが振られてた処理。
    public void calc31FB(final int flag, final int targetCharCode) {
        // 31FBを生成
        // Aを左ローテート
        int A02 = targetCharCode << 1;
        int C9 = flag;
        if (A02 > 0xFF) { // ADCのキャリー処理
            A02 = A02 & 0xFF;
            C9 = 1;
        }
        final int stackA06 = A02; // スタックに値を保存

        int A03 = a31FB + C9;

        final int C10;
        if (A03 > 0xFF) { // ADCのキャリー処理
            A03 = A03 & 0xFF;
            C10 = 1;
        } else C10 = 0;
        a31FB = A03;

        // 演算結果がゼロの時;
        if (stackA06 == 0) return;

        calc31FB(C10, stackA06); // ローテ終わるまでループ
    }

    // factory methods

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
