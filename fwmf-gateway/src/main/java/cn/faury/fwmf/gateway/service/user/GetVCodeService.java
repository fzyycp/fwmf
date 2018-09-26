package cn.faury.fwmf.gateway.service.user;

import cn.faury.fdk.common.entry.RestResultEntry;
import cn.faury.fdk.common.utils.AssertUtil;
import cn.faury.fdk.common.utils.StringUtil;
import cn.faury.fdk.mobile.annotation.IMobile;
import cn.faury.fdk.mobile.annotation.IMobileService;
import cn.faury.fwmf.module.api.app.bean.AppInfoBean;
import cn.faury.fwmf.module.api.app.service.AppInfoService;
import cn.faury.fwmf.module.api.sms.service.SmsVCodeService;
import cn.faury.fwmf.module.api.user.bean.UserInfoBean;
import cn.faury.fwmf.module.api.user.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletRequest;
import java.util.Collections;


/**
 * 获取验证码
 */
@IMobile(method = "getVCode", isAuthc = false)
public class GetVCodeService implements IMobileService {

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

    /**
     * 用户服务
     */
    @Autowired(required = false)
    UserInfoService userInfoService;

    @Override
    public RestResultEntry execute(HttpServletRequest request) {
        AssertUtil.assertNotNull(smsVCodeService, "短信服务未启用");
        AssertUtil.assertNotNull(userInfoService, "用户服务未启用");
        AssertUtil.assertNotNull(appInfoService, "APP服务未启用");

        String mobileNum = request.getParameter("mobileNum");
        String appCode = request.getParameter("appCode");
        AssertUtil.assertNotEmpty(mobileNum, "手机号不可以为空");
        AssertUtil.assertNotEmpty(appCode, "手机APP编码不可以为空");

        // 检查手机号是否为已禁用的用户
        UserInfoBean uib = userInfoService.getUserInfoByLoginName(mobileNum);
        AssertUtil.assertTrue(uib == null || StringUtil.whetherYes(uib.getIsEnable()), "当前手机号已禁用");

        // 检查APP是否存在或启用
        AppInfoBean bean = appInfoService.isAppInUse(appCode);
        AssertUtil.assertNotNull(bean, "当前APP不存在或已停用");
        String uuid = smsVCodeService.createAndSendVCode(mobileNum, appCode);
        return RestResultEntry.createSuccessResult(Collections.singletonMap("uuid", uuid));
    }
}
