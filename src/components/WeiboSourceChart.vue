<template>
  <div style="width: 100%; height: 100%" id="weiboSourceCanvas"></div>
</template>  
<style>
</style>
<script>
//通过this.$echarts来使用
import { reactive, ref, watch, defineComponent } from "vue";
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
    DarkMode: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const paras = reactive({
      nodeIndex: 0,
      symbolSize: "50",
      nodes: [],
      links: [],
    });
    //   const  refData = toRefs(data)
    return {
      paras,
      resize(e) {
        setTimeout(() => {
          let eChart = echarts.getInstanceByDom(document.getElementById("weiboSourceCanvas"));
          if (eChart != null) {
            eChart.resize();
          }
        }, 500);
      },
      init() {
        this.eChart = echarts.getInstanceByDom(document.getElementById("weiboSourceCanvas"));
        if (this.eChart != null) {
          this.resize();
        } else {
          this.loadData(props.planId);
        }
      },
      reload(planId) {
        this.loadData(planId);
      },
      loadData(planId) {
        let _this = this;
        console.log(planId);
        Event.WeiboSource(
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
      generateNodeId() {
        this.paras.nodeIndex++;
        return this.paras.nodeIndex.toString();
      },
      initNodes(children, parentId) {
        let symbol;
        for (let item of children) {
          //   console.log(item);
          let nodeId = this.generateNodeId();
          symbol = "circle";
          if (item.user != "" && item.user.user_avatar != null
            && item.user.user_avatar != "") {
            symbol = "image://" + item.user.user_avatar;
          }
          let name = item.nickname;
          if(item.time != null){
            name += " [" + item.time + "]";
          }
          this.paras.nodes.push({
            id: nodeId,
            name: name,
            symbol: symbol,
            symbolSize: this.paras.symbolSize,
            category: "微博用户",
          });
          this.paras.links.push({
            source: parentId,
            target: nodeId,
          });
          if (item.children.length > 0) {
            this.initNodes(item.children, nodeId);
          }
        }
      },
      initEChart(data, planId) {
        console.log(data);
        //   nodes = new Array();
        //   links = new Array();
        this.paras.nodes = new Array();
        this.paras.links = new Array();
        this.paras.nodeIndex = 0;
        let rootId = this.paras.nodeIndex.toString();
        this.paras.nodes.push({
          id: rootId,
          name: "引爆点",
          symbol: "roundRect",
          symbolSize: "25",
          category: "引爆点",
        });
        if (data.children.length > 0) {
          this.initNodes(data.children, rootId);
        }
        /*let nodeId = this.generateNodeId();
        this.paras.nodes.push({
          id: nodeId,
          name: data.name,
          symbol: "image://" + data.avatar,
          symbolSize: this.paras.symbolSize,
          category: "微博用户",
        });
        this.paras.links.push({
          source: rootId,
          target: nodeId,
        });
        
        if (data.children.length > 0) {
          this.initNodes(data.children, nodeId);
        }*/
        this.eChart = echarts.init(
          document.getElementById("weiboSourceCanvas")
        );
        this.eChart.off('click');
        this.eChart.on('click', function (params) {
          window.location.href = '?page=plan&category=weibosource&key=' + planId;
        });

        

        console.log(this.paras.nodes);
        console.log(this.paras.links);
        let option = this.initOption(
          this.planName,
          this.paras.nodes,
          this.paras.links,
          [{ name: "引爆点" }, { name: "微博用户" }]
        );
        console.log(option);
        console.log(this.eChart);
        this.eChart.setOption(option, true);
      },
      initOption(title, nodes, links, categories) {
        return {
          //  backgroundColor: '#243E62',
          // 图的标题
          title: {
            text: props.DarkMode ? "" : title + "  微博溯源分析",
            //    top: 'bottom',
            left: "center",
          },
          // 提示框的配置
          tooltip: {
            show: true, //默认显示
            showContent: true, //是否显示提示框浮层
            trigger: "item", //触发类型，默认数据项触发
            triggerOn: "mousemove", //提示触发条件，mousemove鼠标移至触发，还有click点击触发
            alwaysShowContent: false, //默认离开提示框区域隐藏，true为一直显示
            showDelay: 200, //浮层显示的延迟，单位为 ms，默认没有延迟，也不建议设置。在 triggerOn 为 'mousemove' 时有效。
            hideDelay: 500, //浮层隐藏的延迟，单位为 ms，在 alwaysShowContent 为 true 的时候无效。
            enterable: false, //鼠标是否可进入提示框浮层中，默认为false，如需详情内交互，如添加链接，按钮，可设置为 true。
            position: "top", //提示框浮层的位置，默认不设置时位置会跟随鼠标的位置。只在 trigger 为'item'的时候有效。
            confine: false, //是否将 tooltip 框限制在图表的区域内。外层的 dom 被设置为 'overflow: hidden'，或者移动端窄屏，导致 tooltip 超出外界被截断时，此配置比较有用。
            transitionDuration: 0.4, //提示框浮层的移动动画过渡时间，单位是 s，设置为 0 的时候会紧跟着鼠标移动。
            animationDurationUpdate: 500, // 动画更新变化时间
            animationEasingUpdate: "quinticInOut",
            formatter: function (x) {
              console.log(x);
              if (x.dataType == "node") return "微博用户名：" + x.data.name;
            },
          },
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
          legend: [
            {
              left: "center",
              top: 30,
              textStyle: {
                //    size: "14px",
                fontSize: 16,
              },
              data: categories.map(function (a) {
                return a;
              }),
            },
          ],
          series: [
            {
              zoom: 0.5,
              name: "",
              type: "graph",
              layout: "force", //力引导布局
              legendHoverLink: true, //是否启用图例 hover(悬停) 时的联动高亮。
              hoverAnimation: true, //是否开启鼠标悬停节点的显示动画
              coordinateSystem: null, //坐标系可选
              xAxisIndex: 0, //x轴坐标 有多种坐标系轴坐标选项
              yAxisIndex: 0, //y轴坐标
              nodeScaleRatio: 0.6, //鼠标漫游缩放时节点的相应缩放比例，当设为0时节点不随着鼠标的缩放而缩放
              focusNodeAdjacency: true, //是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点。
              draggable: true,
              roam: true, //开启鼠标缩放和平移
              //symbol:'roundRect',//关系图节点标记的图形。ECharts 提供的标记类型包括 'circle'(圆形), 'rect'（矩形）, 'roundRect'（圆角矩形）, 'triangle'（三角形）, 'diamond'（菱形）, 'pin'（大头针）, 'arrow'（箭头）  也可以通过 'image://url' 设置为图片，其中 url 为图片的链接。'path:// 这种方式可以任意改变颜色并且抗锯齿
              symbolSize: 60, // 调整节点的大小
              edgeSymbol: ["circle", "arrow"], // 边两端的标记类型
              edgeSymbolSize: [2, 8],
              label: {
                show: true,
                position: "top",
                distance: 15,
                textStyle: {
                  //   fontSize: eChartFontSize,
                },
                formatter: "{b}",
              },
              force: {
                //   initLayout: 'force',
                repulsion: 800,
                edgeLength: [0, 200], //节点之间的距离
                gravity: 0.01,
                layoutAnimation: true,
              },
              /*     edgeLabel: {//关系边的公用线条
                                    show: true,
                                        color: 'black',
                                    //    fontSize: fontSize,
                               
                                 formatter: function (x) {
                                        return x.data.;
                                    }
                            },*/
              labelLayout: {
                hideOverlap: false, //true
              },
              scaleLimit: {
                min: 0.1,
                max: 4,
              },
              lineStyle: {
                color: "source",
                curveness: 0,
                color: props.DarkMode ? "#fff" : "#13227a",
                width: 2,
              },
              emphasis: {
                focus: "adjacency",
                lineStyle: {
                  width: 3,
                },
              },
              data: nodes,
              links: links,
              categories: categories,
            },
          ],
        };
      },
    };
  },
  mounted() {
    // 在通过mounted调用即可
    // this.init();
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