package cn.faury.fwmf.gateway.service.school;

import cn.faury.fdk.common.entry.RestResultEntry;
import cn.faury.fdk.common.utils.AssertUtil;
import cn.faury.fdk.mobile.annotation.IMobile;
import cn.faury.fdk.mobile.annotation.IMobileService;
import cn.faury.fwmf.module.api.school.bean.SchoolInfoBean;
import cn.faury.fwmf.module.api.school.bean.SchoolRGradeInfoBean;
import cn.faury.fwmf.module.api.school.bean.SchoolRGradeRClassInfoBean;
import cn.faury.fwmf.module.api.school.config.SchoolLevel;
import cn.faury.fwmf.module.api.school.service.SchoolInfoService;
import cn.faury.fwmf.module.api.school.service.SchoolRGradeInfoService;
import cn.faury.fwmf.module.api.school.service.SchoolRGradeRClassInfoService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 获取学校年级列表
 */
@IMobile(method = "getSchoolGradeList", isAuthc = false)
public class GetSchoolGradeListService implements IMobileService {

    @Autowired(required = false)
    SchoolRGradeInfoService schoolRGradeInfoService;

    @Override
    public RestResultEntry execute(HttpServletRequest httpServletRequest) {
        AssertUtil.assertNotNull(schoolRGradeInfoService, "学校年级服务未启用");

        String schoolId = httpServletRequest.getParameter("schoolId");
        AssertUtil.assertNotEmpty(schoolId, "学校ID不可以为空不可以为空");

        List<SchoolRGradeInfoBean> schoolRGradeInfoBeanList = schoolRGradeInfoService.getGradeListBySchoolId(Long.parseLong(schoolId));
        return RestResultEntry.createSuccessResult(schoolRGradeInfoBeanList);
    }}
