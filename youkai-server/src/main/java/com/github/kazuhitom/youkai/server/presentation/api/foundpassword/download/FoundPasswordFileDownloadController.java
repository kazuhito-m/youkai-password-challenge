package com.github.kazuhitom.youkai.server.presentation.api.foundpassword.download;

import com.github.kazuhitom.youkai.core.domain.model.password.Password;
import com.github.kazuhitom.youkai.core.domain.model.password.converter.CodeToCharacterConverter;
import com.github.kazuhitom.youkai.server.application.service.FoundPasswordService;
import com.github.kazuhitom.youkai.server.domain.model.exception.InvalidParameterException;
import com.github.kazuhitom.youkai.server.domain.model.foundpassword.FoundPasswordSearchCondition;
import com.github.kazuhitom.youkai.server.domain.model.foundpassword.FoundPasswords;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.BufferedWriter;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.Optional;

@RestController
@RequestMapping("/api/foundpassword/download")
public class FoundPasswordFileDownloadController {
    private final FoundPasswordService service;

    private final CodeToCharacterConverter converter = new CodeToCharacterConverter();

    private static int DL_LIMIT_LINE_COUNT = 50000;
    private static final Charset DL_CHARSET = StandardCharsets.UTF_8;

    @GetMapping
    public void downloadFile(
            @RequestParam("query") String query,
            @RequestParam("reverse") Optional<Boolean> reverse,
            @RequestParam("c") String c,
            HttpServletResponse response
    ) {
        String error = validation(query, c);
        if (error.length() > 0) throw new InvalidParameterException(error);

        FoundPasswordSearchCondition condition = FoundPasswordSearchCondition.of(query, 0, 1, reverse);
        FoundPasswords hitTestPasswords = service.findOf(condition);

        if (hitTestPasswords.fullCount() > DL_LIMIT_LINE_COUNT)
            throw new InvalidParameterException("データが多過ぎます。");

        FoundPasswordSearchCondition downloadCondition = condition.withLimitOf(DL_LIMIT_LINE_COUNT);
        FoundPasswords passwords = service.findOf(downloadCondition);

        writeTextBody(passwords, response, "TODOファイル名.txt");
    }

    private String validation(String query, String typicalPassword) {
        String trimmed = query.trim();
        if (trimmed.length() < 2) return "query文字列が短すぎます。";
        if (trimmed.length() > Password.MAX_CHARS_LENGTH) return "query文字列が長すぎます。";
        if (converter.isInvalidPassword(query)) return "query文字列にパスワードに使えない文字が使われています。";

        if (!service.validPassword14(typicalPassword)) return "チェック値が不正。";
        return "";
    }

    private void writeTextBody(FoundPasswords passwords, HttpServletResponse response, String fileName) {
        response.setHeader("Content-Disposition", String.format("attachment; filename=%s", fileName));
        response.setHeader("Content-Type", String.format("%s; charset=%s", MediaType.TEXT_PLAIN_VALUE, DL_CHARSET));
        response.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
        try (BufferedWriter writer = new BufferedWriter(response.getWriter())) {
            for (String password : passwords.values()) {
                writer.write(password);
                writer.newLine();
            }
            writer.flush();
        } catch (IOException e) {
            throw new InvalidParameterException("ファイル作成失敗。");
        }
    }

    public FoundPasswordFileDownloadController(FoundPasswordService service) {
        this.service = service;
    }
}
