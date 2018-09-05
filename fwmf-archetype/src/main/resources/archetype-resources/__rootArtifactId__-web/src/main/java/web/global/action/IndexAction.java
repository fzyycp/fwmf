#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
/*
 * Copyright (c)
 */

package ${package}.web.global.action;

import cn.faury.fdk.common.entry.TreeNodeEntry;
import cn.faury.fdk.common.utils.AssertUtil;
import cn.faury.fdk.common.utils.PropertiesUtil;
import cn.faury.fdk.common.utils.StringUtil;
import cn.faury.fdk.shiro.filter.captcha.FdkCaptchaConst;
import cn.faury.fdk.shiro.utils.SessionUtil;
import cn.faury.fdk.shiro.utils.ShiroUtil;
import cn.faury.fwmf.module.api.menu.service.UserRMenuService;
import cn.faury.fwmf.module.api.role.bean.RoleInfoBean;
import cn.faury.fwmf.module.api.role.service.RoleService;
import cn.faury.fwmf.module.api.user.service.UserService;
import ${package}.web.global.common.GlobalConst;
import org.apache.commons.beanutils.PropertyUtils;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;


/**
 * 主页Action
 */
@Namespace("/")
@Results({
        @Result(name = "index", location = "index", type = "redirectAction"),
        @Result(name = "login", location = "login", type = "redirectAction"),
        @Result(name = "pwdShow", location = "redirectAction")})
public class IndexAction extends JsonAction {

    /**
     * 序列化
     */
    private static final long serialVersionUID = 1164037305682260646L;

    /**
     * 用户名
     */
    private String username;

    /**
     * 密码
     */
    private String password;

    /**
     * 用户菜单服务
     */
    @Autowired(required = false)
    private UserRMenuService userRMenuService;

    /**
     * 用户服务
     */
    @Autowired(required = false)
    private UserService userService;

    /**
     * 角色服务
     */
    @Autowired(required = false)
    private RoleService roleService;

    /**
     * 首页
     *
     * @return 页面跳转地址
     */
    @Action(value = "index", results = {@Result(name = "indexJsp", location = "/WEB-INF/pages/main.jsp")})
    public String index() {
        if (!ShiroUtil.authenticated()) {
            return "login";
        }
        return "indexJsp";
    }

    /**
     * 欢迎页
     *
     * @return 页面跳转地址
     */
//    @Action(value = "portal", results = {@Result(name = "portalJsp", location = "/WEB-INF/pages/portal.jsp")})
//    public String portal() {
//        return "portalJsp";
//    }

    /**
     * 修改密码页
     *
     * @return 页面跳转地址
     */
    @Action(value = "password", results = {
            @Result(name = "passwordJsp", location = "/WEB-INF/pages/password.jsp")})
    public String password() {
        return "passwordJsp";
    }

    /**
     * 修改密码
     *
     * @return 页面跳转地址
     */
    @Action("savePassword")
    public String savePassword() {
        String oldPassword = this.getParameter("oldPassword");
        String newPassword = this.getParameter("newPassword");
        String newPassword2 = this.getParameter("newPassword2");

        AssertUtil.assertNotNull(userService, "用户服务未启用");
        AssertUtil.assertNotEmpty(oldPassword, "旧密码不可以为空");
        AssertUtil.assertNotEmpty(newPassword, "新密码不可以为空");
        AssertUtil.assertNotEmpty(newPassword2, "新密码不可以为空");
        AssertUtil.assertTrue(newPassword.equals(newPassword2), "两次新密码输入不一致");

        int result = userService.updatePassword(oldPassword, newPassword, SessionUtil.getCurrentUserId(), SessionUtil.getCurrentLoginName());

        this.setJsonParam(result);
        return JSON;
    }

    /**
     * 登录页
     *
     * @return 页面跳转地址
     */
    @Action(value = "login", results = {@Result(name = "loginPage", location = "/WEB-INF/pages/login.jsp")})
    public String login() {
        // 已经登录了，则直接跳转
        if (ShiroUtil.authenticated()) {
            return "index";
        }
        // 未登录时，看看是否有错误信息
        Object errorMsg = this.getAttr(FdkCaptchaConst.ATTRIBUTE_KEY_FAILURE_MSG);
        if (errorMsg instanceof String && StringUtil.isNotEmpty((String) errorMsg)) {
            this.addActionError((String) errorMsg);
        }

        return "loginPage";
    }

    /**
     * 获取系统菜单
     */
    @Action(value = "getMenuTree")
    public String getMenuTree() {
        AssertUtil.assertNotNull(userRMenuService,"用户菜单服务未启用");
        List<RoleInfoBean> roles = SessionUtil.getCurrentRolesInfo(List.class);
        for (RoleInfoBean role : roles) {
            System.out.print(role);
        }
        // 获取根目录
        List<TreeNodeEntry> menus = userRMenuService.getMenuTreeNodeByUserId(GlobalConst.SYSTEM_CODE, SessionUtil.getCurrentUserId());
        if (menus == null) {
            menus = new ArrayList<>();
        }
        this.setJsonParam(menus);
        return JSON;
    }

    @Action(value = "getUserRolePermsByUserId")
    public String getUserRolePermsByUserId() {
        AssertUtil.assertNotNull(roleService,"角色服务未启用");

        // 获取根目录
        List<String> funcs = roleService.getUserRolePermsByUserId(GlobalConst.SYSTEM_CODE,SessionUtil.getCurrentUserId());
        if (funcs == null) {
            funcs = new ArrayList<>();
        }
        this.setJsonParam(funcs);
        return JSON;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
