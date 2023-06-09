<template>
    <div style="
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: flex-start;
      width: 100vw;
      height: 100%;
    ">
        <div style="
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        width: 90vw;
        height: 100%;
        color: #888888;
        font-size: 0.8vw;
        margin: 0 0 1vw 2vw;
        background-color: #f9f9f95 56;
      ">
            <div class="layui-tab layui-tab-brief" lay-filter="typeTab" style="width: 97%; 
              height:100%; margin: 1vw 0 0 0">
                <ul class="layui-tab-title">
                    <li class="layui-this">
                        预警人员
                    </li>
                    <li>
                        短信模板
                    </li>
                </ul>
                <div class="layui-tab-content" style="height:calc(100% - 80px);">
                    <div class="layui-tab-item layui-show" style="
              flex-direction: row;
              align-items: center;
              justify-content: start;
              width: 100%;
              height:100%;
            ">
                        <div style="
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: start;
              flex-wrap: wrap;
              width: 100%;
              min-height:  1.5vw;
              line-height: 1.5vw;
              margin: 0 0 0.5vw 0;
            ">
                            <div class="button-div" v-on:click="showUser()">添加</div>
                        </div>
                        <table style="margin: 0 0.5vw 0.5vw 0.5vw;" id="receiverTable" lay-filter="receiverTable">
                        </table>
                        <div id="receiverTablePageBar"></div>
                    </div>
                    <div class="layui-tab-item" style="
              flex-direction: row;
              align-items: flex-start;
              justify-content: flex-start;
              width: 100%;
              height:100%;
            ">
                        <div style="
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              justify-content: flex-start;
              width: 100%;
            ">
                            <div style="
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 0.9vw;
    margin: 1vw 0 0 0.5vw;">
                                <div style="
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 0 0.5vw 0 0;">模板中{0}，{1}，{2}为保留字符，其中</div>

                                <div style="
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 0 1vw 0 0;">{0}：方案名称</div>
                                <div style="
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 0 1vw 0 0;">{1}：阈值数量</div>
                                <div style="
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 0 1vw 0 0;">{2}：阈值比例</div>
                            </div>
                            <textarea rows="5" cols="1" placeholder="监测概述" style="
             width: 96%; 
                font-size: 1vw;
    margin: 0.5vw 0 0 0; padding: 0.5vw;" v-model="template"></textarea>
                            <div style="width: 3vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #13227a;
    color: #fff;
    margin: 0 1vw 0 0;
    transition: all ease 500ms;
    cursor: pointer;
    font-size: 0.8vw;
    height:1.5vw;
    padding: 0.3vw 0.5vw 0.3vw 0.5vw;
    margin: 1vw 0 0 0;" v-on:click="saveTemplate()">保存</div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="coverDiv" v-bind:class="{
        showCoverDiv: showUserModel,
    }" v-on:click="hideModel"></div>
    <!--
  <div class="coverDiv" v-bind:class="{
    showCoverDiv:
      showSensitiveWordModel || showContactModel || showMaterialLibrary,
  }" style="z-index: 1099" v-on:click="hideModel"></div>
-->
    <div class="userModel" v-bind:class="{
        showUserModel: showUserModel,
    }">
        <div class="model-title-div">
            <div class="model-title-text-div">{{ userModelTitle }}</div>
            <div class="model-title-close-div" v-on:click="hideModel">
                <img src="yuqing/image/guanbi1.png" class="model-title-close-image" />
            </div>
        </div>
        <div class="model-content-div">
            <div style="
          width: 94%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          margin:1vw 0 0 0;
        ">
                <div style="
          width: 50%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
        ">
                    <input type="text" class="nameInput" v-model="userName" placeholder="请输入人员姓名" />
                </div>
                <div style="
          width: 50%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
        ">
                    <input type="text" class="nameInput" v-model="phone" placeholder="请输入预警手机" />
                </div>
            </div>
        </div>
        <div class="model-buttons-div">
            <div class="model-button-div" v-on:click="saveUser">保存</div>
            <div class="model-button-div" v-on:click="hideModel">取消</div>
        </div>
    </div>

