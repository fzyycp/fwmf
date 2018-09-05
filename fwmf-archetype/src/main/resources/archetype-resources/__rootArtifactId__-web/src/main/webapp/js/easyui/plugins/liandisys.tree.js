/**
 * easyUI tree公共方法
 * 作者：李伟
 */
liandisys.tree={
	
	
	showTree:function(option){

		
	    if(null==option){
	    	return;
	    }
	    if(!option.item){
	    	return;
	    }
	    var item;
	    if(typeof(option.item)=='string'){
	    	item=$("#"+option.item);
	    }else{
	    	item=option.item;
	    }
	    if(item.length<1){
	    	return;
	    }

	    item.tree({
	    	
			url:option.url,
			method :option.method||'post',
			animate : true,  //定义节点在展开或折叠的时候是否显示动画效果。
			checkbox: option.checkbox ||false, //定义是否在每一个借点之前都显示复选框。
			cascadeCheck :option.cascadeCheck || false,  // 定义是否层叠选中状态。  
			onlyLeafCheck : option.onlyLeafCheck||false,  //定义是否只在末级节点之前显示复选框。  
			lines :option.lines||false,   //定义是否显示树控件上的虚线。  
			dnd : option.dnd || false,// 定义是否启用拖拽功能。  
			data : option.data||null, // 节点数据加载。 
		
			
			loadFilter: function(data, parent) {//使其支持平滑数据格式
				var opt =option;
				var idFiled, textFiled, parentField;
				if (opt.parentField) {
					idFiled = opt.idFiled || 'id';
					textFiled = opt.textFiled || 'text';
					parentField = opt.parentField;
					var i, l, treeData = [], tmpMap = [];
					for (i = 0, l = data.length; i < l; i++) {
						tmpMap[data[i][idFiled]] = data[i];
					}
					for (i = 0, l = data.length; i < l; i++) {
						if (tmpMap[data[i][parentField]] && data[i][idFiled] != data[i][parentField]) {
							if (!tmpMap[data[i][parentField]]['children'])
								tmpMap[data[i][parentField]]['children'] = [];
							data[i]['id'] = data[i][idFiled];
							data[i]['text'] = data[i][textFiled];
							tmpMap[data[i][parentField]]['children'].push(data[i]);
						} else {
						}
					}
					for (i = 0, l = data.length; i < l; i++) {
						if (tmpMap[data[i][parentField]] && data[i][idFiled] != data[i][parentField]) {
						} else {
							data[i]['id'] = data[i][idFiled];
							data[i]['text'] = data[i][textFiled];
							treeData.push(data[i]);
						}
					}
					return treeData;
				}
				return data;
			},
			onClick:option.onClick,
			   onClose:option.onClose,
			   onDblClick: option.onDblClick, // 在用户双击一个节点的时候触发。 
			   onBeforeLoad:option.onBeforeLoad,//在请求加载远程数据之前触发，返回false可以取消加载操作。 
			   onLoadSuccess: option.onLoadSuccess, // 在数据加载成功以后触发。 
	
			   onBeforeExpand: option.onBeforeExpand,// 在节点展开之前触发，返回false可以取消展开操作。 
			   onExpand :option.onExpand, // 在节点展开的时候触发。 
			   onBeforeCollapse: option.onBeforeCollapse,// 在节点折叠之前触发，返回false可以取消折叠操作。 
			   onCollapse: option.onBeforeCollapse,// 在节点折叠的时候触发。 
			   onBeforeCheck: option.onBeforeCollapse,// checked 在用户点击勾选复选框之前触发，返回false可以取消选择动作。（该事件自1.3.1版开始可用） 
		
			   onBeforeSelect :option.onBeforeSelect,// 在用户选择一个节点之前触发，返回false可以取消选择动作。 
			   onSelect :option.onSelect,//在用户选择节点的时候触发。

	 
			   onLoadError:function(arguments){ //在数据加载失败的时候触发，arguments参数和jQuery的$.ajax()函数里面的'error'回调函数的参数相同
//				alert(1);
				   $.messager.show({
						title : common.msg.type.error,
						msg : common.msg.fail
					});
				   
				    if( option.onLoadError!=null){
				    	 option.onLoadError();
				    }
//				liandisys.dialog.diaolgMsg(common.msg.type.error, common.msg.fail,option.onLoadError);
//				return false;
			   },
			   
			   
			   
	    
	    onCheck:function(node){
		    if(option.selectedResults){
		    	$(this).find('.tree-node-selected').removeClass('tree-node-selected');
		    }
		    if(option.onCheck!=null){
		    	 option.onCheck(node);
		    }
		   
		},
		  
		onSelect:function(node){
		    if(option.selectedResults){
		    	$(this).find('.tree-node-selected').removeClass('tree-node-selected');
		    }
		    if(option.onSelect!=null){
		    	 option.onSelect(node);
		    }
		}
	    });
	    

	}
};
/**
 * 
 * @requires jQuery,EasyUI
 * 
 * 扩展tree，使其可以获取实心节点
 */
$.extend($.fn.tree.methods, {
	getCheckedExt : function(jq) {// 获取checked节点(包括半选中状态)
		var checked = $(jq).tree("getChecked");
		var checkbox2 = $(jq).find("span.tree-checkbox2").parent();
		$.each(checkbox2, function() {
			var node = $.extend({}, $.data(this, "tree-node"), {
				target : this
			});
			checked.push(node);
		});
		return checked;
	},
	getSolidExt : function(jq) {// 获取半选中状态节点
		var checked = [];
		var checkbox2 = $(jq).find("span.tree-checkbox2").parent();
		$.each(checkbox2, function() {
			var node = $.extend({}, $.data(this, "tree-node"), {
				target : this
			});
			checked.push(node);
		});
		return checked;
	}
});
