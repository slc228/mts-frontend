<template>
    <div style="
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        width: 100%;
        height: 100%;
        color: #888888;
        font-size: 0.8vw;
        background-color: #eee;
      ">
        <div v-bind:class="{
            menuItemDiv: page != 'index',
            selectedMenuItemDiv: page == 'index',
        }" v-if="user.roleRights.globalSearch" @click="goTo('index')">
            <div class="menuItemTextDiv">
                <img src="yuqing/image/shouye2.png" v-bind:class="{
                    selectedshouyeImg: page == 'index',
                }" class="menu-item-icon-div shouyeImg" />
                首页&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
            <div v-bind:class="{
                menuItemSpliterDiv: page != 'index',
                selectedMenuItemSpliterDiv: page == 'index',
            }"></div>
        </div>
        <div v-bind:class="{
            menuItemDiv: page != 'news',
            selectedMenuItemDiv: page == 'news',
        }" v-if="user.roleRights.globalSearch" @click="goTo('news')">
            <div class="menuItemTextDiv">
                <img src="yuqing/image/zuixinyuqing2.png" v-bind:class="{
                    selectedzuixinyuqingImg: page == 'news',
                }" class="menu-item-icon-div zuixinyuqingImg" />
                最新舆情
            </div>
            <div v-bind:class="{
                menuItemSpliterDiv: page != 'news',
                selectedMenuItemSpliterDiv: page == 'news',
            }"></div>
        </div>
        <div v-bind:class="{
            menuItemDiv: page != 'sensitivenews',
            selectedMenuItemDiv: page == 'sensitivenews',
        }" v-if="user.roleRights.globalSearch" @click="goTo('sensitivenews')">
            <div class="menuItemTextDiv">
                <img src="yuqing/image/minganyuqing2.png" v-bind:class="{
                    selectedminganyuqingImg: page == 'sensitivenews',
                }" class="menu-item-icon-div minganyuqingImg" style="height: 1.3vw;"/>
                敏感舆情
            </div>
            <div v-bind:class="{
                menuItemSpliterDiv: page != 'sensitivenews',
                selectedMenuItemSpliterDiv: page == 'sensitivenews',
            }"></div>
        </div>
        <div v-bind:class="{
            menuItemDiv: page != 'hotarticles',
            selectedMenuItemDiv: page == 'hotarticles',
        }" v-if="user.roleRights.globalSearch" @click="goTo('hotarticles')">
            <div class="menuItemTextDiv">
                <img src="yuqing/image/redianyuqing2.png" v-bind:class="{
                    selectedredianyuqingImg: page == 'hotarticles',
                }" class="menu-item-icon-div redianyuqingImg" />
                最新热文
            </div>
            <div v-bind:class="{
                menuItemSpliterDiv: page != 'hotarticles',
                selectedMenuItemSpliterDiv: page == 'hotarticles',
            }"></div>
        </div>
        <div v-bind:class="{
            menuItemDiv: page != 'topic',
            selectedMenuItemDiv: page == 'topic',
        }" v-if="user.roleRights.globalSearch" @click="goTo('topic')">
            <div class="menuItemTextDiv">
                <img src="yuqing/image/redianhuati2.png" v-bind:class="{
                    selectedredianhuatiImg: page == 'topic',
                }" class="menu-item-icon-div redianhuatiImg" />
                话题追踪
            </div>
            <div v-bind:class="{
                menuItemSpliterDiv: page != 'topic',
                selectedMenuItemSpliterDiv: page == 'topic',
            }"></div>
        </div>
        <div v-bind:class="{
            menuItemDiv: page != 'plan',
            selectedMenuItemDiv: page == 'plan',
        }" v-if="user.roleRights.globalSearch" @click="goTo('plan')">
            <div class="menuItemTextDiv">
                <img src="yuqing/image/yuqingjiance4.png" v-bind:class="{
                    selectedyuqingjianceImg: page == 'plan',
                }" class="menu-item-icon-div yuqingjianceImg" />
                舆情监测
            </div>
            <div v-bind:class="{
                menuItemSpliterDiv: page != 'plan',
                selectedMenuItemSpliterDiv: page == 'plan',
            }"></div>
        </div>
        <div v-bind:class="{
            menuItemDiv: page != 'search',
            selectedMenuItemDiv: page == 'search',
        }" v-if="user.roleRights.globalSearch" @click="goTo('search')">
            <div class="menuItemTextDiv">

                <img src="yuqing/image/quanwenjiansuo2.png" v-bind:class="{
                    selectedquanwenjiansuoImg: page == 'search',
                }" class="menu-item-icon-div quanwenjiansuoImg" />
                全文检索
            </div>
            <div v-bind:class="{
                menuItemSpliterDiv: page != 'search',
                selectedMenuItemSpliterDiv: page == 'search',
            }"></div>
        </div>
        <div v-bind:class="{
            menuItemDiv: page != 'report',
            selectedMenuItemDiv: page == 'report',
        }" v-if="user.roleRights.briefingManagement" @click="goTo('report')">
            <div class="menuItemTextDiv">

                <img src="yuqing/image/jianbao2.png" v-bind:class="{
                    selectedjianbaoImg: page == 'report',
                }" class="menu-item-icon-div jianbaoImg" />
                简报制作
            </div>
            <div v-bind:class="{
                menuItemSpliterDiv: page != 'report',
                selectedMenuItemSpliterDiv: page == 'report',
            }"></div>
        </div>

        
        <div v-bind:class="{
            menuItemDiv: page != 'dashboard',
            selectedMenuItemDiv: page == 'dashboard',
        }" v-if="user.roleRights.briefingManagement" @click="goTo('dashboard')">
            <div class="menuItemTextDiv">

                <img src="yuqing/image/shujudaping2.png" v-bind:class="{
                    selectedshujudapingImg: page == 'dashboard',
                }" class="menu-item-icon-div shujudapingImg" />
                数据大屏
            </div>
            <div v-bind:class="{
                menuItemSpliterDiv: page != 'dashboard',
                selectedMenuItemSpliterDiv: page == 'dashboard',
            }"></div>
        </div>


        <div v-bind:class="{
            menuItemDiv: page != 'warning',
            selectedMenuItemDiv: page == 'warning',
        }" v-if="user.roleRights.warning" @click="goTo('warning')">
            <div class="menuItemTextDiv">

                <img src="yuqing/image/yujing2.png" v-bind:class="{
                    selectedyujingImg: page == 'warning',
                }" class="menu-item-icon-div yujingImg" />
                预警配置
            </div>
            <div v-bind:class="{
                menuItemSpliterDiv: page != 'warning',
                selectedMenuItemSpliterDiv: page == 'warning',
            }"></div>
        </div><!--
        <div v-bind:class="{
            menuItemDiv: page != 'library',
            selectedMenuItemDiv: page == 'library',
        }" v-if="user.roleRights.sensitiveWords" @click="goTo('library')">
            <div class="menuItemTextDiv">

                <img src="image/sucaiku2.png" v-bind:class="{
                    selectedsucaikuImg: page == 'library',
                }" class="menu-item-icon-div sucaikuImg" />
                素材库&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
            <div v-bind:class="{
                menuItemSpliterDiv: page != 'library',
                selectedMenuItemSpliterDiv: page == 'library',
            }"></div>
        </div>-->
        <div v-bind:class="{
            menuItemDiv: page != 'sensitivekeywords',
            selectedMenuItemDiv: page == 'sensitivekeywords',
        }" v-if="user.roleRights.sensitiveWords" @click="goTo('sensitivekeywords')">
            <div class="menuItemTextDiv">

                <img src="yuqing/image/minganciku2.png" v-bind:class="{
                    selectedmingancikuImg: page == 'sensitivekeywords',
                }" class="menu-item-icon-div mingancikuImg" />
                敏感词库
            </div>
            <div v-bind:class="{
                menuItemSpliterDiv: page != 'sensitivekeywords',
                selectedMenuItemSpliterDiv: page == 'sensitivekeywords',
            }"></div>
        </div>
        <div v-bind:class="{
            menuItemDiv: page != 'system',
            selectedMenuItemDiv: page == 'system',
        }" v-if="user.roleRights.systemManagement" @click="goTo('system')">
            <div class="menuItemTextDiv">
                <img src="yuqing/image/xitongguanli2.png" v-bind:class="{
                    selectedxitongguanliImg: page == 'system',
                }" class="menu-item-icon-div xitongguanliImg" />
                系统管理
            </div>
            <div v-bind:class="{
                menuItemSpliterDiv: page != 'system',
                selectedMenuItemSpliterDiv: page == 'system',
            }"></div>
        </div>
    </div>
