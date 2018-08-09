package cn.faury.fwmf.gateway.service.school;

import cn.faury.fdk.common.entry.RestResultEntry;
import cn.faury.fdk.common.utils.AssertUtil;
import cn.faury.fdk.mobile.annotation.IMobile;
import cn.faury.fdk.mobile.annotation.IMobileService;
import cn.faury.fwmf.module.api.area.bean.AreaBean;
import cn.faury.fwmf.module.api.school.service.SchoolInfoService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 获取有学校的省份列表
 */
@IMobile(method = "getSchoolProvinceList", isAuthc = false)
public class GetSchoolProvinceListService implements IMobileService {

    @Autowired(required = false)
    SchoolInfoService schoolInfoService;

    @Override
    public RestResultEntry execute(HttpServletRequest httpServletRequest) {
        AssertUtil.assertNotNull(schoolInfoService, "学校服务未启用");

        List<AreaBean> schoolInfoBeanList = schoolInfoService.getSchoolProvinceList();
        return RestResultEntry.createSuccessResult(schoolInfoBeanList);
    }
}
