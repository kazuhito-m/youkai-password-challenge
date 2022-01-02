package com.github.kazuhitom.youkai.server.presentation.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController {
    //    @CrossOrigin(origins = "http://localhost:8080")
    @GetMapping
    public String createLimitPrice(@RequestParam("value") String value) {
        return "これがかえれば、API読んでるということ。:" + value;
    }
}
