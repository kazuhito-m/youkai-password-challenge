package com.github.kazuhitom.youkai.server.presentation.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController {
    @GetMapping
    public String createLimitPrice() {
        return "これがかえれば、API読んでるということ。";
    }
}
