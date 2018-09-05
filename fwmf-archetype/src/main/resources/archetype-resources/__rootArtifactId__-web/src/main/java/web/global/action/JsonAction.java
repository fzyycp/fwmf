#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
/*
 *
 * 通用Web支持框架 f-web-support
 *
 * 版权所有：秋刀鱼
 * Copyright (c) http://www.faury.cn
 */

package ${package}.web.global.action;

import cn.faury.fdk.common.db.PageInfo;
import ${package}.web.global.adapter.PageAdapter;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * Json格式的Action
 */
@Results({@Result(name = "json", type = "json", params = {"root", "jsonParam", "ignoreHierarchy", "false"})})
 public class JsonAction extends BaseAction {

    /**
     * 序列化
     */
    private static final long serialVersionUID = -8830185373774265884L;

    /**
     * Action返回字符串
     */
    public static final String JSON = "json";

    /**
     * 序列化JSON数据
     */
    protected Object jsonParam;

    /**
     * @return the jsonParam
     */
    public Object getJsonParam() {
        return jsonParam;
    }

    /**
     * @param jsonParam the jsonParam to set
     */
    public void setJsonParam(Object jsonParam) {
        if (jsonParam instanceof PageInfo) {
            this.jsonParam = new PageAdapter((PageInfo) jsonParam);
        } else {
            this.jsonParam = jsonParam;
        }
    }

    /**
     * 设置分页查询结果到JSON结果中
     *
     * @param results     查询结果列表
     * @param totalRecord 总行数
     * @param totalPage   总页数
     * @param pageSize    分页大小
     * @param pageNo      页数
     */
    public void setJsonParam4Page(List<?> results, int totalRecord, int totalPage, int pageSize, int pageNo) {
        Map<String, Object> page = new HashMap<>();
        page.put("pageNo", pageNo);
        page.put("pageSize", pageSize);
        page.put("totalRecord", totalRecord);
        page.put("totalPage", totalPage);
        page.put("results", results);
        this.setJsonParam(page);
    }

    /**
     * 设置分页查询结果到JSON结果中
     *
     * @param results 查询结果列表
     */
    public void setJsonParam4Page(List<?> results) {
        if (results == null) {
            results = new ArrayList<>();
        }
        this.setJsonParam(results);
    }

}
