#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
/*
 * Copyright (c)
 */

package ${package}.web.global.common;

import cn.faury.fdk.common.utils.PropertiesUtil;

import java.io.Serializable;

/**
 * 全局常量（来自于application.properties）
 */
public final class GlobalConst implements Serializable {

    /**
     * 序列化
     */
    private static final long serialVersionUID = 2442302219638471021L;

    /**
     * APP的ID：如需修改可在配置文件中加参数 appId
     */
    public static Long APP_ID = -1L;

    /**
     * APP编码：如需修改可在配置文件中加参数 appCode
     */
    public static String APP_CODE = "";

    /**
     * 业务系统ID：如需修改可在配置文件中加参数 systemId
     */
    public static Long SYSTEM_ID = -1L;

    /**
     * 业务系统编码：如需修改可在配置文件中加参数 systemCode
     */
    public static String SYSTEM_CODE = "";

    /**
     * 默认密码：如需修改可在配置文件中加参数 defaultPassword
     */
    public static String DEFAULT_PASSWORD = "123456";

    /**
     * 最大打开标签数：如需修改可在配置文件中加参数 tag.maxNum
     */
    public static Integer TAG_MAX_NUM = 20;

    /**
     * 是否启用验证码：如需修改可在配置文件中加参数 captchaEnabled
     */
    public static Boolean CAPTCHA_EBABLED = true;

    /**
     * 开发模式：如需修改可在配置文件中加参数 devMode
     */
    public static boolean DEV_MODE = false;

    /**
     * 超级系统管理员角色编码：如需修改可在配置文件中加参数 role.super
     */
    public static String ROLE_SUPER = "SUPER";

    /**
     * 系统用户角色编码：如需修改可在配置文件中加参数 role.system
     */
    public static String ROLE_SYSTEM = "SYSTEM";

    /**
     * 后台用户角色编码：如需修改可在配置文件中加参数 role.user
     */
    public static String ROLE_USER = "USER";

    /**
     * 文件上传根目录：如需修改可在配置文件中加参数 upload.root
     */
    public static String UPLOAD_ROOT = "../${rootArtifactId}-upload.war";
    /**
     * 读取上传文件路径，跟upload.root参数有关：如需修改可在配置文件中加参数 upload.root.view
     */
    public static String UPLOAD_ROOT_VIEW = "/${rootArtifactId}-upload";

    /**
     * 初始化
     */
    public static void init() {
        // APP的ID：如需修改可在配置文件中加参数 appId
        APP_ID = Long.parseLong(PropertiesUtil.instance().getProperty("appId", String.valueOf(APP_ID)));

        // APP编码：如需修改可在配置文件中加参数 appCode
        APP_CODE = PropertiesUtil.instance().getProperty("appCode", APP_CODE);

        // 业务系统ID：如需修改可在配置文件中加参数 systemId
        SYSTEM_ID = Long.parseLong(PropertiesUtil.instance().getProperty("systemId", String.valueOf(SYSTEM_ID)));

        // 业务系统编码：如需修改可在配置文件中加参数 systemCode
        SYSTEM_CODE = PropertiesUtil.instance().getProperty("systemCode", SYSTEM_CODE);

        // 默认密码：如需修改可在配置文件中加参数 defaultPassword
        DEFAULT_PASSWORD = PropertiesUtil.instance().getProperty("defaultPassword", DEFAULT_PASSWORD);

        // 最大打开标签数：如需修改可在配置文件中加参数 tag.maxNum
        TAG_MAX_NUM = PropertiesUtil.instance().getPropertyToInt("tag.maxNum", TAG_MAX_NUM);

        // 是否启用验证码：如需修改可在配置文件中加参数 captchaEnabled
        CAPTCHA_EBABLED = PropertiesUtil.instance().getPropertyToBoolean("fdk.captcha.enable", CAPTCHA_EBABLED);

        // 开发模式：如需修改可在配置文件中加参数 devMode
        DEV_MODE = PropertiesUtil.instance().getPropertyToBoolean("devMode", DEV_MODE);

        // 系统用户角色编码：如需修改可在配置文件中加参数 role.system
        ROLE_SYSTEM = PropertiesUtil.instance().getProperty("role.system", ROLE_SYSTEM);

        // 后台用户角色编码：如需修改可在配置文件中加参数 role.user
        ROLE_USER = PropertiesUtil.instance().getProperty("role.user", ROLE_USER);

        // 超级系统管理员角色：如需修改可在配置文件中加参数 role.super
        ROLE_SUPER = PropertiesUtil.instance().getProperty("role.super", ROLE_SUPER);

        // 文件上传根目录：如需修改可在配置文件中加参数 upload.root
        UPLOAD_ROOT = PropertiesUtil.instance().getProperty("upload.root", UPLOAD_ROOT);

        // 文件上传后访问路径，跟upload.root参数有关：如需修改可在配置文件中加参数 upload.root.view
        UPLOAD_ROOT_VIEW = PropertiesUtil.instance().getProperty("upload.root.view", UPLOAD_ROOT_VIEW);
    }

}
