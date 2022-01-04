package com.github.kazuhitom.youkai.server.presentation.api.foundpassword.download;

import com.github.kazuhitom.youkai.server.domain.model.exception.InvalidParameterException;
import com.github.kazuhitom.youkai.server.domain.model.foundpassword.FoundPasswordSearchCondition;
import com.github.kazuhitom.youkai.server.domain.model.foundpassword.FoundPasswords;
import org.springframework.http.MediaType;

import javax.servlet.http.HttpServletResponse;
import java.io.BufferedWriter;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class FoundPasswordDownloadFileMaker {
    private static final Charset DL_CHARSET = StandardCharsets.UTF_8;

    public void writeTextBody(FoundPasswords passwords, HttpServletResponse response, String fileName) {
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

    public String makeDownloadFileNameOf(FoundPasswordSearchCondition condition) {
        DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        String dateTimeText = format.format(LocalDateTime.now());
        return String.format("passwords_%s_%s.txt", dateTimeText, condition.query());
    }
}
