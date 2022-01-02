package com.github.kazuhitom.youkai.server;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;
import java.util.stream.Stream;

@Configuration
public class CorsConfig {
    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(allowOriginsList());
        config.setAllowCredentials(true);
        config.setAllowedMethods(List.of("GET", "POST"));
        config.addAllowedHeader("*");
        config.addExposedHeader("Set-Cookie");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", config);

        return new CorsFilter(source);
    }

    @Value("${management.endpoints.web.cors.allowed-origins}")
    private String allowOrigins;

    private List<String> allowOriginsList() {
        return Stream.of(allowOrigins.split(","))
                .map(String::trim)
                .toList();
    }
}

