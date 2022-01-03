package com.github.kazuhitom.youkai.server.presentation.api.foundpassword.response;

import java.util.List;

public class FoundPasswordsResponse {
    final List<String> passwords;
    final long fullCount;

    public FoundPasswordsResponse(List<String> passwords, long fullCount) {
        this.passwords = passwords;
        this.fullCount = fullCount;
    }
}
