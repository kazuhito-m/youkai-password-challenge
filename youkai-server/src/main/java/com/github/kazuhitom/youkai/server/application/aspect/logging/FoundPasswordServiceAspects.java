package com.github.kazuhitom.youkai.server.application.aspect.logging;

import com.github.kazuhitom.youkai.server.domain.model.foundpassword.FoundPasswordSearchCondition;
import com.github.kazuhitom.youkai.server.domain.model.foundpassword.FoundPasswords;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class FoundPasswordServiceAspects {
    private static final Logger LOGGER = LoggerFactory.getLogger(FoundPasswordServiceAspects.class);

    @AfterReturning(
            pointcut = "execution(* com.github.kazuhitom.youkai.server.application.service.FoundPasswordService.findOf(..))",
            returning = "returnValue"
    )
    public void afterReturningFoundPasswordFind(JoinPoint joinPoint, Object returnValue) {
        FoundPasswordSearchCondition condition = (FoundPasswordSearchCondition) joinPoint.getArgs()[0];
        FoundPasswords passwords = (FoundPasswords) returnValue;

        if (condition.query().trim().equals("") || condition.offset() > 0) return;

        String log = "query:'{}', count:{}";
        LOGGER.info(log, condition.query(), String.format("%,d", passwords.fullCount()));
    }
}
