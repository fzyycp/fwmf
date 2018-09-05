#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
/*
 * Copyright (c)
 */

package ${package}.web.global.listener;

import cn.faury.fdk.common.utils.PropertiesUtil;
import ${package}.web.global.common.GlobalConst;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.util.Set;

/**
 * 系统加载初始化
 */
@Component
public class ContextRefreshedListener implements ApplicationListener<ContextRefreshedEvent> {

	/**
	 * 日志器
	 */
	private static final Logger log = LoggerFactory.getLogger(ContextRefreshedListener.class);

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.springframework.context.ApplicationListener${symbol_pound}onApplicationEvent(org
	 * .springframework.context.ApplicationEvent)
	 */
	@Override
	public void onApplicationEvent(ContextRefreshedEvent event) {
		log.error("=====property配置=====init");
		try {
			ClassPathResource resource = new ClassPathResource("application.properties");
			PropertiesUtil.init(resource.getInputStream());

			Set<String> keys =PropertiesUtil.instance().getPropertyKeySet();
			for (String key : keys) {
				log.error(String.format("[%s=%s]", key, PropertiesUtil.instance().getProperty(key)));
			}
			log.error("=====property配置=====success");
		} catch (Exception e) {
			e.printStackTrace();
			log.error("=====property配置=====Exception", e);
		} finally {
			log.error("=====property配置=====finish");
		}

		log.error("=====全局常量加载=====init");
		try {
			// 需要先加载配置文件，否则，全局常量加载无效
			GlobalConst.init();
			log.error(">> 全局常量加载=====success");
		} catch (Exception e) {
			e.printStackTrace();
			log.error(">> 全局常量加载=====Exception", e);
		} finally {
			log.error("=====全局常量加载=====finish");
		}

	}

}
