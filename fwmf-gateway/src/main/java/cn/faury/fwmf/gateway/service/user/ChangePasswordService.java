package cn.faury.fwmf.gateway.service.user;

import cn.faury.fdk.common.entry.RestResultEntry;
import cn.faury.fdk.common.utils.AssertUtil;
import cn.faury.fdk.mobile.annotation.IMobile;
import cn.faury.fdk.mobile.annotation.IMobileService;
import cn.faury.fdk.mobile.exception.IntefaceInvokeException;
import cn.faury.fdk.shiro.utils.SessionUtil;
import cn.faury.fwmf.module.api.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletRequest;
import java.util.Collections;

/**
 * 修改密码
 */
@IMobile(method = "changePassword")
public class ChangePasswordService implements IMobileService {

    /**
     * 用户服务
     */
    @Autowired(required = false)
    UserService userService;

    @Override
    public RestResultEntry execute(HttpServletRequest request) {
        AssertUtil.assertNotNull(userService, new IntefaceInvokeException("用户服务未启用"));

        String oldPassword = request.getParameter("oldPassword");
        AssertUtil.assertNotEmpty(oldPassword, "旧密码不可以为空");
        String newPassword = request.getParameter("newPassword");
        AssertUtil.assertNotEmpty(newPassword, "新密码不可以为空");
        AssertUtil.assertFalse(oldPassword.equals(newPassword), "新密码和旧密码不可以相同");

        int n = userService.updatePassword(oldPassword, newPassword, SessionUtil.getCurrentUserId(), SessionUtil.getCurrentLoginName());
        AssertUtil.assertTrue(n > 0, "修改密码失败");

        return RestResultEntry.createSuccessResult(Collections.singletonMap("newPassword", newPassword));
    }

}
