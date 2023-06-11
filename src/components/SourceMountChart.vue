<template>
  <!--<Loading></Loading>-->
  <div style="width: 100%; height: 100%" id="sourceMountCanvas"></div>
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
      type: String,
      default: "",
    },
    endDate: {
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
          let eChart = echarts.getInstanceByDom(document.getElementById("sourceMountCanvas"));
          if (eChart != null) {
            eChart.resize();
          }
        }, 500);
      },
      load() {
        this.eChart = echarts.getInstanceByDom(document.getElementById("sourceMountCanvas"));
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
        Event.SourceMount(
          planId,
          startDate,
          endDate,
          function (data, response) {
            // console.log(data);
            _this.initEChart(data, planId);
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

        let source = new Array();
        let series = new Array();
        let category = new Array();

        if (data.length > 0) {
          let i = 0;
          source[i] = new Array();
          source[i].push("日期");
          let color = props.DarkMode ? "#fff" : "#000";

          for (let key in data[0]) {
            if (key == "name") {
              continue;
            }
            source[i].push(key);
            category.push(key);

            series.push({
              //  realtimeSort: true,
              type: "bar",
              //  stack: "date",
              smooth: true,
              //   stack: "number",
              emphasis: {
                focus: "series",
              },
              barMaxWidth: 40,
              //   barGap: "200%",
              name: key,
              label: {
                normal: {
                  show: true,
                  color: color
                },
                emphasis: {
                  show: true,
                  color: color
                },
                align: "left",
                verticalAlign: "middle",
                rotate: 90,
                //     position: "insideBottom",
                //    show: true,
                fontSize: 14,
                distance: 40,
                formatter: function (x) {
                  // console.log(x);
                  return x.data[i + 1];
                },
              },
            });
          }
          // console.log(source[i]);
          category.push("总计");
          source[i].push("总计");

          let total = 0;
          for (let item of data) {
            /*  if (item.total == 0) {
              continue;
            }*/
            i++;

            source[i] = new Array();
            source[i].push(item.name);
            total = 0;
            for (let key in item) {
              if (key == "name") {
                continue;
              }
              total += item[key];
              //  console.log(key);
              //   console.log(item[key]);
              source[i].push(item[key]);
            }
            if (total > 0) {
              source[i].push(total);
            } else {
              source.splice(i, 1);
              i--;
            }
            //    source[i].push(item.total);
          }

          series.push({
            //  realtimeSort: true,
            type: "line",
            stack: "total",
            smooth: true,
            //   stack: "number",
            emphasis: {
              focus: "series",
            },
            name: "总计",
            barMaxWidth: 40,
            //   barGap: "200%",
            label: {
              normal: {
                show: true,
                color: color
              },
              emphasis: {
                show: true,
                color: color
              },
              align: "left",
              verticalAlign: "middle",
              rotate: 90,
              //     position: "insideBottom",
              //    show: true,
              fontSize: 14,
              distance: 40,
              formatter: function (x) {
                // console.log(x);
                return x.data[7];
              },
            },
          });
        }

        // console.log(source);

        if (this.eChart == null) {
          this.eChart = echarts.init(
            document.getElementById("sourceMountCanvas")
          );
        }
        this.eChart.off('click');
        this.eChart.on('click', function (params) {
          window.location.href=`?page=plan&form=dashboard&key=${planId}&date=${params.data[0]}`
          // window.location.href = '?page=plan&category=sourcemount&key=' + planId;
        });

        

        let option = this.initOption(this.planName, series, source, category);
        // console.log(option);
        this.eChart.setOption(option, true);
      },
      initOption(title, series, source, category) {
        return {
          title: {
            text: props.DarkMode ? "" : title + " 来源趋势分析",
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
              magicType: { show: !props.DarkMode, type: ["line", "bar"] },
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
              // console.log(x);
              return (
                x.seriesName +
                " " +
                x.data[0] +
                " [" +
                x.data[x.componentIndex + 1] +
                "条]"
              );
            },
            textStyle: {
              align: "left",
              fontSize: 15,
            },
          },
          legend: {
            //  orient: "vertical",
            data: category, //["积极", "中立", "震惊", "悲伤", "愤怒", "恐惧", "总计"],
            left: "center",
            type:"scroll",
            top: props.DarkMode ? 0 : 30,
            // top: 30,
            textStyle: {
              //    size: "14px",
              fontSize: 10,
              color: props.DarkMode ? '#fff' : '#000'
            },
          },
          dataset: {
            source: source,
            //     dimensions: ["情感", "数量", "占比"],
            //     source: source
          },
          xAxis: {
            show: true,
            type: "category",
            nameGap: 30,
            axisLabel: {
              rotate: 45,
              margin: 25,
              //    formatter: '{value}'
              textStyle: {
                color: props.DarkMode ? '#fff' : '#000'

              }
            },
          },
          yAxis: {
            name: "数量",
            axisLabel: {
              //    formatter: '{value}'
              textStyle: {
                color: props.DarkMode ? '#fff' : '#000'

              }
            },
          },
          grid: {
            show: !props.DarkMode,
            left: 60,
            right: 20,
            bottom: props.DarkMode ? 50 : 60,
            top: props.DarkMode ? 50 : 110,
          },
          series: series,
        };
      },
    };
  },
  mounted() {
    // 在通过mounted调用即可
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