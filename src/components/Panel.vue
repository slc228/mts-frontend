<template>
    <div style="
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      width: 100vw;
      height: 100%;
         background-image: url(yuqing/image/bg.jpg);
                background-repeat: no-repeat;
                background-size:cover;
    ">
        <div style="
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 100vw;
      height: 5vw;
         background-image: url(yuqing/image/headbg.png);
                background-repeat: no-repeat;
                background-size:cover;
                color:#fff;
                font-size:1.3vw;
                font-weight: 600;
    ">
            <div style="
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
                font-size:0.8vw;
    font-family: DigifaceWide;
    width:18vw; margin: 0 0 0 2vw ;
    "> 
            </div>
            <div>舆情监测实时大数据平台</div>
            <div style="
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
                font-size:1vw;
    font-family: DigifaceWide;
    width:18vw;
    "> {{ currentTime }}</div>
        </div>
        <div style="
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      width: 100vw;
      height: calc(100% - 5vw);
    ">
            <div style="
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      width: 30vw;
      height: 100%;
    ">
                <div class="itemDiv" style="
                height: calc((100% - 5vw) / 4);
      margin:1vw 0 0 0;
    ">
                    <div class="itemHeaderDiv"></div>
                    <div class="itemMainContentDiv" style="
      flex-direction: column;">
                        <div style="
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    height: 1.2vw;
    font-size: 0.8vw;
    color: #fff;
                width:90%;
    border-left: 0.4vw solid #02a6b5;
    padding: 0 0 0 0.5vw;
    ">总量趋势 </div>

                        <TotalMountChart ref="totalMountChart" :DarkMode="true" />
                    </div>
                    <div class="itemFooterDiv"></div>
                </div>
                <div class="itemDiv" style="
                height: calc((100% - 5vw) / 4);
      margin:1vw 0 0 0;
    ">
                    <div class="itemHeaderDiv"></div>
                    <div class="itemMainContentDiv" style="
      flex-direction: column;">
                        <div style="
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    height: 1.2vw;
    font-size: 0.8vw;
    color: #fff;
                width:90%;
    border-left: 0.4vw solid #02a6b5;
    padding: 0 0 0 0.5vw;
    "> 词云</div>
                        <WordCloudChart ref="wordCloudChart" :DarkMode="true" />

                    </div>
                    <div class="itemFooterDiv"></div>
                </div>


                <div style="
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
                height: calc((100% - 5vw) / 4);
                width:100%;
      margin:1vw 0 0 0;
    ">


                    <div class="itemDiv" style="width: 49%;">
                        <div class="itemHeaderDiv"></div>
                        <div class="itemMainContentDiv" style="
      flex-direction: column;">
                            <div style="
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    height: 1.2vw;
    font-size: 0.8vw;
    color: #fff;
                width:90%;
    border-left: 0.4vw solid #02a6b5;
    padding: 0 0 0 0.5vw;
    "> 敏感度</div>
                            <SensitiveChart ref="sensitiveChart" :DarkMode="true" />


                        </div>
                        <div class="itemFooterDiv"></div>
                    </div>



                    <div class="itemDiv" style="width: 49%;">
                        <div class="itemHeaderDiv"></div>
                        <div class="itemMainContentDiv" style="
      flex-direction: column;">
                            <div style="
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    height: 1.2vw;
    font-size: 0.8vw;
    color: #fff;
                width:90%;
    border-left: 0.4vw solid #02a6b5;
    padding: 0 0 0 0.5vw;
    ">情感分布 </div>
                            <EmotionChart ref="emotionChart" :DarkMode="true" />

                        </div>
                        <div class="itemFooterDiv"></div>
                    </div>
                </div>

                <div class="itemDiv" style="
                height: calc((100% - 5vw) / 4);
      margin:1vw 0 0 0;
    ">
                    <div class="itemHeaderDiv"></div>
                    <div class="itemMainContentDiv" style="
      flex-direction: column;">
                        <div style="
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    height: 1.2vw;
    font-size: 0.8vw;
    color: #fff;
                width:90%;
    border-left: 0.4vw solid #02a6b5;
    padding: 0 0 0 0.5vw;
    "> 情感趋势 </div>

                        <EmotionMountChart ref="emotionMountChart" :DarkMode="true" />
                    </div>
                    <div class="itemFooterDiv"></div>
                </div>
            </div>
            <div style="
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      width: 36vw;
      height: 100%;
    ">
                <div style="
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 3vw;
      margin:1.5vw 0 0 0;
    ">
                    <div class="mainItemDiv">
                        <div class="mainItemCellDiv">
                            <div class="mainItemTextDiv">方案</div>
                            <div class="mainItemValueCellDiv">
                                <div id="plan">{{ planCount }}</div>
                                <div class="mainItemValueUnitDiv">个</div>
                            </div>
                        </div>
                    </div>
                    <div class="mainItemDiv">
                        <div class="mainItemCellDiv">
                            <div class="mainItemTextDiv">应急方案</div>
                            <div class="mainItemValueCellDiv">
                                <div id="emergencyPlanCount">{{ emergencyPlanCount }}</div>
                                <div class="mainItemValueUnitDiv">个</div>
                            </div>
                        </div>
                    </div>
                    <div class="mainItemDiv">
                        <div class="mainItemCellDiv">
                            <div class="mainItemTextDiv">今日新增</div>
                            <div class="mainItemValueCellDiv">
                                <div id="increment">{{ increment }}</div>+
                                <div class="mainItemValueUnitDiv">条</div>
                            </div>
                        </div>
                    </div>
                    <div class="mainItemDiv">
                        <div class="mainItemCellDiv">
                            <div class="mainItemTextDiv">全部舆情</div>
                            <div class="mainItemValueCellDiv">
                                <div id="totalCount">{{ totalCount }}</div>
                                <div class="mainItemValueUnitDiv">条</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    height: 5vw;
    font-size: 1vw;
    color: #fff;
                width:100%;
                margin:1vw 0 0 0;
    ">
                    <div class="itemDiv planItemDiv" style="
                width:31%; flex-shrink: plansOnboad0;flex-basis: 31%;
      margin: 0 3% 0 0;
    " v-for="(item, index) in plansOnboad" v-bind:key="index" @click="SelectPlan(item, index)" v-bind:class="{
    selectedItemDiv: index == selectedPlanIndex,
    planHideDiv: selectedPlanIndex > 2 && index < 3,
    planHideDiv: selectedPlanIndex < 3 && index > 2,
    planUpdateDiv: selectedPlanIndex == 3 && index > 2,
    planUpdateHideDiv: selectedPlanIndex == 3 && index < 3,
}"> 


                        <div class="itemHeaderDiv"></div>
                        <div class="itemMainContentDiv">

                            <div style="
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
    padding: 0 0 0 0.5vw;
    height:100%;
    cursor:pointer;
    " v-bind:class="{
    planSpliterRedDiv: item.category == 'emergency',
    planSpliterGreenDiv: item.category == 'normal',
}"> </div>

                            <div style="
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
    margin: 0 0 0 0.5vw;
    height:100%;
    width:100%;
    cursor:pointer;
    ">



                                <div style="
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 1.2vw;
    font-weight:600;
    flex-wrap: wrap;
    ">

                                    {{ item.programmeName }}
                                </div>
                                <div style="
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  font-size: 0.7vw;
  font-weight: 400;
    font-family: DigifaceWide;
    ">
                                    总计 {{ item.quantityAll }} 条
                                </div>
                                <div style="
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  font-size: 0.6vw;
  font-weight: 400;
  color: #888;
    font-family: DigifaceWide;
    ">
                                    当日 {{ item.quantityToday }}+ 条
                                </div>
                            </div>
                        </div>
                        <div class="itemFooterDiv"></div>
                    </div>
                </div>

                <div class="itemDiv" style="
                height: calc((100% - 13vw) / 2);
      margin:1vw 0 0 0;
    ">
                    <div class="itemHeaderDiv"></div>
                    <div class="itemMainContentDiv" style="
      flex-direction: column;">
                        <div style="
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    height: 1.2vw;
    font-size: 0.8vw;
    color: #fff;
                width:90%;
    border-left: 0.4vw solid #02a6b5;
    padding: 0 0 0 0.5vw;
    "> 地域分布 </div>
                        <RegionChart ref="regionChart" :DarkMode="true" />
                    </div>
                    <div class="itemFooterDiv"></div>
                </div>
                <div class="itemDiv" style="
                height: calc((100% - 13vw) / 2);
      margin:1vw 0 0 0;
    ">
                    <div class="itemHeaderDiv"></div>
                    <div class="itemMainContentDiv" style="
      flex-direction: column;">
                        <div style="
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    height: 1.2vw;
    font-size: 0.8vw;
    color: #fff;
                width:90%;
    border-left: 0.4vw solid #02a6b5;
    padding: 0 0 0 0.5vw;
    "> 微博溯源 </div>
                        <WeiboSourceChart ref="weiboSourceChart" :DarkMode="true" />
                    </div>
                    <div class="itemFooterDiv"></div>
                </div>
            </div>
            <div style="
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      width: 30vw;
      height: 100%;
    ">

                <div class="itemDiv" style="
                height: calc((100% - 4vw) / 2);
      margin:1vw 0 0 0;
    ">
                    <div class="itemHeaderDiv"></div>
                    <div class="itemMainContentDiv" style="
      flex-direction: column;">
                        <div style="
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    height: 1.2vw;
    font-size: 0.8vw;
    color: #fff;
                width:90%;
    border-left: 0.4vw solid #02a6b5;
    padding: 0 0 0 0.5vw;
    "> 来源趋势 </div>
                        <SourceMountChart ref="sourceMountChart" :DarkMode="true" />




                    </div>
                    <div class="itemFooterDiv"></div>
                </div>
                <div class="itemDiv" style="
                height: calc((100% - 4vw) / 4);
      margin:1vw 0 0 0;
    ">
                    <div class="itemHeaderDiv"></div>
                    <div class="itemMainContentDiv" style="
      flex-direction: column;">
                        <div style="
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    height: 1.2vw;
    font-size: 0.8vw;
    color: #fff;
                width:90%;
    border-left: 0.4vw solid #02a6b5;
    padding: 0 0 0 0.5vw;
    "> 来源分布 </div>

                        <SourceChart ref="sourceChart" :DarkMode="true" />

                    </div>
                    <div class="itemFooterDiv"></div>
                </div>
                <div class="itemDiv" style="
                height: calc((100% - 4vw) / 4);
      margin:1vw 0 0 0;
    ">
                    <div class="itemHeaderDiv"></div>
                    <div class="itemMainContentDiv" style="
      flex-direction: column;">
                        <div style="
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    height: 1.2vw;
    font-size: 0.8vw;
    color: #fff;
                width:90%;
    border-left: 0.4vw solid #02a6b5;
    padding: 0 0 0 0.5vw;
    "> 事件溯源 </div>
                        <EventTrackChart ref="eventTrackChart" :DarkMode="true" />
                    </div>
                    <div class="itemFooterDiv"></div>
                </div>

            </div>
        </div>
    </div>
