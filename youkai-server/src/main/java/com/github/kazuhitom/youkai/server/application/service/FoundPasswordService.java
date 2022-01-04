package com.github.kazuhitom.youkai.server.application.service;

import com.github.kazuhitom.youkai.server.domain.model.foundpassword.FoundPasswordRepository;
import com.github.kazuhitom.youkai.server.domain.model.foundpassword.FoundPasswordSearchCondition;
import com.github.kazuhitom.youkai.server.domain.model.foundpassword.FoundPasswords;
import org.springframework.stereotype.Service;

@Service
public class FoundPasswordService {
    private final FoundPasswordRepository repository;

    public FoundPasswords findOf(FoundPasswordSearchCondition condition) {
        return repository.findOf(condition);
    }

    public FoundPasswordService(FoundPasswordRepository repository) {
        this.repository = repository;
    }
}
