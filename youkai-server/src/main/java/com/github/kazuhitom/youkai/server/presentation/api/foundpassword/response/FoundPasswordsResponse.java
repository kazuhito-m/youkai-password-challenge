package com.github.kazuhitom.youkai.server.presentation.api.foundpassword.response;

import com.github.kazuhitom.youkai.server.domain.model.foundpassword.FoundPasswords;

import java.util.List;

public class FoundPasswordsResponse {
    final List<String> passwords;
    final long fullCount;

    public static FoundPasswordsResponse of(FoundPasswords passwords) {
        return new FoundPasswordsResponse(passwords.values(), passwords.fullCount());
    }

    FoundPasswordsResponse(List<String> passwords, int fullCount) {
        this.passwords = passwords;
        this.fullCount = fullCount;
    }
}
