package cn.faury.fwmf.gateway.service.area;

import cn.faury.fdk.common.entry.RestResultEntry;
import cn.faury.fdk.common.utils.AssertUtil;
import cn.faury.fdk.mobile.annotation.IMobile;
import cn.faury.fdk.mobile.annotation.IMobileService;
import cn.faury.fdk.mobile.exception.IntefaceInvokeException;
import cn.faury.fwmf.module.api.area.bean.AreaBean;
import cn.faury.fwmf.module.api.area.service.AreaService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 获取省市下级区域列表
 */

@IMobile(method = "getSubAreaByCode", isAuthc = false)
public class GetSubAreaByCodeService implements IMobileService {

    @Autowired(required = false)
    private AreaService areaService;

    @Override
    public RestResultEntry execute(HttpServletRequest httpServletRequest) {
        AssertUtil.assertNotNull(areaService, new IntefaceInvokeException("区域服务未启用"));

        String areaCode = httpServletRequest.getParameter("areaCode");
        AssertUtil.assertNotEmpty(areaCode, new IntefaceInvokeException("【输入参数错误】区域编码为空", "区域编码为空"));

        List<AreaBean> areaBeans = areaService.getAreaOneTreeByCode(areaCode);
        return RestResultEntry.createSuccessResult(areaBeans);
    }
}
