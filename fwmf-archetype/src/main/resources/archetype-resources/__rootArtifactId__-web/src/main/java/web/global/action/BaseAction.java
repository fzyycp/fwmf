#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
package ${package}.web.global.action;

import com.opensymphony.xwork2.ActionSupport;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.ParentPackage;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 基础Action
 */
@ParentPackage("struts-interceptor")
public class BaseAction extends ActionSupport {

    /**
     * 序列化
     */
    private static final long serialVersionUID = -5682008543307473526L;

    /**
     * 获取Request对象
     *
     * @return Request对象
     */
    public HttpServletRequest getRequest() {
        return ServletActionContext.getRequest();
    }

    /**
     * 获取Response对象
     *
     * @return Response对象
     */
    public HttpServletResponse getResponse() {
        return ServletActionContext.getResponse();
    }

    /**
     * 获取Request参数
     *
     * @param name 参数名
     * @return 参数值
     */
    public String getParameter(String name) {
        return this.getRequest().getParameter(name);
    }

    /**
     * 向Request中设置属性
     *
     * @param name  a String specifying the name of the attribute
     * @param value the Object to be stored
     */
    public void setAttr(String name, Object value) {
        this.getRequest().setAttribute(name, value);
    }

    /**
     * 从Request中获取属性
     *
     * @param name a String specifying the name of the attribute
     * @return 对象
     */
    public Object getAttr(String name) {
        return this.getRequest().getAttribute(name);
    }

    /**
     * 重定向
     *
     * @param location 目标地址
     * @throws IOException 地址异常
     */
    public void sendRedirect(String location) throws IOException {
        this.getResponse().sendRedirect(location);
    }
}
