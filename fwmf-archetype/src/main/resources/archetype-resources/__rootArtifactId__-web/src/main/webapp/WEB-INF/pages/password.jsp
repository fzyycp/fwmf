#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
<%@page contentType="text/html;charset=UTF-8" %>

<!DOCTYPE html>
<html lang="zh_CN">
<head>
    <%@include file="include/inner-top.jsp" %>
    <title>修改密码</title>
    <!-- 自定义样式 -->
    <link href="${symbol_dollar}{ctx}/webCss/partner/partner/detail.css" rel="stylesheet" type="text/css">
</head>
<body ng-app="detailApp" ng-controller="detailCtrl"  class="f-form">
<!-- PAGE -->
<%--<div class="col" >--%>
<form name="detailForm" class="form form-horizontal" novalidate>
    <div class="form-group">
    	<label class="f-col-3 control-label requiredLabel">原密码：</label>
        <div class="f-col-9">
            <input type="password" class="form-control" name="oldPassword"
                   ng-class="{'nofill':detailForm.oldPassword.${symbol_dollar}error.required}"
                   ng-model="bean.oldPassword" maxlength="64" required >
        </div>
    </div>
    <div class="form-group">
    	<label class="f-col-3 control-label requiredLabel">新密码：</label>
        <div class="f-col-9">
            <input type="password" class="form-control" name="newPassword"
                   ng-class="{'nofill':detailForm.newPassword.${symbol_dollar}error.required}"
                   ng-model="bean.newPassword" maxlength="64" required >
        </div>
    </div>
    <div class="form-group">
    	<label class="f-col-3 control-label requiredLabel">确认新密码：</label>
        <div class="f-col-9">
            <input type="password" class="form-control" name="newPassword2"
                   ng-class="{'nofill':detailForm.newPassword2.${symbol_dollar}error.required}"
                   ng-model="bean.newPassword2" maxlength="64" required >
        </div>
    </div>
    <div class="submit-btn">
        <input type="submit" class="btn btn-primary"
               ng-disabled="detailForm.oldPassword.${symbol_dollar}error.required&&detailForm.newPassword.${symbol_dollar}error.required&&detailForm.newPassword2.${symbol_dollar}error.required"
               ng-click="save()" value="保 存">
        <input type="button"
               value="取 消" class="btn btn-primary" ng-click="cancel()">
    </div>
</form>
<%--</div>--%>
<!--/PAGE -->
<!-- JAVASCRIPTS -->
<%@include file="include/inner-bottom.jsp" %>
<!-- /JAVASCRIPTS -->

<!-- 自定义JS -->
<script src="${symbol_dollar}{ctx}/webJs/password.js" type="text/javascript"></script>
<!-- /自定义JS -->
</body>
</html>