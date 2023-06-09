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
        background-color: #f9f9f9;
      ">
            <div class="layui-tab layui-tab-brief" lay-filter="typeTab" style="width: 97%; 
              height:100%; margin: 1vw 0 0 0">
                <ul class="layui-tab-title">
                    <li class="layui-this">
                        用户管理
                    </li>
                    <li>
                        角色管理
                    </li>
                    <li>
                        系统日志
                    </li>
                    <li>
                        数据采集日志
                    </li>
                </ul>
                <div class="layui-tab-content" style="height:calc(100% - 80px);">
                    <div class="layui-tab-item layui-show" style="
              flex-direction: column;
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
                        <table style="margin: 0 0.5vw 0.5vw 0.5vw;" id="userTable" lay-filter="userTable"></table>
                        <div id="userTablePageBar"></div>
                    </div>
                    <div class="layui-tab-item" style="
              flex-direction: column;
              align-items: flex-start;
              justify-content: flex-start;
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
                            <div class="button-div" v-on:click="showNewRole()">添加</div>
                        </div>
                        <table style="margin: 0 0.5vw 0.5vw 0.5vw;" id="roleTable" lay-filter="roleTable"></table>
                        <div id="roleTablePageBar"></div>
                    </div>
                    <div class="layui-tab-item" style="
              flex-direction: column;
              align-items: flex-start;
              justify-content: flex-start;
              width: 100%;
              height:100%;
            ">
                        <div style="
              flex-direction: row;
              align-items: flex-start;
              justify-content: flex-start;
              display:flex;
            ">

                            <input type="text" class="searchInput" v-model="username" placeholder="请输入用户" />
                            <input type="text" class="searchInput" v-model="url" placeholder="请输入接口" />
                            <input type="text" class="searchInput" v-model="body" placeholder="请输入内容" />
                            <div class="searchButtonDiv" v-on:click="queryRequestLog">查询</div>
                            <div class="searchButtonDiv" v-on:click="resetRequestLogQuery">重置</div>

                        </div>
                        <table style="margin: 0 0.5vw 0.5vw 0.5vw;" id="requestLogTable" lay-filter="requestLogTable">
                        </table>
                        <div id="requestLogTablePageBar"></div>
                    </div>
                    <div class="layui-tab-item" style="
              flex-direction: column;
              align-items: flex-start;
              justify-content: flex-start;
              width: 100%;
              height:100%;
            ">
                        <div style="
              flex-direction: row;
              align-items: flex-start;
              justify-content: flex-start;
              display:flex;
            "> <input type="text" class="searchInput" v-model="jobName" placeholder="请输入任务名称" />
                            <input type="text" class="searchInput" v-model="category" placeholder="请输入类型" />
                            <input type="text" class="searchInput" v-model="content" placeholder="请输入内容" />
                            <div class="searchButtonDiv" v-on:click="queryCrawlerLog">查询</div>
                            <div class="searchButtonDiv" v-on:click="resetCrawlerLogQuery">重置</div>
                        </div>
                        <table style="margin: 0 0.5vw 0.5vw 0.5vw;" id="crawlerLogTable" lay-filter="crawlerLogTable">
                        </table>
                        <div id="crawlerLogTablePageBar"></div>

                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="coverDiv" v-bind:class="{
        showCoverDiv: showNewRoleModel || showUserModel,
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
          justify-content: space-between;
          margin:1vw 0 0 0;
        ">
                <input type="text" class="roleNameInput" v-model="userName" placeholder="请输入用户名称" />
                <div style="
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          height:100%;
          width:50%;
        ">
                    有效期： <input type="text" class="roleNameInput" id="validDateInput" v-model="validDate" readonly />
                </div>
            </div>
            <div style="
          width: 94%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          flex-wrap: wrap;
          margin:1vw 0 0 0;
          line-height:1.5vw;
        ">
                <div class="userRadioItemDiv" v-for="(item, index) in roles" v-bind:key="index">
                    <input type="radio" name="userRole" v-bind:value="item.id" class="model-radio" v-model="userRole" />
                    <span v-on:click="userRoleRadioOnClick(item.id)">{{ item.roleName }}</span>
                </div>

            </div>
        </div>
        <div class="model-buttons-div">
            <div class="model-button-div" v-on:click="saveUser">保存</div>
            <div class="model-button-div" v-on:click="hideModel">取消</div>
        </div>
    </div>


    <div class="roleModel" v-bind:class="{
        showNewRoleModel: showNewRoleModel,
    }">
        <div class="model-title-div">
            <div class="model-title-text-div">{{ roleModelTitle }}</div>
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
          justify-content: flex-start;
          margin:1vw 0 0 0;
        ">
                <input type="text" class="roleNameInput" v-model="roleName" placeholder="请输入角色名称" />
            </div>
            <div style="
          width: 94%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          flex-wrap: wrap;
          margin:1vw 0 0 0;
          line-height:1.5vw;
        ">
                <div class="roleCheckBoxItemDiv">
                    <input type="checkbox" class="model-checkbox" v-model="rights" value="publicOpinionMonitoring" />
                    <span v-on:click="CheckBoxOnClick('publicOpinionMonitoring')">舆情监测</span>
                </div>
                <div class="roleCheckBoxItemDiv">
                    <input type="checkbox" class="model-checkbox" v-model="rights" value="globalSearch" />
                    <span v-on:click="CheckBoxOnClick('globalSearch')">全文检索</span>
                </div>
                <div class="roleCheckBoxItemDiv">
                    <input type="checkbox" class="model-checkbox" v-model="rights" value="briefingManagement" />
                    <span v-on:click="CheckBoxOnClick('briefingManagement')">简报管理</span>
                </div>
                <div class="roleCheckBoxItemDiv">
                    <input type="checkbox" class="model-checkbox" v-model="rights" value="sensitiveWords" />
                    <span v-on:click="CheckBoxOnClick('sensitiveWords')">敏感词库管理</span>
                </div>
                <div class="roleCheckBoxItemDiv">
                    <input type="checkbox" class="model-checkbox" v-model="rights" value="determine" />
                    <span v-on:click="CheckBoxOnClick('determine')">研判</span>
                </div>
                <div class="roleCheckBoxItemDiv">
                    <input type="checkbox" class="model-checkbox" v-model="rights" value="directionalMonitoring" />
                    <span v-on:click="CheckBoxOnClick('directionalMonitoring')">定向监测</span>
                </div>
                <div class="roleCheckBoxItemDiv">
                    <input type="checkbox" class="model-checkbox" v-model="rights" value="directionalUserMonitoring" />
                    <span v-on:click="CheckBoxOnClick('directionalUserMonitoring')">定向用户监测</span>
                </div>
                <div class="roleCheckBoxItemDiv">
                    <input type="checkbox" class="model-checkbox" v-model="rights" value="analysis" />
                    <span v-on:click="CheckBoxOnClick('analysis')">事件分析</span>
                </div>
                <div class="roleCheckBoxItemDiv">
                    <input type="checkbox" class="model-checkbox" v-model="rights" value="warning" />
                    <span v-on:click="CheckBoxOnClick('warning')">舆情预警</span>
                </div>
                <div class="roleCheckBoxItemDiv">
                    <input type="checkbox" class="model-checkbox" v-model="rights" value="briefingFabrication" />
                    <span v-on:click="CheckBoxOnClick('briefingFabrication')">简报制作</span>
                </div>
                <div class="roleCheckBoxItemDiv">
                    <input type="checkbox" class="model-checkbox" v-model="rights" value="systemManagement" />
                    <span v-on:click="CheckBoxOnClick('systemManagement')">系统管理</span>
                </div>
            </div>
        </div>
        <div class="model-buttons-div">
            <div class="model-button-div" v-on:click="saveRole">保存</div>
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

