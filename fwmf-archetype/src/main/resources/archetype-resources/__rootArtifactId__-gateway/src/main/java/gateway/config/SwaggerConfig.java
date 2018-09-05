#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
package ${package}.gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * Swagger Api界面配置类
 */
@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Bean
    public Docket api(){
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(getApiInfo())
                .select()  // 选择那些路径和api会生成document
                .apis(RequestHandlerSelectors.basePackage("${package}"))// 对特定包进行监控
                .paths(PathSelectors.any())// 对所有路径进行监控
                .build();
    }
    private ApiInfo getApiInfo() {
        return new ApiInfoBuilder()
                .title("${parentArtifactId}-geteway微服务网关")
                .description("后台Rest请求微服务接口定义说明")
                .version("${version}")
                .build();
    }
}
