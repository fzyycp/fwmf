#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
<%@ page import="${package}.web.global.common.GlobalConst" %>
<%@include file="bottom.jsp"%>

<script src="${symbol_dollar}{ctx}/webJs/plugins/angular/angular.min.js" type="text/javascript"></script>
<script src="${symbol_dollar}{ctx}/webJs/plugins/zTree/js/jquery.ztree.all-3.5.js" type="text/javascript"></script>
<script src="${symbol_dollar}{ctx}/webJs/common/inner-common.js" type="text/javascript"></script>
<%if(GlobalConst.DEV_MODE){%>
    <script src="${symbol_dollar}{ctx}/webJs/plugins/underscore/underscore.js" type="text/javascript"></script>
    <script src="${symbol_dollar}{ctx}/webJs/plugins/f-angular/f-angular.js" type="text/javascript"></script>
<%} else {%>
    <script src="${symbol_dollar}{ctx}/webJs/plugins/underscore/underscore-min.js" type="text/javascript"></script>
    <script src="${symbol_dollar}{ctx}/webJs/plugins/f-angular/f-angular.min.js" type="text/javascript"></script>
<%}%>
<script src="${symbol_dollar}{ctx}/webJs/common/common-tag.js" type="text/javascript"></script>