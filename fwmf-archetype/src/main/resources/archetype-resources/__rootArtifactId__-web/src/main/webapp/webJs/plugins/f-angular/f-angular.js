/** f-angular.js version:0.0.1 2017-05-06 concat by Grunt **/
if ($("body").height() < document.documentElement.clientHeight) {
    $("body").css("height", "100%");
    $("html").css("height", "100%");
}
var fangular = angular.module("fangular", []);

/*列布局拖到分割线来改变大小，需要jQuery支持*/
try {

    var dragLen = $(".splitbar").length;
    for (var i = 0; i < dragLen; i++) {
        $("body .splitbar:eq(" + i + ")").mouseover(function(e) {
            $(this).css("cursor", "e-resize");
        });
        $("body .splitbar:eq(" + i + ")").mousedown(function(e) {
            $(this).css("cursor", "e-resize");
            var m = $(this);
            var tempwid = $(this).prev().outerWidth();
            var tempwid2 = $(this).next().outerWidth();
            if ($(this).prev().hasClass("col")) {
                $(this).prev().addClass("col-fixed");
                $(this).prev().removeClass("col");
                $(this).prev().css("width", tempwid + "px");
            }
            if ($(this).next().hasClass("col")) {
                $(this).next().addClass("col-fixed");
                $(this).next().removeClass("col");
                $(this).next().css("width", tempwid2 + "px");
            }
            $("body").mousemove(function(eve) {
                var _x = eve.pageX;
                var wid = 0;
                var preAllWidth = 0,
                    nowAllWidth = 0,
                    sumPrev = 0;
                if (m.prevAll().length == 1) {
                    var prevWidth = m.next().outerWidth() + m.prev().outerWidth();
                    if (_x > prevWidth) {
                        _x = prevWidth;
                    }
                    m.prev().animate({ width: _x }, 1);
                    console.log("left:"+_x);
                    var distanceX = prevWidth - _x;
                    m.next().animate({ width: distanceX }, 1);
                    console.log("right:"+distanceX);
                } else {
                    var betweenDragWidth = m.next().outerWidth() + m.prev().outerWidth();
                    var mf = m;
                    mf = mf.prev();
                    while (mf.prev().length != 0) {
                        preAllWidth = mf.prev().outerWidth();
                        sumPrev += preAllWidth;
                        mf = mf.prev();
                    }

                    var le = _x - sumPrev;
                    var s = betweenDragWidth + sumPrev - _x;
                    if (le < 0) {
                        le = 0;
                    } else if (le > betweenDragWidth) {
                        le = betweenDragWidth;
                    }
                    if (s < 0) {
                        s = 0;
                    } else if (s > betweenDragWidth) {
                        s = betweenDragWidth;
                    }
                    m.prev().animate({ width: le }, 1);
                    m.next().animate({ width: s }, 1);
                }

            })
        });
        $("body").mouseup(function(e) {
            $(this).unbind("mousemove");
            $(this).css("cursor", "default");
        });
    }

} catch (e) {
    console.log("未配置jQuery，分隔条无法拖动！");
}

