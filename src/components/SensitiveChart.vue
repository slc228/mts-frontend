<template>
  <!--<Loading></Loading>-->
  <div style="width: 100%; height: 100%" id="sensitiveCanvas"></div>
</template>  
<script>
//通过this.$echarts来使用
import * as Vue from "vue";
import * as echarts from "echarts";
import Event from "../model/Event";

export default {
  eChart: null,
  props: {
    planId: {},
    planName: {
      type: String,
      default: "",
    },
    startDate: {
      type: String, default: ""
    },
    endDate: {
      type: String, default: ""
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
          let eChart = echarts.getInstanceByDom(document.getElementById("sensitiveCanvas"));
          if (eChart != null) {
            eChart.resize();
          }
        }, 500);
      },
      load() {
        this.eChart = echarts.getInstanceByDom(document.getElementById("sensitiveCanvas"));
        if (this.eChart != null) {
          this.resize();
        } else {
          this.init("", "");
        }
      },
      reload(planId) {
        this.loadData(planId, '', '');
      },
      loadData(planId, startDate, endDate) {
        let _this = this;
        // console.log(planId);
        Event.Senseitive(
          planId,
          startDate,
          endDate,
          function (data, response) {
            // console.log(data);

            let source = new Array();

            source.push({
              value: data.senDistribution0,
              name: "普通信息",
              percent: (
                (data.senDistribution0 * 100) /
                (data.senDistribution0 + data.senDistribution1)
              ).toFixed(2),
            });
            source.push({
              value: data.senDistribution1,
              name: "敏感信息",
              percent: (
                (data.senDistribution1 * 100) /
                (data.senDistribution0 + data.senDistribution1)
              ).toFixed(2),
            });

            _this.initEChart(source, planId);
          },
          function (error) {
            console.log(error);
          }
        );
      },
      query() {
        this.init(this.startDate, this.endDate);
      },
      reset() {
        this.init("", "");
      },
      init(startDate, endDate) {
        // console.log(startDate);
        // console.log(endDate);

        if (startDate != "") {
          startDate += " 00:00:00";
        }
        if (endDate != "") {
          endDate += " 00:00:00";
        }
        this.loadData(props.planId, startDate, endDate);

      },
      initEChart(data, planId) {
        // console.log(data);
        if (this.eChart == null) {
          this.eChart = echarts.init(
            document.getElementById("sensitiveCanvas")
          );
        }
        this.eChart.off('click');
        this.eChart.on('click', function (params) {
          // window.location.href = '?page=plan&category=sensitive&key=' + planId;
          window.location.href=`?page=plan&form=dashboard&key=${planId}&sensitive=${params.data.name==='敏感信息'?2:1}`
        });
        let option = this.initOption(this.planName, data);
        // console.log(option);
        this.eChart.setOption(option, true);
      },
      initOption(title, data) {
        let color = props.DarkMode ? '#fff' : '#000';
        return {
          title: {
            text: props.DarkMode ? "" : title + " 敏感度分析",
            //   subtext: "Fake Data",
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
                show: !props.DarkMode,
              },
              //    dataView: { show: true, readOnly: false },
              //    magicType: { show: true, type: ["line", "bar"] },
              // 还原
              restore: {
                show: !props.DarkMode,
              },
              // 保存为图片
              saveAsImage: {
                show: !props.DarkMode,
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
            trigger: "item",
          },
          legend: {
            //  orient: "vertical",
            left: "center",
            top: props.DarkMode ? 5 : 30,
            textStyle: {
              //    size: "14px",
              fontSize: 10,
              color: color
            },
          },
          series: [
            {
              top: 40,
              name: "敏感度分析",
              type: "pie",
              radius: "60%",
              labelLine: {
                length: 20,
              },
              data: data,

              label: {
                normal: {
                  show: true,
                  color: color
                },
                emphasis: {
                  show: true,
                  color: color
                },
                alignTo: "labelLine",
                //    position: "top",
                show: true,
                fontSize: 16,
                distance: 20,
                formatter: function (x) {
                  console.log(x);

                  return (
                    x.data.name +
                    " [" +
                    x.data.value +
                    "条，" +
                    x.data.percent +
                    "%]"
                  );
                },
              },

              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                  textStyle: {
                    fontSize: "40",
                  },
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
    //  this.init();
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