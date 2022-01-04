package com.github.kazuhitom.youkai.server.presentation.exception.handler;

import com.github.kazuhitom.youkai.server.domain.model.exception.InvalidParameterException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class CustomHandlerExceptionResolver implements HandlerExceptionResolver {
    private static final Logger LOGGER = LoggerFactory.getLogger(CustomHandlerExceptionResolver.class);

    @Override
    public ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response, Object handler, Exception e) {
        if (e instanceof InvalidParameterException) {
            InvalidParameterException ipe = (InvalidParameterException) e;
            try {
                LOGGER.info("リクエストパラメータ不正。{}", ipe.getMessage());
                response.setContentType("text/plain");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().print(ipe.getMessage());
                response.setStatus(HttpStatus.BAD_REQUEST.value());
                return new ModelAndView();
            } catch (IOException ex) {
                LOGGER.error("responseにError情報をセット出来なかった。", e);
            }
        }
        return null;
    }
}