// 定义分页常量
fangular.constant("PAGING", {
    pageSize: 20,
    pageSizeList: [5, 10, 20, 50, 100]
});
// Grid工具类，不建议外部使用
fangular.factory("fGridHelper", ["$http", "PAGING", function($http, PAGING) {
    // 请求网络地址加载数据
    var _requestData = function(gridCfg) {
        var url = gridCfg.config.url;
        if (angular.isUndefined(url) || url == "" || url == "null") {
            throw new Error("请求的网络地址不可以为空！");
        }
        if (angular.isUndefined(gridCfg.searchedParam)) {
            gridCfg.searchedParam = {};
        }
        gridCfg.searchedParam.pageNo = gridCfg.paging.pageNo;
        gridCfg.searchedParam.pageSize = gridCfg.paging.pageSize;
        // 请求网络
        $http.get(url, { params: gridCfg.searchedParam })
            .success(function(res) {
                var paging = gridCfg.paging;
                // 查询分页结果
                /*paging.results = res.results;
                // 总条数
                paging.totalRecord = res.totalRecord;
                //当前页
                paging.pageNo = res.pageNo;*/
                paging.results = res.data[0].list;
                // 总条数
                paging.totalRecord = res.data[0].total;
                //当前页
                paging.pageNo = res.data[0].pageNum;
                // 查询结果为空则，总页数为1
                if (parseInt(paging.totalRecord) == 0) {
                    paging.totalPage = 1;
                } else {
                    if ((parseInt(paging.totalRecord) % parseInt(paging.pageSize) == 0)) {
                        paging.totalPage = parseInt(parseInt(paging.totalRecord) / parseInt(paging.pageSize));
                    } else {
                        paging.totalPage = parseInt(parseInt(paging.totalRecord) / parseInt(paging.pageSize)) + 1; //总页数
                    }
                }
                // 页数下拉框
                paging.pageList = [];
                for (var i = 1; i <= paging.totalPage; i++) {
                    paging.pageList.push(i);
                }

                // 默认禁用所有按钮
                paging.btnsDisabled.goToFirstPage = true;
                paging.btnsDisabled.goToPrevPage = true;
                paging.btnsDisabled.goToNextPage = true;
                paging.btnsDisabled.goToEndPage = true;
                if (paging.pageNo > 1) { // 当前页码大于1
                    // 首页和前一页可用
                    paging.btnsDisabled.goToFirstPage = false;
                    paging.btnsDisabled.goToPrevPage = false;
                }
                if (paging.pageNo < paging.totalPage) { // 当前页码小于总页码
                    // 下一页和尾页可用
                    paging.btnsDisabled.goToNextPage = false;
                    paging.btnsDisabled.goToEndPage = false;
                }
                paging.selectAllItems = false;
            })
            .error(function(data){
                console.log("[Error]$http错误："+data);
            });
    };

    // 创建分页工具栏模板HTML
    var _createPagingTplHtml = function(gridCfgName, tElement, tAttrs) {
        var _pgt = '';
        _pgt = _pgt + '<div ng-if="' + gridCfgName + '.config.showPaging" class="grid-paging">';
        _pgt = _pgt + ' 共&nbsp;<span ng-bind="' + gridCfgName + '.paging.totalRecord"></span>&nbsp;条记录&nbsp;';
        _pgt = _pgt + ' 第';
        _pgt = _pgt + '   <select ng-model="' + gridCfgName + '.paging.pageNo" ';
        _pgt = _pgt + '           ng-change="changePageNo()" ';
        _pgt = _pgt + '           ng-options="item as item for item in ' + gridCfgName + '.paging.pageList">';
        _pgt = _pgt + '   </select>';
        _pgt = _pgt + ' 页/共&nbsp;<span ng-bind="' + gridCfgName + '.paging.totalPage"></span>&nbsp;页&nbsp;';
        _pgt = _pgt + ' 每页&nbsp;';
        _pgt = _pgt + '   <select ng-model="' + gridCfgName + '.paging.pageSize" ';
        _pgt = _pgt + '           ng-change="changePageSize()" ';
        _pgt = _pgt + '           ng-options="item as item for item in ' + gridCfgName + '.paging.pageSizeList">';
        _pgt = _pgt + '   </select>';
        _pgt = _pgt + ' &nbsp;条';
        _pgt = _pgt + ' <div class="grid-paging-btns">';
        _pgt = _pgt + '  <button ng-class="{\'btn\':true, \'btn-xs\':true, \'btn-page-disabled\':' + gridCfgName + '.paging.btnsDisabled.goToFirstPage, \'btn-page-enabled\':!' + gridCfgName + '.paging.btnsDisabled.goToFirstPage}" ng-click="goToFirstPage()" ng-disabled="' + gridCfgName + '.paging.btnsDisabled.goToFirstPage">首页</button>';
        _pgt = _pgt + '  <button ng-class="{\'btn\':true, \'btn-xs\':true, \'btn-page-disabled\':' + gridCfgName + '.paging.btnsDisabled.goToPrevPage, \'btn-page-enabled\':!' + gridCfgName + '.paging.btnsDisabled.goToPrevPage}" ng-click="goToPrevPage()" ng-disabled="' + gridCfgName + '.paging.btnsDisabled.goToPrevPage">上一页</button>';
        _pgt = _pgt + '  <button ng-class="{\'btn\':true, \'btn-xs\':true, \'btn-page-disabled\':' + gridCfgName + '.paging.btnsDisabled.goToNextPage, \'btn-page-enabled\':!' + gridCfgName + '.paging.btnsDisabled.goToNextPage}" ng-click="goToNextPage()" ng-disabled="' + gridCfgName + '.paging.btnsDisabled.goToNextPage">下一页</button>';
        _pgt = _pgt + '  <button ng-class="{\'btn\':true, \'btn-xs\':true, \'btn-page-disabled\':' + gridCfgName + '.paging.btnsDisabled.goToEndPage, \'btn-page-enabled\':!' + gridCfgName + '.paging.btnsDisabled.goToEndPage}" ng-click="goToEndPage()" ng-disabled="' + gridCfgName + '.paging.btnsDisabled.goToEndPage">尾页</button>';
        _pgt = _pgt + ' </div>';
        _pgt = _pgt + '</div>';
        return _pgt;
    };

    // 构造工具对象
    var factory = {};

    // 配置初始化参数
    factory.initParam = function(gridCfg) {
        // -------------------- 默认查询标志位参数 --------------------
        // 是否已执行查询
        gridCfg.searched = false;
        // 执行查询的参数
        gridCfg.searchedParam = {};

        // -------------------- 默认配置参数 --------------------
        // 是否显示行号，默认true
        if (angular.isUndefined(gridCfg.config.showLineNo)) {
            gridCfg.config.showLineNo = true;
        }
        // 是否显示checkbox，默认false
        if (angular.isUndefined(gridCfg.config.showChecked)) {
            gridCfg.config.showChecked = false;
        }
        // 是否单选，有checkbox默认false，否则默认true
        if (angular.isUndefined(gridCfg.config.singleChecked)) {
            if(gridCfg.config.showChecked===true){
                gridCfg.config.singleChecked = false;
            } else{
                gridCfg.config.singleChecked = true;
            }
        }
        // 是否显示分页导航，默认true
        if (angular.isUndefined(gridCfg.config.showPaging)) {
            gridCfg.config.showPaging = true;
        }
        // 是否初始化查询，默认true
        if (angular.isUndefined(gridCfg.config.initSearch)) {
            gridCfg.config.initSearch = true;
        }

        // -------------------- 默认分页参数配置 --------------------
        if (angular.isUndefined(gridCfg.paging)) {
            gridCfg.paging = {};
        }
        if (angular.isUndefined(gridCfg.paging.pageSize)) {
            gridCfg.paging.pageSize = PAGING.pageSize; // 每页显示的记录数，默认是20
        }
        gridCfg.paging.pageNo = 1; // 页码，默认是第一页
        gridCfg.paging.totalPage = 1; // 总页数，默认是1
        gridCfg.paging.totalRecord = 0; // 总条数，默认是0
        gridCfg.paging.results = []; // 默认空数据集
        if (angular.isArray(gridCfg.data)) {
            gridCfg.paging.results = gridCfg.data; // 数据集
        }
        gridCfg.paging.pageList = [1]; // 页码下拉框
        gridCfg.paging.pageSizeList = PAGING.pageSizeList;
        gridCfg.paging.btnsDisabled = {
            'goToFirstPage': true,
            'goToPrevPage': true,
            'goToNextPage': true,
            'goToEndPage': true
        };
        gridCfg.paging.selectAllItems = false;// 是否全选
    };

    // 创建表格模板HTML
    factory.createTableTplHtml = function(gridCfgName, tElement, tAttrs) {
        var _html = '';
        _html = _html + '<div class="grid">';
        _html = _html + '  <div class="grid-body">';
        _html = _html + '    <table class="table table-hover table-striped table-condensed">';
        _html = _html + '      <thead>';
        _html = _html + '        <tr>';
        _html = _html + '          <th ng-if="' + gridCfgName + '.config.showLineNo" class="row-idx">&nbsp;</th>';
        _html = _html + '          <th ng-if="' + gridCfgName + '.config.showChecked" class="row-cb"><input type="checkbox" ng-if="!' + gridCfgName + '.config.singleChecked" ng-model="' + gridCfgName + '.paging.selectAllItems" ng-click="selectAllItemsHandler()"></th>';
        _html = _html + '          <th ng-repeat="col in ' + gridCfgName + '.columns">{{col.title}}</th>';
        _html = _html + '        </tr>';
        _html = _html + '      </thead>';
        _html = _html + '      <tbody>';
        _html = _html + '        <tr ng-repeat="row in ' + gridCfgName + '.paging.results" ng-click="rowClickHandler(row)" ng-class="{\'selected\':row.checked}">';
        _html = _html + '          <td ng-if="' + gridCfgName + '.config.showLineNo" ng-bind="$index+1" class="row-idx">&nbsp;</td>';
        _html = _html + '          <td ng-if="' + gridCfgName + '.config.showChecked" class="row-cb">';
        _html = _html + '            <input type="checkbox" ng-model="row.checked" ng-click="checkboxClickHandler(row,$event)">';
        _html = _html + '          </td>';
        _html = _html + '          <td ng-repeat="col in ' + gridCfgName + '.columns" style="{{col.style}}" class="{{col.class}}" ng-bind-html="row[col.bind] | injectFilter:col.filter | trustHtmlFilter"></td>';
        _html = _html + '        </tr>';
        _html = _html + '      </tbody>';
        _html = _html + '    </table>';
        _html = _html + '  </div>';
        _html = _html + _createPagingTplHtml(gridCfgName, tElement, tAttrs);
        _html = _html + '</div>';

        return _html;
    };

    // 重新加载数据
    factory.reloadData = function(gridCfg) {
        if (gridCfg.searched) {
            // 请求网络
            _requestData(gridCfg);
        }
    };

    // 查询数据，并重置页码
    factory.searchData = function(gridCfg, params) {
        // 重置页码
        gridCfg.paging.pageNo = 1;
        gridCfg.searchedParam = params;
        // 请求网络
        _requestData(gridCfg);
        // 设置已查询状态位
        gridCfg.searched = true;
    };

    // 获取已选择项
    factory.getSelectionItems = function(gridCfg) {
        var items = [];
        angular.forEach(gridCfg.paging.results, function(item) {
            if (item.checked === true) {
                items.push(item);
            }
        });
        return items;
    };

    factory.selectAllItemsHandler = function(gridCfg) {
        if(gridCfg.paging.selectAllItems){
            this.selectAllItems(gridCfg);
        } else {
            this.unselectAllItems(gridCfg);
        }
    };

    factory.selectAllItems = function(gridCfg) {
        gridCfg.paging.selectAllItems = true;
        for (var i = 0; i < gridCfg.paging.results.length; i++) {
            gridCfg.paging.results[i].checked = true;
        }
    };

    factory.unselectAllItems = function(gridCfg) {
        gridCfg.paging.selectAllItems = false;
        for (var i = 0; i < gridCfg.paging.results.length; i++) {
            gridCfg.paging.results[i].checked = false;
        }
    };

    // 点击行前checkbox
    factory.selectItemHandler = function(gridCfg, item) {
        if (gridCfg.config.singleChecked === true) {
            var value = item.checked;
            this.unselectAllItems(gridCfg);
            item.checked = value;
        } else {
            // 是否已经全选
            var hasNotChecked = false;
            angular.forEach(gridCfg.paging.results, function(item) {
                if (item.checked !== true) {
                    hasNotChecked = true;
                }
            });
            gridCfg.paging.selectAllItems = !hasNotChecked;
        }
    };

    // 跳至首页
    factory.goToFirstPage = function(gridCfg) {
        if (gridCfg.searched && gridCfg.paging.pageNo > 1) {
            gridCfg.paging.pageNo = 1;
            this.reloadData(gridCfg);
        }
    };

    // 跳至上一页
    factory.goToPrevPage = function(gridCfg) {
        if (gridCfg.searched && gridCfg.paging.pageNo > 1) {
            gridCfg.paging.pageNo = gridCfg.paging.pageNo - 1;
            this.reloadData(gridCfg);
        }
    };

    // 跳至下一页
    factory.goToNextPage = function(gridCfg) {
        if (gridCfg.searched && gridCfg.paging.pageNo < gridCfg.paging.totalPage) {
            gridCfg.paging.pageNo = gridCfg.paging.pageNo + 1;
            this.reloadData(gridCfg);
        }
    };

    // 跳至尾页
    factory.goToEndPage = function(gridCfg) {
        if (gridCfg.searched && gridCfg.paging.pageNo < gridCfg.paging.totalPage) {
            gridCfg.paging.pageNo = gridCfg.paging.totalPage;
            this.reloadData(gridCfg);
        }
    };
    return factory;
}]);

