package cn.faury.fwmf.gateway.config;

import com.google.common.base.Predicate;
import org.springframework.context.annotation.Bean;
import springfox.documentation.RequestHandler;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

/**
 * Swagger Api界面配置类
 */
//@Configuration
//@EnableSwagger2
public abstract class FwmfDefaultSwaggerConfig {

    @Bean
    public Docket api(){
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(getApiInfo())
                .select()  // 选择那些路径和api会生成document
                .apis(basePackage())// 对特定包进行监控
                .paths(PathSelectors.any())// 对所有路径进行监控
                .build();
    }
    protected abstract Predicate<RequestHandler> basePackage();
    protected ApiInfo getApiInfo() {
        return new ApiInfoBuilder()
                .title("微服务接口")
                .description("手机端借口请求微服务接口定义说明")
                .version("1.0")
                .build();
    }
}
