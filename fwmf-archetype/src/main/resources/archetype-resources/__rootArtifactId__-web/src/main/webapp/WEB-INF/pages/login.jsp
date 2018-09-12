#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
﻿<%@ page import="${package}.web.global.common.GlobalConst" %>
<%@page contentType="text/html; UTF-8" %>

<!DOCTYPE html>
<html lang="zh_CN">
<head>
    <%@include file="include/top.jsp" %>
    <title>后台管理系统</title>
    <!-- 自定义样式 -->
    <link rel="stylesheet" type="text/css" href="${symbol_dollar}{ctx}/webCss/login.css">
    <script type="text/javascript">
        try{
            if(parent.document.getElementsByTagName('iframe').length > 0){
                window.top.location.reload();
            }
        }catch(e){}
    </script>
</head>
<body class="login">
<div class="warning-window-size">
    当前窗口分辨率过低，建议选择1024*768及以上
</div>
<!-- PAGE -->
<section>
    <!-- HEADER -->
    <header>
        <!-- NAV-BAR -->
        <div class="container">
            <div class="row">
                <div class="col-lg-4 col-md-6 col-sm-6 col-xs-8 col-lg-offset-4 col-md-offset-3 col-sm-offset-3 col-xs-offset-2">
                    <div id="logo">
                        <a href="${symbol_dollar}{ctx}/index.html"><img src="${symbol_dollar}{ctx}/img/logo/logo-alt.png" height="30" alt="logo"/></a>
                    </div>
                </div>
            </div>
        </div>
        <!--/NAV-BAR -->
    </header>
    <!--/HEADER -->
    <!-- LOGIN -->
    <section id="login" class="visible">
        <div class="container">
            <div class="row">
                <div class="col-lg-4 col-md-6 col-sm-6 col-xs-8 col-lg-offset-4 col-md-offset-3 col-sm-offset-3 col-xs-offset-2">
                    <div class="login-box-plain">
                        <h2 class="bigintro">${projectDesc}后台管理系统</h2>
                        <div class="divide-20"></div>
                        <form id="loginForm" action="${symbol_dollar}{ctx}/login" method="post" target="_top" role="form">
                            <div class="form-group">
                                <i class="fa fa-envelope"></i>
                                <input type="text" id="username" name="username" class="form-control has-feedback"
                                       placeholder="请输入用户名">
                            </div>
                            <div class="form-group">
                                <i class="fa fa-lock"></i>
                                <input type="password" id="password" name="password" class="form-control has-feedback"
                                       placeholder="请输入密码">
                            </div>
                            <div class="form-group">
                                <div class="input-group">
                                    <i class="fa fa-retweet"></i>
                                    <input id="captchaCode" name="captchaCode" class="form-control has-feedback"
                                           placeholder="请输入验证码" >
											<span class="input-group-btn" >
												<img id="captchaImg" style="margin: auto;display: inline;height: 98%;height:34px;margin-left:10px;"
                                                     src="${symbol_dollar}{ctx}/captcha.jpg" title="点击更换验证码"/>
											</span>
                                </div>
                            </div>

                            <div class="error-message">
                                <s:actionerror name="message"/>
                            </div>
                            <p>&nbsp;</p>
                            <div class="form-group">
                                <a href="javascript:submit()" class="btn btn-primary btn-block btn-login">
                                    登&nbsp;录</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!--/LOGIN -->
</section>
<!--/PAGE -->
<!-- JAVASCRIPTS -->
<%@include file="include/bottom.jsp" %>
<!-- /JAVASCRIPTS -->

<!-- login -->
<script type="text/javascript">
    var captchaEnabled = '<%=GlobalConst.CAPTCHA_EBABLED%>';
</script>
<script src="${symbol_dollar}{ctx}/webJs/login.js" type="text/javascript"></script>
<!-- /login -->
</body>
</html>