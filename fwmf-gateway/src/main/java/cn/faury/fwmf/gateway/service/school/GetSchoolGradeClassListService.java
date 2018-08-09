package cn.faury.fwmf.gateway.service.school;

import cn.faury.fdk.common.entry.RestResultEntry;
import cn.faury.fdk.common.utils.AssertUtil;
import cn.faury.fdk.mobile.annotation.IMobile;
import cn.faury.fdk.mobile.annotation.IMobileService;
import cn.faury.fwmf.module.api.school.bean.SchoolRGradeRClassInfoBean;
import cn.faury.fwmf.module.api.school.service.SchoolRGradeRClassInfoService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 获取学校年级班级列表
 */
@IMobile(method = "getSchoolGradeClassList", isAuthc = false)
public class GetSchoolGradeClassListService implements IMobileService {

    @Autowired(required = false)
    SchoolRGradeRClassInfoService schoolRGradeRClassInfoService;

    @Override
    public RestResultEntry execute(HttpServletRequest httpServletRequest) {
        AssertUtil.assertNotNull(schoolRGradeRClassInfoService, "学校年级班级服务未启用");

        String gradeId = httpServletRequest.getParameter("gradeId");
        AssertUtil.assertNotEmpty(gradeId, "年级ID不可以为空不可以为空");

        List<SchoolRGradeRClassInfoBean> schoolRGradeInfoBeanList = schoolRGradeRClassInfoService.getClassListByGradeId(Long.parseLong(gradeId));
        return RestResultEntry.createSuccessResult(schoolRGradeInfoBeanList);
    }

}
