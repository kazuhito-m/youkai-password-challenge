package com.github.kazuhitom.youkai.server.presentation.api.foundpassword;

import com.github.kazuhitom.youkai.server.application.service.FoundPasswordService;
import com.github.kazuhitom.youkai.server.domain.model.exception.InvalidParameterException;
import com.github.kazuhitom.youkai.server.domain.model.foundpassword.FoundPasswordSearchCondition;
import com.github.kazuhitom.youkai.server.domain.model.foundpassword.FoundPasswords;
import com.github.kazuhitom.youkai.server.presentation.api.foundpassword.response.FoundPasswordsResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/foundpassword")
public class FoundPasswordController {
    private final FoundPasswordService service;

    @GetMapping
    public FoundPasswordsResponse find(
            @RequestParam("query") String query,
            @RequestParam("offset") int offset,
            @RequestParam("limit") int limit,
            @RequestParam("reverse") Optional<Boolean> reverse
    ) {
        validation(query, limit);

        FoundPasswordSearchCondition condition = FoundPasswordSearchCondition.of(query, offset, limit, reverse);
        FoundPasswords passwords = service.findOf(condition);
        return FoundPasswordsResponse.of(passwords);
    }

    private void validation(String query, int limit) {
        if (limit > 1000) throw new InvalidParameterException("offsetの設定値が大きすぎます。");
        String trimmed = query.trim();
        if (trimmed.length() < 2) throw new InvalidParameterException("query文字列が短すぎます。");
        if (trimmed.length() > 14) throw new InvalidParameterException("query文字列が長すぎます。");
    }

    public FoundPasswordController(FoundPasswordService service) {
        this.service = service;
    }
}
