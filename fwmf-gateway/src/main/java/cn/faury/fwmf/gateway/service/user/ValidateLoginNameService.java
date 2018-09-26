package cn.faury.fwmf.gateway.service.user;

import cn.faury.fdk.common.entry.RestResultEntry;
import cn.faury.fdk.common.utils.AssertUtil;
import cn.faury.fdk.mobile.annotation.IMobile;
import cn.faury.fdk.mobile.annotation.IMobileService;
import cn.faury.fdk.mobile.exception.IntefaceInvokeException;
import cn.faury.fwmf.module.api.user.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletRequest;
import java.util.Collections;

/**
 * 验证用户登录名是否存在
 */

@IMobile(method = "validateLoginName", isAuthc = false)
public class ValidateLoginNameService implements IMobileService {

    @Autowired(required = false)
    private UserInfoService userInfoService;

    @Override
    public RestResultEntry execute(HttpServletRequest httpServletRequest) {
        AssertUtil.assertNotNull(userInfoService, new IntefaceInvokeException("用户服务未启用"));

        String loginName = httpServletRequest.getParameter("loginName");
        AssertUtil.assertNotEmpty(loginName, new IntefaceInvokeException("【输入参数错误】用户登录名为空", "用户登录名为空"));

        Boolean isExist = userInfoService.isLoginNameExist(loginName);
        return RestResultEntry.createSuccessResult(Collections.singletonMap("isExist",isExist));
    }
}
