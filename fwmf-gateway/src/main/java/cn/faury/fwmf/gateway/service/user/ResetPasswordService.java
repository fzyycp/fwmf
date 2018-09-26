package cn.faury.fwmf.gateway.service.user;

import cn.faury.fdk.common.entry.RestResultEntry;
import cn.faury.fdk.common.utils.AssertUtil;
import cn.faury.fdk.mobile.annotation.IMobile;
import cn.faury.fdk.mobile.annotation.IMobileService;
import cn.faury.fwmf.module.api.sms.service.SmsVCodeService;
import cn.faury.fwmf.module.api.user.bean.UserInfoBean;
import cn.faury.fwmf.module.api.user.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletRequest;
import java.util.Collections;

/**
 * 忘记密码（重置密码）
 */
@IMobile(method = "resetPassword", isAuthc = false)
public class ResetPasswordService implements IMobileService {

    /**
     * 用户服务
     */
    @Autowired(required = false)
    UserInfoService userInfoService;

    /**
     * 短信服务
     */
    @Autowired(required = false)
    SmsVCodeService smsVCodeService;

    @Override
    public RestResultEntry execute(HttpServletRequest request) {
        AssertUtil.assertNotNull(userInfoService, "用户服务未启用");
        AssertUtil.assertNotNull(smsVCodeService, "短信验证码服务未启用");

        String mobileNum = request.getParameter("mobileNum");
        String uuid = request.getParameter("uuid");
        String vcode = request.getParameter("vcode");
        String password = request.getParameter("password");
        AssertUtil.assertNotEmpty(mobileNum, "手机号不可以为空");
        AssertUtil.assertNotEmpty(uuid, "请先获取短信验证码");
        AssertUtil.assertNotEmpty(vcode, "短信验证码不可以为空");
        AssertUtil.assertNotEmpty(password, "新密码不可以为空");

        AssertUtil.assertTrue(smsVCodeService.validateVCode(uuid, vcode, mobileNum), "短信验证码错误");

        // 验证用户是否存在
        UserInfoBean userInfo = userInfoService.getUserInfoByLoginName(mobileNum);
        AssertUtil.assertNotNull(userInfo, String.format("用户[%s]不存在！", mobileNum));

        int n = userInfoService.resetPassword(userInfo.getUserId(), password, 0L, "reset");
        AssertUtil.assertTrue(n > 0, "重置密码失败");
        return RestResultEntry.createSuccessResult(Collections.singletonMap("password", password));
    }

}
