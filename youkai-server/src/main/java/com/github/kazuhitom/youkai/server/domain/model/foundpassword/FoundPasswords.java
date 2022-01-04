package com.github.kazuhitom.youkai.server.domain.model.foundpassword;

import java.util.List;

public class FoundPasswords {
    private final List<String> values;
    private final int fullCount;

    public static FoundPasswords empty() {
        return new FoundPasswords(List.of(), 0);
    }

    public List<String> values() {
        return values;
    }

    public int fullCount() {
        return fullCount;
    }

    public FoundPasswords(List<String> values, int fullCount) {
        this.values = values;
        this.fullCount = fullCount;
    }
}
