var detailApp = angular.module("detailApp", ["commInject"]);
detailApp.controller("detailCtrl", ["$scope", "$http","$rootScope", "detailService",
    function($scope, $http,$rootScope, detailService) {
        // 页面初始化
        detailService.init($scope);

        // 保存按钮事件
        $scope.save = function(){
            detailService.saveHandler($scope);
        };

        // 取消按钮事件
        $scope.cancel = function(){
            parent.layer.closeAll();
        };
    }
]);
detailApp.factory('detailService', ['$http', function($http) {
    // 初始化
    var _init = function(scope) {
        // 是否可以编辑，默认新增模式
        scope.isEditor = false;
        // 页面数据Bean
        scope.bean = {
            'oldPassword': ''
            ,'newPassword':''
            ,'newPassword2':''
        };
    };

    // 修改
    var _saveHandler = function(scope){
        if(!scope.bean.oldPassword){
            layer.alert('旧密码不可以为空!',{icon:2});
            return;
        }
        if(!scope.bean.newPassword){
            layer.alert('新密码不可以为空!',{icon:2});
            return;
        }
        if(!scope.bean.newPassword2){
            layer.alert('新密码不可以为空!',{icon:2});
            return;
        }
        if(scope.bean.newPassword != scope.bean.newPassword2){
            layer.alert('两次输入的新密码不一致!',{icon:2});
            return;
        }
        $http.get($.ctx + "/savePassword", {
            params: {
                "oldPassword" : scope.bean.oldPassword
                ,"newPassword" : scope.bean.newPassword
                ,"newPassword2" : scope.bean.newPassword2
            }
        }).success(function(data,header,config,status) {
            if (data) {
                layer.msg("保存成功",{icon:1,time:750},function(){
                    parent.layer.closeAll();
                });
            } else {
                layer.alert('旧密码不匹配！',{icon:2});
            }
        });
    };
    return {
        init: _init,
        saveHandler: _saveHandler
    };
}]);