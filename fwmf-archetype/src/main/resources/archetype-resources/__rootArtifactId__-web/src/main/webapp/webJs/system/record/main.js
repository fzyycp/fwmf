var mainApp = angular.module("mainApp", ["commInject"]);
mainApp.controller("mainCtrl", ["$scope", "$http", "mainService", function ($scope, $http, mainService) {

    // 测试
    $scope.name = "日志管理";

}]);
mainApp.factory('mainService', ['$http', function ($http) {
    return {
    };
}]);