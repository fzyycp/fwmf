#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
package ${package}.gateway.config;

public class GlobalConfig {


    /**
     * APP的ID：如需修改可在配置文件中加参数 appId
     */
    public static Long APP_ID = 1L;

    /**
     * APP编码：如需修改可在配置文件中加参数 appCode
     */
    public static String APP_CODE = "${parentArtifactId}-app";

    /**
     * 业务系统ID：如需修改可在配置文件中加参数 systemId
     */
    public static Long SYSTEM_ID = 1L;

    /**
     * 业务系统编码：如需修改可在配置文件中加参数 systemCode
     */
    public static String SYSTEM_CODE = "${parentArtifactId}-web";

    /**
     * 默认密码：如需修改可在配置文件中加参数 defaultPassword
     */
    public static String DEFAULT_PASSWORD = "123456";

    /**
     * 最大打开标签数：如需修改可在配置文件中加参数 tag.maxNum
     */
    public static Integer TAG_MAX_NUM = 20;

}
