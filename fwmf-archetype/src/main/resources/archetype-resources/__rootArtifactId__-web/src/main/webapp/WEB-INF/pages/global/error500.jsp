#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
﻿<%@page contentType="text/html; UTF-8" %>

<!DOCTYPE html>
<html lang="en">
<head>
	<%@include file="../include/top.jsp" %>
	<title>系统错误</title>
	<!-- DATE RANGE PICKER -->
	<link rel="stylesheet" type="text/css" href="${symbol_dollar}{ctx}/js/bootstrap-daterangepicker/daterangepicker-bs3.css" />
	<!-- FONTS -->
	<link href='${symbol_dollar}{ctx}/css/fonts.googleapis.com_css_family=Open+Sans_300,400,600,700.css' rel='stylesheet' type='text/css'>
</head>
<body>	
	<!-- PAGE -->
	<section id="page">
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<div class="divide-100"></div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12 not-found text-center">
				   <div class="error-500">
					  500
				   </div>
				</div>
				<div class="col-md-4 col-md-offset-4 not-found text-center">
				   <div class="content">
					  <h3>服务器错误</h3>
					  <p>
						当前请求出现异常，请刷新重试或联系管理员.
					  </p>
				   </div>
				</div>
			 </div>
		</div>
	</section>
	<!--/PAGE -->
	<!-- JAVASCRIPTS -->
	<!-- Placed at the end of the document so the pages load faster -->
	<!-- JQUERY -->
	<script src="${symbol_dollar}{ctx}/js/jquery/jquery-2.0.3.min.js"></script>
	<!-- JQUERY UI-->
	<script src="${symbol_dollar}{ctx}/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
	<!-- BOOTSTRAP -->
	<script src="${symbol_dollar}{ctx}/bootstrap-dist/js/bootstrap.min.js"></script>
	
		
	<!-- DATE RANGE PICKER -->
	<script src="${symbol_dollar}{ctx}/js/bootstrap-daterangepicker/moment.min.js"></script>
	
	<script src="${symbol_dollar}{ctx}/js/bootstrap-daterangepicker/daterangepicker.min.js"></script>
	<!-- SLIMSCROLL -->
	<script type="text/javascript" src="${symbol_dollar}{ctx}/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script><script type="text/javascript" src="${symbol_dollar}{ctx}/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
	<!-- CUSTOM SCRIPT -->
	<script src="${symbol_dollar}{ctx}/js/jQuery-Cookie/jquery.cookie.min.js"></script>
	<script src="${symbol_dollar}{ctx}/js/script.js"></script>
	<script>
		jQuery(document).ready(function() {		
			App.setPage("widgets_box");  //Set current page
			App.init(); //Initialise plugins and elements
		});
	</script>
	<!-- /JAVASCRIPTS -->
</body>
</html>