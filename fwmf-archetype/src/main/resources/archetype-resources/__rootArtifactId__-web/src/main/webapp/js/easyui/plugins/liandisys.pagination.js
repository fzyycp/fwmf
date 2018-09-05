(function($) {
    function _1(_2) {
        var _3 = $.data(_2, "pagination");
        var _4 = _3.options;
        var bb = _3.bb = {};
        var _5 = $(_2).addClass("page").html("<p type='displayText'></p>");
        var tr = _5.find("p");
        var trr=$("<div style='float:right;margin-top:12px; margin-right:20px;border:none;'></div>").insertAfter(tr);
        buildButton(_4,trr,bb,_2);
        $("<div style=\"clear:both;\"></div>").appendTo(_5);
    };
    
    function buildButton(_4,tr,bb,_2){
        function _6(_7) {
            var _8 = _4.nav[_7];
            var a=$("<input type='button' itemName='"+_7+"' value='"+_8.text+"' class='page_button01'/>").appendTo(tr);
            a.bind("click",function(){
                _8.handler.call(_2);
            });
            return a;
        };

        bb.last = _6("last");
        bb.next = _6("next");
        bb.prev = _6("prev");
        bb.first = _6("first");
    }
    
    function _b(_c, _d) {
        var _e = $.data(_c, "pagination").options;
        var _f = Math.ceil(_e.total / _e.pageSize) || 1;
        _e.pageNumber = _d;
        if (_e.pageNumber < 1) {
            _e.pageNumber = 1;
        }
        if (_e.pageNumber > _f) {
            _e.pageNumber = _f;
        }
        _10(_c, {
            pageNumber: _e.pageNumber
        });
        _e.onSelectPage.call(_c, _e.pageNumber, _e.pageSize);
    };
    function _10(_11, _12) {
        var options = $.data(_11, "pagination").options;
        var bb = $.data(_11, "pagination").bb;
        $.extend(options, _12 || {});
        
        var _14 = Math.ceil(options.total / options.pageSize) || 1;
        var displayMsg = options.displayMsg;
        displayMsg = displayMsg.replace(/{from}/, options.total == 0 ? 0 : options.pageSize * (options.pageNumber - 1) + 1);
        displayMsg = displayMsg.replace(/{to}/, Math.min(options.pageSize * (options.pageNumber), options.total));
        displayMsg = displayMsg.replace(/{total}/, options.total);
        displayMsg = displayMsg.replace(/{pages}/, options.total == 0 ? 0 : options.pageNumber);
        displayMsg = displayMsg.replace(/{pageSize}/, options.pageSize);
        displayMsg = displayMsg.replace(/{pageSizeSelect}/, buildSelected(options));
        displayMsg = displayMsg.replace(/{pageInput}/, buildPageInput(options));
        displayMsg = displayMsg.replace(/{pageTotal}/, Math.ceil(options.total/options.pageSize));
        $(_11).find("p[type=displayText]").html(displayMsg);
        
        var ps=$(_11).find("select.pagination-page-list");
        if (ps.length) {
            ps.bind("change",
                function() {
                options.pageSize = parseInt($(this).val());
                options.onChangePageSize.call(_11, options.pageSize);
                    _b(_11, options.pageNumber);
            });
            ps.val(options.pageSize + "");
            options.pageSize = parseInt(ps.val());
        }
        ps=$(_11).find("select.pagination-page-selected");
        if (ps.length) {
            ps.bind("change",
                function() {
                $(_11).pagination("select", $(this).val());
            });
            ps.val(options.pageNumber + "");
        }
        if(options.pageNumber == 1){
            refreshBtn(bb.first,true,options,_11);
            refreshBtn(bb.prev,true,options,_11);
        }else{
            refreshBtn(bb.prev,false,options,_11);
            refreshBtn(bb.first,false,options,_11);
        }
        if(options.pageNumber == _14){
            refreshBtn(bb.last,true,options,_11);
            refreshBtn(bb.next,true,options,_11);
        }else{
            refreshBtn(bb.last,false,options,_11);
            refreshBtn(bb.next,false,options,_11);
        }
        _16(_11, options.loading);
    };
    /**
     * 刷新按钮
     * btn:按钮组件
     * dised:是否禁用,true为禁用，false为不禁用
     * options:分页组件参数
     * me:
     */
    function refreshBtn(btn,dised,options,me){
        if(dised){
            btn.removeClass('page_button01');
            btn.addClass('page_button02');
            btn.unbind('click');
        }else{
            btn.removeClass('page_button02');
            btn.addClass('page_button01');
            var navTemp = options.nav[btn.attr('itemName')];
            btn.unbind('click');
            btn.bind("click",function(){
                navTemp.handler.call(me);
            });
        }
    }
    /**
     * 生成每页显示多少条的选择框
     */
    function buildSelected(options){
        var ps = "<select class=\"pagination-page-list\">";
        for (var i = 0; i < options.pageList.length; i++) {
            ps+="<option value='"+options.pageList[i]+"'>"+options.pageList[i]+"</option>";
        }
        ps+='</select>';
        return ps;
    }
    /**
     * 生成页码选择框
     */
    function buildPageInput(options){
        var ps = "<select class=\"pagination-page-selected\">";
        for (var i = 1; i <= Math.ceil(options.total/options.pageSize); i++) {
            ps+="<option value='"+i+"'>"+i+"</option>";
        }
        ps+='</select>';
        return ps;
    }
    function _16(_17, _18) {
        var _19 = $.data(_17, "pagination").options;
        var bb = $.data(_17, "pagination").bb;
        _19.loading = _18;
    };
    $.fn.pagination = function(_1a, _1b) {
        if (typeof _1a == "string") {
            return $.fn.pagination.methods[_1a](this, _1b);
        }
        _1a = _1a || {};
        return this.each(function() {
            var _1c;
            var _1d = $.data(this, "pagination");
            if (_1d) {
                _1c = $.extend(_1d.options, _1a);
            } else {
                _1c = $.extend({},
                $.fn.pagination.defaults, $.fn.pagination.parseOptions(this), _1a);
                $.data(this, "pagination", {
                    options: _1c
                });
            }
            _1(this);
            _10(this);
        });
    };
    $.fn.pagination.methods = {
        options: function(jq) {
            return $.data(jq[0], "pagination").options;
        },
        loading: function(jq) {
            return jq.each(function() {
                _16(this, true);
            });
        },
        loaded: function(jq) {
            return jq.each(function() {
                _16(this, false);
            });
        },
        refresh: function(jq, _1e) {
            return jq.each(function() {
                _10(this, _1e);
            });
        },
        select: function(jq, _1f) {
            return jq.each(function() {
                _b(this, _1f);
            });
        }
    };
    $.fn.pagination.parseOptions = function(_20) {
        var t = $(_20);
        return $.extend({},
        $.parser.parseOptions(_20, [{
            total: "number",
            pageSize: "number",
            pageNumber: "number"
        },
        {
            loading: "boolean",
            showPageList: "boolean",
            showRefresh: "boolean"
        }]), {
            pageList: (t.attr("pageList") ? eval(t.attr("pageList")) : undefined)
        });
    };
    $.fn.pagination.defaults = {
        total: 1,
        pageSize: 10,
        pageNumber: 1,
        pageList: [10, 20, 30, 50],
        loading: false,
        buttons: null,
        showPageList: true,
        showRefresh: true,
        onSelectPage: function(_21, _22) {},
        onBeforeRefresh: function(_23, _24) {},
        onRefresh: function(_25, _26) {},
        onChangePageSize: function(_27) {},
        beforePageText: "Page",
        afterPageText: "of {pages}",
        displayMsg: common.msg.pagination,
        nav: {
            first: {
                iconCls: "pagination-first",
                text: common.btn.homePage,
                handler: function() {
                    var _28 = $(this).pagination("options");
                    if (_28.pageNumber > 1) {
                        $(this).pagination("select", 1);
                    }
                }
            },
            prev: {
                iconCls: "pagination-prev",
                text: common.btn.prePage,
                handler: function() {
                    var _29 = $(this).pagination("options");
                    if (_29.pageNumber > 1) {
                        $(this).pagination("select", _29.pageNumber - 1);
                    }
                }
            },
            next: {
                iconCls: "pagination-next",
                text:common.btn.nextPage,
                handler: function() {
                    var _2a = $(this).pagination("options");
                    var _2b = Math.ceil(_2a.total / _2a.pageSize);
                    if (_2a.pageNumber < _2b) {
                        $(this).pagination("select", parseInt(_2a.pageNumber) + 1);
                    }
                }
            },
            last: {
                iconCls: "pagination-last",
                text:common.btn.endPage,
                handler: function() {
                    var _2c = $(this).pagination("options");
                    var _2d = Math.ceil(_2c.total / _2c.pageSize);
                    if (_2c.pageNumber < _2d) {
                        $(this).pagination("select", _2d);
                    }
                }
            },
            refresh: {
                iconCls: "pagination-refresh",
                handler: function() {
                    var _2e = $(this).pagination("options");
                    if (_2e.onBeforeRefresh.call(this, _2e.pageNumber, _2e.pageSize) != false) {
                        $(this).pagination("select", _2e.pageNumber);
                        _2e.onRefresh.call(this, _2e.pageNumber, _2e.pageSize);
                    }
                }
            }
        }
    };
})(jQuery);