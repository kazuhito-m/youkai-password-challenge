package com.github.kazuhitom.youkai.console.checkdigit.converter;

import java.util.HashMap;
import java.util.Map;

public class TextToCodeConverter {
    private final static Map<Character, Integer> ytoa = new HashMap<>();

    static {
        ytoa.put('A', 0x00);
        ytoa.put('B', 0x08);
        ytoa.put('C', 0x10);
        ytoa.put('D', 0x18);
        ytoa.put('E', 0x20);
        ytoa.put('F', 0x28);
        ytoa.put('G', 0x30);
        ytoa.put('H', 0x01);
        ytoa.put('I', 0x09);
        ytoa.put('J', 0x11);
        ytoa.put('K', 0x19);
        ytoa.put('L', 0x21);
        ytoa.put('M', 0x29);
        ytoa.put('N', 0x31);
        ytoa.put('O', 0x02);
        ytoa.put('P', 0x0A);
        ytoa.put('Q', 0x12);
        ytoa.put('R', 0x1A);
        ytoa.put('S', 0x22);
        ytoa.put('T', 0x2A);
        ytoa.put('U', 0x32);
        ytoa.put('V', 0x03);
        ytoa.put('W', 0x0B);
        ytoa.put('X', 0x13);
        ytoa.put('Y', 0x1B);
        ytoa.put('Z', 0x23);
        ytoa.put('-', 0x2B);
        ytoa.put('.', 0x33);
        ytoa.put('1', 0x04);
        ytoa.put('2', 0x0C);
        ytoa.put('3', 0x14);
        ytoa.put('4', 0x1C);
        ytoa.put('5', 0x24);
        ytoa.put('6', 0x05);
        ytoa.put('7', 0x0D);
        ytoa.put('8', 0x15);
        ytoa.put('9', 0x1D);
        ytoa.put('0', 0x25);
        ytoa.put('!', 0x2D);
        ytoa.put('n', 0x2C);
        ytoa.put('m', 0x34);
        ytoa.put('c', 0x35);
        ytoa.put('ﾅ', 0x2C);
        ytoa.put('ﾑ', 0x34);
        ytoa.put('ｺ', 0x35); // 念のためﾅﾑｺも処理
    }

    public char[] convert(String text) {
        char[] result = new char[text.length()];
        int i = 0;
        for (char oneChar : text.toCharArray())
            result[i++] = (char) ytoa.get(oneChar).intValue();
        return result;
    }
}