.menu-item-icon-div {
    height: 1vw;
    margin: 0 0.5vw 0 0;
}

.menu-item-div:hover .yuqingjiance-img {
    content: url(/public/yuqing/image/yuqingjiance.png);
}

.menu-item-div:hover .quanwenjiansuo-img {
    content: url(/public/yuqing/image/quanwenjiansuo.png);
}

.menu-item-div:hover .jianbao-img {
    content: url(/public/yuqing/image/jianbao.png);
}

.menu-item-div:hover .minganciku-img {
    content: url(/public/yuqing/image/minganciku.png);
}

.menu-item-div:hover .xitongguanli-img {
    content: url(/public/yuqing/image/xitongguanli.png);
}

.menu-item-div:hover .tuichu2-img {
    content: url(/public/yuqing/image/tuichu.png);
}

.menu-item-div:hover .yujing-img {
    content: url(/public/yuqing/image/yujing.png);
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

.roleNameInput {
    height: 100%;
    width: 30%;
    font-size: 0.7vw;
    border-radius: 2px;
    border: #eee solid 1px !important;
    padding: 0.5vw 1.2vw 0.5vw 1.2vw;
    transition: all ease 500ms;
}

.roleNameInput:focus {
    transition: all ease 500ms;
    border: #d2d2d2 solid 1px !important;
}

.searchInput {
    height: 100%;
    width: 15vw;
    font-size: 0.7vw;
    border-radius: 2px;
    border: #eee solid 1px !important;
    padding: 0.5vw 1.2vw 0.5vw 1.2vw;
    transition: all ease 500ms;
    margin: 0 0.5vw 0 0;
}

.searchInput:focus {
    transition: all ease 500ms;
    border: #d2d2d2 solid 1px !important;
}

.searchButtonDiv {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #13227a;
    color: #fff;
    margin: 0 0.2vw 0 0;
    transition: all ease 500ms;
    cursor: pointer;
    font-size: 0.7vw;
    height: 0.8vw;
    width: 2vw;
    padding: 0.5vw 1.2vw 0.5vw 1.2vw;
}

.searchButtonDiv:hover {
    transition: all ease 500ms;
    box-shadow: 2px 2px 5px #888888;
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
import Role from "../model/Role";
import User from "../model/User";
import Log from "../model/Log";
import VueCookies from 'vue-cookies'

export default {
    components: {
    },
    created() {
    },
    mounted() {
        let _this = this;

        window.deleteRole = function (id) {
            _this.deleteRole(id);
        };
        window.showNewRole = function (id, roleName, publicOpinionMonitoring, globalSearch,
            briefingManagement, sensitiveWords, determine,
            directionalMonitoring, directionalUserMonitoring, analysis,
            warning, briefingFabrication, systemManagement) {
            _this.showNewRole(id, roleName, publicOpinionMonitoring, globalSearch,
                briefingManagement, sensitiveWords, determine,
                directionalMonitoring, directionalUserMonitoring, analysis,
                warning, briefingFabrication, systemManagement);
        };

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

        this.initUserTable();
        this.initRoleTable();
        this.initRequestLogTable();
        this.getUsers();
        this.getRoles();
        this.getRequestLogTable()
        this.initCrawlerLogTable();
        this.getCrawlerLogTable();
        laydate.render({
            elem: "#validDateInput", //指定元素
            done(value, date, a) {
                console.log(value);
                _this.validDate = value;
            },
        });
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
            showNewRoleModel: false,
            selectedRole: null,
            roleModelTitle: '',
            roleTable: null,
            userTable: null,
            roles: [],
            rights: [],
            roleName: '',
            showUserModel: false,
            selectedUser: null,
            userName: '',
            userModelTitle: '',
            validDate: '',
            userRole: '',
            requestLogTable: null,
            crawlerLogTable: null,
            username: '',
            url: '',
            body: '',
            jobName: '',
            category: '',
            content: '',
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
        queryCrawlerLog() {
            this.getCrawlerLogTable();
        },
        resetCrawlerLogQuery() {
            this.jobName = '';
            this.content = '';
            this.category = '';
            this.getCrawlerLogTable();
        },
        queryRequestLog() {
            this.getRequestLogTable();
        },
        resetRequestLogQuery() {
            this.username = '';
            this.url = '';
            this.body = '';
            this.getRequestLogTable();
        },
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
            if (VueCookies.get("user") == null || !user.roleRights.systemManagement) {
                this.logOut();
            } else {
                this.user = user;
            }
        },
        initCrawlerLogTablePageBar(number) {
            let _this = this;
            page.render({
                elem: "crawlerLogTablePageBar",
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
                        Log.GetCrawlertLog(_this.jobName, _this.category, _this.content, obj.curr - 1, obj.limit, function (data, response) {
                            console.log(data);
                            _this.crawlerLogTable.reload({
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
        getCrawlerLogTable() {
            let _this = this;
            Log.GetCrawlertLog(_this.jobName, _this.category, _this.content, 0, 10, function (data, response) {
                console.log(data);
                _this.crawlerLogTable.reload({
                    data: data.content,
                });
                _this.initCrawlerLogTablePageBar(data.number);
            },

                _this.errorHanlder
            );
        },
        initCrawlerLogTable() {
            let _this = this;
            _this.crawlerLogTable = table.render({
                elem: "#crawlerLogTable", //"#table" + item.fid,
                data: [],
                cols: [
                    [
                        { field: "joblId", hide: true },
                        {
                            //    field: "joblId",
                            title: "任务",
                            sort: true,
                            align: "center",
                            edit: false,
                            templet: function (d) {
                                //    console.log(d);
                                let jobName = d.jobName;
                                if (d.category == "ERROR") {
                                    jobName = "<div style='color:red;'>" + jobName + "</div>";
                                }
                                return jobName;
                            },
                        },
                        {
                            //    field: "category",
                            title: "日志类型",
                            sort: true,
                            align: "center",
                            edit: false,
                            templet: function (d) {
                                //    console.log(d);
                                let category = d.category;
                                if (d.category == "ERROR") {
                                    category = "<div style='color:red;'>" + category + "</div>";
                                }
                                return category;
                            },
                        },
                        {
                            //   field: "content",
                            title: "日志内容",
                            sort: true,
                            align: "left",
                            edit: false,
                            templet: function (d) {
                                //    console.log(d);
                                let content = d.content;
                                if (d.category == "ERROR") {
                                    content = "<div style='color:red;'>" + content + "</div>";
                                }
                                return content;
                            },
                        },
                        {
                            //   field: "createdDateText",
                            title: "记录时间",
                            sort: true,
                            align: "center",
                            edit: false,
                            templet: function (d) {
                                //    console.log(d);
                                let createdDateText = d.createdDateText;
                                if (d.category == "ERROR") {
                                    createdDateText = "<div style='color:red;'>" + createdDateText + "</div>";
                                }
                                return createdDateText;
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
        initRequestLogTablePageBar(number) {
            let _this = this;
            page.render({
                elem: "requestLogTablePageBar",
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
                        Log.GetRequestLog(_this.username, _this.url, _this.body, obj.curr - 1, obj.limit, function (data, response) {
                            console.log(data);
                            _this.requestLogTable.reload({
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
        getRequestLogTable() {
            let _this = this;
            Log.GetRequestLog(_this.username, _this.url, _this.body, 0, 10, function (data, response) {
                console.log(data);
                _this.requestLogTable.reload({
                    data: data.content,
                });
                _this.initRequestLogTablePageBar(data.number);
            },

                _this.errorHanlder
            );
        },
        initRequestLogTable() {
            let _this = this;
            _this.requestLogTable = table.render({
                elem: "#requestLogTable", //"#table" + item.fid,
                data: [],
                cols: [
                    [
                        { field: "id", hide: true },
                        {
                            field: "username",
                            title: "用户",
                            sort: true,
                            align: "center",
                            edit: false,
                        },
                        {
                            field: "url",
                            title: "请求接口",
                            sort: true,
                            align: "left",
                            edit: false,
                        },
                        {
                            field: "body",
                            title: "请求内容",
                            sort: true,
                            align: "left",
                            edit: false,
                        },
                        {
                            field: "timeText",
                            title: "请求时间",
                            sort: true,
                            align: "center",
                            edit: false,
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
        saveUser() {
            if (this.userName == "" || this.validDate == "" || this.userRole == '') {
                return;
            }
            let _this = this;
            if (this.selectedUser == null) {
                User.Add(this.userName, this.validDate, this.userRole, function (data, response) {
                    console.log(data);
                    _this.getUsers();
                    _this.hideModel();
                },

                    _this.errorHanlder
                );
            } else {
                User.Update(this.selectedUser, this.validDate, this.userRole, function (data, response) {
                    console.log(data);
                    _this.getUsers();
                    _this.hideModel();
                },

                    _this.errorHanlder
                );
            }
        },
        userRoleRadioOnClick(id) {
            this.userRole = id;
        },
        showUser(id, userName, validDate, role) {

            this.selectedUser = id;
            if (this.selectedUser == null) {
                this.userModelTitle = "新建用户";
            } else {
                this.userName = userName;
                this.validDate = validDate;
                this.userRole = role;
                this.userModelTitle = "修改用户";
            }
            this.showUserModel = true;
        },
        initUserTablePageBar(number) {
            let _this = this;
            page.render({
                elem: "userTablePageBar",
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
                        User.Get(obj.curr - 1, obj.limit, function (data, response) {
                            console.log(data);
                            _this.userTable.reload({
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
            User.Get(0, 10, function (data, response) {
                console.log(data);
                _this.userTable.reload({
                    data: data.content,
                });
                _this.initUserTablePageBar(data.number);
            },

                _this.errorHanlder
            );
        },
        initUserTable() {
            let _this = this;
            _this.userTable = table.render({
                elem: "#userTable", //"#table" + item.fid,
                data: [],
                cols: [
                    [
                        { field: "userUuid", hide: true },
                        {
                            field: "username",
                            title: "用户",
                            sort: true,
                            align: "center",
                            edit: false,
                        },
                        {
                            title: "角色",
                            sort: true,
                            align: "center",
                            edit: false,
                            templet: function (d) {
                                //    console.log(d);
                                return d.roleRight.roleName;
                            },
                        },
                        {
                            field: "validDateText",
                            title: "有效期",
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
                                    d.userUuid +
                                    '\',\'' + d.username +
                                    '\',\'' + d.validDate.substring(0, 10) +
                                    '\',\'' + d.role +
                                    '\')">查看</a>' +
                                    '<a class="layui-btn layui-btn-primary layui-btn-xs table-button-div"  lay-event="remove" onclick="deleteUser(\'' +
                                    d.userUuid +
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
        saveRole() {
            if (this.roleName == "") {
                return;
            }
            let _this = this;
            if (this.selectedRole == null) {
                Role.Add(this.roleName,
                    this.rights.indexOf("publicOpinionMonitoring") >= 0,
                    this.rights.indexOf("globalSearch") >= 0,
                    this.rights.indexOf("briefingManagement") >= 0,
                    this.rights.indexOf("sensitiveWords") >= 0,
                    this.rights.indexOf("determine") >= 0,
                    this.rights.indexOf("directionalMonitoring") >= 0,
                    this.rights.indexOf("directionalUserMonitoring") >= 0,
                    this.rights.indexOf("analysis") >= 0,
                    this.rights.indexOf("warning") >= 0,
                    this.rights.indexOf("briefingFabrication") >= 0,
                    this.rights.indexOf("systemManagement") >= 0,
                    function (data, response) {
                        console.log(data);
                        _this.hideModel();
                        _this.getRoles();
                    },

                    _this.errorHanlder
                );
            } else {
                Role.Update(this.selectedRole, this.roleName,
                    this.rights.indexOf("publicOpinionMonitoring") >= 0,
                    this.rights.indexOf("globalSearch") >= 0,
                    this.rights.indexOf("briefingManagement") >= 0,
                    this.rights.indexOf("sensitiveWords") >= 0,
                    this.rights.indexOf("determine") >= 0,
                    this.rights.indexOf("directionalMonitoring") >= 0,
                    this.rights.indexOf("directionalUserMonitoring") >= 0,
                    this.rights.indexOf("analysis") >= 0,
                    this.rights.indexOf("warning") >= 0,
                    this.rights.indexOf("briefingFabrication") >= 0,
                    this.rights.indexOf("systemManagement") >= 0,
                    function (data, response) {
                        console.log(data);
                        _this.hideModel();
                        _this.getRoles();
                    },

                    _this.errorHanlder
                );
            }
        },
        CheckBoxOnClick(value) {
            console.log(value);
            if (this.rights.indexOf(value) >= 0) {
                this.rights.splice(
                    this.rights.indexOf(value),
                    1
                );
            } else {
                this.rights.push(value);
            }
        },
        showNewRole(id, roleName, publicOpinionMonitoring, globalSearch,
            briefingManagement, sensitiveWords, determine,
            directionalMonitoring, directionalUserMonitoring, analysis,
            warning, briefingFabrication, systemManagement) {

            this.selectedRole = id;

            if (publicOpinionMonitoring != null && publicOpinionMonitoring) {
                this.rights.push('publicOpinionMonitoring');
            } if (globalSearch != null && globalSearch) {
                this.rights.push('globalSearch');
            } if (briefingManagement != null && briefingManagement) {
                this.rights.push('briefingManagement');
            } if (sensitiveWords != null && sensitiveWords) {
                this.rights.push('sensitiveWords');
            } if (determine != null && determine) {
                this.rights.push('determine');
            } if (directionalMonitoring != null && directionalMonitoring) {
                this.rights.push('directionalMonitoring');
            } if (directionalUserMonitoring != null && directionalUserMonitoring) {
                this.rights.push('directionalUserMonitoring');
            } if (analysis != null && analysis) {
                this.rights.push('analysis');
            } if (warning != null && warning) {
                this.rights.push('warning');
            } if (briefingFabrication != null && briefingFabrication) {
                this.rights.push('briefingFabrication');
            } if (systemManagement != null && systemManagement) {
                this.rights.push('systemManagement');
            }
            if (this.selectedRole == null) {
                this.roleModelTitle = "新建角色";
            } else {
                this.roleName = roleName;
                this.roleModelTitle = "修改角色";
            }
            this.showNewRoleModel = true;
        },
        deleteUser(id) {
            console.log(id);
            let _this = this;
            layer.confirm('是否确定删除？',
                { title: '请确认' }, function (index) {
                    //do something
                    User.Delete(id, function (data, response) {
                        console.log(data);
                        _this.getUsers();
                    },
                        _this.errorHanlder
                    );
                    layer.close(index);
                });
        },
        deleteRole(id) {
            console.log(id);
            let _this = this;
            layer.confirm('是否确定删除？',
                { title: '请确认' }, function (index) {
                    //do something
                    Role.Delete(id, function (data, response) {
                        console.log(data);
                        _this.getRoles();
                    },

                        _this.errorHanlder
                    );
                    layer.close(index);
                });
        },
        initRoleTable() {
            let _this = this;
            _this.roleTable = table.render({
                elem: "#roleTable", //"#table" + item.fid,
                data: [],
                cols: [
                    [
                        { field: "id", hide: true },
                        {
                            field: "roleName",
                            title: "角色",
                            sort: true,
                            align: "center",
                            edit: false,
                        },
                        {
                            //  field: "title",
                            title: "权限",
                            sort: true,
                            align: "left",
                            edit: false,
                            templet: function (d) {
                                //     console.log(d);
                                let role = "";
                                if (d.publicOpinionMonitoring) {
                                    role += "舆情监测，";
                                } if (d.globalSearch) {
                                    role += "全文检索，";
                                } if (d.briefingManagement) {
                                    role += "简报管理，";
                                } if (d.sensitiveWords) {
                                    role += "敏感词库管理 ";
                                } if (d.determine) {
                                    role += "研判，";
                                } if (d.directionalMonitoring) {
                                    role += "定向监测，";
                                } if (d.directionalUserMonitoring) {
                                    role += "定向用户监测，";
                                } if (d.analysis) {
                                    role += "事件分析，";
                                } if (d.warning) {
                                    role += "舆情预警，";
                                } if (d.briefingFabrication) {
                                    role += "简报制作，";
                                } if (d.systemManagement) {
                                    role += "系统管理，";
                                }
                                return role;
                            },
                        },

                        {
                            title: "操作",
                            fixed: "right",
                            sort: false,
                            align: "center",
                            width: 240,
                            templet: function (d) {
                                console.log(d);
                                return (
                                    '<div style="display: flex; flex-direction: row; align-items: center; justify-content: center;"><a class="layui-btn layui-btn-primary layui-btn-xs table-button-div"  lay-event="remove" onclick="showNewRole(\'' +
                                    d.id +
                                    '\',\'' + d.roleName +
                                    '\',' + d.publicOpinionMonitoring +
                                    ',' + d.globalSearch +
                                    ',' + d.briefingManagement +
                                    ',' + d.sensitiveWords +
                                    ',' + d.determine +
                                    ',' + d.directionalMonitoring +
                                    ',' + d.directionalUserMonitoring +
                                    ',' + d.analysis +
                                    ',' + d.warning +
                                    ',' + d.briefingFabrication +
                                    ',' + d.systemManagement +
                                    ')">查看</a>' +
                                    '<a class="layui-btn layui-btn-primary layui-btn-xs table-button-div"  lay-event="remove" onclick="deleteRole(\'' +
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
        getRoles() {
            let _this = this;
            Role.Get(function (data, response) {
                console.log(data);
                _this.roles = data;
                _this.roleTable.reload({
                    data: data,
                });
            },
                _this.errorHanlder
            );
        },
        getReports() {
            let _this = this;
            Report.GetAll(0, 10,
                function (data, response) {
                    console.log(data);

                    _this.reportTable.reload({
                        data: data.briefingFileContent,
                        limit: 10,
                    });

                    page.render({
                        elem: "tablePageBar",
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
                        groups: 10, //只显示 10 个连续页码
                        count: data.hitNumber, //数据总数，从服务端得到
                        limits: [10, 50, 100, 200, 300], //数据总数，从服务端得到
                        theme: "#46A1F0",
                        jump: function (obj, first) {
                            //obj包含了当前分页的所有参数，比如：
                            //  alert(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                            //    alert(obj.limit); //得到每页显示的条数

                            //首次不执行
                            console.log(obj.limit);

                            if (first) {
                            } else {
                                Report.GetAll(
                                    obj.curr - 1,
                                    obj.limit,
                                    function (data, response) {
                                        console.log(data);
                                        _this.reportTable.reload({
                                            data: data.briefingFileContent,
                                            limit: obj.limit,
                                        });
                                    },
                                    _this.errorHanlder
                                );
                            }
                        },
                    });
                },
                _this.errorHanlder
            );
        },
        hideModel() {
            if (this.showNewRoleModel) {
                this.selectedRole = null;
                this.showNewRoleModel = false;
                this.rights = [];
                this.roleName = '';
                return;
            } else if (this.showUserModel) {
                this.selectedUser = null;
                this.showUserModel = false;
                this.userName = "";
                this.userRole = "";
                return;
            }

        },
    },
};
</script>