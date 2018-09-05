#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
﻿<%@page contentType="text/html;charset=UTF-8" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <%@include file="include/top.jsp" %>
    <title>后台管理系统</title>
    <link rel="stylesheet" href="${symbol_dollar}{ctx}/webCss/main.css">
</head>
<body>
<div class="warning-window-size">
    当前窗口分辨率过低，建议选择1024*768及以上
</div>
<div class="wrapper">
    <!-- HEADER -->
    <header class="navbar clearfix" id="header">
        <div class="container">
            <div class="navbar-brand" style="height: 40px;">
                <!-- COMPANY LOGO -->
                <a href="index.html">
                    <img src="${symbol_dollar}{ctx}/img/logo/logo.png" alt="logo" class="img-responsive" height="40" width="160">
                </a>
                <!-- /COMPANY LOGO -->
                <!-- SIDEBAR COLLAPSE -->
                <div id="sidebar-collapse" class="sidebar-collapse btn">
                    <i class="fa fa-bars"
                       data-icon1="fa fa-bars"
                       data-icon2="fa fa-bars"></i>
                </div>
                <!-- /SIDEBAR COLLAPSE -->
            </div>
            <!-- BEGIN TOP NAVIGATION MENU -->
            <ul class="nav navbar-nav pull-right">
                <!-- BEGIN USER LOGIN DROPDOWN -->
                <li class="dropdown user" id="header-user">
                    <a href="${symbol_pound}" class="dropdown-toggle" data-toggle="dropdown">
                        <img alt="" src="${symbol_dollar}{ctx}/img/avatars/default.jpg"/>
                        <span class="username"><shiro:principal/></span>
                        <i class="fa fa-angle-down"></i>
                    </a>
                    <ul class="dropdown-menu">
                        <li><a href="javascript:main.showChangePwd()"><i class="fa fa-lock"></i> 修改密码</a></li>
                        <li><a href="javascript:main.showExit()"><i class="fa fa-power-off"></i> 退出</a></li>
                    </ul>
                </li>
                <!-- END USER LOGIN DROPDOWN -->
            </ul>
            <!-- END TOP NAVIGATION MENU -->
        </div>
    </header>
    <!--/HEADER -->

    <!-- PAGE -->
    <section id="page">
        <!-- SIDEBAR -->
        <div id="sidebar" class="sidebar">
            <div class="sidebar-menu nav-collapse">
                <!-- SIDEBAR MENU -->
                <!-- 动态获取-->
                <!-- /SIDEBAR MENU -->
            </div>
        </div>
        <!-- /SIDEBAR -->
        <div id="main-content">
            <iframe id="mainFrame" frameborder="no" border="no" src="" width="100%" height="auto" scrolling="auto"></iframe>
        </div>
    </section>
    <!--/PAGE -->
</div>

<!-- JAVASCRIPTS -->
<%@include file="include/bottom.jsp" %>
<!-- CUSTOM SCRIPT -->
<script src="${symbol_dollar}{ctx}/js/script.js"></script>

<script>
    jQuery(document).ready(function () {
        App.setPage("index");  //Set current page
        App.init(); //Initialise plugins and elements
    });
</script>
<script src="${symbol_dollar}{ctx}/webJs/main.js"></script>
<!-- /JAVASCRIPTS -->
</body>
</html>