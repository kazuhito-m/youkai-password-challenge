package com.github.kazuhitom.youkai.server.presentation.api.foundpassword;

import com.github.kazuhitom.youkai.server.application.service.FoundPasswordService;
import com.github.kazuhitom.youkai.server.domain.model.foundpassword.FoundPasswordSearchCondition;
import com.github.kazuhitom.youkai.server.domain.model.foundpassword.FoundPasswords;
import com.github.kazuhitom.youkai.server.presentation.api.foundpassword.response.FoundPasswordsResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/foundpassword")
public class FoundPasswordController {
    private final FoundPasswordService service;

    @GetMapping
    public FoundPasswordsResponse find(
            @RequestParam("query") String query,
            @RequestParam("offset") int offset,
            @RequestParam("limit") int limit
    ) {
        FoundPasswordSearchCondition condition = new FoundPasswordSearchCondition(query, offset, limit);
        FoundPasswords passwords = service.findOf(condition);
        return FoundPasswordsResponse.of(passwords);
    }

    public FoundPasswordController(FoundPasswordService service) {
        this.service = service;
    }
}
