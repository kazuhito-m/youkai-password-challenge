package com.github.kazuhitom.youkai.server.presentation.api.foundpassword;

import com.github.kazuhitom.youkai.server.presentation.api.foundpassword.response.FoundPasswordsResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/foundpassword")
public class FoundPasswordController {
    @GetMapping
    public FoundPasswordsResponse find(@RequestParam("query") String query) {
        return new FoundPasswordsResponse(List.of("aaaa", "bbbb"), 2);
    }
}
