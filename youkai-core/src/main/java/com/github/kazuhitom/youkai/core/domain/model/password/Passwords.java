package com.github.kazuhitom.youkai.core.domain.model.password;

import com.github.kazuhitom.youkai.core.domain.model.password.converter.CodeToCharacterConverter;

import java.util.List;
import java.util.stream.IntStream;

import static java.util.stream.Collectors.toList;

public class Passwords {
    public static List<String> generateRandomPasswords(int minCharCount, int maxCharCount, int repetitions) {
        var randomPasswords = IntStream.range(0, repetitions)
                .flatMap(i -> IntStream.rangeClosed(minCharCount, maxCharCount)) // データの文字数のバリエーション
                .mapToObj(Passwords::generateRandom54CharPassword)
                .collect(toList());
        return randomPasswords;
    }

    public static String generateRandom54CharPassword(int length) {
        int[] charCodes = IntStream.range(0, length)
                .map(one -> generateRandomValidCharCode())
                .toArray();
        return new AttackCharacters(charCodes).toString();
    }

    private static int generateRandomValidCharCode() {
        int code;
        while (converterForTest.isInvalidCharCode(code = generateRandom54CharCode())) ;
        return code;
    }

    private static final CodeToCharacterConverter converterForTest = new CodeToCharacterConverter();

    private static int generateRandom54CharCode() {
        return (int) Math.floor(Math.random() * 54);
    }
}
