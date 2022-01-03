package com.github.kazuhitom.youkai.server.presentation;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class IndexController implements ErrorController {
    @RequestMapping("/error")
    public String error() {
        return "Error";
    }
}