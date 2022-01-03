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
        List<FoundPasswordView> records = dao.selectOf(condition);
        if (records.isEmpty()) return FoundPasswords.empty();

        List<String> values = records.stream()
                .map(record -> record.password)
                .toList();
        return new FoundPasswords(values, records.get(0).full_count);
    }

    public FoundPasswordDatasource(FoundPasswordDao dao) {
        this.dao = dao;
    }
}
