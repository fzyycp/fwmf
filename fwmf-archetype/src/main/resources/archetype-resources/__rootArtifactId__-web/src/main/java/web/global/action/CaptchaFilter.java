#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
package ${package}.web.global.action;

import cn.faury.fdk.captcha.FdkCaptcha;
import cn.faury.fdk.captcha.config.FdkCaptchaConfig;
import cn.faury.fdk.shiro.core.FdkWebSessionManager;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.imageio.ImageIO;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

/**
 * 验证码图片生成器
 */
public class CaptchaFilter extends OncePerRequestFilter {

    FdkCaptcha fdkCaptcha;

    FdkCaptchaConfig fdkCaptchaConfig;

    public CaptchaFilter(FdkCaptcha fdkCaptcha, FdkCaptchaConfig fdkCaptchaConfig) {
        this.fdkCaptcha = fdkCaptcha;
        this.fdkCaptchaConfig = fdkCaptchaConfig;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
        byte[] captchaChallengeAsJpeg = null;
        ByteArrayOutputStream jpegOutputStream = new ByteArrayOutputStream();
        try {
            //生产验证码字符串并保存到session中
            String createText = fdkCaptcha.createText();
            httpServletRequest.getSession().setAttribute(fdkCaptchaConfig.getSessionKey(), createText);
            //使用生产的验证码字符串返回一个BufferedImage对象并转为byte写入到byte数组中
            BufferedImage challenge = fdkCaptcha.createImage(createText);
            ImageIO.write(challenge, "jpg", jpegOutputStream);
        } catch (IllegalArgumentException e) {
            logger.error("生成验证码异常", e);
            httpServletResponse.sendError(HttpServletResponse.SC_NOT_FOUND);
            return;
        }

        //定义response输出类型为image/jpeg类型，使用response输出流输出图片的byte数组
        captchaChallengeAsJpeg = jpegOutputStream.toByteArray();
        httpServletResponse.setHeader("Cache-Control", "no-store");
        httpServletResponse.setHeader("Pragma", "no-cache");
        httpServletResponse.setHeader(FdkWebSessionManager.AUTHORIZATION_HEADER, httpServletRequest.getSession().getId());
        httpServletResponse.addCookie(new Cookie(FdkWebSessionManager.AUTHORIZATION_HEADER, httpServletRequest.getSession().getId()));
        httpServletResponse.setDateHeader("Expires", 0);
        httpServletResponse.setContentType("image/jpeg");
        ServletOutputStream responseOutputStream =
                httpServletResponse.getOutputStream();
        responseOutputStream.write(captchaChallengeAsJpeg);
        responseOutputStream.flush();
        responseOutputStream.close();
    }

    /**
     * 获取fdkCaptcha
     *
     * @return fdkCaptcha
     */
    public FdkCaptcha getFdkCaptcha() {
        return fdkCaptcha;
    }

    /**
     * 设置fdkCaptcha
     *
     * @param fdkCaptcha 值
     */
    public void setFdkCaptcha(FdkCaptcha fdkCaptcha) {
        this.fdkCaptcha = fdkCaptcha;
    }

    /**
     * 获取fdkCaptchaConfig
     *
     * @return fdkCaptchaConfig
     */
    public FdkCaptchaConfig getFdkCaptchaConfig() {
        return fdkCaptchaConfig;
    }

    /**
     * 设置fdkCaptchaConfig
     *
     * @param fdkCaptchaConfig 值
     */
    public void setFdkCaptchaConfig(FdkCaptchaConfig fdkCaptchaConfig) {
        this.fdkCaptchaConfig = fdkCaptchaConfig;
    }
}
