#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<%@taglib prefix="s" uri="/struts-tags" %>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<meta http-equiv="Expires" content="0">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Cache-control" content="no-cache">
<meta http-equiv="Cache" content="no-cache">

<c:set var="ctx" value="${symbol_dollar}{pageContext.request.contextPath}" />
<meta name="viewport" content="width=device-width, initial-scale=${version}, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<!-- STYLESHEETS --><!--[if lt IE 9]>
<script src="${symbol_dollar}{ctx}/js/flot/excanvas.min.js"></script>
<script src="${symbol_dollar}{ctx}/js/html5.js"></script>
<script src="${symbol_dollar}{ctx}/js/css3-mediaqueries.js"></script><![endif]-->
<link rel="stylesheet" type="text/css" href="${symbol_dollar}{ctx}/css/cloud-admin.css">
<link rel="stylesheet" type="text/css" href="${symbol_dollar}{ctx}/css/themes/default.css" id="skin-switcher">
<link rel="stylesheet" type="text/css" href="${symbol_dollar}{ctx}/css/responsive.css">
<link href="${symbol_dollar}{ctx}/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<!-- FONTS -->
<link href='${symbol_dollar}{ctx}/css/fonts.googleapis.com_css_family=Open+Sans_300,400,600,700.css' rel='stylesheet' type='text/css'>
<script src="${symbol_dollar}{ctx}/js/jquery-ui-1.10.3.custom/css/custom-theme/jquery-ui-1.10.3.custom.min.css" type="text/javascript"></script>

<!-- 自定义CSS -->
<link rel="stylesheet" type="text/css" href="${symbol_dollar}{ctx}/webCss/application.css">