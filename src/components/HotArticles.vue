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
        align-items: center;
        justify-content: flex-start;
        width: 90vw;
        height: 100%;
        color: #888888;
        font-size: 0.8vw;
        margin: 0 0 1vw 2vw;
        background-color: #f9f9f9;
        padding:1vw 0 0 0;
      ">
            <div v-for="(item, index) in news" v-bind:key="index" class="searchResultDiv" v-on:click="OpenNews(item)">
                [{{ item.heat }}]&nbsp;{{ item.title }}&nbsp;&nbsp;（{{
                        item.resource
                }}，{{
        item.publishedDayText
}}）
            </div>
            <div id="pageBar"></div>
        </div>
    </div>
</template>

<style>
.waitMessageDiv {
    margin: 0 0 1vw 0;
    /* IE10、Firefox and Opera，IE9以及更早的版本不支持 */
    animation-name: breath;
    /* 动画名称 */
    animation-duration: 2s;
    /* 动画时长3秒 */
    animation-timing-function: ease-in-out;
    /* 动画速度曲线：以低速开始和结束 */
    animation-iteration-count: infinite;
    /* 播放次数：无限 */
}

.searchResultDiv {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    text-align: left;
    line-height: 1vw;
    font-size: 0.9vw;
    margin: 0.1vw 0 0.5vw 0;
    width: 90%;
    font-size: 0.9vw;
    cursor: pointer;
}

.searchResultDiv:hover {
    color: #13227a;
    font-weight: 600;
}

.template-model {
    position: fixed;
    top: -100%;
    left: 5vw;
    width: 90vw;
    opacity: 0;
    height: 95vh;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 0.7vw;
    transition: all ease 500ms;
    background-color: #fff;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    z-index: 1002;
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

.item-icon-div {
    height: 0.9vw;
    margin: 0 0 0 0.5vw;
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
import News from "../model/News";
import VueCookies from 'vue-cookies'

export default {
    components: {
    },
    created() {
    },
    mounted() {
        let _this = this;
        element = layui.element;
        table = layui.table;
        layer = layui.layer;
        laydate = layui.laydate;
        /*  laydate.render({
          elem: "#startDateInput", //指定元素
          done(value, date, a) {
            console.log(value);
            _this.startDate = value;
          },
        });
        laydate.render({
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
        this.GetNews(0, 50);
    },
    updated() { },
    data() {
        return {
            news: [],
            initedPageBar: false,
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
            if (error.indexOf("403") >= 0) {
                this.logOut();
            }
            this.loading = false;
        },
        logOut() {
            VueCookies.remove("user");
            window.location.href = "?page=index";//"index";
        },
        checkLogin() {
            let user = VueCookies.get("user");
            if (VueCookies.get("user") == null || !user.roleRights.globalSearch) {
                this.logOut();
            } else {
                this.user = user;
            }
        }, OpenNews(item) {
            window.open(item.url);
        },
        initPageBar(number) {
            let _this = this;
            this.pageBar = page.render({
                elem: "pageBar",
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
                limit: 50,
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
                        _this.GetNews(obj.curr - 1, obj.limit);
                    }
                },
            });
            this.initedPageBar = true;
        },

        GetNews(pageId, pageSize) {
            let _this = this;
            News.GetHotArticles(
                pageId,
                pageSize,
                function (data, response) {
                    console.log(data);
                    _this.news = data.hotArticleContent;
                    if (!_this.initedPageBar) {
                        _this.initPageBar(data.hitNumber);
                    }
                },
                this.errorHanlder
            );
        },
        hideModel() {
        },
    },
};
</script>