</template>
<style>
.selectedMenuItemDiv {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 3vw;
    cursor: pointer;
    font-weight: 500;
    transition: all ease 500ms;
    background-color: #E9F5FE;
    color: #13227a;
}

.selectedMenuItemSpliterDiv {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 3%;
    height: 100%;
    background-color: #128EFF;
}

.selectedshouyeImg {
    content: url(/public/yuqing/image/shouye3.png);
}


.selectedredianhuatiImg {
    content: url(/public/yuqing/image/redianhuati3.png);
}

.selectedredianyuqingImg {
    content: url(/public/yuqing/image/redian2.png);
}

.selectedminganyuqingImg {
    content: url(/public/yuqing/image/mingan2.png);
}
.selectedyuqingjianceImg {
    content: url(/public/yuqing/image/yuqingjiance3.png);
}

.selectedquanwenjiansuoImg {
    content: url(/public/yuqing/image/quanwenjiansuo3.png);
}

.selectedjianbaoImg {
    content: url(/public/yuqing/image/jianbao3.png);
}

.selectedmingancikuImg {
    content: url(/public/yuqing/image/minganciku3.png);
}

.selectedsucaikuImg {
    content: url(/public/yuqing/image/sucaiku3.png);
}

.selectedxitongguanliImg {
    content: url(/public/yuqing/image/xitongguanli3.png);
}

