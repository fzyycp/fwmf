// 登录页面初始化
$(function() {
	
	if($(".iframeClass",parent.document.body).length > 0)
    {
        window.top.location.reload();
    }
	
	// 回车键切换
	$("#username").keydown(function(event) {
		if (event.which == 13 || event.which == 108) {// 13等于回车键(Enter)键值
			if ($("#username").val() == "") {
				showErrorMsg("用户名不能为空！");
				$("#username").focus();
			} else {
				showErrorMsg("");
				$("#password").focus();
			}
		}
	});
	$("#password").keydown(function(event) {
		if (event.which == 13 || event.which == 108) {// 13等于回车键(Enter)键值
			if ($("#password").val() == "") {
				showErrorMsg('密码不能为空！');
				$("#password").focus();
			} else {
				showErrorMsg("");
				$("#captchaCode").focus();
			}
		}
	});
	$("#captchaCode").keydown(function(event) {
		if (event.which == 13 || event.which == 108) {// 13等于回车键(Enter)键值
			if (captchaEnabled == "true" && $("#captchaCode").val() == "") {
				showErrorMsg('验证码不能为空！');
				$("#captchaCode").focus();
			} else {
				showErrorMsg("");
				submit();
			}
		}
	});
	// 加载验证码
	$('#captchaImg').click(function() {
		$('#captchaImg').attr('src',function() {
			return 'captcha.jpg?d=' + new Date() * 1;
		});
	});
});

// 提交登录
function submit() {
	if ($('#username').val() == "") {
		showErrorMsg('用户名不能为空！');
		$('#username').focus();
		return;
	} else if ($('#password').val() == "") {
		showErrorMsg('密码不能为空！');
		$('#password').focus();
		return;
	} else if (captchaEnabled != "false" && $('#captchaCode').val() == "") {
		showErrorMsg('验证不能为空');
		$('#captchaCode').focus();
		return;
	}
	$('#loginForm').submit();
}

// 显示错误信息
function showErrorMsg(msg) {
	$('.error-message').html(msg);
}
