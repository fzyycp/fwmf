#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
package ${package}.gateway.config;

import cn.faury.fdk.mybatis.autoconfigure.FdkMybatisAutoConfiguration;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.context.annotation.Configuration;

@Configuration
@AutoConfigureAfter(FdkMybatisAutoConfiguration.class)
public class ${projectCodeFirstUp}ModuleAutoConfiguration {
    /**
     * 样例代码
     */
//    @Bean
//    @ConditionalOnClass({FwmfSystemInfoService.class, FwmfSystemInfoServiceImpl.class})
//    public FwmfSystemInfoService fwmfSystemInfoService(CommonDao commonDao) {
//        return new FwmfSystemInfoServiceImpl(commonDao);
//    }
}
