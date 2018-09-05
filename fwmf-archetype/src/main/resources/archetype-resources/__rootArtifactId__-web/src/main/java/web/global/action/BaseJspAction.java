#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
package ${package}.web.global.action;

import org.apache.struts2.convention.annotation.Action;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public abstract class BaseJspAction extends JsonAction {

    protected final Logger logger = LoggerFactory.getLogger(this.getClass());

    /**
     * 加载主页面视图
     *
     * @return 主视图
     */
    @Action("index")
    public String index() {
        // 渲染index
        return "index";
    }

    /**
     * 弹出增、改、查DIV
     */
    @Action(value = "edit")
    public String edit() {
        String mode = this.getParameter("mode");
        setAttr("mode", mode);
        if (mode.equals("add")) {// 新增
            return "add";
        } else {
            setAttr("id", this.getParameter("id"));// 主键
            switch (mode) {
                case "edit":// 修改
                case "view":// 查看
                    return mode;
            }
        }
        editAppendExtParams();
        return "view";
    }

    protected void editAppendExtParams(){
    }

}