</template>

<style>
.showCoverDiv {
    height: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    opacity: 0.8;
    display: flex;
    background-color: rgba(0, 0, 0, 0.5);
}

.model-checkbox {
    zoom: 150%;
    margin: 0 0.2vw 0 0;
    cursor: pointer;
}

.model-button-div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #13227a;
    color: #fff;
    margin: 0 1vw 0 0;
    transition: all ease 500ms;
    cursor: pointer;
    font-size: 0.7vw;
    padding: 0.5vw 1.2vw 0.5vw 1.2vw;
}

.model-button-div:hover {
    transition: all ease 500ms;
    box-shadow: 2px 2px 5px #888888;
}

.model-buttons-div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 1vw 0 1vw 0;
}

.showTemplateModel {
    top: 2.5%;
    opacity: 1;
    transition: all ease 500ms;
}

.coverDiv {
    position: fixed;
    top: 0;
    left: 0;
    height: 0;
    z-index: 1001;
    opacity: 0;
    transition: all ease 500ms;
    background-clip: border-box;
}

.showCoverDiv {
    height: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    opacity: 0.8;
    display: flex;
    background-color: rgba(0, 0, 0, 0.5);
}

.model-content-div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.model-title-text-div {
    width: 85%;
    margin: 0 0 0 2%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    font-size: 0.9vw;
    font-weight: 600;
}

.model-title-close-div {
    width: 1.5vw;
    height: 1.5vw;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 0 1% 0 0;
}

.model-title-close-div:hover {
    border: #13227a solid 2px;
}

.model-title-close-div:hover .model-title-close-image {
    transition: all ease 500ms;
    content: url(/public/yuqing/image/guanbi3.png);
}

.model-title-close-image {
    height: 45%;
}

.model-title-div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 2.5vw;
    border-bottom: #f8f8f8 solid 2px;
    font-size: 0.8vw;
    font-weight: 500;
}

.model-radio {
    zoom: 150%;
    margin: 0 0.2vw 0 0;
    cursor: pointer;
}

.roleModel {
    position: fixed;
    top: -100%;
    left: 20vw;
    width: 60vw;
    opacity: 0;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 0.7vw;
    transition: all ease 500ms;
    background-color: #fff;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    z-index: 1200;
}

.showNewRoleModel {
    top: 5%;
    opacity: 1;
    transition: all ease 500ms;

}

.nameInput {
    height: 100%;
    width: 80%;
    font-size: 0.7vw;
    border-radius: 2px;
    border: #eee solid 1px !important;
    padding: 0.5vw 1.2vw 0.5vw 1.2vw;
    transition: all ease 500ms;
}

.nameInput:focus {
    transition: all ease 500ms;
    border: #d2d2d2 solid 1px !important;
}

.roleCheckBoxItemDiv {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 0 1vw 0 0;
    font-size: 0.8vw;
    cursor: pointer;
}


.userRadioItemDiv {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 0 1vw 0 0;
    font-size: 0.8vw;
    cursor: pointer;
}


.userModel {
    position: fixed;
    top: -100%;
    left: 20vw;
    width: 60vw;
    opacity: 0;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 0.7vw;
    transition: all ease 500ms;
    background-color: #fff;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    z-index: 1200;
}

.showUserModel {
    top: 5%;
    opacity: 1;
    transition: all ease 500ms;

}

.date-input {
    height: 100%;
    width: 10vw;
    font-size: 0.7vw;
    border-radius: 2px;
    border: #eee solid 1px !important;
    padding: 0 0.2vw 0 0.5vw;
    transition: all ease 500ms;
    margin: 0 1.5vw 0 0.5vw;
}

