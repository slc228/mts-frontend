var debug = true;
var indexPage = "index";

function Alert(message) {
    if (debug) {
        console.log(message);
        alert(message);
    }
}

function Print(message) {
    if (debug) {
    //    console.trace(message);
        console.log(message);
        //   alert(message);
    }
}

function ShowMessage(message) {
    layer.msg(message, {
        time: 2000, //20s后自动关闭
    });
}

function ShowConfirm(title, message, confirm) {
    layer.confirm(message, { icon: 3, title: title }, function (index) {

        if (confirm != null) {
            confirm();
        }
        layer.close(index);
    });
}

function Request(url, data, successCallBack, errorCallBack) {
    HttpRequest("post", url, "json", data, successCallBack, errorCallBack);
}

function UploadData(url, data, successCallBack, errorCallBack) {
    console.log(url);
    console.log(data);
    $.ajax({
        url: url,
        type: "POST",
        cache: false,
        data: data,
        processData: false,
        contentType: false,
        /*   beforeSend: function (xhr) {
               xhr.setRequestHeader("organId:'1333333333'");
           },*/
        headers: {
         //   "Content-Type": "multipart/form-data"//,
         //   "Authorization": window.localStorage.getItem("token")
        },
        done: function (r) {
            Print("upload done!");
            Print(r);
            //    Print(typeof r);
            //    Print(r.constructor);
            if (successCallBack != null) {
                var data = r;
                if (typeof r == 'string' && r.constructor == String) {
                    try {
                        data = JSON.parse(r);
                    } catch (error) {
                    }
                }
                successCallBack(data);
            }
        },
        fail: function (r) {
            Print("upload fail!");
            if (errorCallBack != null) {
                errorCallBack(r);
            } else {
                Print(r);
                if (r == "Unauthorized") {
                    Print(window.location);
                    Print(window.location.url);
                    window.parent.location.replace("index.html");
                }
            }
        },
        success: function (r) {
            Print("upload success!");
            Print(r);
            //    Print(typeof r);
            //    Print(r.constructor);
            if (successCallBack != null) {
                var data = r;
                if (typeof r == 'string' && r.constructor == String) {
                    try {
                        data = JSON.parse(r);
                    } catch (error) {
                    }
                }
                successCallBack(data);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            Print("upload error!");
            if (errorCallBack != null) {
                errorCallBack(XMLHttpRequest.responseText, textStatus, errorThrown, XMLHttpRequest);
            } else {
                Print(XMLHttpRequest);
                Print(textStatus);
                Print(errorThrown);
                if (errorThrown == "Unauthorized") {
                    Print(window.location);
                    Print(window.location.url);
                    window.parent.location.replace("index.html");
                }
            }
        }
    });
}

function HttpRequest(type, url, datType, data, successCallBack, errorCallBack) {
 //   Print(window.localStorage.getItem("token"));
    Print(data);

    $.ajax({
        type: type,
        url: url,
        datType: datType,
        //    contentType: "application/json",
        /*   beforeSend: function (xhr) {
               xhr.setRequestHeader("organId:'1333333333'");
           },*/
        headers: {
            'Content-Type': 'application/json',//'application/json;charset=utf8'
            "Authorization": window.localStorage.getItem("token")
        },
        data: JSON.stringify(data),
        success: function (r) {
            Print(r);
            //    Print(typeof r);
            //    Print(r.constructor);
            if (successCallBack != null) {
                var data = r;
                if (typeof r == 'string' && r.constructor == String) {
                    try {
                        data = JSON.parse(r);
                    } catch (error) {
                    }
                }
                successCallBack(data);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            if (errorCallBack != null) {
                errorCallBack(XMLHttpRequest.responseText, textStatus, errorThrown, XMLHttpRequest);
            } else {
                Print(XMLHttpRequest);
                Print(textStatus);
                Print(errorThrown);
                if (errorThrown == "Unauthorized") {
                    Print(window.location);
                    Print(window.location.url);
                    window.parent.location.replace("index.html");
                }
            }
        }
    });
}



function DeleteRequest(url, data, successCallBack, errorCallBack) {
    HttpRequest("delete", url, "json", data, successCallBack, errorCallBack);
}

function Put(url, data, successCallBack, errorCallBack) {
    HttpRequest("put", url, "json", data, successCallBack, errorCallBack);
}

function Get(url, data, successCallBack, errorCallBack) {
    HttpRequest("get", url, "json", data, successCallBack, errorCallBack);
}

function QueryString() {
    var pathName = window.location.toString();
    let index = pathName.indexOf("?");
    let parameters = {};

    if (index >= 0) {
        pathName = pathName.substring(pathName.indexOf("?") + 1, pathName.length);

        while (pathName.length > 0) {
            index = pathName.indexOf("=");
            if (index >= 0) {
                let key = pathName.substring(0, index);
                let value;
                pathName = pathName.substring(index + 1, pathName.length);
                index = pathName.indexOf("&");
                if (index >= 0) {
                    value = pathName.substring(0, index);
                    pathName = pathName.substring(index + 1, pathName.length);
                } else {
                    value = pathName;
                    pathName = "";
                }
                parameters[key] = decodeURIComponent(value);
            } else {
                pathName = "";
                break;
            }
        }
    }

    return parameters;
}

function GetPagePath() {
    var pathName = window.document.location.pathname;
    pathName = pathName.substring(1, pathName.length);
    return "/" + pathName.substring(0, pathName.indexOf('/') + 1);
}
//var pagePath = GetPagePath() + "Page/";


var rule = /^[0-9]*[1-9][0-9]*$/;

function ValidNumber(id, value, message) {
    //获取input输入的值
    if (value.length > 0
        && !rule.test(value)) {
        $("#" + id).val("");
        ShowMessage(message);
    }
}

function ShowSubMenu(id) {
    $("[name='MenuItems']").each(function (index) {
        if ($(this).attr("id") != id) {
            $(this).removeClass("layui-nav-itemed");
        }
    });
    $("#" + id).addClass("layui-nav-itemed");
}

function LoadLayout(id) {
    $("#Layout").load("Layout.html", function () {
        layui.use('element', function () {
            var element = layui.element;
            if (id != null) {
                $("#" + id).addClass("layui-nav-itemed");
            }
            element.init();

            let role = window.localStorage.getItem("role");
            if (role != "ADMIN") {
                $("#MaintainanceItems").hide();
            }

            let name = window.localStorage.getItem("user");
            if (name == "") 
                $(window).attr('location', 'Index.html');
            else
                $("#userNameDiv").text(name);
            
        });
    });
}

function RenderTableCheckBoxColumn(table, tableName, selectedItems) {
    table.on('checkbox(' + tableName + ')', function (obj) {
        // var checkStatus = table.checkStatus('dataTable');
        // alert(JSON.stringify(checkStatus.data));
        if (obj.type == 'all')//全选
        {
            if (obj.checked) {
                var checkStatus = table.checkStatus(tableName);
                for (var i = 0; i < checkStatus.data.length; i++) {
                    if (selectedItems.indexOf(checkStatus.data[i].ID) < 0)
                        selectedItems.push(checkStatus.data[i].ID);
                }
                //   alert(selectedItems);
            } else {
                selectedItems = [];
            }
        }
        else {
            if (obj.checked) {
                if (selectedItems.indexOf(obj.data.ID) < 0)
                    selectedItems.push(obj.data.ID);
                //    alert(obj.data.ID);
            } else {
                selectedItems.splice(selectedItems.indexOf(obj.data.ID), 1);
            }
        }
    });
}

function Trim(text) {
    return text.replace(/(^\s*)|(\s*$)/g, "");
}

function RenderPageBar(pageBar, count, reload) {
    page.render({
        elem: pageBar
        , layout: ['limit', 'limits', 'count', 'prev', 'page', 'next', 'skip'] //自定义分页布局
        //,curr: 5 //设定初始在第 5 页
        , groups: 10 //只显示 1 个连续页码
        , count: count //数据总数，从服务端得到
        , limits: [10, 50, 100, 200, 300] //数据总数，从服务端得到
        , theme: '#1E9FFF'//'#243E62'
        , jump: function (obj, first) {
            if (!first && reload != null) {
                reload(obj.curr, obj.limit);
            }
        }
    });
}

function ShowPanel(name, size, location, content, resizing, success) {
    //    let content = $('#messageTemplate').html().replace(/Template/g, "");
    layer.open({
        title: name,
        area: size,//[($(window).width() * 0.8).toString() + 'px', ($(window).height() * 0.9).toString() + 'px'],
      //  area: ['auto'],
        type: 1,
        content: content, 
        offset: location,//['10px', '10px'],
        closeBtn: 0,
        shade: 0,
        anim: 0,
      //  resize: false,
        maxmin: true,
        resizing: resizing,
        success: success
    });
}

function ShowModelDialog(title, width, height, content, success, yes, btn) {
    layer.open({
        title: title
        , area: [width, height]
        , content: content
        , resize: false
        , type: 1
        , btnAlign: 'c'
        , success: success
        , btn: btn//['确定','取消']
        , yes: function (index, layero) {
            if (yes != null) {
                yes(index, layero);
            }
        }, cancel: function (index, layero) {
            layer.close(index);
        }
    });
}


function ShowModelFrame(url, title, success, yes) {
    layer.open({
        title: title,
        area: [($(window).width() * 0.97).toString() + 'px', ($(window).height() * 0.96).toString() + 'px'],
        type: 2,
        content: [url, 'yes'],
        fixed: true,
        yes: yes,
        success: success/*function (layero, index) {
           let iframeWin = layero.find('iframe')[0];
           Print(iframeWin.contentWindow);
        }*/

    });
}

function RenderUpload(id, url, accept, acceptMime, exts, multiple, autoUpload, choose, preview, before, done, allDone, error) {
    upload.render({
        elem: id //绑定元素
        , url: url //上传接口
        , multiple: multiple
        , auto: autoUpload
        , accept: accept
        , acceptMime: acceptMime
        , exts: exts
        , choose: function (obj) {

            var files = obj.pushFile();
            console.log(files);

            if (choose != null) {
                choose(obj);
            }

            obj.preview(preview);
        }
        , before: before
        , done: done
        , allDone: allDone
        , error: error
    });
}
