package com.github.kazuhitom.youkai.server.presentation.api;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/test")
@CrossOrigin("http://localhost:8081")
public class TestController {
    @GetMapping
    public String createLimitPrice(@RequestParam("value") String value) {
        return "これがかえれば、API読んでるということ。:" + value;
    }
}