</template>
<style>
@font-face {
    font-family: "numfont";
    src: url('../../public/yuqing/fonts/num.otf') format('truetype');
}

@font-face {
    font-family: DigifaceWide;
    src: url("../../public/yuqing/fonts/digifaw.ttf")
}

.selectedItemDiv .planSpliterRedDiv {
    animation-name: none;
}

.selectedItemDiv .planSpliterGreenDiv {
    animation-name: none;
}

.planSpliterRedDiv {
    border-left: 0.4vw solid red;

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

.planSpliterGreenDiv {
    border-left: 0.4vw solid green;

    /* IE10、Firefox and Opera，IE9以及更早的版本不支持 */
    animation-name: breath;
    /* 动画名称 */
    animation-duration: 3.5s;
    /* 动画时长3秒 */
    animation-timing-function: ease-in-out;
    /* 动画速度曲线：以低速开始和结束 */
    animation-iteration-count: infinite;
    /* 播放次数：无限 */
}

.itemDiv {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.planItemDiv:hover {
    border: 3px solid #02a6b5;
}

.planItemDiv:hover .itemMainContentDiv {
    border-left: 0px;
    border-right: 0px;
}

.planItemDiv:hover .itemHeaderDiv {
    border-top: 0px;
}

.planItemDiv:hover .itemHeaderDiv::before {
    border-top: 0px;
    border-left: 0px;
}

.planItemDiv:hover .itemHeaderDiv::after {
    border-top: 0px;
    border-right: 0px;
}

.planItemDiv:hover .itemFooterDiv {
    border-bottom: 0px;
}

.planItemDiv:hover .itemFooterDiv::before {
    border-bottom: 0px;
    border-left: 0px;
}

.planItemDiv:hover .itemFooterDiv::after {
    border-bottom: 0px;
    border-right: 0px;
}


.selectedItemDiv {
    border: 3px solid #02a6b5;

    /* IE10、Firefox and Opera，IE9以及更早的版本不支持 */
    animation-name: breath;
    /* 动画名称 */
    animation-duration: 1s;
    /* 动画时长3秒 */
    animation-timing-function: ease-in-out;
    /* 动画速度曲线：以低速开始和结束 */
    animation-iteration-count: infinite;
    /* 播放次数：无限 */
}

.selectedItemDiv .itemMainContentDiv {
    border-left: 0px;
    border-right: 0px;
}

.selectedItemDiv .itemHeaderDiv {
    border-top: 0px;
}

.selectedItemDiv .itemHeaderDiv::before {
    border-top: 0px;
    border-left: 0px;
}

.selectedItemDiv .itemHeaderDiv::after {
    border-top: 0px;
    border-right: 0px;
}

.selectedItemDiv .itemFooterDiv {
    border-bottom: 0px;
}

.selectedItemDiv .itemFooterDiv::before {
    border-bottom: 0px;
    border-left: 0px;
}

.selectedItemDiv .itemFooterDiv::after {
    border-bottom: 0px;
    border-right: 0px;
}

.itemMainContentDiv {
    border-left: 2px solid rgba(25, 186, 139, .17);
    border-right: 2px solid rgba(25, 186, 139, .17);
    width: calc(100% - 2vw);
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0 1vw 0 1vw;
}

.itemHeaderDiv {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    font-size: 1vw;
    color: #fff;
    border-top: 2px solid rgba(25, 186, 139, .17);
}

.itemFooterDiv {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    font-size: 1vw;
    color: #fff;
    border-bottom: 2px solid rgba(25, 186, 139, .17);

}

.itemHeaderDiv::before {
    width: 0.5vw;
    height: 0.5vw;
    content: "";
    border-top: 2px solid #02a6b5;
    border-left: 2px solid #02a6b5;
    position: relative;
    top: -2px;
    left: -2px;
}

.itemHeaderDiv::after {
    width: 0.5vw;
    height: 0.5vw;
    content: "";
    border-top: 2px solid #02a6b5;
    border-right: 2px solid #02a6b5;
    position: relative;
    top: -2px;
    right: -2px;
}

.itemFooterDiv::before {
    width: 0.5vw;
    height: 0.5vw;
    content: "";
    border-bottom: 2px solid #02a6b5;
    border-left: 2px solid #02a6b5;
    position: relative;
    bottom: -2px;
    left: -2px;
}

.itemFooterDiv::after {
    width: 0.5vw;
    height: 0.5vw;
    content: "";
    border-bottom: 2px solid #02a6b5;
    border-right: 2px solid #02a6b5;
    position: relative;
    bottom: -2px;
    right: -2px;
}

.mainItemDiv {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 100%;
    border-left: 2px solid #00bbec;
    padding: 0 0 0 0.7vw;
}

.mainItemCellDiv {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 96%;
    font-size: 1.1vw;
}

.mainItemTextDiv {
    color: #00bbec;
    font-size: 0.8vw;
    width: 100%;
    font-weight: 600;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-start;
}

.mainItemValueCellDiv {
    font-family: DigifaceWide;
    color: #fff;
    font-size: 1vw;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-start;
    width: 100%;
}

.mainItemValueUnitDiv {
    font-size: 0.7vw;
    margin: 0 0 0 0.5vw;
}

.planUpdateDiv {
    transition: all ease 500ms;
    transform: translateX(-36.7vw);
}

.planUpdateHideDiv {
    opacity: 0;
    transform: translateX(-36.7vw);
    transition: all ease 500ms;
}

.planHideDiv {
    display: none;
    transition: all ease 500ms;
}
</style>
<script>
import { reactive, ref, watch } from "vue";
import Plan from "../model/Plan";
import VueCookies from 'vue-cookies'
import RegionChart from "@/components/RegionChart.vue";
import WeiboSourceChart from "@/components/WeiboSourceChart.vue";
import WordCloudChart from "@/components/WordCloudChart.vue";
import SourceMountChart from "@/components/SourceMountChart.vue";
import SensitiveChart from "@/components/SensitiveChart.vue";
import EmotionChart from "@/components/EmotionChart.vue";
import SourceChart from "@/components/SourceChart.vue";
import TotalMountChart from "@/components/TotalMountChart.vue";
import EmotionMountChart from "@/components/EmotionMountChart.vue";
import EventTrackChart from "@/components/EventTrack.vue";


export default {
    components: {
        WordCloudChart,
        SensitiveChart,
        EmotionChart,
        SourceChart,
        TotalMountChart,
        EmotionMountChart,
        RegionChart,
        SourceMountChart,
        WeiboSourceChart,
        EventTrackChart,
    },
    created() {
        this.LoadData();
        this.checkLogin();
    },
    mounted() {
        this.refresh();
        this.checkLogin();
        this.showTime();
    },
    updated() {
        this.checkLogin();
    },
    setup() {
        const wordCloudChart = ref();
        const sensitiveChart = ref();
        const emotionChart = ref();
        const sourceChart = ref();
        const totalMountChart = ref();
        const emotionMountChart = ref();
        const regionChart = ref();
        const sourceMountChart = ref();
        const weiboSourceChart = ref();
        const eventTrackChart = ref();

        const eventTrackOnShow = (planId) => {
            eventTrackChart.value.reload(planId);
        };
        const weiboSourceOnShow = (planId) => {
            weiboSourceChart.value.reload(planId);
        };
        const regionChartOnShow = (planId) => {
            regionChart.value.reload(planId);
        };
        const wordCloudOnShow = (planId) => {
            wordCloudChart.value.reload(planId);
        };
        const sourceChartOnShow = (planId) => {
            sourceChart.value.reload(planId);
        };
        const sensitiveOnShow = (planId) => {
            sensitiveChart.value.reload(planId);
        };
        const emotionChartOnShow = (planId) => {
            emotionChart.value.reload(planId);
        };
        const totalMountChartOnShow = (planId) => {
            totalMountChart.value.reload(planId);
        };
        const sourceMountChartOnShow = (planId) => {
            sourceMountChart.value.reload(planId);
        };
        const emotionMountChartOnShow = (planId) => {
            emotionMountChart.value.reload(planId);
        };
        return {
            eventTrackChart,
            eventTrackOnShow,
            weiboSourceChart,
            weiboSourceOnShow,
            regionChart,
            regionChartOnShow,
            wordCloudChart,
            wordCloudOnShow,
            sourceChart,
            sourceChartOnShow,
            sensitiveChart,
            sensitiveOnShow,
            emotionChart,
            emotionChartOnShow,
            totalMountChart,
            totalMountChartOnShow,
            sourceMountChart,
            sourceMountChartOnShow,
            emotionMountChart,
            emotionMountChartOnShow,
        };
    },
    data() {
        return {
            refreshTime: 5000,
            planCount: 0,
            emergencyPlanCount: 0,
            increment: 0,
            totalCount: 0,
            logined: false,
            plans: [],
            plansOnboad: [],
            selectedPlan: -1,
            selectedPlanIndex: -1,
            currentPlanIndex: 0,
            clock: null,
            currentTime: '',
            focusedPlan: -1,

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
            this.logined = false;
        },
        checkLogin() {
            let user = VueCookies.get("user");
            if (user == null || !user.roleRights.publicOpinionMonitoring) {
                this.logOut();
            }
        },
        LoadData() {
           this.GetPlanCount();
           this.GetEmergencyPlanCount();
           this.GetIncrement();
            this.GetTotoal();
            this.GetPlans();
        },
        SelectPlan(item, index) {
            console.log(item);
            console.log(this.focusedPlan);
            console.log(this.focusedPlan == item.fid);
            if (this.focusedPlan == item.fid) {
                this.focusedPlan = -1;
                this.refresh();
                return;
            }
            this.focusedPlan = item.fid;
            if (this.selectedPlan != item.fid) {
                this.ShowPlan(item, index);
            }
        },
        ShowPlan(item, index) {
            //  console.log(item);
            let _this = this;
            this.selectedPlan = item.fid;//this.plans[index].fid;
            this.regionChartOnShow(this.selectedPlan);
            this.weiboSourceOnShow(this.selectedPlan);
            this.wordCloudOnShow(this.selectedPlan);
            this.sourceChartOnShow(this.selectedPlan);
            this.sensitiveOnShow(this.selectedPlan);
            this.emotionChartOnShow(this.selectedPlan);
            this.totalMountChartOnShow(this.selectedPlan);
            this.sourceMountChartOnShow(this.selectedPlan);
            this.emotionMountChartOnShow(this.selectedPlan);
            this.eventTrackOnShow(this.selectedPlan);

            console.log(index);
            console.log(_this.selectedPlanIndex);

            if (index != _this.selectedPlanIndex) {
                _this.selectedPlanIndex = index;
                if (_this.selectedPlanIndex > 3) {
                    _this.selectedPlanIndex = 1;
                    for (let i = 0; i < 3; i++) {
                        _this.plansOnboad[i] = _this.plansOnboad[i + 3];
                        _this.plansOnboad[i + 3] = _this.plans[_this.currentPlanIndex];
                        _this.currentPlanIndex++;
                        if (_this.currentPlanIndex >= _this.plans.length) {
                            _this.currentPlanIndex = 0;
                        }
                    }
                }
            }

        },
        GetPlans() {
            let _this = this;
            Plan.Get(
                1,
                10,
                "1111",
                function (data, response) {
                    console.log(data);
                    console.log(data.fangAnContent);
                    _this.plans = data.fangAnContent;
                    
                    if (data.fangAnContent.length > 0) {
                        let index = 0;
                        while (_this.plans.length <= 6) {
                            _this.plans.push(data.fangAnContent[index])
                            index++;
                            if (index >= data.fangAnContent.length)//_this.plans.length) 
                            {
                                index = 0;
                            }
                        }
                        while (_this.plansOnboad.length < 6) {
                            _this.plansOnboad.push(_this.plans[_this.currentPlanIndex]);
                            _this.currentPlanIndex++;
                            if (_this.currentPlanIndex >= 6)//_this.plans.length) 
                            {
                                _this.currentPlanIndex = 0;
                            }
                        }
                      // _this.currentPlanIndex = 0;
                        _this.selectedPlanIndex++;
                      console.log(_this.selectedPlanIndex);
                        if (_this.selectedPlanIndex == 3) {
                            _this.selectedPlanIndex = 0;
                            for (let i = 0; i < 3; i++) {
                                _this.plansOnboad[i] = _this.plansOnboad[i + 3];
                                _this.plansOnboad[i + 3] = _this.plans[_this.currentPlanIndex];
                                _this.currentPlanIndex++;
                                if (_this.currentPlanIndex >= _this.plans.length) {
                                    _this.currentPlanIndex = 0;
                                }
                            }
                        }
                        console.log(_this.plansOnboad);
                        console.log(_this.plansOnboad[_this.selectedPlanIndex]);
                        
                        console.log(_this.currentPlanIndex);
                        console.log(_this.selectedPlanIndex);
                        _this.ShowPlan(_this.plansOnboad[_this.selectedPlanIndex], _this.selectedPlanIndex);
                    } else {
                        _this.selectedPlanIndex = -1;
                        _this.currentPlanIndex = 0;
                        _this.plansOnboad = new Array();
                    }
                },
                _this.errorHanlder
            );
        },
        GetIncrement() {
            let _this = this;
            Plan.GetIncrement(
                function (data, response) {
                    console.log(data);
                    console.log(data.quantity);
                    if (data.quantity > _this.increment) {
                        $("#increment")
                            .prop("Counter", _this.increment)
                            .animate(
                                {
                                    Counter: data.quantity,
                                },
                                {
                                    duration: 3000,
                                    easing: "swing",
                                    step: function (now) {
                                        //  console.log(now);
                                        $("#increment").text(Math.ceil(now));
                                    },
                                }
                            );
                        _this.increment = data.quantity;
                    }
                },
                this.errorHanlder
            );
        },
        GetTotoal() {
            let _this = this;
            Plan.GetTotoal(
                function (data, response) {
                    console.log(data);
                    console.log(data.quantity);

                    console.log(_this.totalCount);
                    if (data.quantity > _this.totalCount) {
                        console.log($("#totalCount").text());

                        $("#totalCount")
                            .prop("Counter", _this.totalCount)
                            .animate(
                                {
                                    Counter: data.quantity,
                                },
                                {
                                    duration: 3000,
                                    easing: "swing",
                                    step: function (now) {
                                        //  console.log(now);
                                        $("#totalCount").text(Math.ceil(now));
                                    },
                                }
                            );
                        _this.totalCount = data.quantity;
                    }
                },
                this.errorHanlder
            );
        },
        GetPlanCount() {
            let _this = this;
            Plan.GetPlanCount(
                function (data, response) {
                    console.log(data);

                    if (data.quantity > _this.planCount) {
                        $("#plan")
                            .prop("Counter", _this.planCount)
                            .animate(
                                {
                                    Counter: data.quantity,
                                },
                                {
                                    duration: 3000,
                                    easing: "swing",
                                    step: function (now) {
                                        //  console.log(now);
                                        $("#plan").text(Math.ceil(now));
                                    },
                                }
                            );

                        _this.planCount = data.quantity;
                    }
                },
                this.errorHanlder
            );
        },
        GetEmergencyPlanCount() {
            let _this = this;
            Plan.GetEmergencyPlanCount(
                function (data, response) {
                    console.log(data);
                    console.log(data.quantity);

                    if (data.quantity > _this.emergencyPlanCount) {
                        $("#emergencyPlan")
                            .prop("Counter", _this.emergencyPlanCount)
                            .animate(
                                {
                                    Counter: data.quantity,
                                },
                                {
                                    duration: 3000,
                                    easing: "swing",
                                    step: function (now) {
                                        //  console.log(now);
                                        $("#emergencyPlan").text(Math.ceil(now));
                                    },
                                }
                            );

                        _this.emergencyPlanCount = data.quantity;
                    }
                },
                this.errorHanlder
            );
        },
        refresh() {
            let _this = this;
            if (_this.focusedPlan != -1) {
                return;
            }
            console.log(_this.focusedPlan);
            setTimeout(function () {
                if (_this.focusedPlan == -1) {
                    _this.LoadData();
                    _this.refresh();
                }
            }, this.refreshTime);
        },
        showTime() {
            // clearTimeout(this.clock);//清除定时器
            let dt = new Date();
            let y = dt.getFullYear();
            let mt = dt.getMonth() + 1;
            let day = dt.getDate();
            let h = dt.getHours();//获取时
            let m = dt.getMinutes();//获取分
            let s = dt.getSeconds();//获取秒
            if (mt < 10) {
                mt = "0" + mt.toString();
            }
            if (day < 10) {
                day = "0" + day.toString();
            }
            if (h < 10) {
                h = "0" + h.toString();
            }
            if (m < 10) {
                m = "0" + m.toString();
            }
            if (s < 10) {
                s = "0" + s.toString();
            }
            this.currentTime = y.toString() + '/' + mt.toString() + '/' + day.toString() + ' ' +
                h.toString() + ':' + m.toString() + ':' + s.toString();
            console.log(this.currentTime);
            this.clock = setTimeout(this.showTime, 1000); //设定定时器，循环运行     

        },
        openHotArticleSource(item) {
            window.open(item.url);
        },
        hideModel() {
        },
    },
};
</script>