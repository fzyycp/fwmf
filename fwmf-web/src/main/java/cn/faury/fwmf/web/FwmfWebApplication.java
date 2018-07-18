package cn.faury.fwmf.web;

import cn.faury.fdk.mybatis.AutoScannedMapper;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.mongo.MongoDataAutoConfiguration;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EnableAutoConfiguration(exclude = {MongoAutoConfiguration.class, MongoDataAutoConfiguration.class})
@ComponentScan(basePackages = {"cn.faury", "cn.faury.fwmf.web"})
@MapperScan(basePackages = {"cn.faury"}, annotationClass = AutoScannedMapper.class)
public class FwmfWebApplication {

    public static void main(String[] args) {
        SpringApplication.run(FwmfWebApplication.class, args);
    }
}

