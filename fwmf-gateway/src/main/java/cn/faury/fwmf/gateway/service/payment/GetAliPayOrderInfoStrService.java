package cn.faury.fwmf.gateway.service.payment;

import cn.faury.fwmf.module.api.order.bean.OrderInfoBean;
import cn.faury.fwmf.module.api.order.service.OrderInfoService;
import cn.faury.fwmf.module.api.order.bean.AlipayRecordsBean;
import cn.faury.fwmf.module.api.order.service.AlipayRecordsService;
import cn.faury.fdk.common.entry.RestResultCode;
import cn.faury.fdk.common.entry.RestResultEntry;
import cn.faury.fdk.common.exception.TipsException;
import cn.faury.fdk.common.utils.AssertUtil;
import cn.faury.fdk.common.utils.DateUtil;
import cn.faury.fdk.common.utils.RandomUtil;
import cn.faury.fdk.common.utils.StringUtil;
import cn.faury.fdk.mobile.annotation.IMobile;
import cn.faury.fdk.mobile.annotation.IMobileService;
import cn.faury.fdk.pay.alipay.AlipayConfig;
import cn.faury.fdk.shiro.utils.SessionUtil;
import com.alipay.api.AlipayApiException;
import com.alipay.api.AlipayClient;
import com.alipay.api.DefaultAlipayClient;
import com.alipay.api.domain.AlipayTradeAppPayModel;
import com.alipay.api.request.AlipayTradeAppPayRequest;
import com.alipay.api.response.AlipayTradeAppPayResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;

/**
 * 获取支付宝支付最终请求订单字符串
 * <p>
 * <pre>
 *  输入参数：
 * 【必填】S :sessionID  登录成功后分配的唯一授权标识
 * 【必填】orderId：订单ID
 * 【必填】receiveSrc：目前只支持参数为3，来源APP端
 * </pre>
 * <p>
 * 输出参数：
 * <p>
 * <pre>
 * 最终提交支付宝的订单字符串
 * </pre>
 *
 */
@IMobile(method = "getAliPayOrderInfoStr")
public class GetAliPayOrderInfoStrService implements IMobileService {

    /**
     * 日志记录
     */
    private Logger log = LoggerFactory.getLogger(getClass());

    @Autowired(required = false)
    private OrderInfoService orderInfoService;

    @Autowired(required = false)
    private AlipayRecordsService alipayRecordsService;

