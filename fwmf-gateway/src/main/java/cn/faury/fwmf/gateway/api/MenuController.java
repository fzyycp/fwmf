package cn.faury.fwmf.gateway.api;

import cn.faury.fdk.common.entry.RestResultCode;
import cn.faury.fdk.common.entry.RestResultEntry;
import cn.faury.fdk.common.utils.AssertUtil;
import cn.faury.fwmf.module.api.system.bean.SystemInfoBean;
import cn.faury.fwmf.module.api.system.service.SystemService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/menu")
@Api(value = "菜单", tags = {"菜单信息接口"})
public class MenuController {

    @Autowired(required = false)
    SystemService systemService;

    @RequestMapping(value = "/getSystemMenuTree", method = {RequestMethod.GET, RequestMethod.POST})
    @ApiOperation(value = "系统菜单树查询", notes = "系统菜单树查询")
    public RestResultEntry getSystemMenuTree(@ApiParam(name = "节点类型", required = true) String nodeType
            , @ApiParam(name = "父节点ID", required = true) String parentId) {

        AssertUtil.assertNotNull(systemService, "系统关联菜单服务未启用");
        AssertUtil.assertNotEmpty(nodeType, "菜单节点类型不可以为空");

        if ("root".equals(nodeType) && "0".equals(parentId)) { // 系统节点
            SystemInfoBean query = new SystemInfoBean();
            query.setIsAvailable("Y");
            List<SystemInfoBean> systems = systemService.querySystemInfo(query);
            return RestResultEntry.createSuccessResult(systems);
        }
        return RestResultEntry.createErrorResult(RestResultCode.CODE500);
    }

}
