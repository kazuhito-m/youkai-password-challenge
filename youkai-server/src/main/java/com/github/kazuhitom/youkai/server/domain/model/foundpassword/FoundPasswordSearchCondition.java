package com.github.kazuhitom.youkai.server.domain.model.foundpassword;

import java.util.Optional;

public class FoundPasswordSearchCondition {
    private final String query;
    private final int offset;
    private final int limit;
    private final boolean reverseOrder;

    public static FoundPasswordSearchCondition of(String query, int offset, int limit, Optional<Boolean> reverse) {
        return new FoundPasswordSearchCondition(
                query,
                offset,
                limit,
                reverse.orElse(Boolean.FALSE).booleanValue()
        );
    }

    public String query() {
        return query;
    }

    public int offset() {
        return offset;
    }

    public int limit() {
        return limit;
    }

    public boolean reverseOrder() {
        return reverseOrder;
    }

    public FoundPasswordSearchCondition(String query, int offset, int limit, boolean reverseOrder) {
        this.query = query;
        this.offset = offset;
        this.limit = limit;
        this.reverseOrder = reverseOrder;
    }
}
