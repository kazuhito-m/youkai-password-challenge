package com.github.kazuhitom.youkai.server.infrastructure.datasource.foundpassword;

import com.github.kazuhitom.youkai.server.domain.model.foundpassword.FoundPasswordRepository;
import com.github.kazuhitom.youkai.server.domain.model.foundpassword.FoundPasswordSearchCondition;
import com.github.kazuhitom.youkai.server.domain.model.foundpassword.FoundPasswords;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FoundPasswordDatasource implements FoundPasswordRepository {
    private final FoundPasswordDao dao;

    @Override
    public FoundPasswords findOf(FoundPasswordSearchCondition condition) {
        int fullCount = dao.countOf(condition);
        if (fullCount == 0) return FoundPasswords.empty();

        List<String> values = dao.selectOf(condition)
                .stream()
                .map(record -> record.password)
                .toList();
        return new FoundPasswords(values, fullCount);
    }

    public FoundPasswordDatasource(FoundPasswordDao dao) {
        this.dao = dao;
    }
}
