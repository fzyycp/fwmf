package cn.faury.fwmf.gateway;

import cn.faury.fdk.mybatis.AutoScannedMapper;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.mongo.MongoDataAutoConfiguration;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.RequestMapping;

@SpringBootApplication
@EnableAutoConfiguration(exclude = {MongoAutoConfiguration.class, MongoDataAutoConfiguration.class})
@ComponentScan(basePackages = {"cn.faury", "cn.faury.fwmf"})
@MapperScan(basePackages = {"cn.faury"}, annotationClass = AutoScannedMapper.class)
public class FwmfGatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(FwmfGatewayApplication.class, args);
    }
}

