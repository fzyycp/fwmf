package cn.faury.fwmf.gateway.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;

@Configuration
public class UrlMatchConfig extends WebMvcConfigurationSupport {

    @Override
    protected void configurePathMatch(PathMatchConfigurer configurer) {
        super.configurePathMatch(configurer);
        //setUseSuffixPatternMatch 后缀模式匹配
        configurer.setUseSuffixPatternMatch(Boolean.TRUE);
        //setUseTrailingSlashMatch 自动后缀路径模式匹配
        configurer.setUseTrailingSlashMatch(Boolean.TRUE);
    }
}
