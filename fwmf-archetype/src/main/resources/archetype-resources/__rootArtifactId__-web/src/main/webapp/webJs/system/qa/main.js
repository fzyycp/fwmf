var mainApp = angular.module("mainApp", ["commInject"]);
mainApp.controller("mainCtrl", ["$scope", "$http", "mainService", function ($scope, $http, mainService) {

    // 测试
    $scope.name = "常见问题管理";

}]);
mainApp.factory('mainService', ['$http', function ($http) {
    return {
    };
}]);