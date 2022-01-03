package com.github.kazuhitom.youkai.server.infrastructure.datasource.foundpassword;

import com.github.kazuhitom.youkai.server.domain.model.foundpassword.FoundPassword;
import com.github.kazuhitom.youkai.server.domain.model.foundpassword.FoundPasswordRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FoundPasswordDatasource implements FoundPasswordRepository {
    private final FoundPasswordDao dao;

    @Override
    public List<FoundPassword> findOf(String part) {
        return dao.selectOf(part)
                .stream()
                .map(FoundPasswordView::toDomain)
                .toList();
    }

    public FoundPasswordDatasource(FoundPasswordDao dao) {
        this.dao = dao;
    }
}
