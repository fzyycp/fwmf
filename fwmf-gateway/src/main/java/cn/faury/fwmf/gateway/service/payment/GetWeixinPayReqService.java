package cn.faury.fwmf.gateway.service.payment;

import cn.faury.fwmf.module.api.order.bean.OrderInfoBean;
import cn.faury.fwmf.module.api.order.service.OrderInfoService;
import cn.faury.fwmf.module.api.order.bean.WeixinPayRecordsBean;
import cn.faury.fwmf.module.api.order.service.WeixinPayRecordsService;
import cn.faury.fdk.common.entry.RestResultCode;
import cn.faury.fdk.common.entry.RestResultEntry;
import cn.faury.fdk.common.exception.TipsException;
import cn.faury.fdk.common.utils.AssertUtil;
import cn.faury.fdk.common.utils.DateUtil;
import cn.faury.fdk.common.utils.RandomUtil;
import cn.faury.fdk.mobile.annotation.IMobile;
import cn.faury.fdk.mobile.annotation.IMobileService;
import cn.faury.fdk.mobile.exception.IntefaceInvokeException;
import cn.faury.fdk.pay.tenpay.WXManager;
import cn.faury.fdk.shiro.utils.SessionUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.util.Map;

/**
 * 获取微信支付返回参数服务
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
 * appId:应用ID
 * partnerId:商户号
 * prepayId:预支付交易会话ID
 * packageValue:扩展字段
 * nonceStr:随机字符串
 * timeStamp:时间戳
 * sign:签名
 * </pre>
 */
@IMobile(method = "getWeixinPayReq")
public class GetWeixinPayReqService implements IMobileService {

    /**
     * 日志记录
     */
    private Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired(required = false)
    private OrderInfoService orderInfoService;

    @Autowired(required = false)
    private WeixinPayRecordsService weixinPayRecordsService;

    @Override
    public RestResultEntry execute(HttpServletRequest request) {
        AssertUtil.assertNotNull(orderInfoService, "订单服务未启用");

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
        if (!"3".equals(receiveSrc)) {
            throw new TipsException(RestResultCode.CODE500.getCode(), "支付来源不正确", "软件错误");
        }

        logger.debug("========获取支付参数=========userId=" + userId + "===orderId=" + orderId + "==receiveSrc==" + receiveSrc
                + "===totalfee=" + orderInfoBean.getOrderPayPrice());
        // 获取微信支付参数
        WeixinPayRecordsBean weixinPayRecordsBean = this.createWeixinPayRecord(orderId, orderInfoBean.getOrderPayPrice(), receiveSrc);

        // 统一下单
        Map<String, String> result = WXManager.unifiedorderForApp(weixinPayRecordsBean.getOutTradeNo(), orderInfoBean.getOrderPayPrice().doubleValue(), weixinPayRecordsBean.getBody());
        logger.debug("统一下单结果：{}", result);

        // 通信标识
        AssertUtil.assertTrue("SUCCESS".equals(result.get("return_code")), new IntefaceInvokeException("统一下单失败：" + result.get("return_msg"), "统一下单失败"));
        // 业务结果
        AssertUtil.assertTrue("SUCCESS".equals(result.get("result_code")), new IntefaceInvokeException("微信支付失败：" + result.get("err_code_des")));

        Map<String, String> payReq = WXManager.createAppPayReq(result);
        return RestResultEntry.createSuccessResult(payReq);
    }

    private WeixinPayRecordsBean createWeixinPayRecord(String orderId, BigDecimal totalfee, String receiveSrc) {
        WeixinPayRecordsBean weixinPayRecordsBean = new WeixinPayRecordsBean();
        String outTradeNo = String.format("%s%s", DateUtil.getCurrentDateStr("yyyyMMddHHmmss"), RandomUtil.getRandomNumber(6));
        weixinPayRecordsBean.setOutTradeNo(outTradeNo);
        String subject = String.format("[%s]在[%s]请求微信支付订单 ", SessionUtil.getCurrentLoginName(), DateUtil.getCurrentDateTimeStr());
        String body = "支付购库商品";
        weixinPayRecordsBean.setSubject(subject);
        weixinPayRecordsBean.setTotalfee(totalfee);
        weixinPayRecordsBean.setOrderId(Long.parseLong(orderId));
        weixinPayRecordsBean.setBody(body);
        weixinPayRecordsBean.setUserId(SessionUtil.getCurrentUserId());
        weixinPayRecordsBean.setUserName(SessionUtil.getCurrentLoginName());
        weixinPayRecordsBean.setCreateTime(DateUtil.getCurrentDate());
        weixinPayRecordsBean.setReceiveSrc(receiveSrc);
        Long id = weixinPayRecordsService.insert(weixinPayRecordsBean);
        weixinPayRecordsBean.setId(id);
        return weixinPayRecordsBean;
    }
}