/*
* 配置对象：
grid{
    cofing:{ // 配置参数
        showLineNo:true,                    // 是否显示行号，默认true
        showChecked:false,                  // 是否显示checkbox，默认false
        singleChecked:false,                // 是否单选，有checkbox默认false，否则默认true
        showPaging:true,                    // 是否显示分页导航，默认true
        initSearch:true,                    // 是否初始化查询，默认true
        url:path+"/logs/services/search",   // 请求数据url
        params : {}                         // 请求数据url中的参数
    },
    columns:[{              // 显示的列
        bind:'caller',      // 列绑定字段
        title:'服务调用者', // 列标题
        style:'',           // 样式
        class:'',           // css样式表
        filter:''/function  // 字符串表示已注册的过滤器名字，function表示调用该函数
    }],
    paging:{
        pageSize:20 // 每页显示的记录数，默认是20
    },
    data:[]   //初始化数据
}
*
*/
fangular.directive("fGrid", ['fGridHelper', function(fGridHelper) {
    // 验证并设置初始化参数
    var checkAndInitCfg = function(gridCfg) {
        // 验证配置参数
        if (angular.isUndefined(gridCfg)) {
            throw new Error("配置参数grid不可以为空！");
        }
        if (angular.isUndefined(gridCfg.config)) {
            throw new Error("配置参数grid.config不可以为空！");
        }
        // 初始化参数
        fGridHelper.initParam(gridCfg);
    };
    return {
        restrict: 'EA',
        replace: true,
        scope: {
            _grid: "=grid"
        },
        template: function(tElement, tAttrs) {
            return fGridHelper.createTableTplHtml("_grid", tElement, tAttrs);
        },
        link: function($scope, $element, $attrs) {
            checkAndInitCfg($scope._grid);

            // 注入查询方法
            $scope._grid.search = function(params) {
                fGridHelper.searchData($scope._grid, params);
            };

            // 注入重载方法
            $scope._grid.reload = function() {
                fGridHelper.reloadData($scope._grid);
            };

            // 注入获取已选择项
            $scope._grid.getSelectionItems = function() {
                return fGridHelper.getSelectionItems($scope._grid);
            };

            // 全选
            $scope.selectAllItemsHandler = function() {
                fGridHelper.selectAllItemsHandler($scope._grid);
            }

            // 改变分页大小
            $scope.changePageSize = function() {
                fGridHelper.reloadData($scope._grid);
            };

            // 改变页码
            $scope.changePageNo = function() {
                fGridHelper.reloadData($scope._grid);
            };

            // 跳至首页
            $scope.goToFirstPage = function() {
                fGridHelper.goToFirstPage($scope._grid);
            };

            // 跳至上一页
            $scope.goToPrevPage = function() {
                fGridHelper.goToPrevPage($scope._grid);
            };

            // 跳至下一页
            $scope.goToNextPage = function() {
                fGridHelper.goToNextPage($scope._grid);
            };

            // 跳至尾页
            $scope.goToEndPage = function() {
                fGridHelper.goToEndPage($scope._grid);
            };

            // 点击行前checkbox
            $scope.checkboxClickHandler = function(item, e) {
                fGridHelper.selectItemHandler($scope._grid, item);
                if (e && e.stopPropagation) {
                    e.stopPropagation();
                } else {
                    window.event.cancelBubble = true;
                }
            }

            // 点击行
            $scope.rowClickHandler = function(item) {
                item.checked = !item.checked;
                fGridHelper.selectItemHandler($scope._grid, item);
            }

            // 初始化查询数据
            if ($scope._grid.config.initSearch === true) {
                var param = ($scope._grid.config && $scope._grid.config.params) || {}
                $scope._grid.search(param);
            }
        }
    };
}]);
/**
 * 过滤器反射
 */
