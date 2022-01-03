package com.github.kazuhitom.youkai.server.domain.model.foundpassword;

import java.util.List;

public interface FoundPasswordRepository {
    List<FoundPassword> findOf(String part);
}