.date-input:focus {
    transition: all ease 500ms;
    border: #d2d2d2 solid 1px !important;
}
</style>
<script>
/*2px 2px 5px #888;
#41d8d1 
 background-image: linear-gradient(to right,#4364f7,#359FD4,#6fb1fc);
 background-image: linear-gradient(to right,#359FD4,#36B5C8,#25D8AB)
  */
//通过this.$echarts来使用
import { reactive, ref, watch, defineComponent } from "vue";
import Warning from "../model/Warning";
import VueCookies from 'vue-cookies'

export default {
    components: {
    },
    created() {
    },
    mounted() {
        let _this = this;

        window.deleteUser = function (id) {
            _this.deleteUser(id);
        };

        window.showUser = function (id, userName, validDate, role) {
            _this.showUser(id, userName, validDate, role);
        };

        element = layui.element;
        table = layui.table;
        layer = layui.layer;
        laydate = layui.laydate;
        this.getTemplate();
        this.initUserTable();
        this.getUsers();
        /*     laydate.render({
          elem: "#endDateInput", //指定元素
          done(value, date, a) {
            console.log(value);
            _this.endDate = value;
          },
        });
        laydate.render({
          elem: "#releaseStartDateInput", //指定元素
          done(value, date, a) {
            console.log(value);
            _this.releaseStartDate = value;
          },
        });
        laydate.render({
          elem: "#releaseEndDateInput", //指定元素
          done(value, date, a) {
            console.log(value);
            _this.releaseEndDate = value;
          },
        });
        laydate.render({
          elem: "#createdStartDateInput", //指定元素
          done(value, date, a) {
            console.log(value);
            _this.createdStartDate = value;
          },
        });
        laydate.render({
          elem: "#createdEndDateInput", //指定元素
          done(value, date, a) {
            console.log(value);
            _this.createdEndDate = value;
          },
        });
    
         element.on('tab(eventTab)', function (data) {
                    //    alert($(this).html());
                    //    alert(data.index); //得到当前Tab的所在下标
                    //   alert(data.elem); //得到当前的Tab大容器
                    //   alert(this.getAttribute('lay-id'));
                   selectedTab = this.getAttribute('lay-id');
                    if (selectedTab == "importDataTab") {
                    } 
                });*/

        this.checkLogin();
    },
    updated() { },
    data() {
        return {
            template: '',
            receiverTable: null,
            showUserModel: false,
            selectedUser: null,
            userName: '',
            phone: '',
            userModelTitle: '',
            user: {
                roleRights: {
                    analysis: false,
                    briefingFabrication: false,
                    determine: false,
                    directionalMonitoring: false,
                    directionalUserMonitoring: false,
                    warning: false,
                    publicOpinionMonitoring: false,
                    briefingManagement: false,
                    globalSearch: false,
                    systemManagement: false,
                    sensitiveWords: false,
                }
            },
        };
    },
    methods: {
        errorHanlder(error) {
            console.log(error);
            if (error.message.indexOf("403") >= 0) {
                this.logOut();
            }
        },
        logOut() {
            VueCookies.remove("user");
            window.location.href = "?page=index";//"index";
        },
        checkLogin() {
            let user = VueCookies.get("user");
            if (VueCookies.get("user") == null || !user.roleRights.warning) {
                this.logOut();
            } else {
                this.user = user;
            }
        },
        saveTemplate() {
            let _this = this;
            Warning.SaveTemplate(_this.template, function (data, response) {
                console.log(data);
            },
                _this.errorHanlder
            );
        },
        getTemplate() {
            let _this = this;
            Warning.GetTemplate(function (data, response) {
                console.log(data);
                _this.template = data.text;
            },
                _this.errorHanlder
            );
        },
        saveUser() {
            if (this.userName == "" || this.phone == "") {
                return;
            }
            let _this = this;
            if (this.selectedUser == null) {
                Warning.AddReceivers(this.userName, this.phone, function (data, response) {
                    console.log(data);
                    _this.getUsers();
                    _this.hideModel();
                },
                    _this.errorHanlder
                );
            } else {
                Warning.UpdateReceivers(this.selectedUser, this.userName, this.phone, function (data, response) {
                    console.log(data);
                    _this.getUsers();
                    _this.hideModel();
                },
                    _this.errorHanlder
                );
            }
        },
        showUser(id, userName, phone) {
            this.selectedUser = id;
            if (this.selectedUser == null) {
                this.userModelTitle = "新建预警人员";
            } else {
                this.userModelTitle = "修改预警人员";
                this.userName = userName;
                this.phone = phone;
            }
            this.showUserModel = true;
        },
        initUserTablePageBar(number) {
            let _this = this;
            page.render({
                elem: "receiverTablePageBar",
                layout: [
                    "limit",
                    "limits",
                    "count",
                    "prev",
                    "page",
                    "next",
                    "skip",
                ], //自定义分页布局
                //,curr: 5 //设定初始在第 5 页
                limit: 10,
                groups: 10, //只显示 10 个连续页码
                count: number, //数据总数，从服务端得到
                limits: [10, 50, 100, 200, 300], //数据总数，从服务端得到
                theme: "#13227a",
                jump: function (obj, first) {
                    //obj包含了当前分页的所有参数，比如：
                    //  alert(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                    //    alert(obj.limit); //得到每页显示的条数

                    //首次不执行

                    if (first) {
                    } else {
                        Warning.GetReceivers(obj.curr - 1, obj.limit,
                            function (data, response) {
                                console.log(data);
                                console.log(obj.limit);
                                console.log(_this.receiverTable);
                                _this.receiverTable.reload({
                                    data: data.content,
                                    limit: obj.limit
                                });
                            },
                            _this.errorHanlder
                        );
                    }
                },
            });
        },
        getUsers() {
            let _this = this;
            Warning.GetReceivers(0, 10, function (data, response) {
                console.log(data);
                _this.receiverTable.reload({
                    data: data.content,
                    limit: 10
                });
                _this.initUserTablePageBar(data.number);
            },
                _this.errorHanlder
            );
        },
        initUserTable() {
            let _this = this;
            _this.receiverTable = table.render({
                elem: "#receiverTable", //"#table" + item.fid,
                data: [],
                cols: [
                    [
                        { field: "id", hide: true },
                        {
                            field: "name",
                            title: "姓名",
                            sort: true,
                            align: "center",
                            edit: false,
                        },
                        {
                            field: "phone",
                            title: "手机",
                            sort: true,
                            align: "center",
                            edit: false,
                        },
                        {
                            title: "操作",
                            fixed: "right",
                            sort: false,
                            align: "center",
                            width: 240,
                            templet: function (d) {
                                //    console.log(d);
                                return (
                                    '<div style="display: flex; flex-direction: row; align-items: center; justify-content: center;"><a class="layui-btn layui-btn-primary layui-btn-xs table-button-div"  lay-event="remove" onclick="showUser(\'' +
                                    d.id +
                                    '\',\'' + d.name +
                                    '\',\'' + d.phone +
                                    '\')">查看</a>' +
                                    '<a class="layui-btn layui-btn-primary layui-btn-xs table-button-div"  lay-event="remove" onclick="deleteUser(\'' +
                                    d.id +
                                    '\')">删除</a></div>'
                                );
                            },
                        },
                    ],
                ],
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log("请求对象: " + XMLHttpRequest);
                    console.log("错误类型: " + textStatus);
                    console.log("异常对象: " + errorThrown);
                },
            });
        },
        deleteUser(id) {
            let _this = this;
            layer.confirm('是否确定删除？',
                { title: '请确认' }, function (index) {
                    //do something
                    Warning.DeleteReceivers(id, function (data, response) {
                        console.log(data);
                        _this.getUsers();
                    },
                        _this.errorHanlder
                    );
                    layer.close(index);
                });

        },
        hideModel() {
            if (this.showUserModel) {
                this.selectedUser = null;
                this.showUserModel = false;
                this.userName = "";
                this.phone = "";
                return;
            }

        },
    },
};
</script>