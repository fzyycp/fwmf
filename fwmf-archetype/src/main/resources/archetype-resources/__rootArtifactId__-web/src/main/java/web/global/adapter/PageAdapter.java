#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
/*
 * 电商
 */

package ${package}.web.global.adapter;

import cn.faury.fdk.common.db.PageInfo;
import cn.faury.fdk.common.db.PageParam;
import cn.faury.fdk.common.utils.JsonUtil;

import java.util.ArrayList;
import java.util.List;

/**
 * 前台输出保持兼容
 */
@Deprecated
public class PageAdapter<T> extends PageParam {
    private int totalRecord = 0;
    private int totalPage = 1;
    private List<T> results = new ArrayList<>();

    public PageAdapter(PageInfo pageInfo) {
        this.setPageNo(pageInfo.getPageNum());
        this.setPageSize(pageInfo.getPageSize());
        this.setTotalPage(pageInfo.getPages());
        this.setTotalRecord((int) pageInfo.getTotal());
        this.setResults(pageInfo.getList());
    }

    /**
     * 获取totalRecord
     *
     * @return totalRecord
     */
    public int getTotalRecord() {
        return totalRecord;
    }

    /**
     * 设置totalRecord
     *
     * @param totalRecord 值
     */
    public void setTotalRecord(int totalRecord) {
        this.totalRecord = totalRecord;
    }

    /**
     * 获取totalPage
     *
     * @return totalPage
     */
    public int getTotalPage() {
        return totalPage;
    }

    /**
     * 设置totalPage
     *
     * @param totalPage 值
     */
    public void setTotalPage(int totalPage) {
        this.totalPage = totalPage;
    }

    /**
     * 获取results
     *
     * @return results
     */
    public List<T> getResults() {
        return results;
    }

    /**
     * 设置results
     *
     * @param results 值
     */
    public void setResults(List<T> results) {
        this.results = results;
    }

    @Override
    public String toString() {
        return JsonUtil.objectToJson(this);
    }
}
