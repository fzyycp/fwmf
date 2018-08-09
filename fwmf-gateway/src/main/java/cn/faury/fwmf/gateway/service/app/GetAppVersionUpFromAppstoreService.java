package cn.faury.fwmf.gateway.service.app;

import cn.faury.fdk.common.entry.RestResultEntry;
import cn.faury.fdk.common.utils.AssertUtil;
import cn.faury.fdk.common.utils.PropertiesUtil;
import cn.faury.fdk.common.utils.StringUtil;
import cn.faury.fdk.common.utils.VersionUtil;
import cn.faury.fdk.http.client.HttpUtil;
import cn.faury.fdk.http.client.core.HttpResponse;
import cn.faury.fdk.mobile.annotation.IMobile;
import cn.faury.fdk.mobile.annotation.IMobileService;
import cn.faury.fdk.mobile.exception.IntefaceInvokeException;
import cn.faury.fwmf.module.api.app.bean.AppInfoBean;
import cn.faury.fwmf.module.api.app.service.AppInfoService;
import cn.faury.fwmf.module.api.bean.AppVersionBean;
import cn.faury.fwmf.module.api.service.AppVersionService;
import com.mongodb.util.JSON;
import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 版本升级服务
 * <p>
 * <pre>
 * 输入参数：
 * 【必填】String appCode:APP编码
 * 【必填】String sysType:客户端型号
 * 【必填】String versionNum:版本号
 * </pre>
 */
@IMobile(method = "getAppVersionUpFromAppstore", isAuthc = false)
public class GetAppVersionUpFromAppstoreService implements IMobileService {

    /**
     * 日志记录器
     */
    private Logger log = LoggerFactory.getLogger(getClass());

    /**
     * APP版本发布
     */
    @Autowired(required = false)
    private AppVersionService appVersionservice;

    /**
     * App注册服务
     */
    @Autowired(required = false)
    private AppInfoService appRegisterService;

    @Override
    public RestResultEntry execute(HttpServletRequest request) {
        AssertUtil.assertNotEmpty(request.getParameter("appCode"), new IntefaceInvokeException("输入参数不合法【APP编码不可以为空】", "软件错误"));
        AssertUtil.assertNotEmpty(request.getParameter("sysType"), new IntefaceInvokeException("输入参数不合法【客户端型号不可以为空】", "软件错误"));
        AssertUtil.assertNotEmpty(request.getParameter("versionNum"), new IntefaceInvokeException("输入参数不合法【版本号不可以为空】", "软件错误"));

        // 保存返回结果
        Map<String, Object> parm = new HashMap<>();
        List<Object> list = new ArrayList<>();

        try {
            String appCode = request.getParameter("appCode");
            String sysType = request.getParameter("sysType");// "1";
            String versionNum = request.getParameter("versionNum");// "1";

            // 字符串是否与正则表达式相匹配
            AssertUtil.assertTrue(VersionUtil.isVersionNo(versionNum), new IntefaceInvokeException("输入参数不合法【版本号格式错误】", "软件错误"));

            AppInfoBean bean = appRegisterService.getAppInfoBySystemCode(null, appCode);
            AssertUtil.assertNotNull(bean, new IntefaceInvokeException("输入参数不合法【APP编码不可用】！", "软件错误"));
            String trackId = bean.getTrackId();// "1063024074";//
            if (StringUtil.isNotEmpty(trackId)) {
                Map<String, String> map = getAppStoreInfoByTrackId(trackId);
                if (map != null) {
                    String version = map.get("version");// "1.0.9";//
                    String url = map.get("trackViewUrl");// "123456";//
                    String releaseNotes = map.get("releaseNotes");// "发布记录";//

                    Boolean isUpdate = false;
                    if (StringUtil.isNotEmpty(version)) {
                        // 判断是否AppStore返回的版本号大于传入的版本号
                        isUpdate = VersionUtil.compareVersionNo(version, versionNum) > 0;
                    }
                    if (!isUpdate) {
                        parm.put("isUpdate", false);
                    } else {
                        parm.put("isUpdate", true);
                        parm.put("isCoercion", false);
                        parm.put("version", version);
                        parm.put("trackViewUrl", url);
                        parm.put("memo", releaseNotes == null ? "" : releaseNotes.trim());
                        // 需要更新，再检查是否需要强制更新
                        AppVersionBean versionBean = appVersionservice
                                .getAppVersion(appCode, sysType, version);
                        if (versionBean != null) {
                            parm.put("isCoercion",
                                    "1".equals(versionBean.getIsCoercion()));
                            if (StringUtil.isNotEmpty(versionBean.getMemo())) {
                                parm.put("memo", versionBean.getMemo().trim());
                            }
                        }
                    }
                } else {
                    parm.put("isUpdate", false);
                }
            } else {
                parm.put("isUpdate", false);
            }
        } catch (Exception e) {
            if (e instanceof IntefaceInvokeException) {
                log.error("getAppVersionUpFromAppstore调用异常：" + e.getMessage());
            } else {
                log.error("getAppVersionUpFromAppstore调用异常：" + e.getMessage(), e);
            }
            parm.put("isUpdate", false);
        }
        list.add(parm);
        return RestResultEntry.createSuccessResult(list);
    }

    public Map<String, String> getAppStoreInfoByTrackId(String trackId) {
        Map<String, String> map = new HashMap<String, String>();
        String result = "";
        try {
            String url = PropertiesUtil.instance().getProperty("appVersion.ios.appstore.url");
            ArrayList<NameValuePair> parameters = new ArrayList<NameValuePair>();
            parameters.add(new BasicNameValuePair("id", trackId));
            HttpResponse response = HttpUtil.post(url, parameters);
            result = response.getStringResult();
        } catch (Exception e) {
            map = null;
            System.err.println("发送 POST 请求出现异常！" + e);
            e.printStackTrace();
        }
        if (StringUtil.isNotEmpty(result)) {
            try {
                Map<String, Object> jsStr = (Map<String, Object>) JSON.parse(result);

                @SuppressWarnings("rawtypes")
                List list = (List) jsStr.get("results");

                if (list.size() > 0) {
                    Map<String, Object> m = (Map<String, Object>) list.get(0);

                    String version = (String) m.get("version");
                    String trackViewUrl = (String) m.get("trackViewUrl");
                    String releaseNotes = (String) m.get("releaseNotes");

                    map.put("version", version);
                    map.put("trackViewUrl", trackViewUrl);
                    map.put("releaseNotes", releaseNotes);
                }
            } catch (Exception e) {
                map = null;
                System.err.println("解析返回值错误:" + result);
                e.printStackTrace();
            }
        }
        return map;

    }

}