fangular.filter('injectFilter', ['$filter', function($filter) {
    return function(data, filter) {
        if (typeof filter === 'function') {
            return filter(data);
        } else if (typeof filter === 'string') {
            return $filter(filter)(data);
        } else {
            return data;
        }
    }
}]);
fangular.filter('trustHtmlFilter', ['$sce', function($sce) {
    return function(data) {
        if (data == null || data == undefined){
            return data;
        }
        if(!angular.isString(data)){
            data = data + '';
        }
        return $sce.trustAsHtml(data);
    }
}]);

// 查询区域容器，主要为了控制与上下的分区线
/*
 * 导致AngularJs数据域问题，在页面直接使用div，
 * 设置class="query-region"
 */
// fangular.directive('fQueryRegion', function() {
//     return {
//         restrict: 'EA',
//         replace: true,
//         transclude: true,
//         scope: true,
//         template: '<div class="query-region" ng-transclude></div>'
//     }
// });
// 工具栏容器，可配置查询、重置按钮
/*
 配置属性：
 {
    search：查询按钮事件，为空则不显示查询按钮
    reset：重置按钮事件，为空则不显示重置按钮
 }
 */
fangular.directive('fToolbar', function() {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        scope: {
            search: "=fSearch",
            reset: "=fReset"
        },
        template: function(tElement, tAttrs) {
            var hasSearch = angular.isDefined(tAttrs.fSearch);
            var hasReset = angular.isDefined(tAttrs.fReset);
            var _html = "";
            _html = _html + '<div class="toolbar">';
            _html = _html + '<div class="toolbar-left" ng-transclude></div>';

            if (hasSearch || hasReset) {
                _html = _html + '<div class="toolbar-right">';
                if (hasSearch) {
                    _html = _html + '  <span><button class="btn btn-danger btn-search" type="button" ng-click="search()">查&nbsp;&nbsp;询</button></span>';
                }
                if (hasReset) {
                    _html = _html + '  <span><button class="btn btn-danger btn-reset" type="button" ng-click="reset()">重&nbsp;&nbsp;置</button></span>';
                }
                _html = _html + '</div>';
            }

            _html = _html + '</div>';
            return _html;
        }
    }
});
// 工具栏业务按钮，其他增删改查等按钮
/*
 * 配置属性：
 * {
 *    handler：按钮事件
 *    text：按钮名称
 *    class : 按钮样式表
 * }
 */
fangular.directive('fToolbarButton', function() {
    return {
        require: '^?fToolbar',
        restrict: 'EA',
        replace: true,
        scope: {
            handler: "=fHandler",
            text: "=fText",
            css: "=fCss"
        },
        template: '<span><button class="btn btn-info btn-view {{css}}" type="button" ng-click="clickHandler()">{{text}}</button></span>',
        link: function($scope, $element, $attrs, $controller) {
            $scope.clickHandler = function() {
                $scope.$parent[$scope.handler]();
            }
        }
    }
});
// 工具栏普通按钮，为了适应自定义使用
/*
 * 配置属性：
 * {
 *    id：唯一标识
 *    text：按钮名称
 *    class : 按钮样式表
 * }
 */
fangular.directive('fToolbarNormalButton', function() {
    return {
        require: '^?fToolbar',
        restrict: 'EA',
        replace: true,
        scope: {
            id: "=fId",
            text: "=fText",
            css: "=fCss"
        },
        template: '<span><button class="btn btn-info btn-view {{css}}" type="button" id="{{id}}">{{text}}</button></span>'
    }
});