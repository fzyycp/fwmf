package cn.faury.fwmf.gateway.service.user;

import cn.faury.fdk.common.entry.RestResultEntry;
import cn.faury.fdk.common.utils.AssertUtil;
import cn.faury.fdk.common.utils.StringUtil;
import cn.faury.fdk.mobile.annotation.IMobile;
import cn.faury.fdk.mobile.annotation.IMobileService;
import cn.faury.fdk.mobile.exception.IntefaceInvokeException;
import cn.faury.fwmf.module.api.app.bean.AppInfoBean;
import cn.faury.fwmf.module.api.app.bean.UserRAppInfoBean;
import cn.faury.fwmf.module.api.app.service.AppInfoService;
import cn.faury.fwmf.module.api.app.service.UserRAppInfoService;
import cn.faury.fwmf.module.api.sms.service.SmsVCodeService;
import cn.faury.fwmf.module.api.user.config.UserType;
import cn.faury.fwmf.module.api.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * 手机端用户注册
 */
@IMobile(method = "mobileRegister", isAuthc = false)
public class MobileRegisterService implements IMobileService {

    /**
     * 用户服务
     */
    @Autowired(required = false)
    UserService userService;

    /**
     * 用户关联App服务
     */
    @Autowired(required = false)
    UserRAppInfoService userRAppInfoService;

    /**
     * 短信服务
     */
    @Autowired(required = false)
    SmsVCodeService smsVCodeService;

    /**
     * App注册服务
     */
    @Autowired(required = false)
    AppInfoService appInfoService;

    @Override
    public RestResultEntry execute(HttpServletRequest request) {
        AssertUtil.assertNotNull(userService, "用户服务未启用");
        AssertUtil.assertNotNull(userRAppInfoService, "用户授权APP服务未启用");
        AssertUtil.assertNotNull(smsVCodeService, "短信验证码服务未启用");
        AssertUtil.assertNotNull(appInfoService, "APP服务未启用");

        String mobileNum = request.getParameter("mobileNum");
        String appCode = request.getParameter("appCode");
        String password = request.getParameter("password");
        String username = request.getParameter("username");
        String uuid = request.getParameter("uuid");
        String vcode = request.getParameter("vcode");

        AssertUtil.assertNotEmpty(mobileNum, "登录名不可以为空");
        AssertUtil.assertNotEmpty(appCode, "手机APP编码不可以为空");
        AssertUtil.assertNotEmpty(password, "密码不可以为空");
        username = StringUtil.emptyDefault(username, mobileNum);
        AssertUtil.assertNotEmpty(uuid, "先获取短信验证码");
        AssertUtil.assertNotEmpty(vcode, "短信验证码不可以为空");

        AppInfoBean appBean = appInfoService.isAppInUse(appCode);
        AssertUtil.assertNotNull(appBean, "APP已停用或不存在");

        AssertUtil.assertTrue(smsVCodeService.validateVCode(uuid, vcode, mobileNum), "短信验证码错误");

        Long userId = userService.insertUserInfo(mobileNum, username, password, appBean.getSystemId(), UserType.ENDUSER, "register", "register");
        List<UserRAppInfoBean> userRApps = new ArrayList<>();
        UserRAppInfoBean bean = new UserRAppInfoBean();
        bean.setAppId(appBean.getAppId());
        bean.setUserId(userId);
        userRApps.add(bean);
        userRAppInfoService.insertUserRApp(userRApps);

        return RestResultEntry.createSuccessResult(Collections.singletonMap("userId", userId));
    }
}
