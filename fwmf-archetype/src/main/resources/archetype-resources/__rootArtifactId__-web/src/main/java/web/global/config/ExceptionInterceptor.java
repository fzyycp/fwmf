#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
/*
 * Copyright (c)
 */

package ${package}.web.global.config;

import cn.faury.fdk.common.entry.RestResultCode;
import cn.faury.fdk.common.exception.TipsException;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.Interceptor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 * Struts异常拦截器
 */
public class ExceptionInterceptor implements Interceptor {

	/**
	 * 序列化
	 */
	private static final long serialVersionUID = -1953588136197969135L;

	/**
	 * 日志记录器
	 */
	private Logger log = LoggerFactory.getLogger(ExceptionInterceptor.class);

	/* (non-Javadoc)
	 * @see com.opensymphony.xwork2.interceptor.Interceptor${symbol_pound}destroy()
	 */
	@Override
	public void destroy() {
		log.error("异常拦截器已销毁！");
	}

	/* (non-Javadoc)
	 * @see com.opensymphony.xwork2.interceptor.Interceptor${symbol_pound}init()
	 */
	@Override
	public void init() {
		log.error("异常拦截器已启动！");
	}

	/* (non-Javadoc)
	 * @see com.opensymphony.xwork2.interceptor.Interceptor${symbol_pound}intercept(com.opensymphony.xwork2.ActionInvocation)
	 */
	@Override
	public String intercept(ActionInvocation invocation) throws Exception {
		try {
			return invocation.invoke();
		} catch (TipsException e) {
            log.debug(e.getMessage());
			if(log.isTraceEnabled()){
				log.trace(e.getMessage(), e);
			}
			throw e;
		} catch (Exception e) {
			log.error("未捕获的异常：" + e.getMessage(), e);
			throw new TipsException(RestResultCode.CODE500.getCode(),"未捕获的异常",e);
		}
	}

}
