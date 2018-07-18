package cn.faury.fwmf.master;

import cn.faury.fdk.mybatis.AutoScannedMapper;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.mongo.MongoDataAutoConfiguration;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

/**
 * SpringBoot启动类
 */
@SpringBootApplication
@EnableAutoConfiguration(exclude = {MongoAutoConfiguration.class, MongoDataAutoConfiguration.class})
@ComponentScan(basePackages = {"cn.faury", "cn.faury.fwmf.master"})
@MapperScan(basePackages = {"cn.faury"}, annotationClass = AutoScannedMapper.class)
public class FwmfMasterApplication {

    public static void main(String[] args) {
        SpringApplication.run(FwmfMasterApplication.class, args);
    }
}
