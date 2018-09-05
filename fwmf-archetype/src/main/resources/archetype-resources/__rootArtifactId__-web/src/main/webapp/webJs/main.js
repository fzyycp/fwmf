$.namespace("main");
main.showExit = function() {
    layer.confirm('是否确认退出？', {
        icon: 3,
        title:'提示',
        btn: ['确认','取消'] //按钮
    }, function(index){
        layer.close(index);
        window.location.href = $.ctx+"/logout";
    }, function(index){
        layer.close(index);
    });
};
main.showChangePwd = function() {
    layer.open({
        type: 2,
        title: '修改密码',
        area: ['400px', '300px'],
        fix: false, //不固定
        maxmin: false,
        content: $.ctx + '/password'
    });
};
main.open = function (url) {
    document.getElementById("mainFrame").src = url;
}

// 加载菜单树
try {
    $.ajax({
        url: $.ctx + "/getMenuTree",
        method: 'post',
        async: false,
        success: function (data) {
            var str = "<ul>";
            for (var i = 0; i < data.length; i++) {
                str += '<li class="has-sub">';
                str += '    <a href="javascript:;" class="">';
                str += '        <i class="fa fa-bookmark-o fa-fw"></i>';
                str += '        <span class="menu-text">' + data[i].text + '</span>';
                str += '        <span class="arrow"></span>';
                str += '    </a>';
                str += '    <ul class="sub">';
                var childs = data[i].children;
                for (var j = 0; j < childs.length; j++) {
                    var text = childs[j].text;
                    var url = $.ctx + childs[j].id;
                    str += '<li>';
                    str += '    <a class="" href="javascript:main.open(\'' + url + '\')">';
                    str += '        <span class="sub-menu-text">' + text + '</span>';
                    str += '    </a>';
                    str += '</li>';
                }
                str += '    </ul>';
                str += '</li>';
            }
            str += '</ul>';
            $('.sidebar-menu').append(str);
        }
    });
} catch(e){
    layer.alert('菜单加载失败,请刷新重试',{icon:2});
}