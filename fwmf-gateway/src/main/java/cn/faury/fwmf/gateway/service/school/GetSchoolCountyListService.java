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
 * 获取有学校的省份下城市下区县列表
 */
@IMobile(method = "getSchoolCountyList", isAuthc = false)
public class GetSchoolCountyListService implements IMobileService {

    @Autowired(required = false)
    SchoolInfoService schoolInfoService;

    @Override
    public RestResultEntry execute(HttpServletRequest httpServletRequest) {
        AssertUtil.assertNotNull(schoolInfoService, "学校服务未启用");

        String cityCode = httpServletRequest.getParameter("cityCode");
        AssertUtil.assertNotNull(cityCode, "城市编码不可以为空");

        List<AreaBean> schoolInfoBeanList = schoolInfoService.getSchoolCountyList(cityCode);
        return RestResultEntry.createSuccessResult(schoolInfoBeanList);
    }
}
