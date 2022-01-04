package com.github.kazuhitom.youkai.server.presentation.api;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ErrorController implements org.springframework.boot.web.servlet.error.ErrorController {
    @RequestMapping("/error")
    public String error() {
        return "Error";
    }
}