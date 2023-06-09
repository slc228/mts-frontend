<template>
  <div style="width: 100%; height: 100%" id="wordCloudCanvas"></div>
</template>  
<style>
</style>
<script>
//通过this.$echarts来使用
import { reactive, ref, watch, defineComponent } from "vue";
import * as echarts from "echarts";
import * as wordcloud from "echarts-wordcloud";
import Event from "../model/Event";

export default {
  eChart: null,
  props: {
    planId: {
      type: String,
      default: ""
    },
    planName: {
      type: String,
      default: "",
    },
    DarkMode: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    return {
      resize(e) {
        setTimeout(() => {
          let eChart = echarts.getInstanceByDom(document.getElementById("wordCloudCanvas"));
          if (eChart != null) {
            eChart.resize();
          }
        }, 500);
      },
      init() {
        this.eChart = echarts.getInstanceByDom(document.getElementById("wordCloudCanvas"));
        if (this.eChart != null) {
          this.resize();
        } else {
          if(props.planId != null)
          this.loadData(props.planId);
        }
      },
      reload(planId) {
        this.loadData(planId);
      },
      loadData(planId) {
        let _this = this;
        console.log(planId);
        Event.WordCloud(
          planId,
          function (data, response) {
            console.log(data);
            _this.initEChart(data, planId);
          },
          function (error) {
            console.log(error);
          }
        );
      },
      initEChart(data, planId) {
        console.log(data);
        this.eChart = echarts.init(document.getElementById("wordCloudCanvas"));

        this.eChart.off('click');
        this.eChart.on('click', function (params) {
          window.location.href = '?page=plan&category=wordcloud&key=' + planId;
        });

        let option = this.initOption(this.planName, data);
        console.log(option);
        console.log(this.eChart);
        this.eChart.setOption(option, true);
      },
      initOption(title, data) {
        return {
          title: {
            text: props.DarkMode ? "" : title + " 词云分析",
            //   subtext: "",
            left: "center",
          },
          animation: true,

          // 工具箱
          toolbox: {
            // 显示工具箱
            show: true,
            //   itemSize: 20,
            //  itemGap: 10,
            //   right: 50,
            feature: {
              mark: {
                show: true,
              },
              // 还原
              restore: {
                show: true,
              },
              // 保存为图片
              saveAsImage: {
                show: true,
              },
              /*  importButton: {//自定义按钮 danielinbiti,这里增加，selfbuttons可以随便取名字  
                            show: true,//是否显示  
                            title: '引入实体', //鼠标移动上去显示的文字  
                            icon: 'image://../Image/Icon/import.png', //图标  
                            onclick: function () {//点击事件,这里的option1是chart的option信息  
                                alert('1');//这里可以加入自己的处理代码，切换不同的图形  
                            }
                        }*/
            },
          },
          tooltip: {
            show: true, //默认显示
            showContent: true, //是否显示提示框浮层
            trigger: "item", //触发类型，默认数据项触发
            triggerOn: "mousemove", //提示触发条件，mousemove鼠标移至触发，还有click点击触发
            alwaysShowContent: false, //默认离开提示框区域隐藏，true为一直显示
            showDelay: 100, //浮层显示的延迟，单位为 ms，默认没有延迟，也不建议设置。在 triggerOn 为 'mousemove' 时有效。
            hideDelay: 1000, //浮层隐藏的延迟，单位为 ms，在 alwaysShowContent 为 true 的时候无效。
            enterable: false, //鼠标是否可进入提示框浮层中，默认为false，如需详情内交互，如添加链接，按钮，可设置为 true。
            position: "top", //提示框浮层的位置，默认不设置时位置会跟随鼠标的位置。只在 trigger 为'item'的时候有效。
            confine: false, //是否将 tooltip 框限制在图表的区域内。外层的 dom 被设置为 'overflow: hidden'，或者移动端窄屏，导致 tooltip 超出外界被截断时，此配置比较有用。
            transitionDuration: 0.4, //提示框浮层的移动动画过渡时间，单位是 s，设置为 0 的时候会紧跟着鼠标移动。
            animationDurationUpdate: 500, // 动画更新变化时间
            animationEasingUpdate: "quinticInOut",
            formatter: function (x) {
              return x.data.toolTip;
            },
            textStyle: {
              align: "left",
              fontSize: 15,
            },
          },
          series: [
            {
              data: data,
              type: "wordCloud",
              sizeRange: [15, 150],
              rotationRange: [-45, 45, 90],
              rotationStep: 35,
              gridSize: 10,
              left: "center",
              top: "center",
              right: null,
              bottom: null,
              //    shape: "pentagon",
              width: "100%",
              height: "100%",
              emphasis: {
                focus: "self",
                textStyle: {
                  shadowBlur: 10,
                  shadowColor: "#333",
                },
              },
              textStyle: {
                color: function () {
                  let color =
                    "rgb(" +
                    [
                      Math.round(Math.random() * 255),
                      Math.round(Math.random() * 255),
                      Math.round(Math.random() * 255),
                    ].join(",") +
                    ")";
                  //    console.log(color);
                  return color;
                },
              },
            },
          ],
        };
      },
    };
  },
  mounted() {
    // 在通过mounted调用即可
   this.init();
  },
  beforeMount() {
    window.addEventListener("resize", this.resize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resize);
  },
  data() {
    return {
      data: [],
    };
  },
};
</script>