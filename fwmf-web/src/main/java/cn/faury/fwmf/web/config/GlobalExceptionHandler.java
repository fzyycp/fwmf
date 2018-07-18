package cn.faury.fwmf.web.config;

import cn.faury.fdk.common.entry.RestResultCode;
import cn.faury.fdk.common.entry.RestResultEntry;
import cn.faury.fdk.common.exception.TipsException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

/**
 * 全局异常
 */
@ControllerAdvice
public class GlobalExceptionHandler {

    // 日志记录器
    private Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(Exception.class)
    @ResponseBody
    public RestResultEntry defultExcepitonHandler(HttpServletRequest request, Exception e) {
        RestResultEntry result;
        if (e instanceof TipsException) {
            logger.debug("发生已知异常：" + e.toString());
            result = RestResultEntry.createErrorResult((TipsException) e);
        } else {
            logger.error("发生未知异常：" + e.getMessage(), e);
            result = RestResultEntry.createErrorResult(RestResultCode.CODE500);
        }
        return result;
    }
}
