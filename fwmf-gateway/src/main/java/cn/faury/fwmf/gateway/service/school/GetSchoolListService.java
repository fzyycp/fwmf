package cn.faury.fwmf.gateway.service.school;

import cn.faury.fdk.common.entry.RestResultEntry;
import cn.faury.fdk.common.utils.AssertUtil;
import cn.faury.fdk.mobile.annotation.IMobile;
import cn.faury.fdk.mobile.annotation.IMobileService;
import cn.faury.fwmf.module.api.school.bean.SchoolInfoBean;
import cn.faury.fwmf.module.api.school.config.SchoolLevel;
import cn.faury.fwmf.module.api.school.service.SchoolInfoService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 获取学校列表
 */
@IMobile(method = "getSchoolList", isAuthc = false)
public class GetSchoolListService implements IMobileService {

    @Autowired(required = false)
    SchoolInfoService schoolInfoService;

    @Override
    public RestResultEntry execute(HttpServletRequest httpServletRequest) {
        AssertUtil.assertNotNull(schoolInfoService, "学校服务未启用");

        String areaCode = httpServletRequest.getParameter("areaCode");
        AssertUtil.assertNotEmpty(areaCode, "地区编码不可以为空");
        String schoolLevel = httpServletRequest.getParameter("schoolLevel");

        List<SchoolInfoBean> schoolInfoBeanList = schoolInfoService.getSchoolListByAreaCode(areaCode, SchoolLevel.parse(schoolLevel));
        return RestResultEntry.createSuccessResult(schoolInfoBeanList);
    }
}
