package com.github.kazuhitom.youkai.server.domain.model.foundpassword;

public class FoundPasswordSearchCondition {
    private final String query;
    private final int offset;
    private final int limit;

    public String query() {
        return query;
    }

    public int offset() {
        return offset;
    }

    public int limit() {
        return limit;
    }

    public FoundPasswordSearchCondition(String query, int offset, int limit) {
        this.query = query;
        this.offset = offset;
        this.limit = limit;
    }
}
