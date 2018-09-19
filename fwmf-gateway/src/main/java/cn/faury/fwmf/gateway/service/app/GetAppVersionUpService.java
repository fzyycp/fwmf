package cn.faury.fwmf.gateway.service.app;

import cn.faury.fdk.common.entry.RestResultEntry;
import cn.faury.fdk.common.utils.StringUtil;
import cn.faury.fdk.common.utils.VersionUtil;
import cn.faury.fdk.mobile.annotation.IMobile;
import cn.faury.fdk.mobile.annotation.IMobileService;
import cn.faury.fdk.mobile.exception.IntefaceInvokeException;
import cn.faury.fwmf.module.api.app.bean.AppTesterBean;
import cn.faury.fwmf.module.api.app.service.AppTesterService;
import cn.faury.fwmf.module.api.app.bean.AppVersionBean;
import cn.faury.fwmf.module.api.app.service.AppVersionService;
import cn.faury.fwmf.module.api.systemconfig.service.SystemConfigService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 版本升级服务
 * <p>
 * <pre>
 * 输入参数：
 * 【必填】String appCode:APP编码
 * 【必填】String sysType:客户端型号
 * 【必填】String versionNum:版本号
 * 【可选】Long userId:用户ID
 * </pre>
 */
@IMobile(method = "getAppVersionUp", isAuthc = false)
public class GetAppVersionUpService implements IMobileService {

    /**
     * APP版本发布
     */
    @Autowired(required = false)
    private AppVersionService appVersionservice;

    /**
     * APP测试用户
     */
    @Autowired(required = false)
    private AppTesterService appTesterservice;

    /**
     * 系统参数服务
     */
    @Autowired
    private SystemConfigService systemConfigService;

    @Override
    public RestResultEntry execute(HttpServletRequest request) {
        if (this.appVersionservice == null) {
            throw new IntefaceInvokeException("appVersionservice为null,APP版本发布服务未配置！", "服务未启用");
        }
        if (this.appTesterservice == null) {
            throw new IntefaceInvokeException("appTesterservice为null,APP测试用户服务未配置！", "服务未启用");
        }
        if (StringUtil.isEmpty(request.getParameter("appCode"))) {
            throw new IntefaceInvokeException("输入参数不合法【APP编码不可以为空】！", "软件错误");
        }
        if (StringUtil.isEmpty(request.getParameter("sysType"))) {
            throw new IntefaceInvokeException("输入参数不合法【客户端型号不可以为空】！", "软件错误");
        }
        if (StringUtil.isEmpty(request.getParameter("versionNum"))) {
            throw new IntefaceInvokeException("输入参数不合法【版本号不可以为空】！", "软件错误");
        }
        String userId = request.getParameter("userId");
        Boolean isTester = false;
        if (StringUtil.isNotEmpty(userId) && !userId.equals(0L)) {
            Pattern pattern = Pattern.compile("^\\+?[1-9][0-9]*$");
            Matcher isNum = pattern.matcher(userId);
            if (!isNum.matches()) {
                throw new IntefaceInvokeException("输入参数不合法【用户ID必须为数字】！", "软件错误");
            }
            AppTesterBean bean = appTesterservice.getAppTesterByUserId(request.getParameter("appCode"),
                    Long.parseLong(userId));
            if (bean != null) {
                isTester = true;
            }
        }
        String appCode = request.getParameter("appCode");
        String sysType = request.getParameter("sysType");
        String versionNum = request.getParameter("versionNum");

        String maxVersionNum = appVersionservice.getMaxVersionNum(appCode, sysType, isTester);

        Map<String, Object> parm = new HashMap<>();
        List<Object> list = new ArrayList<>();
        // 后台返回的版本号大，则需要版本更新
        if (VersionUtil.compareVersionNo(maxVersionNum, versionNum)>0) {
            parm.put("isUpdate", true);
            AppVersionBean bean = appVersionservice.getAppVersion(appCode, sysType, maxVersionNum);
            if (bean != null) {
                parm.put("isCoercion", StringUtil.whetherYes(bean.getIsCoercion()));
                parm.put("isFormal", StringUtil.whetherYes(bean.getIsFormal()));
                parm.put("versionNum", bean.getVersionNum());
                parm.put("size", bean.getSize());
                if (sysType.equals(AppVersionBean.AppSysType.IOSCN.getValue()) || sysType.equals(AppVersionBean.AppSysType.IOSEN.getValue())) {
                    parm.put("path", "itms-services://?action=download-manifest&url=" + bean.getPath());
                } else {
                    parm.put("path", bean.getPath());
                }
                parm.put("memo", bean.getMemo() == null ? "" : bean.getMemo().trim());
            } else {
                throw new IntefaceInvokeException("后台数据库数据不一致，未获取到最新版本信息", "软件错误");
            }
        } else {
            parm.put("isUpdate", false);
        }
        list.add(parm);
        return RestResultEntry.createSuccessResult(list);
    }
}
