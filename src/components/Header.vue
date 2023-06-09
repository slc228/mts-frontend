<template>
<div style="
      display: flex;
      flex-direction: row;
      align-items: center ;
      justify-content: flex-start;
      width: 100%;
      height: 100%;
      background-color: #275BF0;
      flex-shrink:0
    ">
        <div style="
      width: 5%;
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center ;
      justify-content: center;
      flex-shrink:0
    ">
            <img src="yuqing/image/logo.png" style="height:90%; " />
        </div>
        <div style="
      width: 32%;
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: flex-end ;
      justify-content: flex-start;
      flex-shrink:0
    ">
            <div style="
      width: 100%;
      height: 90%;
        background-image: url(yuqing/image/logo-background.png);
                background-repeat: no-repeat;
                background-size: contain;
                background-position: left;
                font-size:1.4vw;
                color:#275BF0;
      display: flex;
      flex-direction: row;
      align-items: center ;
      justify-content: center;
      font-weight:600;
    ">
                舆情监测分系统
            </div>
        </div>

        <div style="
      width: 60%;
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center ;
      justify-content: flex-end;
      flex-shrink:0;
      color:#fff;
                font-size:1vw;
                cursor:pointer;

    ">
            <ul class="layui-nav layui-layout-right layui-bg-blue" style="height:4vw;
      display: flex;
      flex-direction: row;
      align-items: center ;
      justify-content: center;">
                <li class="layui-nav-item layui-hide layui-show-md-inline-block"
                    style="margin-right:1vw; cursor:pointer; ">
                    {{ username }}
                    <dl class="layui-nav-child" style="color:#000; padding:0 0.5vw 0 0.5vw;">
                        <dd @click="logOut">退出</dd>
                    </dl>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
/*2px 2px 5px #888;
#41d8d1 
 background-image: linear-gradient(to right,#4364f7,#359FD4,#6fb1fc);
 background-image: linear-gradient(to right,#359FD4,#36B5C8,#25D8AB)
  */
//通过this.$echarts来使用
import { reactive, ref, watch, defineComponent } from "vue";
import VueCookies from 'vue-cookies'

export default {
    data() {
        return {
            username: "",
        };
    },
    mounted() {
        this.checkLogin();
    },
    update() {
        this.checkLogin();
    },
    methods: {
        logOut() {
            VueCookies.remove("user");
            window.location.href = "?page=index";//"index";
        },
        checkLogin() {
            let user = VueCookies.get("user");
            if (VueCookies.get("user") == null) {
                this.logOut();
            } else {
                this.username = user.username;
            }
        },
    }
};
</script>