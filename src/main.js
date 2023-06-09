import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import  * as Vue from 'vue'
//import * as echarts from 'echarts'
/*
import * as echarts from 'vue-echarts'
 
//引入所有表 
require("echarts");
 
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/polar'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title.js'
 */
// 注册组件以便在项目中引用
const app = createApp(App)
//app.component('charts', echarts);
app.use(router).mount('#app')
