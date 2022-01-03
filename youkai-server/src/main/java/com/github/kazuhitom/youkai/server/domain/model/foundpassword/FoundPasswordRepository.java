package com.github.kazuhitom.youkai.server.domain.model.foundpassword;

import java.util.List;

public interface FoundPasswordRepository {
    FoundPasswords findOf(FoundPasswordSearchCondition condition);
}
