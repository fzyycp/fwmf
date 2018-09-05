/**
 * easyUI弹出框公共方法
 * 作者：田尚坤
 */
var liandisys={};
liandisys.dialog={
	/**
	 * 弹出一个iframe窗体
	 * @param option{
	 * 	url:iframe嵌入的地址
	 * 	width：宽度默认600
	 * 	height:高度默认400
	 * 	resizable：是否允许改变大小默认TRUE
	 * 	title:标题
	 *  onBeforeClose: 关闭前的事件
	 * 	onClose：关闭后的事件
	 * 	onLoad:窗体打开时的事件
	 * }
	 */
	showWindowById:function(option){
	    option=option || {};
	    var name=option.itemId || 'liandisys-window';
	    $("#"+name).remove();
	    
	    var html = '<div class="easyui-window"  id="'+name+'">' +
	    
	    '</div>';
	    $(document.body).append(html);
	    $("#"+name).dialog({
			width:option.width || 600,   
			height:option.height || 400,
	        top : option.top || 'auto',
			href:option.href,
	        autoOpen: false,
	        closable:true,
			draggable:true,
			resizable:option.resizable || false,
	        modal: option.resizable || true,
	        cache: false,
	        show: {
	            effect: 'fade',
	            duration: 300
	        },
	        title: option.title || "liandisys",
	        onClose:option.onClose,
	        onLoad:option.onLoad
	    });
	    $("#"+name).dialog("open");
	    if (option.top) {
	    	return;
	    }
	    var pos = {};
	    if ($('.data_query').length>0) {
	    	pos.top = $('.data_button').height() + 18;
	    }
	    $("#"+name).window('move', pos);
	},
	/**
	 * 弹出一个已写好窗体
	 * @param option{
	 * 	itemId:自己写的窗体DIV的ID号
	 * 	width：宽度默认600
	 * 	height:高度默认400
	 * 	resizable：是否允许改变大小默认TRUE
	 * 	title:标题
	 * 	onClose：关闭后的事件
	 * 	onLoad:窗体打开时的事件
	 * }
	 */
	showWindowByItem:function(option){
	    if(null==option){
	    	return;
	    }
	    if(!option.item){
	    	return;
	    }
	    var w;
	    if(typeof(option.item)=='string'){
	    	w=$("#"+option.item);
	    }else{
	    	w=option.item;
	    }
	    if(w.length<1){
	    	return;
	    }
	    w.dialog({
			width:option.width || 600,   
			height:option.height || 400,
	        top : option.top || 'auto',
			href:option.href,
	        autoOpen: false,
	        closable:true,
			draggable:true,
			resizable:option.resizable || false,
	        modal: option.resizable || true,
	        cache: false,
	        show: {
	            effect: 'fade',
	            duration: 300
	        },
	        title: option.title || "liandisys",
	        onClose:option.onClose,
	        onLoad:option.onLoad
	    }).dialog('open');
	    if (option.top) {
	    	return;
	    }
	    var pos = {};
	    if ($('.data_query').length>0) {
	    	pos.top = $('.data_button').height() + 18;
	    }
	    w.window('move', pos);
	},
	/**
	 * 消息弹出框
	 * @param title	标题
	 * @param content	消息内容
	 * @param callback	点击确定后执行的事件
	 */
	diaolgMsg:function(title, content,callback) {
	    $("#dialog-message").remove();
	    if ($('#dialog-message').length > 0) {
	        $('#dialog-message')[0].textContent = content;
	        $('#dialog-message').dialog("open");
	        return;
	    }
	    var html = '<div class="easyui-dialog" style="margin-top:5px" id="dialog-message">' +
	    '  <p style="text-align:center">' +
	    '    <span class="ui-icon ui-icon-circle-check" style="float: left; margin: 0 7px 0 0;"></span>' + content +
	    '  </p>' +
	    '</div>';
	    var d = $(html).dialog({
	        autoOpen: false,
	        resizable: true,
	        modal: true,
	        width:260,
	        height:120,
	        cache: false,
	        show: {
	            effect: 'fade',
	            duration: 300
	        },
	        title: title || "提示信息",
	        buttons: [{
	            text:"确定",
	            handler: function() {
	        	if(callback && typeof(callback)=='function'){
	                    callback(true);
	                }
	                $('#dialog-message').dialog("close");
	            }
	        }]
	    });
	    $(d).dialog("open");

	},
	/**
	 * 消息确认框
	 * @param title	标题
	 * @param content	消息内容
	 * @param callback	点击确认后执行的事件
	 */
	confirmMsg:function(title, content, callback) {
	    $("#dialog-message").remove();
	    if ($('#dialog-message').length > 0) {
	        $('#dialog-message')[0].textContent = content;
	        $('#dialog-message').dialog("open");
	        return;
	    }
	    var html = '<div class="dialog" style="margin-top:5px" id="dialog-message">' +
	        '  <p>' +
	        '    <span class="ui-icon ui-icon-alert" style="float: left; margin: 0 7px 0 0;"></span>' + content +
	        '  </p>' +
	        '</div>';
	    var d = $(html).dialog({
	        autoOpen: false,
	        resizable: true,
	        modal: true,
	        cache: false,
	        width:260,
	        height:120,
	        show: {
	            effect: 'fade',
	            duration: 300
	        },
	        title: title || "提示信息",
	        buttons: [
	                  {
	                      text:"确定",
	                      handler: function() {
        	                if (callback) callback(true);
        	                $('#dialog-message').dialog("close");
        	          }
	                  },{
        	            text:"取消",
        	            handler: function() {
        	                $('#dialog-message').dialog("close");
        	            }
	                  }
	        ]
	    });
	    $(d).dialog("open");
	}
};