$.httpPath="http://localhost:15080/ftpl-gateway";
// http请求异常拦截
angular.module("ajaxHttp", [])
.factory("httpInterceptor", ["$q", "$rootScope",function($q, $rootScope) {
    return {
        request: function(config) {
            angular.httpLoadIdx = layer.load(1,{shade: 0.15});
            config.headers.FdkAuthorization=$.cookie('FdkAuthorization');
            config.headers.JSESSIONID_S=$.cookie('JSESSIONID_S');
            return config || $q.when(config);
				},
				requestError: function(rejection) {
					layer.close(angular.httpLoadIdx);
					if (rejection.status == "-1") {
						layer.error("服务器拒绝连接！");
					} else if (rejection.status == 543) {
						layer.error(rejection.data);
					} else if (typeof rejection.data == 'string'){
						if(rejection.data.indexOf('login-box') > 0
							|| rejection.data.indexOf('loginbox') > 0) { // 登录界面
							layer.alert("登录超时，请重新登！", function() {
								window.top.location.reload();
							});
							$('.layui-layer-close').hide();
						}
					} else {
						layer.error("未捕获的异常：" + rejection.data);
					}

					return $q.reject(rejection);
				},
				response: function(response) {
					layer.close(angular.httpLoadIdx);
					if (response.status == "-1") {
						layer.error("服务器拒绝连接！");
					} else if (response.status == 543) {
						layer.error(rejection.data);
					} else if (typeof response.data == 'string'){
						if(response.data.indexOf('login-box') > 0
							|| response.data.indexOf('loginbox') > 0) { // 登录界面
							layer.alert("登录超时，请重新登！", function() {
								window.top.location.reload();
							});
							$('.layui-layer-close').hide();
						}
					}else if(!response.data.success){
                        layer.error(response.data.tips);
                        return null;
					}

					return response || $q.when(response);
				},
				responseError: function(rejection) {
					layer.close(angular.httpLoadIdx);
					if (rejection.status == "-1") {
						layer.error("服务器拒绝连接！");
					} else if (rejection.status == 543) {
						layer.error(rejection.data);
					} else if (typeof rejection.data == 'string'){
						if(rejection.data.indexOf('login-box') > 0
							|| rejection.data.indexOf('loginbox') > 0) { // 登录界面
							layer.alert("登录超时，请重新登！", function() {
								window.top.location.reload();
							});
	                $('.layui-layer-close').hide();
            	}
            } else {
                layer.error("未捕获的异常：" + rejection.data);
            }

            return $q.reject(rejection);
        }
    };
}])
.config(["$httpProvider", function($httpProvider) {
    $httpProvider.interceptors.push("httpInterceptor");
}]);
// 通用模块注入
angular.module("commInject", ["fangular","ajaxHttp"]);
// 获取父页面scope对象
angular.getParentScope = function(ctrlName){
	var appElement = parent.document.querySelector('[ng-controller='+ctrlName+']');
	return parent.angular.element(appElement).scope();
};
// 使修改的父页面scope对象数据生效
angular.applyChange = function(scope){
	scope.$apply();
};