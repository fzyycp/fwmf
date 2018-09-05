$.httpPath="http://localhost:15080/ftpl-gateway";
/**
 * 增加命名空间方法<br>
 * <p>
 * 用法：$.namespace("a.b.c"); a.b.c.testFunction=function(...);
 */
$.extend($, {
    namespace: function () {
        var o = null, d = null;
        for (var i = 0, len = arguments.length; i < len; i++) {
            d = arguments[i].split(".");
            o = window[d[0]] = window[d[0]] || {};
            var left = d.slice(1);
            for (var i = 0, len = left.length; i < len; i++) {
                o = o[left[i]] = o[left[i]] || {};
            }
        }
        return o;
    },
    format: function (source, params) {
        if (arguments.length == 1)
            return function () {
                var args = $.makeArray(arguments);
                args.unshift(source);
                return $.format.apply(this, args);
            };
        if (arguments.length > 2 && params.constructor != Array) {
            params = $.makeArray(arguments).slice(1);
        }
        if (params.constructor != Array) {
            params = [params];
        }
        $.each(params, function (i, n) {
            source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
        });
        return source;
    },
    messager: {},
    SUCCESS: "1",
    ERROR: "-1"
});
$.extend($.messager, {
    alert: function (title, message) {
        layer.msg(message || "提示");
    },
    show: function (opt) {
        var defaults = $.extend({}, $.fn.dialog.defaults, {
            title: "",
            width: 450,
            height: 300,
            modal: true,
            closed: true,
            maximizable: true,
            msg: ""
        }, opt);
        defaults.style.zIndex = $.fn.dialog.defaults.zIndex++;
        var win = $("<div class=\"easyui-dialog\"></div>").html(defaults.msg).appendTo("body");
        win.dialog(defaults);
        win.dialog("dialog").css(defaults.style);
        win.dialog("open");
        return win;
    }
});
$.extend(layer, {
    shortmsg: function (content, options, end) {
        options = $.extend({time: 1000}, options || {});
        layer.msg(content, options, end);
    },
    success: function (content, options, end) {
        options = $.extend({time: 1000}, options || {});
        layer.msg(content, options, end);
    },
    warning: function (content) {
        layer.alert(content, {icon: 0, title: '警告'});
    },
    error: function (content) {
        layer.alert(content, {icon: 2, title: '错误'});
    }
});
$.extend($, {
    dialog: {
        message: {
            delConfirm: '您确认要删除选择的记录吗？',
            notSelect: '请选择一条记录！',
            singleSelect: '请只选择一条记录！',
            noData: '查询结果为空！',
            saveSuccess: '业务数据保存成功！',
            saveError: '业务数据保存失败，请重试！'
        },
        error: function (content) {
            layer.alert(content, {icon: 2, title: '错误'});
        },
        warning: function (content) {
            layer.alert(content, {icon: 0, title: '警告'});
        },
        info: function (content) {
            layer.alert(content, {icon: 1, title: '提示'});
        },
        success: function (content, callback) {
            layer.msg(content, {icon: 1, time: 750}, callback);
        },
        confirm: function (content,btns, callback1,callback2) {
            var layerIdx = layer.confirm(content, {
                icon: 3,
                btn: btns
            }, function () {
                if (typeof callback1 === 'function'){
                    callback1(layerIdx);
                }
            }, function () {
                if (typeof callback2 === 'function'){
                    callback2(layerIdx);
                }
            });
        },
        delete: function (content, callback) {
            $.dialog.confirm(content,["删除","保留"],callback);
        },
        prompt: function (title, defValue, callback) {
            layer.prompt({
                formType: 0,
                value: defValue,
                title: title
            }, function (value, index, elem) {
                if (callback(value) == true) {
                    layer.close(index);
                }
            });
        }
    }
});
/**
 * 判断是否为空
 *
 * @param str
 * @returns {Boolean}
 */
function isEmpty(str) {
    if (str != "" && str != null && str.length != 0) {
        return false;
    } else {
        return true;
    }
}
$.ajaxSetup({
    cache: false,
    dataType: 'json',
    headers: { // 默认添加请求头
        "FdkAuthorization":$.cookie('FdkAuthorization')
    }
});
$(document).ajaxSuccess(function (event, jqxhr, settings) {
    if (settings.url != "about:blank") {
        if (jqxhr.status == 543) {
            layer.error(JSON.parse(jqxhr.responseText));
        } else if (jqxhr.responseText.indexOf('login-box') > 0) {// 新版登录界面
            layer.alert("登录超时，请重新登！", function () {
                window.top.location.reload();
            });
            $('.layui-layer-close').hide();
        } else if (jqxhr.responseText.indexOf('loginbox') > 0) {// 旧版登录界面
            layer.alert("登录超时，请重新登！", function () {
                window.top.location.reload();
            });
            $('.layui-layer-close').hide();
        }
    }
});