    @Override
    public RestResultEntry execute(HttpServletRequest request) {
        AssertUtil.assertNotNull(orderInfoService, "订单服务未启用");
        AssertUtil.assertNotNull(alipayRecordsService, "支付宝支付服务未启用");

        Long userId = SessionUtil.getCurrentUserId();
        String orderId = request.getParameter("orderId");
        AssertUtil.assertIsLong(orderId, "订单ID不合法");

        OrderInfoBean orderInfoBean = orderInfoService.getBeanById(Long.parseLong(orderId));
        // 状态校验
        AssertUtil.assertFalse(OrderInfoBean.OrderState.PAID.getCode().equals(orderInfoBean.getOrderState()), "亲~ 您的订单已支付，请刷新页面");
        AssertUtil.assertFalse(OrderInfoBean.OrderState.CANCELLED.getCode().equals(orderInfoBean.getOrderState()), "您的订单已过期取消");
        AssertUtil.assertFalse(OrderInfoBean.OrderState.DELETED.getCode().equals(orderInfoBean.getOrderState()), "您的订单已删除");
        // 金额校验
        AssertUtil.assertTrue(orderInfoBean.getOrderPayPrice().compareTo(BigDecimal.ZERO) > 0, "总金额必须大于零");

        String receiveSrc = request.getParameter("receiveSrc");
        AssertUtil.assertNotEmpty(receiveSrc, "支付来源不可以为空");
        if (!"3".equals(receiveSrc) ) {
            throw new TipsException(RestResultCode.CODE500.getCode(), "支付来源不正确", "软件错误");
        }

        log.debug("{}","========获取支付参数=========userId=" + userId + "===orderId=" + orderId + "==receiveSrc==" + receiveSrc
                + "===totalfee=" + orderInfoBean.getOrderPayPrice());
        AlipayRecordsBean alipayRecordsBean = this.createAlipayRecord(orderId, orderInfoBean.getOrderPayPrice(), receiveSrc);

        //实例化客户端
        AlipayClient alipayClient = new DefaultAlipayClient("https://openapi.alipay.com/gateway.do"
                , AlipayConfig.appId, AlipayConfig.privateKey, "json", StringUtil.UTF8_NAME, AlipayConfig.publicKey, "RSA2");
        //实例化具体API对应的request类,类名称和接口名称对应,当前调用接口名称：alipay.trade.app.pay
        AlipayTradeAppPayRequest alipayTradeAppPayRequest = new AlipayTradeAppPayRequest();
        //SDK已经封装掉了公共参数，这里只需要传入业务参数。以下方法为sdk的model入参方式(model和biz_content同时存在的情况下取biz_content)。
        AlipayTradeAppPayModel model = new AlipayTradeAppPayModel();
        model.setBody(alipayRecordsBean.getBody());
        model.setSubject(alipayRecordsBean.getSubject());
        model.setOutTradeNo(alipayRecordsBean.getOutTradeNo());
        model.setTimeoutExpress("30m");
        model.setTotalAmount(alipayRecordsBean.getTotalfee().toString());
        model.setProductCode("QUICK_MSECURITY_PAY");
        alipayTradeAppPayRequest.setBizModel(model);
        alipayTradeAppPayRequest.setNotifyUrl(AlipayConfig.notifyUrl);
        try {
            //这里和普通的接口调用不同，使用的是sdkExecute
            AlipayTradeAppPayResponse response = alipayClient.sdkExecute(alipayTradeAppPayRequest);
            final String orderInfo = response.getBody();//就是orderString 可以直接给客户端请求，无需再做处理。
            log.debug("生成支付参数：{}",orderInfo);
            return RestResultEntry.createSuccessResult(orderInfo);
        } catch (AlipayApiException e) {
            e.printStackTrace();
        }
        throw new TipsException(RestResultCode.CODE500.getTips(),"获取支付宝支付请求参数失败");
    }

    private AlipayRecordsBean createAlipayRecord(String orderId, BigDecimal totalfee, String receiveSrc) {
        AlipayRecordsBean alipayRecordsBean = new AlipayRecordsBean();
        String outTradeNo = String.format("%s%s", DateUtil.getCurrentDateStr("yyyyMMddHHmmss"), RandomUtil.getRandomNumber(6));
        alipayRecordsBean.setOutTradeNo(outTradeNo);
        String subject = String.format("[%s]在[%s]请求支付宝支付订单 ", SessionUtil.getCurrentLoginName(), DateUtil.getCurrentDateTimeStr());
        String body = String.format("订单编号：%s；订单名称：%s；订单金额：%s；订单ID：%s；来源：%s ", outTradeNo, subject, totalfee,
                orderId, getReceiveSrcInfo(receiveSrc));
        alipayRecordsBean.setSubject(subject);
        alipayRecordsBean.setTotalfee(totalfee);
        alipayRecordsBean.setOrderId(Long.parseLong(orderId));
        alipayRecordsBean.setBody(body);
        alipayRecordsBean.setUserId(SessionUtil.getCurrentUserId());
        alipayRecordsBean.setUserName(SessionUtil.getCurrentLoginName());
        alipayRecordsBean.setCreateTime(DateUtil.getCurrentDate());
        alipayRecordsBean.setReceiveSrc(receiveSrc);
        Long id = alipayRecordsService.insert(alipayRecordsBean);
        alipayRecordsBean.setId(id);
        return alipayRecordsBean;
    }

    /*
     *获取支付方式信息
     */
    private String getReceiveSrcInfo(String src) {
        String ret = "其它";
        switch (src) {
            case "0":
                ret = "手机端";
                break;
            case "1":
                ret = "网站";
                break;
            case "3":
                ret = "APP端";
                break;
            default:
                break;
        }
        return ret;
    }
}
