<template>
    <!--<Loading></Loading>-->
    <div style="width: 100%; height: 100%" id="communicationChainChartCanvas"></div>
</template>  
<script>
//通过this.$echarts来使用
import * as Vue from "vue";
import * as echarts from "echarts";
import Event from "../model/Event";
import { getCurrentInstance } from "vue";

export default {
    eChart: null,
    props: {
        planId: {
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
        const instance = getCurrentInstance();

        return {
            resize(e) {
                setTimeout(() => {
                    let eChart = echarts.getInstanceByDom(document.getElementById("communicationChainChartCanvas"));
                    if (eChart != null) {
                        eChart.resize();
                    }
                }, 500);
            },
            init() {
                this.eChart = echarts.getInstanceByDom(document.getElementById("communicationChainChartCanvas"));
                if (this.eChart != null) {
                    this.resize();
                } else {
                this.loadData(props.planId);
                }
            },
            reload(planId) {
                this.loadData(planId, '', '');
            },
            loadData(planId) {
                let _this = this;
                console.log(planId);
                Event.CommunicationChain(
                    planId,
                    function (data, response) {
                        console.log(data);
                        let dataList = {
                            name: props.planName,
                            children: []
                        };
                        for (let item of data) {
                            let parentNode = {
                                name: item.name,
                                children: []
                            };

                            dataList.children.push(parentNode);

                            for (let node of item.dateList) {
                                let childNode = {
                                    date: node.dateStr,
                                    name: node.resourceList[0].name,
                                    value: node.resourceList[0].value,
                                    children: []
                                };
                                parentNode.children.push(childNode);
                                parentNode = childNode;
                            }
                        }
                        console.log(dataList);
                        _this.initEChart(dataList);
                    },
                    function (error) {
                        console.log(error);
                    }
                );
            },
            query() {
                this.init();
            },
            reset() {
                this.init();
            },
            initEChart(data) {
                console.log(data);
                if (this.eChart == null) {
                    this.eChart = echarts.init(document.getElementById("communicationChainChartCanvas"));
                }

                let series = new Array();
                let color = props.DarkMode ? "#fff" : "#000";
                series.push(
                    {
                        type: 'tree',
                        data: [data],
                        //    top: '18%',
                        //    bottom: '14%',
                        //    layout: 'radial',
                        //    symbol: 'emptyCircle',

                        //   edgeShape: 'polyline',
                        symbolSize: 10,
                        orient: 'vertical',
                        edgeShape: 'polyline',
                        draggable: true,
                        zoom: 1, //当前视角的缩放比例
                        roam: true, //是否开启平游或缩放
                        scaleLimit: { //滚轮缩放的极限控制
                            min: 0.1,
                            max: 5
                        },
                        initialTreeDepth: 9999999999999999,
                        animationDurationUpdate: 750,
                        label: {
                            padding: 5,
                            position: 'right',//标签的位置。
                            //    rotate: -90,//标签旋转。从 -90 度到 90 度。正值是逆时针。
                            //     verticalAlign: 'middle',//文字垂直对齐方式，默认自动。
                            align: 'left',//文字水平对齐方式，默认自动。
                            // verticalAlign: 'bottom',
                            /*   textStyle: {
                                   fontSize: eChartFontSize
                               },*/
                            //distance:50,
                            formatter: function (x) {
                                console.log(x);
                                //   return "<div style='display: flex;flex-direction: row;align-items: center;justify-content: center;flex-wrap: wrap;width:2vw;'>[" + x.data.time + "] " + x.data.name +  "</div>";
                                let content = x.data.name;

                                if (x.data.date != null) {
                                    content = "[" + x.data.date + "] " + content;
                                }
                                let text = '';
                                while (content.length > 0) {
                                    text += content.substring(0, 11);

                                    if (content.length > 11) {
                                        text += "\n";
                                    }
                                    content = content.substring(11);
                                }

                                return text;
                            },
                            show: true,
                            color: color
                        },
                        emphasis: {

                            focus: 'descendant',
                            label: {
                                show: true,
                                color: color
                            }
                        },
                        /*   leaves: {
                               label: {
                                   position: 'right',
                                   //  verticalAlign: 'middle',
                                   align: 'left',
                                   color: color,
                                   padding: 5,
                                   lineHeight: 20,
                               }
                           }*/
                    });

                let option = this.initOption(this.planName, series);
                console.log(option);
                this.eChart.setOption(option, true);
            },
            initOption(title, series, color) {
                return {
                    title: {
                        text: title + " 传播链分析",
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
                            //   console.log(x);      
                            let content = x.data.name;

                            if (x.data.date != null) {
                                content = "[" + x.data.date + "]\n" + content;
                            }

                            return content;
                        },
                        textStyle: {
                            align: "bottom",
                            fontSize: 15,
                        },
                    },

                    series: series,
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