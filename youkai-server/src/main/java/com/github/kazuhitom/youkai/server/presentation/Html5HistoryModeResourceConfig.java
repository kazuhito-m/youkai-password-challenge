package com.github.kazuhitom.youkai.server.presentation;

import org.springframework.boot.autoconfigure.web.WebProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

import java.io.IOException;

/**
 * コンテキストパスをSPA(Nuxt.js)に向けるConfig。
 * <p>
 * WebAPIのパス以外は、取得できなかった場合index.htmlを返す。<br>
 * <p>
 * その他、以下のことを行う。<br>
 * <ul>
 *     <li>静的リソース配置先のパスを指定する</li>
 *     <li>キャッシュコントロール:開発時はfalse、本番はtrueが望ましい。trueにしておくとメモリ上にキャッシュされるためI/Oが軽減される</li>
 * </ul>
 */
@Configuration
public class Html5HistoryModeResourceConfig implements WebMvcConfigurer {
    private final WebProperties properties;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        WebProperties.Resources resources = properties.getResources();
        registry.addResourceHandler("/**")
                .addResourceLocations(resources.getStaticLocations())
                .resourceChain(resources.getChain().isCache())
                .addResolver(new SpaPageResourceResolver());
    }

    public static class SpaPageResourceResolver extends PathResourceResolver {
        @Override
        protected Resource getResource(String resourcePath, Resource location) throws IOException {
            Resource resource = super.getResource(resourcePath, location);
            return resource != null ? resource : super.getResource("index.html", location);
        }
    }

    public Html5HistoryModeResourceConfig(WebProperties properties) {
        this.properties = properties;
    }
}