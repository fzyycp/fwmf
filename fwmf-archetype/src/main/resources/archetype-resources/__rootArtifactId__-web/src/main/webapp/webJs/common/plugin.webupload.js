$.fn.webUploadFile = function (opts, paras) {
    if (typeof opts == "string") {
        return $.fn.webUploadFile.methods[opts](this, paras);
    } else {
        opts = opts || {};
        opts.item = this;
        common.plugins.webUploadFile.init(opts);
    }
};

$.fn.webUploadFile.methods = {
    show: function (me) {
        me.data('outerDiv').show();
    },
    hide: function (me) {
        me.data('outerDiv').hide();
    },
    upload: function (me, params) {
        var webuploader = me.data('webuploader');
        webuploader.once('uploadStart', params.beforeFn);
        webuploader.upload();
        webuploader.once('uploadSuccess', params.successFn);
    },
    isEmpty: function (me) {
        var webuploader = me.data('webuploader');
        return isEmpty(me.val()) && webuploader.getFiles("inited").length == 0;
    },
    getFilename: function (me) {
        var files = me.data('webuploader').getFiles("inited");
        if (files.length > 0) {
            return files[0].name;
        } else {
            return "";
        }
    }
};

$.namespace("common.plugins.webUploadFile");

common.plugins.webUploadFile.init = function (opts) {
    var me = opts.item;
    if (me) {
        if (!isEmpty(me.val())) {
            if (!isEmpty(opts.pathPrefix)) {
                opts.url = opts.pathPrefix + me.val()
            } else {
                opts.url = me.val();
            }
        }
    }
    if (!isEmpty(opts.url) && !opts.mode) {
        opts.mode = "edit";
    }
    me.data("opts", opts);
    var totleWidth = me.outerWidth();
    var isHide = me.is(":hidden");
    me.hide();
    var outerDiv = $("<span>").insertBefore(me).css("position", "relative").width(totleWidth);
    if (isHide) {
        outerDiv.hide();
    }
    me.data("outerDiv", outerDiv);
    var displayItem = $("<input>").attr("type", "text").attr("readonly", "readonly").css("padding-right","90px").css("width", "100%").appendTo(outerDiv);
    if (opts.required) {
        displayItem.addClass("easyui-validatebox").attr("data-options", "required:true");
    }
    var hideFrame = $("<iframe></iframe>").appendTo(me).hide();
    var clrBtn = $("<input>").addClass("pup_button01").attr("type", "button").attr("value", "清除")
        .css("position", "absolute").css("margin", "0px").css("right", "1px")
        .insertAfter(displayItem).click(function () {
            common.plugins.webUploadFile.clear(me, displayItem, selBtn, viewBtn, downBtn);
        });
    var selBtn = $("<input>").addClass("pup_button01").attr("type", "button").attr("value", "上传")
        .css("position", "absolute").css("margin", "0px").css("right", (clrBtn.outerWidth() + 3) + "px")
        .insertAfter(clrBtn).click(function () {
            common.plugins.webUploadFile.upload(me);
        });
    var viewBtn = $("<input>").addClass("pup_button01").attr("type", "button").attr("value", "查看")
        .css("position", "absolute").css("margin", "0px").css("right", (clrBtn.outerWidth() + 3) + "px")
        .insertAfter(selBtn).click(function () {
            return false;
        })
        .mouseenter(function (e) {
            showImageGrid(opts.url, e)
        })
        .mouseleave(function (e) {
            hideImageGrid(opts.url, e)
        });
    var downBtn = $("<input>").addClass("pup_button01").attr("type", "button").attr("value", "下载")
        .css("position", "absolute").css("margin", "0px").css("right", (clrBtn.outerWidth() + 3) * 2 + "px")
        .insertAfter(viewBtn).click(function () {
            common.plugins.webUploadFile.download(opts.url, hideFrame);
        });

    var uploadDivId = "__" + me.attr("id") + "_uploadDiv";
    var fileUplaodDiv = $("<div>").attr("id", uploadDivId).insertAfter(downBtn).hide();
    me.data("fileUplaodDiv", fileUplaodDiv);

    var pageSize = 1048576;
    var webuploader = WebUploader.create({
        pick: {
            id: "#" + uploadDivId,
            multiple: false
        },
        server: opts.uploading,
        resize: false,
        chunked: true,
        chunkSize: pageSize,
        chunkRetry: 5,
        threads: 1
    });

    webuploader.on("beforeFileQueued", function () {
        var files = webuploader.getFiles("inited");
        $.each(files, function (index, file) {
            webuploader.removeFile(file, true);
        })
    });

    webuploader.on("fileQueued", function (file) {
        displayItem.val(file.name);
    });

    webuploader.on("uploadStart", function () {
        $.messager.progress({
            title: "提示",
            msg: "文件上传中...",
            interval: 0
        });
    });

    webuploader.on("uploadProgress", function (file, percentage) {
        $.messager.progress("bar").progressbar('setValue', (percentage * 100).toFixed(2));
    });

    webuploader.on("uploadBeforeSend", function (obj, data) {
        $.extend(data, obj.file.params);
    });

    webuploader.on("uploadAccept", function (obj, ret) {
        $.extend(obj.file.params, ret);
        return true;
    });

    webuploader.on("uploadComplete", function () {
        $.messager.progress("close");
    });

    me.data("webuploader", webuploader);

    var topOffset = (outerDiv.height() - clrBtn.outerHeight()) / 2;
    clrBtn.css("top", topOffset + "px");
    selBtn.css("top", topOffset + "px");
    viewBtn.css("top", topOffset + "px");
    downBtn.css("top", topOffset + "px");

    me.data("clrBtn", clrBtn);
    me.data("selBtn", selBtn);
    me.data("viewBtn", viewBtn);
    me.data("downBtn", downBtn);
    me.data("displayItem", displayItem);

    me.change(function (e) {
        try {
            displayItem.val(e.target.files.item(0).name);
        } catch (e) {
        }
    });

    if (opts.mode == "view") {
        selBtn.hide();
        clrBtn.hide();
        if (opts.url) {
            viewBtn.css("right", "1px");
            downBtn.css("right", (viewBtn.outerWidth() + 3) + "px");
            displayItem.val(opts.url.substr(opts.url.lastIndexOf('/') + 1));
        } else {
            viewBtn.hide();
            downBtn.hide();
        }
    } else if (opts.mode == "edit") {
        selBtn.hide();
        if (opts.url) {
            displayItem.val(opts.url.substr(opts.url.lastIndexOf('/') + 1));
        }
    } else {
        viewBtn.hide();
        downBtn.hide();
    }
};
common.plugins.webUploadFile.upload = function (me) {
    me.data("fileUplaodDiv").find("input:file").click();
};

common.plugins.webUploadFile.clear = function (me, displayItem, selBtn, viewBtn, downBtn) {
    me.val("");
    displayItem.val("");
    selBtn.show();
    viewBtn.hide();
    downBtn.hide();
    var webuploader = me.data('webuploader');
    var files = webuploader.getFiles("inited");
    $.each(files, function (index, file) {
        webuploader.removeFile(file, true);
    })
};

common.plugins.webUploadFile.download = function (url, hideFrame) {
    hideFrame[0].src = $.ctx + "/common/file/downFile?url=" + url;
};

function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    return s.join("");
}