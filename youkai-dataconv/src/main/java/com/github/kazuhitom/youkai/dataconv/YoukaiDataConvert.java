package com.github.kazuhitom.youkai.dataconv;

import com.ibm.icu.text.Transliterator;

import java.util.Locale;
import java.util.Scanner;

public class YoukaiDataConvert {
    private static Transliterator hiraganaTrans = Transliterator.getInstance("Katakana-Latin");
    private static Transliterator katakanaTrans = Transliterator.getInstance("Hiragana-Latin");

    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        while (scan.hasNext()) {
            var line = scan.nextLine();
            var middle = convertLatin(line);
            var converted = convertSpecialChar(middle);
            System.out.println(converted);
        }
    }

    private static String convertLatin(String text) {
        var middle = hiraganaTrans.transliterate(text);
        var result = katakanaTrans.transliterate(middle);
        return result.toUpperCase(Locale.ROOT);
    }

    private static String convertSpecialChar(String text) {
        return text
                .replaceAll("̄", "")
                .replaceAll("'", "")
                .replaceAll("\\/", "")
                .replaceAll("~", "-")
                .replaceAll("̄", "")
                .replaceAll("，", "")
                .replaceAll("゛", "")
                .replaceAll("Ā", "A")
                .replaceAll("Ē", "E")
                .replaceAll("Ī", "I")
                .replaceAll("Ō", "O")
                .replaceAll("Ū", "U");
    }

}