.selectedyujingImg {
    content: url(/public/yuqing/image/yujing3.png);
}

.selectedzuixinyuqingImg {
    content: url(/public/yuqing/image/zuixinyuqing3.png);
}

.selectedshujudapingImg {
    content: url(/public/yuqing/image/shujudaping3.png);
}




.menuItemTextDiv {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 97%;
}

.menuItemDiv {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 3vw;
    cursor: pointer;
    font-weight: 500;
    transition: all ease 500ms;
}

.menuItemSpliterDiv {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 3%;
    height: 100%;
}

.menuItemDiv:hover .menuItemSpliterDiv {
    background-color: #128EFF;
}

.menuItemDiv:hover {
    background-color: #E9F5FE;
    color: #13227a;
}

.menu-item-icon-div {
    height: 1vw;
    margin: 0 0.5vw 0 0;
}

.menuItemDiv:hover .shouyeImg {
    content: url(/public/yuqing/image/shouye3.png);
}


.menuItemDiv:hover .redianhuatiImg {
    content: url(/public/yuqing/image/redianhuati3.png);
}

.menuItemDiv:hover .redianyuqingImg {
    content: url(/public/yuqing/image/redian2.png);
}

.menuItemDiv:hover .minganyuqingImg {
    content: url(/public/yuqing/image/mingan2.png);
}

.menuItemDiv:hover .zuixinyuqingImg {
    content: url(/public/yuqing/image/zuixinyuqing3.png);
}

.menuItemDiv:hover .yuqingjianceImg {
    content: url(/public/yuqing/image/yuqingjiance3.png);
}

.menuItemDiv:hover .quanwenjiansuoImg {
    content: url(/public/yuqing/image/quanwenjiansuo3.png);
}

.menuItemDiv:hover .jianbaoImg {
    content: url(/public/yuqing/image/jianbao3.png);
}

.menuItemDiv:hover .mingancikuImg {
    content: url(/public/yuqing/image/minganciku3.png);
}

.menuItemDiv:hover .sucaikuImg {
    content: url(/public/yuqing/image/sucaiku3.png);
}
.menuItemDiv:hover .xitongguanliImg {
    content: url(/public/yuqing/image/xitongguanli3.png);
}

.menuItemDiv:hover .yujingImg {
    content: url(/public/yuqing/image/yujing3.png);
}

.menuItemDiv:hover .shujudapingImg {
    content: url(/public/yuqing/image/shujudaping3.png);
}

a {
    color: inherit !important;
}
</style>
/*2px 2px 5px #888;
#41d8d1 
 background-image: linear-gradient(to right,#4364f7,#359FD4,#6fb1fc);
 background-image: linear-gradient(to right,#359FD4,#36B5C8,#25D8AB)
*/
<script>
import { reactive, ref, watch, defineComponent } from "vue";
import VueCookies from 'vue-cookies'

export default {
    props: {
        page: {
            type: String,
            default: ''
        },
    },
    data() {
        return {
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
    mounted() {
        this.checkLogin();
    },
    update() {
        this.checkLogin();
    },
    methods: {
        goTo(page) {
            window.location.href = "?page=" + page;//"index";
        },
        logOut() {
            VueCookies.remove("user");
            window.location.href = "?page=index";//"index";
        },
        checkLogin() {
            let user = VueCookies.get("user");
            if (VueCookies.get("user") == null) {
                this.logOut();
            } else {
                this.user = user;
            }
        },
    }
};
</script>