$(document).ajaxStop(function () {
});
$(document).ajaxError(function (event, jqxhr, settings, exception) {
    if (exception == "abort") {
        layer.error("网络中断！");
    } else if (settings.url != "about:blank") {
        if (jqxhr.status == 543) {
            layer.error(JSON.parse(jqxhr.responseText));
        } else if (jqxhr.responseText.indexOf('login-box') > 0) {// 新版登录界面
            layer.alert("登录超时，请重新登！", function () {
                window.top.location.reload();
            });
            $('.layui-layer-close').hide();
        } else if (jqxhr.responseText.indexOf('loginbox') > 0) {// 旧版登录界面
            layer.alert("登录超时，请重新登！", function () {
                window.top.location.reload();
            });
            $('.layui-layer-close').hide();
        } else {
            layer.error("未捕获的异常：" + jqxhr.responseText);
        }
    }
});
// // http请求异常拦截
// angular.module("ajaxHttp", [])
// .factory("httpInterceptor", ["$q", "$rootScope", function($q, $rootScope) {
//     return {
//         request: function(config) {
//         	angular.httpLoadIdx = layer.load(1,{shade: 0.15});
//             return config || $q.when(config);
// 				},
// 				requestError: function(rejection) {
// 					layer.close(angular.httpLoadIdx);
// 					if (rejection.status == "-1") {
// 						layer.error("服务器拒绝连接！");
// 					} else if (rejection.status == 543) {
// 						layer.error(rejection.data);
// 					} else if (typeof rejection.data == 'string'){
// 						if(rejection.data.indexOf('login-box') > 0
// 							|| rejection.data.indexOf('loginbox') > 0) { // 登录界面
// 							layer.alert("登录超时，请重新登！", function() {
// 								window.top.location.reload();
// 							});
// 							$('.layui-layer-close').hide();
// 						}
// 					} else {
// 						layer.error("未捕获的异常：" + rejection.data);
// 					}
//
// 					return $q.reject(rejection);
// 				},
// 				response: function(response) {
// 					layer.close(angular.httpLoadIdx);
// 					if (response.status == "-1") {
// 						layer.error("服务器拒绝连接！");
// 					} else if (response.status == 543) {
// 						layer.error(rejection.data);
// 					} else if (typeof response.data == 'string'){
// 						if(response.data.indexOf('login-box') > 0
// 							|| response.data.indexOf('loginbox') > 0) { // 登录界面
// 							layer.alert("登录超时，请重新登！", function() {
// 								window.top.location.reload();
// 							});
// 							$('.layui-layer-close').hide();
// 						}
// 					}
//
// 					return response || $q.when(response);
// 				},
// 				responseError: function(rejection) {
// 					layer.close(angular.httpLoadIdx);
// 					if (rejection.status == "-1") {
// 						layer.error("服务器拒绝连接！");
// 					} else if (rejection.status == 543) {
// 						layer.error(rejection.data);
// 					} else if (typeof rejection.data == 'string'){
// 						if(rejection.data.indexOf('login-box') > 0
// 							|| rejection.data.indexOf('loginbox') > 0) { // 登录界面
// 							layer.alert("登录超时，请重新登！", function() {
// 								window.top.location.reload();
// 							});
// 	                $('.layui-layer-close').hide();
//             	}
//             } else {
//                 layer.error("未捕获的异常：" + rejection.data);
//             }
//
//             return $q.reject(rejection);
//         }
//     };
// }])
// .config(["$httpProvider", function($httpProvider) {　　
//     $httpProvider.interceptors.push("httpInterceptor");
// }]);
// // 通用模块注入
// angular.module("commInject", ["fangular","ajaxHttp"]);
// // 获取父页面scope对象
// angular.getParentScope = function(ctrlName){
// 	var appElement = parent.document.querySelector('[ng-controller='+ctrlName+']');
// 	return parent.angular.element(appElement).scope();
// };
// // 使修改的父页面scope对象数据生效
// angular.applyChange = function(scope){
// 	scope.$apply();
// };