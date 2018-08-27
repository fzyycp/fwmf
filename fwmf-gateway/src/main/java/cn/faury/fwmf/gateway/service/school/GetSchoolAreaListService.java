package cn.faury.fwmf.gateway.service.school;

import cn.faury.fdk.common.entry.RestResultEntry;
import cn.faury.fdk.common.utils.AssertUtil;
import cn.faury.fdk.common.utils.StringUtil;
import cn.faury.fdk.mobile.annotation.IMobile;
import cn.faury.fdk.mobile.annotation.IMobileService;
import cn.faury.fwmf.module.api.area.bean.AreaBean;
import cn.faury.fwmf.module.api.area.utils.AreaUtil;
import cn.faury.fwmf.module.api.school.service.SchoolInfoService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

/**
 * 获取有学校的省市区列表
 */
@IMobile(method = "getSchoolAreaList", isAuthc = false)
public class GetSchoolAreaListService implements IMobileService {

    @Autowired(required = false)
    SchoolInfoService schoolInfoService;

    @Override
    public RestResultEntry execute(HttpServletRequest httpServletRequest) {
        AssertUtil.assertNotNull(schoolInfoService, "学校服务未启用");

        String areaCode = httpServletRequest.getParameter("areaCode");
        AssertUtil.assertNotEmpty(areaCode, "区域编码不可以为空");

        List<AreaBean> areaBeanList = null;
        if (AreaUtil.isProvinceOnly(areaCode) || AreaUtil.isCityOnly(areaCode)) {
            areaBeanList = new ArrayList<>();
        } else {
            if (StringUtil.isEmpty(areaCode) || "000000".equals(areaCode)) {
                areaBeanList = schoolInfoService.getSchoolProvinceList();
            } else if (areaCode.endsWith("0000")) {
                areaBeanList = schoolInfoService.getSchoolCityList(areaCode);
            } else if (areaCode.endsWith("00")) {
                areaBeanList = schoolInfoService.getSchoolCountyList(areaCode);
            }
        }
        return RestResultEntry.createSuccessResult(areaBeanList);
    }
}
