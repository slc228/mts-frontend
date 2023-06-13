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
          align-items: flex-start;
          justify-content: flex-start;
          width: 70vw;
          height: 100%;
          color: #888888;
          font-size: 0.8vw;
          margin: 0 0 1vw 2vw;
          background-color: #f9f9f9;
        ">
      <div style="
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            width: 70vw;
            margin: 1vw 0 0.5vw 0;
          ">
        <div class="new-plan-button" v-on:click="addPlan">添加方案</div>
      </div>
      <div class="plan-row-div" v-for="item in plans" v-bind:key="item">
        <div class="plan-content-row-div">
          <div class="plan-content-column-div">
            <div class="plan-content-spliter-red-div" v-if="item.category == 'emergency'" style="flex-shrink: 0;"></div>
            <div class="plan-content-spliter-green-div" v-else style="flex-shrink: 0;"></div>
            <div class="plan-name-column" style="flex-shrink: 0;">
              <div style="
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: center;
                    width: 90%;
                  ">
                <div class="plan-content-name-div">
                  {{ item.programmeName }}
                </div>
                <div class="plan-content-total-div">
                  总计 {{ item.quantityAll }} 条
                </div>
                <div class="plan-content-increase-div">
                  当日 {{ item.quantityToday }}+ 条
                </div>
              </div>
            </div>
            <div style="
                  height: 80%;
                  width: 1px;
                  background-color: #bfbfbf;
                  margin: 0 1vw 0 1vw;
                  box-shadow: 2px 2px 5px rgb(0 0 0 / 8%);
                "></div>
            <div class="plan-column">
              <div class="plan-content-row" style="font-size: 0.7vw">
                {{ item.startDate.substring(0, 10) }} -
                {{ item.endDate.substring(0, 10) }}
              </div>
              <div class="plan-content-row">
                <div style="
                      display: flex;
                      flex-direction: row;
                      align-items: flex-start;
                      justify-content: flex-start;
                    ">
                  紧急程度<span v-if="item.priority == '0'">（低）</span>
                  <span v-if="item.priority == '1'">（中）</span>
                  <span v-if="item.priority == '2'">（高）</span>
                </div>
                <div style="
                      display: flex;
                      flex-direction: row;
                      align-items: flex-start;
                      justify-content: flex-start;
                    ">
                  <span v-if="item.matchType == 1">，标题匹配</span>
                  <span v-if="item.matchType == 2">，正文匹配</span>
                  <span v-if="item.matchType == 0">，标题或正文匹配</span>
                </div>
                <div style="
                      display: flex;
                      flex-direction: row;
                      align-items: center;
                      justify-content: flex-start;
                    " v-if="item.notifiedWhenCompleted">
                  ，完成后通知
                </div>
              </div>
              <div class="plan-content-row" style="flex-wrap: wrap;" v-if="item.eventKeyword.length > 2">
                事件关键字：{{ item.eventKeyword }}
              </div>
              <div class="plan-content-row" v-if="item.regionKeyword.length > 2">
                &nbsp;&nbsp;&nbsp;地域键字：{{ item.regionKeyword }}
              </div>
              <div class="plan-content-row" v-if="item.exceptKeyword.length > 2">
                排除关键字：{{ item.exceptKeyword }}
              </div>
              <div class="plan-content-row" v-if="item.sensitiveword.length > 2">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;敏感词：{{
                  item.sensitiveword
                }}
              </div>
              <div class="plan-content-row" style="margin: 1vw 0 0 0">
                <div v-if="user.roleRights.determine" class="plan-button-div" v-on:click="viewList(item)">
                  研判
                </div>
                <div v-if="user.roleRights.directionalMonitoring" class="plan-button-div" v-on:click="showMonitor(item)">
                  定向监测
                </div>
                <div v-if="user.roleRights.directionalUserMonitoring" class="plan-button-div"
                  v-on:click="showWeibo(item)">
                  定向用户监测
                </div>
                <div v-if="user.roleRights.analysis" class="plan-button-div" v-on:click="showEvent(item)">
                  事件分析
                </div>
                <div v-if="user.roleRights.warning" class="plan-button-div" v-on:click="showWarning(item)">
                  预警
                </div>
                <div v-if="user.roleRights.briefingFabrication" class="plan-button-div" v-on:click="showReport(item)">
                  简报
                </div>
              </div>
            </div>
          </div>
          <div class="plan-button-column-div">
            <div class="plan-button-div" v-on:click="viewDetail(item)">
              配置
            </div>
            <div class="plan-button-div" v-on:click="deletePlan(item)">
              删除
            </div>
          </div>
        </div>
        <!--
        <div
          v-bind:class="{
            planContentListRowDiv: item.fid != selectedPlan,
            showPlanContentListRowDiv: item.fid == selectedPlan,
          }"
        >
          <table class="plan-result-table"
            v-bind:id="'table' + item.fid"
            v-bind:lay-filter="'table' + item.fid"
          ></table>
        </div>-->
      </div>
    </div>
    <div style="
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          width: 20vw;
          height: 100%;
          color: #888888;
          font-size: 0.8vw;
          background-color: #f9f9f9;
        ">
      <div style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            background-color: #fff;
            width: 14vw;
            padding: 0.5vw 1vw 1vw 1vw;
            margin: 3.7vw 1vw 0 0;
            box-shadow: 2px 2px 5px rgb(0 0 0 / 8%);
          ">
        <!--     box-shadow: 2px 2px 5px rgba(136,136,136, 0.5);
             background-image: radial-gradient(farthest-corner at 50% , rgba(243,243,243, 0.3), rgba(243,243,243, 0.5));
 -->
        <div style="
              width: 92%;
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: space-between;
              font-weight: 400;
              height: 2vw;
              margin: 0 0 1vw 0;
            ">
          <div style="font-size: 0.9vw; font-weight: 600; color: #13227a">
            舆情预警
          </div>
          <div class="view-all-div" @click="showWarningList">
            <img src="yuqing/image/chakanquanbu.png" class="view-all-icon" />
          </div>
        </div>
        <div class="warning-row-div" v-for="(item, index) in warningRecords" v-bind:key="index"
          @click="showWarningDetail(item)">
          <div class="warning-detail-row-div">
            <div class="warning-crtical-icon-column-div" v-if="item.category == 'emergency'"></div>
            <div class="warning-icon-column-div" v-else></div>
            <div class="warning-title-column-div">
              <div>{{ item.programmeName }}</div>
              <div class="warning-date-div">{{ item.timeText }}</div>
            </div>
          </div>
          <div class="warning-view-div">
            <img src="yuqing/image/chakan.png" class="view-all-icon" />
          </div>
        </div>
      </div>
    </div>
  </div>.
  <div class="coverDiv" v-bind:class="{
    showCoverDiv:
      showedAddPlan || showedPlanResult || monitor || warning || weibo || showWarningDetailModel || showWarningListModel,
  }" v-on:click="hideModel"></div>

  <div class="coverDiv" v-bind:class="{
    showCoverDiv:
      showSensitiveWordModel || showContactModel || showMaterialLibrary || warningReceiversModel,
  }" style="z-index: 1099" v-on:click="hideModel"></div>

  <div class="warningReceiversModel" v-bind:class="{
    showWarningReceivers: warningReceiversModel,
  }">
    <div class="model-title-div">
      <div class="model-title-text-div">导入预警人员</div>
      <div class="model-title-close-div" v-on:click="hideWarningReceivers">
        <img src="yuqing/image/guanbi1.png" class="model-title-close-image" />
      </div>
    </div>
    <div class="model-content-div">
      <div style="
            width: 94%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            margin:0.5vw 0 0 0;
          ">
        <table id="warningReceiversTable" lay-filter="warningReceiversTable"></table>
        <div id="warningReceiversTablePageBar"></div>
      </div>
    </div>
    <div class="model-buttons-div">
      <div class="model-button-div" v-on:click="importWarningReceiver">导入</div>
      <div class="model-button-div" v-on:click="hideWarningReceivers">关闭</div>
    </div>
  </div>

  <div class="warningListModel" v-bind:class="{
    showWarningList: showWarningListModel,
  }">
    <div class="model-title-div">
      <div class="model-title-text-div">预警记录</div>
      <div class="model-title-close-div" v-on:click="hideModel">
        <img src="yuqing/image/guanbi1.png" class="model-title-close-image" />
      </div>
    </div>
    <div class="model-content-div">
      <div style="
            width: 94%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            margin:0.5vw 0 0 0;
          ">
        <table id="warningListTable" lay-filter="warningListTable"></table>
        <div id="warningListPageBar"></div>
      </div>
    </div>
    <div class="model-buttons-div">
      <div class="model-button-div" v-on:click="hideModel">关闭</div>
    </div>
  </div>

  <div class="warningDetailModel" v-bind:class="{
    showWarningDetail: showWarningDetailModel,
  }">
    <div class="model-title-div">
      <div class="model-title-text-div">预警详情</div>
      <div class="model-title-close-div" v-on:click="hideModel">
        <img src="yuqing/image/guanbi1.png" class="model-title-close-image" />
      </div>
    </div>
    <div class="model-content-div">
      <div style="
            width: 94%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            font-size:0.8vw;
          ">

        <div style="
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            margin: 1vw 0 0 0;
          ">
          <div style="
            width: 50%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
          "> 预警方案：{{ selectedWarning.programmeName }}</div>
          <div style="
            width: 50%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
          "> 预警时间：{{ selectedWarning.timeText }} </div>
        </div>
        <div style="
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            display: flex;
            text-align: left;
            margin: 1vw 0 0 0;
            line-height: 1.5vw;
          ">
          预警内容：{{ selectedWarning.message }}
        </div>
        <div style="
            width: 100%;
            flex-wrap:wrap;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            text-align: left;
            line-height: 1.5vw;
            margin: 1vw 0 0 0;
          ">
          预警人员： <div v-for="(item, index) in selectedWarning.receivers" v-bind:key="index"> {{ item.name }}（
            {{ item.phone }}），</div>

        </div>
      </div>
    </div>
    <div class="model-buttons-div">
      <div class="model-button-div" v-on:click="hideModel">关闭</div>
    </div>
  </div>

  <div class="ReportModel" v-bind:class="{
    showReport: showReportModel,
  }">
    <div class="model-title-div">
      <div class="model-title-text-div">制作简报</div>
      <div class="model-title-close-div" v-on:click="hideModel">
        <img src="yuqing/image/guanbi1.png" class="model-title-close-image" />
      </div>
    </div>
    <div class="model-content-div">
      <div style="
            width: 96%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            margin: 1vw 0 1vw 0;
          ">
        第一步： <input id="reportNameInput" type="text" class="reportNameInput" v-model="reportName" placeholder="请输入简报名称" />
      </div>
      <div style="
            width: 96%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            margin: 1vw 0 1vw 0;
          ">
        第二步：确认素材（可选）
      </div>
      <div style="
            width: 96%;
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
    border-top: #f8f8f8 solid 2px;
          ">

        <div v-for="(item, index) in materialLibraries" v-bind:key="index" class="materialLibrariesItem"
          v-on:click="selectedMaterialLibraryOnClick(item)" v-bind:class="{
            selectedShowMaterialLibraryModel:
              item.id == selectedMaterialLibrary,
          }">
          <div style="
                display: flex;
                flex-direction: row;
                align-items: flex-end;
                justify-content: center;
              ">
            <img src="yuqing/image/wenjianjia1.png" class="materialLibrariesIcon" />
            <div style="
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  justify-content: center;
                  height: 1vw;
                  min-width: 1vw;
                  background-color: red;
                  border-radius: 50%;
                  color: #fff;
                  position: relative;
                  left: -1vw;
                  bottom: 1vw;
                  padding: 0.2vw 0.5vw 0.2vw 0.5vw;
                ">
              {{ item.number }}
            </div>
          </div>
          <div>
            {{ item.materialLibName }}
          </div>
        </div>
      </div>

      <div style="
            width: 96%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            margin: 1vw 0 1vw 0;
          " id="selectedTemplateLabel">
        第三步：选择模板
      </div>
      <div style="
            width: 96%;
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
    border-top: #f8f8f8 solid 2px;
    padding: 1vw 0 0 0;
          ">
        <div class="templateDiv" v-for="(item, index) in templates" v-bind:key="index" v-bind:class="{
          selectedShowTemplateModel:
            item.id == selectedTemplate,
        }" v-on:click="selectedTemplateOnClick(item)">
          <div style="
                  display: flex;
                  flex-direction: column;
                  align-items: flex-start;
                  justify-content: flex-start;
                  font-size: 0.7vw;
                  margin: 0 0 0.3vw 0;
                  width:100%;
                  height: auto;
                ">
            <div v-if="item.title != null" style="margin: 0 0 0.5vw 0;
                  display: flex;
                  flex-direction: row;
                  align-items: flex-start;
                  justify-content: space-between;
                  width:100%;">
              <div> {{ item.title }}&nbsp;&nbsp;&nbsp;&nbsp;{{ item.version }} </div>
            </div>
            <div v-if="item.type == 'default1'" style="margin: 0 0 0.5vw 0;">[附件1]</div>
            <div v-else-if="item.type == 'default2'" style="margin: 0 0 0.5vw 0;">[附件2]</div>

            <div v-if="item.institution != null && item.type == 'customized'" style="margin: 0 0 0.5vw 0;">
              {{ item.institution }}
            </div>
            <div v-if="item.timeText != null" style="margin: 0 0 0.5vw 0;">
              {{ item.timeText }}

            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="model-buttons-div">
      <div class="model-button-div" v-on:click="addReport">生成</div>
      <div class="model-button-div" v-on:click="hideModel">取消</div>
    </div>
  </div>

  <div class="materialLibraryModel" v-bind:class="{
    showMaterialLibraryModel: showMaterialLibrary,
  }">
    <div class="model-title-div">
      <div class="model-title-text-div">选择素材库</div>
      <div class="model-title-close-div" v-on:click="hideSelectMaterialLibrary">
        <img src="yuqing/image/guanbi1.png" class="model-title-close-image" />
      </div>
    </div>
    <div class="model-content-div">
      <div style="
            width: 96%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            margin: 1vw 0 1vw 0;
          ">
        <input type="text" class="materialLibrariesNameInput" id="newMaterialLibraryName" v-model="newMaterialLibraryName"
          placeholder="请输入新素材库的名字" />
        <div class="model-button-div" v-on:click="addMaterialLibrary">添加</div>
        <div class="model-button-div" v-on:click="deleteMaterialLibrary">删除</div>
      </div>
      <div style="
            width: 96%;
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
    border-top: #f8f8f8 solid 2px;
          " id="materialLibrariesDiv">
        <div v-for="(item, index) in materialLibraries" v-bind:key="index" class="materialLibrariesItem"
          v-on:click="selectedMaterialLibraryOnClick(item)" v-bind:class="{
            selectedShowMaterialLibraryModel:
              item.id == selectedMaterialLibrary,
          }">
          <div style="
                display: flex;
                flex-direction: row;
                align-items: flex-end;
                justify-content: center;
              ">
            <img src="yuqing/image/wenjianjia1.png" class="materialLibrariesIcon" />
            <div style="
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  justify-content: center;
                  height: 1vw;
                  min-width: 1vw;
                  background-color: red;
                  border-radius: 50%;
                  color: #fff;
                  position: relative;
                  left: -1vw;
                  bottom: 1vw;
                  padding: 0.2vw 0.5vw 0.2vw 0.5vw;
                ">
              {{ item.number }}
            </div>
          </div>
          <div>
            {{ item.materialLibName }}
          </div>
        </div>
      </div>
    </div>
    <div class="model-buttons-div">
      <div class="model-button-div" v-on:click="addMaterials">保存</div>
      <div class="model-button-div" v-on:click="hideSelectMaterialLibrary">取消</div>
    </div>
  </div>

  <div class="model" v-bind:class="{
    showModel: event,
  }" style="height: 90vh">
    <div class="model-title-div" style="height: 3vh">
      <div class="model-title-text-div">事件分析</div>
      <div class="model-title-close-div" v-on:click="hideModel">
        <img src="yuqing/image/guanbi1.png" class="model-title-close-image" />
      </div>
    </div>
    <div class="model-content-div" style="overflow-y: auto; min-height: 85vh; justify-content: flex-start">
      <div class="layui-tab layui-tab-brief" lay-filter="eventTab" style="width: 97%; margin: 1vw 0 0 0; height: 83vh">
        <ul class="layui-tab-title">
          <li :class="{ 'layui-this': category =='' || category=='wordcloud' }" 
          lay-id="defaultTab" v-on:click="wordCloudOnShow">
            词云
          </li>
          <li v-on:click="getSummaries">摘要</li>
          <li lay-id="sensitiveTab"   v-on:click="sensitiveOnShow">敏感度</li>
          <li lay-id="regionTab"   v-on:click="regionChartOnShow">地域分布</li>
          <li lay-id="sourceTab"   v-on:click="sourceChartOnShow">来源分布</li>
          <li   lay-id="emotionTab" v-on:click="emotionChartOnShow">情感分布</li>
          <li   lay-id="totalmountTab"    v-on:click="totalMountChartOnShow">总量趋势</li>
          <li   lay-id="sourcemountTab"  v-on:click="sourceMountChartOnShow">来源趋势</li>
          <li   lay-id="emotionmountTab"  v-on:click="emotionMountChartOnShow">情感趋势</li>
          <li   lay-id="weibosourceTab"  v-on:click="weiboSourceOnShow">微博溯源</li>
          <li   lay-id="eventtrackTab"   v-on:click="eventTrackOnShow">事件溯源</li>
          <!--
          <li v-on:click="openSourceCommunicationChain">来源传播链分析</li>
          <li v-on:click="communicationChainChartOnShow">传播链分析</li>-->


        </ul>
        <div class="layui-tab-content" style="height: 74vh">
          <div class="layui-tab-item "    
          :class="{ 'layui-show': category =='' || category=='wordcloud' }" 
          style="
                flex-direction: column;
                align-items: center;
                justify-content: start;
                width: 100%;
                height: 100%;
              ">
            <WordCloudChart ref="wordCloudChart" v-if="event" v-bind:planId="selectedPlan"
              v-bind:planName="selectedPlanName" />
          </div>
          <div class="layui-tab-item" style="
                flex-direction: row;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
              ">
            <div style="
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  justify-content: center;
                  font-size: 18px;
                  font-weight: 600;
                  width: 100%;
                  margin: 0 0 1vw 0;
                ">
              摘要分析
            </div>
            <div  style="
                  display: flex;
                  flex-wrap: wrap;
                  flex-direction: row;
                  align-items: flex-start;
                  justify-content: flex-start;
                  width: 95%;
                  font-size: 1.1vw;
                  font-weight: 600;
                  padding: 0 2% 0 2%;
                ">
              <div class="summaryDiv" v-for="(item, index) in Summary.split('\n')">
                {{ item }}
              </div>
            </div>
            <div style="
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  justify-content: flex-start;
                  font-size: 0.7vw;
                  width: 100%;
                  margin: 0 0 0.5vw 0;
                  width: 95%;
                  padding: 0 2% 0 2%;
                ">
              舆情摘录：
            </div>
            <div style="
                  display: flex;
                  flex-wrap: wrap;
                  flex-direction: row;
                  align-items: flex-start;
                  justify-content: flex-start;
                  width: 95%;
                  padding: 0 2% 0 2%;
                ">
              <div class="summaryDiv" v-for="(item, index) in SummarySentiments" v-bind:key="index">
                {{ item.title }}
              </div>
            </div>
          </div>
          <div class="layui-tab-item" 
            style="
                flex-direction: column;
                align-items: center;
                justify-content: start;
                width: 100%;
                height: 100%;
              ">
            <div style="
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  justify-content: flex-start;
                  width: 96%;
                  height: 1.8vw;
                  margin: 0.5vw 0 1vw 2%;
                ">
              <div style="
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: flex-start;
                  ">
                开始时间
              </div>
              <input type="text" class="event-date-input" id="startDateInput" v-model="startDate" readonly />
              <div style="
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: flex-start;
                  ">
                结束时间
              </div>
              <input type="text" class="event-date-input" id="endDateInput" v-model="endDate" readonly />
              <div class="event-button-div" v-on:click="sensitiveOnQuery">
                查询
              </div>
              <div class="event-button-div" v-on:click="resetDate('SensitiveChart')">
                重置
              </div>
            </div>
            <div style="
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  justify-content: center;
                  width: 100%;
                  height: 70vh;
                ">
              <SensitiveChart ref="sensitiveChart" v-if="event" v-bind:planId="selectedPlan"
                v-bind:planName="selectedPlanName" v-bind:startDate="startDate" v-bind:endDate="endDate" />
            </div>
          </div>
          <div class="layui-tab-item" style="
                flex-direction: column;
                align-items: center;
                justify-content: start;
                width: 100%;
                height: 100%;
              ">
            <div style="
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  justify-content: flex-start;
                  width: 96%;
                  height: 1.8vw;
                  margin: 0.5vw 0 1vw 2%;
                ">
              <div style="
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: flex-start;
                  ">
                开始时间
              </div>
              <input type="text" class="event-date-input" id="startDateInput" v-model="startDate" readonly />
              <div style="
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: flex-start;
                  ">
                结束时间
              </div>
              <input type="text" class="event-date-input" id="endDateInput" v-model="endDate" readonly />
              <div class="event-button-div" v-on:click="regionChartOnQuery">
                查询
              </div>
              <div class="event-button-div" v-on:click="resetDate('RegionChart')">
                重置
              </div>
            </div>
            <div style="
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  justify-content: center;
                  width: 100%;
                  height: 70vh;
                ">
              <RegionChart ref="regionChart" v-if="event" v-bind:planId="selectedPlan" v-bind:planName="selectedPlanName"
                v-bind:startDate="startDate" v-bind:endDate="endDate" />
            </div>
          </div>
          <div class="layui-tab-item" style="
                flex-direction: column;
                align-items: center;
                justify-content: start;
                width: 100%;
                height: 100%;
              ">
            <div style="
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  justify-content: flex-start;
                  width: 96%;
                  height: 1.8vw;
                  margin: 0.5vw 0 1vw 2%;
                ">
              <div style="
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: flex-start;
                  ">
                开始时间
              </div>
              <input type="text" class="event-date-input" id="startDateInput" v-model="startDate" readonly />
              <div style="
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: flex-start;
                  ">
                结束时间
              </div>
              <input type="text" class="event-date-input" id="endDateInput" v-model="endDate" readonly />
              <div class="event-button-div" v-on:click="sourceChartOnQuery">
                查询
              </div>
              <div class="event-button-div" v-on:click="resetDate('SourceChart')">
                重置
              </div>
            </div>
            <div style="
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  justify-content: center;
                  width: 100%;
                  height: 70vh;
                ">
              <SourceChart ref="sourceChart" v-if="event" v-bind:planId="selectedPlan" v-bind:planName="selectedPlanName"
                v-bind:startDate="startDate" v-bind:endDate="endDate" />
            </div>
          </div>
          <div class="layui-tab-item" style="
                flex-direction: column;
                align-items: center;
                justify-content: start;
                width: 100%;
                height: 100%;
              ">
            <div style="
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  justify-content: flex-start;
                  width: 96%;
                  height: 1.8vw;
                  margin: 0.5vw 0 1vw 2%;
                ">
              <div style="
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: flex-start;
                  ">
                开始时间
              </div>
              <input type="text" class="event-date-input" id="startDateInput" v-model="startDate" readonly />
              <div style="
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: flex-start;
                  ">
                结束时间
              </div>
              <input type="text" class="event-date-input" id="endDateInput" v-model="endDate" readonly />
              <div class="event-button-div" v-on:click="emotionChartOnQuery">
                查询
              </div>
              <div class="event-button-div" v-on:click="resetDate('EmotionChart')">
                重置
              </div>
            </div>
            <div style="
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  justify-content: center;
                  width: 100%;
                  height: 70vh;
                ">
              <EmotionChart ref="emotionChart" v-if="event" v-bind:planId="selectedPlan"
                v-bind:planName="selectedPlanName" v-bind:startDate="startDate" v-bind:endDate="endDate" />
            </div>
          </div>
          <div class="layui-tab-item" style="
                flex-direction: column;
                align-items: center;
                justify-content: start;
                width: 100%;
                height: 100%;
              ">
            <div style="
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  justify-content: flex-start;
                  width: 96%;
                  height: 1.8vw;
                  margin: 0.5vw 0 1vw 2%;
                ">
              <div style="
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: flex-start;
                  ">
                开始时间
              </div>
              <input type="text" class="event-date-input" id="startDateInput" v-model="startDate" readonly />
              <div style="
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: flex-start;
                  ">
                结束时间
              </div>
              <input type="text" class="event-date-input" id="endDateInput" v-model="endDate" readonly />
              <div class="event-button-div" v-on:click="totalMountChartOnQuery">
                查询
              </div>
              <div class="event-button-div" v-on:click="resetDate('TotalMountChart')">
                重置
              </div>
            </div>
            <div style="
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  justify-content: center;
                  width: 100%;
                  height: 70vh;
                ">
              <TotalMountChart ref="totalMountChart" v-if="event" v-bind:planId="selectedPlan"
                v-bind:planName="selectedPlanName" v-bind:startDate="startDate" v-bind:endDate="endDate" />
            </div>
          </div>
          <div class="layui-tab-item" style="
                flex-direction: column;
                align-items: center;
                justify-content: start;
                width: 100%;
                height: 100%;
              ">
            <div style="
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  justify-content: flex-start;
                  width: 96%;
                  height: 1.8vw;
                  margin: 0.5vw 0 1vw 2%;
                ">
              <div style="
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: flex-start;
                  ">
                开始时间
              </div>
              <input type="text" class="event-date-input" id="startDateInput" v-model="startDate" readonly />
              <div style="
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: flex-start;
                  ">
                结束时间
              </div>
              <input type="text" class="event-date-input" id="endDateInput" v-model="endDate" readonly />
              <div class="event-button-div" v-on:click="sourceMountChartOnQuery">
                查询
              </div>
              <div class="event-button-div" v-on:click="resetDate('SourceMountChart')">
                重置
              </div>
            </div>
            <div style="
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  justify-content: center;
                  width: 100%;
                  height: 70vh;
                ">
              <SourceMountChart ref="sourceMountChart" v-if="event" v-bind:planId="selectedPlan"
                v-bind:planName="selectedPlanName" v-bind:startDate="startDate" v-bind:endDate="endDate" />
            </div>
          </div>
          <div class="layui-tab-item"  style="
                flex-direction: column;
                align-items: center;
                justify-content: start;
                width: 100%;
                height: 100%;
              ">
            <div style="
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  justify-content: flex-start;
                  width: 96%;
                  height: 1.8vw;
                  margin: 0.5vw 0 1vw 2%;
                ">
              <div style="
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: flex-start;
                  ">
                开始时间
              </div>
              <input type="text" class="event-date-input" id="startDateInput" v-model="startDate" readonly />
              <div style="
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: flex-start;
                  ">
                结束时间
              </div>
              <input type="text" class="event-date-input" id="endDateInput" v-model="endDate" readonly />
              <div class="event-button-div" v-on:click="emotionMountChartOnQuery">
                查询
              </div>
              <div class="event-button-div" v-on:click="resetDate('EmotionMountChart')">
                重置
              </div>
            </div>
            <div style="
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  justify-content: center;
                  width: 100%;
                  height: 70vh;
                ">
              <EmotionMountChart ref="emotionMountChart" v-if="event" v-bind:planId="selectedPlan"
                v-bind:planName="selectedPlanName" v-bind:startDate="startDate" v-bind:endDate="endDate" />
            </div>
          </div>
          <div class="layui-tab-item"  style="
                flex-direction: column;
                align-items: center;
                justify-content: start;
                width: 100%;
                height: 100%;
              ">
            <WeiboSourceChart ref="weiboSourceChart" v-if="event" v-bind:planId="selectedPlan"
              v-bind:planName="selectedPlanName" />
          </div>
          <div class="layui-tab-item" style="
                flex-direction: column;
                align-items: center;
                justify-content: start;
                width: 100%;
                height: 100%;
              ">
            <EventTrackChart ref="eventTrackChart" v-if="event" v-bind:planId="selectedPlan"
              v-bind:planName="selectedPlanName" />
          </div>
          <!--
          <div class="layui-tab-item" style="
              flex-direction: column;
              align-items: center;
              justify-content: start;
              width: 100%;
              height: 100%;
            ">
            <div style="
              flex-direction: column;
              align-items: center;
              justify-content: flex-start;
              display:flex;
              width: 50%;
              height: 99.5%;
              margin:0.5% 0 0 0;
              
            ">

              <div style="display:flex;
              flex-direction: row;
              align-items: flex-start;
              justify-content: center;
                width: 50%; 
            font-size:0.9vw;
            font-weight:600;
  margin: 0  0 0.5vw 0;">来源传播链分析</div>
              <div style=" display:flex;
              flex-direction: column;
              align-items: flex-start;
              justify-content: flex-start;
              width: 50%;" v-for="(item, index) in sourceCommunicationChains" v-bind:key="index">

                <div style=" display:flex;
              flex-direction: row;
              align-items: center;
              justify-content: flex-start;
              width: 50%;
              font-size:0.8vw;">
                  <div style="
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #fff;
  background-image: linear-gradient(to bottom right, #e75927, red, #571111);
  box-shadow: 2px 2px 5px #888888;
  font-size: 0.9vw;
  width: 0.5vw;
  height: 0.5vw;
  border-radius: 100%;
  margin: 0 0.5vw 0 0;" v-bind:class="{
    breathDiv: index == 0,
  }"></div>

                  {{ item.date }}
                </div>
                <div style=" display:flex;
              flex-direction: row;
              align-items: center;
              justify-content: flex-start;
              border-left: #13227a 2px dashed;
              width: 100%;
              color:#13227a;
              padding:0.5vw 0 1vw 1vw;
              font-size:0.8vw;
  margin: 0 0 0.2vw 0.2vw;">
                  <div>{{ item.name }}</div>
                  <div>（传播热度：{{ item.count }}）</div>
                </div>

              </div>
            </div>
          </div>
          <div class="layui-tab-item" style="
              flex-direction: column;
              align-items: center;
              justify-content: start;
              width: 100%;
              height: 100%;
            ">
            <CommunicationChainChart ref="communicationChainChart" v-if="event" v-bind:planId="selectedPlan"
              v-bind:planName="selectedPlanName" />
          </div>-->
        </div>
      </div>
    </div>
  </div>

  <div class="model" v-bind:class="{
    showModel: weibo,
  }">
    <div class="model-title-div">
      <div class="model-title-text-div">定向用户监测</div>
      <div class="model-title-close-div" v-on:click="hideModel">
        <img src="yuqing/image/guanbi1.png" class="model-title-close-image" />
      </div>
    </div>
    <div style="
           overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
            justify-content: flex-start;
    width: 100%;
          ">
      <div style="
            justify-content: center;
            display: flex;
            flex-direction: row;
            align-items: center;
            width: 95%;
            height: 5vw;
            min-height: 5vw;
          ">
        <form @submit.prevent>
          <div style="
                background-color: #f8f8f8;
                border-radius: 2rem;
                border: #13227a 2px solid;
                opacity: 0.5;
                height: 2.5vw;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                width: 35vw;
              ">
            <input @keyup.enter="searchWeibo" type="text" v-model="weiboText" id="name" placeholder="搜索并监测新的微博用户" style="
                  width: 90%;
                  max-width: 90vw;
                  font-size: 1.2vw;
                  background-color: transparent;
                  margin: 0 0 0 1.5vw;
                  border: 0rem;
                  color: #000000;
                " />
            <div v-on:click="searchWeibo" style="
                  height: 100%;
                  width: 4vw;
                  background-image: url(yuqing/image/search-button-image.png);
                  background-repeat: no-repeat;
                  background-size: contain;
                  background-position: right;
                  cursor: pointer;
                  margin: 0 1vw 0 0;
                "></div>
          </div>
        </form>
      </div>
      <div v-if="weiboAccounts.length > 0" style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            width: 95%;
            height: auto;
          ">
        <div style="
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: flex-start;
              margin: 1vw 0 1vw 0;
              width: 100%;
              flex-wrap: wrap;
            ">
          <div style="
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                margin: 0 1vw 1vw 1vw;
                font-size: 0.8vw;
                width: 5vw;
                cursor: pointer;
                color: #13227a;
              " v-for="(item, index) in weiboAccounts" v-bind:key="index" v-on:click="selectedWeiboAccountOnClick(item)">
            <div style="
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  justify-content: center;
                  font-size: 1vw;
                  border-radius: 50%;
                  margin: 0 0 0.3vw 0;
                  width: 3vw;
                  height: 3vw;
                  border: #13227a 2px solid;
                  font-weight: 600;
                " v-bind:class="{
                  selectedWeibo: findSelecteddWeiboAccount(item),
                  unselectedWeibo: !findSelecteddWeiboAccount(item),
                }">
              {{ item.nickname.substring(0, 1) }}
            </div>
            {{ item.nickname }}
          </div>
        </div>
      </div>
      <div style="
            width: 95%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
          " v-bind:class="{
            showWeiboPage: weiboAccounts.length > 0,
            hideWeiboPage: weiboAccounts.length == 0,
          }">
        <div id="weiboTablePageBar"></div>
        <div class="model-button-div" v-on:click="importWeiboAccount" style="margin: 0 0 0 1vw">
          开始监测
        </div>
      </div>
      <div v-if="weiboAccounts.length == 0" style="
            justify-content: center;
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            width: 95%; 
          ">
        <div style="
              display: flex;
              flex-direction: row;
              align-items: flex-start;
              justify-content: flex-start;
              width: 100%;
              flex-wrap: wrap;
            ">
          <div v-for="(item, index) in weiboMonitors" v-bind:key="index" v-on:click="selectedWeiboMonitorOnClick(item)"
            v-bind:class="{
              selectedWeiboMonitorAccountDiv: findSelecteddWeiboMonitor(item),
              weiboMonitorAccountDiv: !findSelecteddWeiboMonitor(item),
            }">
            <div style="
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  justify-content: center;
                  font-size: 1vw;
                  border-radius: 50%;
                  margin: 0 0.5vw 0.5vw 0;
                  width: 3vw;
                  height: 3vw;
                  border: #13227a 2px solid;
                  background-color: #fff;
                  font-weight: 600;
                  background-repeat: no-repeat;
                  background-size: contain;
                  background-position: center;
                " v-bind:style="{
                  backgroundImage: 'url(' + item.user_avatar + ')',
                }">
              <div v-if="item.user_avatar == null" class="weiboMonitorAccountNickNameDiv">
                {{ item.nickname == null ? "" : item.nickname.substring(0, 1) }}
              </div>
            </div>
            <div style="
                  display: flex;
                  flex-direction: column;
                  align-items: flex-start;
                  justify-content: flex-start;
                  font-size: 0.7vw;
                  margin: 0 0 0.3vw 0;
                  width: auto;
                  height: auto;
                ">
              <div style="
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.8vw;
                  " class="weiboMonitorDetailDiv">
                <div v-if="item.nickname != null">{{ item.nickname }}</div>
                <div v-if="!item.hasBeenCrawled">（数据采集中）</div>
                <div v-if="item.gender != null">
                  &nbsp;&nbsp;{{ item.gender }}
                </div>
                <div v-if="item.location != null">
                  &nbsp;&nbsp;{{ item.location }}
                </div>
              </div>
              <div style="
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.7vw;
                  " class="weiboMonitorDetailDiv">
                <div v-if="item.weibo_num != null">
                  {{ item.weibo_num }}&nbsp;条
                </div>
                <div v-if="item.followers != null">
                  &nbsp;&nbsp;粉丝&nbsp;{{ item.followers }}
                </div>
                <div v-if="item.following != null">
                  &nbsp;&nbsp;关注&nbsp;{{ item.following }}
                </div>
              </div>
              <div v-if="item.verified_reason != null" class="weiboMonitorDetailDiv">
                {{ item.verified_reason }}
              </div>
              <div v-if="item.description != null" class="weiboMonitorDetailDiv">
                {{
                  item.description.length > 20
                  ? item.description.substring(0, 20) + "..."
                  : item.description
                }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="model-buttons-div">
      <div class="model-button-div" v-if="selectedWeiboMonitor.length > 0" v-on:click="removeWeiboMonitor">删除</div>
      <div class="model-button-div" v-on:click="hideModel">关闭</div>
    </div>
  </div>

  <div class="new-contact-model" v-bind:class="{
    showContact: showContactModel,
  }">
    <div class="model-title-div">
      <div class="model-title-text-div">添加预警人员</div>
      <div class="model-title-close-div" v-on:click="hideModel">
        <img src="yuqing/image/guanbi1.png" class="model-title-close-image" />
      </div>
    </div>
    <div class="model-content-div">
      <div style="
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            width: 90%;
            margin: 1vw 0 0 0;
          ">
        <div style="
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: center;
              font-size: 0.8vw;
              background-color: #13227a;
              color: #fff;
              width: 20%;
              height: 1.7vw;
              border: #13227a solid 1px !important;
              margin: 0.1vw 0 0 0;
            ">
          姓名
        </div>
        <input id="input" type="text" class="model-input" v-model="contactName" placeholder="请输入人员姓名"
          style="margin: 0.1vw 0 0 0; width: 80%; height: 1.7vw" />
      </div>
      <div style="
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            width: 90%;
            margin: 1vw 0 0 0;
          ">
        <div style="
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: center;
              font-size: 0.8vw;
              background-color: #13227a;
              color: #fff;
              width: 20%;
              height: 1.7vw;
              border: #13227a solid 1px !important;
              margin: 0.1vw 0 0 0;
            ">
          手机号
        </div>
        <input id="input" type="text" class="model-input" v-model="contanctPhone" placeholder="请输入手机号"
          style="margin: 0.1vw 0 0 0; width: 80%; height: 1.7vw" />
      </div>
    </div>
    <div class="model-buttons-div">
      <div class="model-button-div" v-on:click="addContact">保存</div>
      <div class="model-button-div" v-on:click="hideModel">取消</div>
    </div>
  </div>

  <div class="sensitiveWord" v-bind:class="{
    showSensitiveWord: showSensitiveWordModel,
  }">
    <div class="model-title-div">
      <div class="model-title-text-div">敏感词库</div>
      <div class="model-title-close-div" v-on:click="hideModel">
        <img src="yuqing/image/guanbi1.png" class="model-title-close-image" />
      </div>
    </div>
    <div class="model-content-div">
      <div class="layui-tab layui-tab-brief" lay-filter="typeTab" style="width: 97%">
        <ul class="layui-tab-title">
          <li class="layui-this" v-for="(item, index) in types.slice(0, 1)" v-bind:key="index"
            v-on:click="changeType(item)">
            {{ item.value }}
          </li>
          <li v-for="(item, index) in types.slice(1)" v-bind:key="index" v-on:click="changeType(item)">
            {{ item.value }}
          </li>
          <li v-on:click="changeType(null)">
            样例分析
          </li>
        </ul>
        <div class="layui-tab-content" style="
              overflow-y: auto;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: auto;
              max-height: 60vh;
            ">
          <div style="
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                width: 100%;
              " v-if="showWordsCase">
            <form @submit.prevent>
              <div style="
                background-color: #f8f8f8;
                border-radius: 2rem;
                border: #13227a 2px solid;
                opacity: 0.5;
                height: 2.5vw;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                width: 35vw;
              ">
                <input @keyup.enter="analyseWordsCase()" type="text" v-model="WordsCaseText" id="keyword"
                  placeholder="请输入样例文本" style="
                  width: 90%;
                  max-width: 90vw;
                  font-size: 1.2vw;
                  background-color: transparent;
                  margin: 0 0 0 1.5vw;
                  border: 0rem;
                  color: #000000;
                " />
                <div v-on:click="analyseWordsCase()" style="
                  height: 100%;
                  width: 4vw;
                  background-image: url(yuqing/image/search-button-image.png);
                  background-repeat: no-repeat;
                  background-size: contain;
                  background-position: right;
                  cursor: pointer;
                  margin: 0 1vw 0 0;
                "></div>
              </div>
            </form>

          </div>

          <div style="
                display: flex;
                flex-direction: row;
                align-items: start;
                justify-content: start;
                flex-wrap: wrap;
                width: 100%;
                min-height: 2vw;
                line-height: 2vw;
              ">
            <div style="
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  justify-content: start;
                  margin: 0 0 0 1vw;
                  font-size: 1vw;
                " v-for="(item, index) in words" v-bind:key="index">
              <input type="checkbox" class="model-checkbox" v-model="selectedSensitiveWords" v-bind:value="item.text" />
              <div style="cursor: pointer; font-size: 1vw" v-on:click="SensitiveWordsClick(item.text)">
                {{ item.text }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="model-buttons-div">
      <div class="model-button-div" v-on:click="ImportSensitiveWordsClick">
        导入
      </div>
      <div class="model-button-div" v-on:click="hideModel">取消</div>
    </div>
  </div>

  <div class="model" v-bind:class="{
    showModel: warning,
  }">
    <div class="model-title-div">
      <div class="model-title-text-div">预警设置</div>
      <div class="model-title-close-div" v-on:click="hideModel">
        <img src="yuqing/image/guanbi1.png" class="model-title-close-image" />
      </div>
    </div>
    <div class="model-content-div">
      <div class="model-row-div">
        <div class="model-half-column">
          <div class="model-label-column-div">
            <div class="required-item-span"></div>
            预警关键字
          </div>
          <div class="model-value-column-div">
            <input id="warningKeywordInput" type="text" class="model-input" placeholder="关键字与关键字之间为或的关系，用空格隔开"
              v-model="warningKeyword" />
          </div>
        </div>
        <div class="model-half-column">
          <div class="model-label-column-div" id="sensitiveDiv">
            <div class="required-item-span"></div>
            敏感属性
          </div>
          <div class="model-input-div">
            <input type="checkbox" class="model-checkbox" v-model="selectedSensitives" value="2" />
            <span v-on:click="SelectedSensitivesOnClick($event)" data-value="2">政治敏感</span>
          </div>
          <div class="model-input-div" style="margin: 0 0 0 1vw">
            <input type="checkbox" class="model-checkbox" v-model="selectedSensitives" value="3" />
            <span v-on:click="SelectedSensitivesOnClick($event)" data-value="3">广告营销</span>
          </div>
          <div class="model-input-div" style="margin: 0 0 0 1vw">
            <input type="checkbox" class="model-checkbox" v-model="selectedSensitives" value="4" />
            <span v-on:click="SelectedSensitivesOnClick($event)" data-value="4">虚假信息</span>
          </div>
          <div class="model-input-div" style="margin: 0 0 0 1vw">
            <input type="checkbox" class="model-checkbox" v-model="selectedSensitives" value="5" />
            <span v-on:click="SelectedSensitivesOnClick($event)" data-value="5">人身攻击</span>
          </div>
          <div class="model-input-div" style="margin: 0 0 0 1vw">
            <input type="checkbox" class="model-checkbox" v-model="selectedSensitives" value="6" />
            <span v-on:click="SelectedSensitivesOnClick($event)" data-value="6">低俗</span>
          </div>
        </div>
      </div>
      <div class="model-row-div">
        <div class="model-half-column">
          <div class="model-label-column-div" id="emotionDiv">
            <div class="required-item-span" id="priorityRadio2"></div>
            情感属性
          </div>

          <div class="model-input-div">
            <input type="checkbox" class="model-checkbox" v-model="selectedEmotions" value="angry" />
            <span v-on:click="SelectedEmotionsOnClick($event)" data-value="angry">愤怒</span>
          </div>
          <div class="model-input-div" style="margin: 0 0 0 1vw">
            <input type="checkbox" class="model-checkbox" v-model="selectedEmotions" value="fear" />
            <span v-on:click="SelectedEmotionsOnClick($event)" data-value="fear">恐惧</span>
          </div>
          <div class="model-input-div" style="margin: 0 0 0 1vw">
            <input type="checkbox" class="model-checkbox" v-model="selectedEmotions" value="surprise" />
            <span v-on:click="SelectedEmotionsOnClick($event)" data-value="surprise">震惊</span>
          </div>
          <div class="model-input-div" style="margin: 0 0 0 1vw">
            <input type="checkbox" class="model-checkbox" v-model="selectedEmotions" value="sad" />
            <span v-on:click="SelectedEmotionsOnClick($event)" data-value="sad">悲伤</span>
          </div>
          <div class="model-input-div" style="margin: 0 0 0 1vw">
            <input type="checkbox" class="model-checkbox" v-model="selectedEmotions" value="neutral" />
            <span v-on:click="SelectedEmotionsOnClick($event)" data-value="neutral">中立</span>
          </div>
          <div class="model-input-div" style="margin: 0 0 0 1vw">
            <input type="checkbox" class="model-checkbox" v-model="selectedEmotions" value="happy" />
            <span v-on:click="SelectedEmotionsOnClick($event)" data-value="happy">积极</span>
          </div>
        </div>
        <div class="model-half-column">
          <div class="model-label-column-div">
            <span class="required-item-span" id="matchRadio2"></span>匹配方式
          </div>
          <div class="model-input-div">
            <input type="radio" name="waringMatch" value="1" class="model-radio" v-model="match" />
            <span v-on:click="matchOnClick($event)" data-value="1">标题匹配</span>
          </div>
          <div class="model-input-div">
            <input type="radio" name="waringMatch" value="2" class="model-radio" v-model="match" />
            <span v-on:click="matchOnClick($event)" data-value="2">正文匹配</span>
          </div>
          <div class="model-input-div">
            <input type="radio" name="waringMatch" value="0" class="model-radio" v-model="match" />
            <span v-on:click="matchOnClick($event)" data-value="0">标题或正文匹配</span>
          </div>
        </div>
      </div>
      <div class="model-row-div">
        <div class="model-half-column">
          <div class="model-label-column-div" id="yuzhiDiv">
            <div class="required-item-span"></div>
            阈值设置
          </div>
          <div class="model-input-div" style="margin: 0 0 0 0">
            <input type="checkbox" class="model-checkbox" v-model="checkboxes" value="warningCount" />
            <span v-on:click="CheckBoxOnClick($event)" data-value="warningCount">信息条数</span>
            <input id="warningCountInput" type="text" class="model-input" placeholder="正整数" v-model="warningCount"
              style="width: 30%; margin: 0 0.5vw 0 0.5vw" />条
          </div>
          <div class="model-input-div">
            <input type="checkbox" class="model-checkbox" v-model="checkboxes" value="warningPeecent" />
            <span v-on:click="CheckBoxOnClick($event)" data-value="warningPeecent">条数占比</span>
            <input id="warningPeecentInput" type="text" class="model-input" @change="warningPeecentOnChange"
              placeholder="不大于100的正整数" v-model="warningPeecent" style="width: 30%; margin: 0 0.5vw 0 0.5vw" />%
          </div>
        </div>
        <div class="model-half-column">
          <div class="model-label-column-div">
            <div class="required-item-span"></div>
            预警人员
          </div>
          <div class="model-button-div2" v-on:click="ShowContact">添加</div>
          <div class="model-button-div2" v-on:click="showWarningReceivers">导入</div>
        </div>
      </div>
      <div style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            width: 95%;
            min-height: 2vw;
            height: auto;
          ">
        <table id="warningUserTable" lay-filter="warningUserTable"></table>
      </div>
      <div style="margin: 0 0 0.5vw 0; width: 100%"></div>
    </div>
    <div class="model-buttons-div">
      <div class="model-button-div" v-on:click="saveWarning">保存</div>
      <div class="model-button-div" v-on:click="hideModel">取消</div>
    </div>
  </div>

  <div class="monitor" v-bind:class="{
    showMonitor: monitor,
  }">
    <div class="model-title-div">
      <div class="model-title-text-div">定向监测</div>
      <div class="model-title-close-div" v-on:click="hideModel">
        <img src="yuqing/image/guanbi1.png" class="model-title-close-image" />
      </div>
    </div>
    <div class="model-content-div">
      <div style="
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            width: 96%;
            min-height: 2vw;
            line-height: 1.5vw;
            margin: 0.5vw 0 0 0;
            font-size: 0.8vw;
            font-weight: 600;
          ">
        <div class="model-input-div">
          <input type="checkbox" class="model-checkbox" v-model="checkAll" v-on:click="CheckAllBoxOnClick($event)" />
          <span v-on:click="CheckAllBoxOnClick($event)">全选</span>
        </div>
      </div>
    </div>
    <div class="model-content-div">
      <span style="font-size: 0.8vw;
            font-weight: 600;">新闻娱乐相关网站</span>
      <div style="
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            flex-wrap: wrap;
            width: 96%;
            min-height: 2vw;
            line-height: 1.5vw;
            margin: 0.5vw 0 0 0;
          ">
        <template v-for="(item, index) in crawlers" v-bind:key="index">
          <div class="model-input-div" style="width: 18.8%" v-show="item.type==='新闻娱乐相关网站'">
          
            <input type="checkbox" class="model-checkbox" v-model="checkboxes" v-bind:value="item.id" v-on:change="CheckBoxOnChange($event)" />
            <span v-on:click="CheckBoxOnClick($event)" v-bind:data-value="item.id">{{ item.value }}</span>
          
        </div>
        </template>
      </div>
      <div style="margin: 0 0 0.5vw 0; width: 100%"></div>
    </div>
    <div class="model-content-div">
      <span style="font-size: 0.8vw;
            font-weight: 600;">核电相关网站</span>
      <div style="
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            flex-wrap: wrap;
            width: 96%;
            min-height: 2vw;
            line-height: 1.5vw;
            margin: 0.5vw 0 0 0;
          ">
        <template v-for="(item, index) in crawlers" v-bind:key="index">
          <div class="model-input-div" style="width: 18.8%" v-show="item.type==='核电相关网站'">
          
            <input type="checkbox" class="model-checkbox" v-model="checkboxes" v-bind:value="item.id" v-on:change="CheckBoxOnChange($event)" />
            <span v-on:click="CheckBoxOnClick($event)" v-bind:data-value="item.id">{{ item.value }}</span>
          
        </div>
        </template>
      </div>
      <div style="margin: 0 0 0.5vw 0; width: 100%"></div>
    </div>
    <div class="model-content-div">
      <span style="font-size: 0.8vw;
            font-weight: 600;">集团官网</span>
      <div style="
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            flex-wrap: wrap;
            width: 96%;
            min-height: 2vw;
            line-height: 1.5vw;
            margin: 0.5vw 0 0 0;
          ">
        <template v-for="(item, index) in crawlers" v-bind:key="index">
          <div class="model-input-div" style="width: 18.8%" v-show="item.type==='集团官网'">
          
            <input type="checkbox" class="model-checkbox" v-model="checkboxes" v-bind:value="item.id" v-on:change="CheckBoxOnChange($event)" />
            <span v-on:click="CheckBoxOnClick($event)" v-bind:data-value="item.id">{{ item.value }}</span>
          
        </div>
        </template>
      </div>
      <div style="margin: 0 0 0.5vw 0; width: 100%"></div>
    </div>
    <div class="model-content-div">
      <span style="font-size: 0.8vw;
            font-weight: 600;">核电基地官网</span>
      <div style="
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            flex-wrap: wrap;
            width: 96%;
            min-height: 2vw;
            line-height: 1.5vw;
            margin: 0.5vw 0 0 0;
          ">
        <template v-for="(item, index) in crawlers" v-bind:key="index">
          <div class="model-input-div" style="width: 18.8%" v-show="item.type==='核电基地官网'">
          
            <input type="checkbox" class="model-checkbox" v-model="checkboxes" v-bind:value="item.id" v-on:change="CheckBoxOnChange($event)" />
            <span v-on:click="CheckBoxOnClick($event)" v-bind:data-value="item.id">{{ item.value }}</span>
          
        </div>
        </template>
      </div>
      <div style="margin: 0 0 0.5vw 0; width: 100%"></div>
    </div>
    <div class="model-buttons-div">
      <div class="model-button-div" v-on:click="saveMonitor">保存</div>
      <div class="model-button-div" v-on:click="hideModel">取消</div>
    </div>
  </div>

  <div class="planResultsDiv" v-bind:class="{
    showPlanResultsDiv: showedPlanResult,
  }">
    <div class="model-title-div">
      <div class="model-title-text-div">舆情研判</div>
      <div class="model-title-close-div" v-on:click="hideModel">
        <img src="yuqing/image/guanbi1.png" class="model-title-close-image" />
      </div>
    </div>
    <div class="model-content-div">
      <div class="model-row-div">
        <div class="model-half-column">
          <div class="model-label-column-div">标题或内容</div>
          <div class="model-value-column-div">
            <input id="planNameInput" type="text" class="model-input" v-model="planText" />
          </div>
        </div>
        <div class="model-half-column">
          <div class="model-button-div" style="margin: 0 0.1vw 0 0" v-on:click="planResultQuery">
            查询
          </div>
          <div class="model-button-div" style="margin: 0 0.1vw 0 0" v-on:click="planResultReset">
            重置
          </div>
          <div class="model-button-div" v-on:click="selectMaterialLibrary">
            添加素材
          </div>
        </div>
      </div>
      <div class="model-row-div">
        <div class="model-half-column">
          <div class="model-label-column-div">发布时间</div>
          <input type="text" style="margin: 0 0.2vw 0 0.2vw" class="model-date-input" id="releaseStartDateInput"
            v-model="releaseStartDate" readonly />
          <div style="font-size: 1vw; margin: 0 0.2vw 0 0">-</div>
          <input type="text" class="model-date-input" id="releaseEndDateInput" v-model="releaseEndDate" readonly />
        </div>

        <div class="model-half-column">
          <div class="model-label-column-div">采集时间</div>
          <input type="text" style="margin: 0 0.2vw 0 0.2vw" class="model-date-input" id="createdStartDateInput"
            v-model="createdStartDate" readonly />
          <div style="font-size: 1vw; margin: 0 0.2vw 0 0">-</div>
          <input type="text" class="model-date-input" id="createdEndDateInput" v-model="createdEndDate" readonly />
        </div>
      </div>
      <div class="model-row-div">
        <div class="model-half-column">
          <div class="model-label-column-div">情感</div>
          <div class="model-input-div">
            <input type="radio" name="emotion" value="" class="model-radio" v-model="emotion" />
            <span v-on:click="selectedEmotionOnClick($event)" data-value="">全部</span>
          </div>
          <div class="model-input-div">
            <input type="radio" name="emotion" value="angry" class="model-radio" v-model="emotion" />
            <span v-on:click="selectedEmotionOnClick($event)" data-value="angry">愤怒</span>
          </div>
          <div class="model-input-div">
            <input type="radio" name="emotion" value="fear" class="model-radio" v-model="emotion" />
            <span v-on:click="selectedEmotionOnClick($event)" data-value="fear">恐惧</span>
          </div>
          <div class="model-input-div">
            <input type="radio" name="emotion" value="surprise" class="model-radio" v-model="emotion" />
            <span v-on:click="selectedEmotionOnClick($event)" data-value="surprise">震惊</span>
          </div>
          <div class="model-input-div">
            <input type="radio" name="emotion" value="sad" class="model-radio" v-model="emotion" />
            <span v-on:click="selectedEmotionOnClick($event)" data-value="sad">悲伤</span>
          </div>
          <div class="model-input-div">
            <input type="radio" name="emotion" value="neutral" class="model-radio" v-model="emotion" />
            <span v-on:click="selectedEmotionOnClick($event)" data-value="neutral">中立</span>
          </div>
          <div class="model-input-div">
            <input type="radio" name="emotion" value="happy" class="model-radio" v-model="emotion" />
            <span v-on:click="selectedEmotionOnClick($event)" data-value="happy">积极</span>
          </div>
        </div>
        <div class="model-half-column">
          <div class="model-label-column-div">敏感度</div>
          <div class="model-input-div">
            <input type="radio" name="sensitive" value="0" class="model-radio" v-model="sensitive" />
            <span v-on:click="selectedSensitiveOnClick($event)" data-value="0">全部</span>
          </div>
          <div class="model-input-div">
            <input type="radio" name="sensitive" value="1" class="model-radio" v-model="sensitive" />
            <span v-on:click="selectedSensitiveOnClick($event)" data-value="1">正常</span>
          </div>
          <div class="model-input-div">
            <input type="radio" name="sensitive" value="2" class="model-radio" v-model="sensitive" />
            <span v-on:click="selectedSensitiveOnClick($event)" data-value="2">政治敏感</span>
          </div>
          <div class="model-input-div">
            <input type="radio" name="sensitive" value="3" class="model-radio" v-model="sensitive" />
            <span v-on:click="selectedSensitiveOnClick($event)" data-value="3">广告营销</span>
          </div>
          <div class="model-input-div">
            <input type="radio" name="sensitive" value="4" class="model-radio" v-model="sensitive" />
            <span v-on:click="selectedSensitiveOnClick($event)" data-value="4">虚假信息</span>
          </div>
          <div class="model-input-div">
            <input type="radio" name="sensitive" value="5" class="model-radio" v-model="sensitive" />
            <span v-on:click="selectedSensitiveOnClick($event)" data-value="5">人身攻击</span>
          </div>
          <div class="model-input-div">
            <input type="radio" name="sensitive" value="6" class="model-radio" v-model="sensitive" />
            <span v-on:click="selectedSensitiveOnClick($event)" data-value="6">低俗</span>
          </div>
        </div>
      </div>
      <div class="model-multi-row-div1">
        <div style="
              width: 7.5%;
              display: flex;
              flex-direction: row;
              align-items: flex-start;
              justify-content: flex-start;
              height: 100%;
            ">
          来源
        </div>
        <div style="
              width: 92.5%;
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: flex-start;
              flex-wrap: wrap;
              margin: 0 0 0.5vw 0;
            ">
          <div class="model-input-div" style="
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-start;
                margin: 0 1vw 0.5vw 0;
                cursor: pointer;
                height: auto;
              ">
            <input type="radio" name="source" value="" class="model-radio" v-model="selectedSources" />
            <span v-on:click="selectedSourceOnClick('')" data-value="">全部</span>
          </div>
          <div style="
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-start;
                margin: 0 1vw 0.5vw 0;
                cursor: pointer;
                height: auto;
              " v-for="(item, index) in sources" v-bind:key="index">
            <input type="radio" name="source" v-bind:value="item.value" class="model-radio" v-model="selectedSources" />
            <span v-on:click="selectedSourceOnClick(item.value)">{{
              item.label
            }}</span>
          </div>
        </div>
      </div>
      <div style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            width: 95%;
            min-height: 2vw;
            height: auto;
          ">
        <table class="plan-result-table" id="planResultTable" lay-filter="planResultTable"></table>
        <div id="tablePageBar"></div>
      </div>
      <div style="margin: 0 0 0.5vw 0; width: 100%"></div>
    </div>
  </div>

  <div class="model" v-bind:class="{
    showModel: showedAddPlan,
  }">
    <div class="model-title-div">
      <div class="model-title-text-div">方案配置</div>
      <div class="model-title-close-div" v-on:click="hideModel">
        <img src="yuqing/image/guanbi1.png" class="model-title-close-image" />
      </div>
    </div>
    <div class="model-content-div">
      <div class="model-row-div">
        <div class="model-half-column">
          <div class="model-label-column-div">
            <div class="required-item-span"></div>
            方案名称
          </div>
          <div class="model-value-column-div">
            <input id="planNameInput" type="text" class="model-input" v-model="planName" />
          </div>
        </div>
        <div class="model-half-column">
          <div class="model-label-column-div">
            <div class="required-item-span"></div>
            开始时间
          </div>
          <input type="text" class="model-date-input" id="startDateInput" v-model="startDate" readonly />
          <div class="model-label-column-div">
            <div class="required-item-span"></div>
            结束时间
          </div>
          <input type="text" class="model-date-input" id="endDateInput" v-model="endDate" readonly />
        </div>
      </div>
      <div class="model-row-div">
        <div class="model-half-column">
          <div class="model-label-column-div">
            <div class="required-item-span" id="priorityRadio"></div>
            紧急程度
          </div>
          <div class="model-input-div">
            <input type="radio" name="priority" value="0" class="model-radio" v-model="priority" />
            <span v-on:click="priorityOnClick($event)" data-value="0">低</span>
          </div>
          <div class="model-input-div">
            <input type="radio" name="priority" value="1" class="model-radio" v-model="priority" />
            <span v-on:click="priorityOnClick($event)" data-value="1">中</span>
          </div>
          <div class="model-input-div">
            <input type="radio" name="priority" value="2" class="model-radio" v-model="priority" />
            <span v-on:click="priorityOnClick($event)" data-value="2">高</span>
          </div>
        </div>
        <div class="model-half-column">
          <div class="model-label-column-div">
            <span class="required-item-span" id="matchRadio"></span>匹配方式
          </div>
          <div class="model-input-div">
            <input type="radio" name="match" value="1" class="model-radio" v-model="match" />
            <span v-on:click="matchOnClick($event)" data-value="1">标题匹配</span>
          </div>
          <div class="model-input-div">
            <input type="radio" name="match" value="2" class="model-radio" v-model="match" />
            <span v-on:click="matchOnClick($event)" data-value="2">正文匹配</span>
          </div>
          <div class="model-input-div">
            <input type="radio" name="match" value="0" class="model-radio" v-model="match" />
            <span v-on:click="matchOnClick($event)" data-value="0">标题或正文匹配</span>
          </div>
        </div>
      </div>
      <div class="model-row-div">
        <div class="model-half-column">
          <div class="model-input-div">
            <input type="checkbox" class="model-checkbox" v-model="checkboxes" value="criticalPlan" />
            <span v-on:click="CheckBoxOnClick($event)" data-value="criticalPlan">应急计划</span>
          </div>
          <div class="model-input-div" style="margin: 0 0 0 1vw">
            <input type="checkbox" class="model-checkbox" v-model="checkboxes" value="notifyWhenComplete" />
            <span v-on:click="CheckBoxOnClick($event)" data-value="notifyWhenComplete">完成通知</span>
          </div>
        </div>
        <div class="model-half-column"></div>
      </div>
      <div class="model-multi-row-div">
        <div class="model-half-row">
          <div class="model-row-div">
            <div class="required-item-span" id="eventKeywordInput"></div>
            <span class="model-label">事件关键字词组</span>
            <span class="model-label-description">（词组与词组之间为“或”的关系）</span>
            <div class="model-button-div2" v-on:click="addEventKeywordOnClick">
              添加
            </div>
          </div>
          <div class="model-row-div">
            <input type="text" class="model-input" placeholder="请输入事件关键字，关键字与关键字之间以空格隔开，为“与”的关系"
              v-on:change="eventKeywordOnChange($event, 0)" v-model="eventKeywords[0]" />
          </div>
          <div v-for="(item, index) in eventKeywords" v-bind:key="index" class="model-for-row-div">
            <div class="model-row-div" v-if="index > 0">
              <input type="text" class="model-input" v-on:change="eventKeywordOnChange($event, index)"
                placeholder="请输入事件关键字，关键字与关键字之间以空格隔开，为“与”的关系" v-model="eventKeywords[index]" />
              <img src="yuqing/image/shanchu7.png" class="model-delete-image"
                v-on:click="deleteEventKeyWordOnClick(index)" />
            </div>
          </div>
          <div class="model-row-div" style="margin: 2vw 0 0 0">
            <span class="model-label">地域关键字词组</span>
            <span class="model-label-description">（词组与词组之间为“或”的关系）</span>
            <div class="model-button-div2" v-on:click="addRegionKeywordsOnClick">
              添加
            </div>
          </div>
          <div class="model-row-div">
            <input type="text" class="model-input" placeholder="请输入地域关键字，关键字与关键字之间以空格隔开，为“与”的关系"
              v-on:change="regionKeywordsOnChange($event, 0)" v-model="regionKeywords[0]" />
          </div>
          <div v-for="(item, index) in regionKeywords" v-bind:key="index" class="model-for-row-div">
            <div class="model-row-div" v-if="index > 0">
              <input type="text" class="model-input" v-on:change="regionKeywordsOnChange($event, index)"
                placeholder="请输入地域关键字，关键字与关键字之间以空格隔开，为“与”的关系" v-model="regionKeywords[index]" />
              <img src="yuqing/image/shanchu7.png" class="model-delete-image"
                v-on:click="deleteRegionKeywordsOnClick(index)" />
            </div>
          </div>
        </div>
        <div class="model-half-row">
          <div class="model-row-div">
            <span class="model-label">排除关键字词组</span>
            <span class="model-label-description">（词组与词组之间为“或”的关系）</span>

            <div class="model-button-div2" v-on:click="addExceptKeywordsOnClick">
              添加
            </div>
          </div>
          <div class="model-row-div">
            <input type="text" class="model-input" placeholder="请输入事件关键字，关键字与关键字之间以空格隔开，为“与”的关系"
              v-on:change="exceptKeywordsOnChange($event, 0)" v-model="exceptKeywords[0]" />
          </div>
          <div v-for="(item, index) in exceptKeywords" v-bind:key="index" class="model-for-row-div">
            <div class="model-row-div" v-if="index > 0">
              <input type="text" class="model-input" v-on:change="exceptKeywordsOnChange($event, index)"
                placeholder="请输入事件关键字，关键字与关键字之间以空格隔开，为“与”的关系" v-model="exceptKeywords[index]" />
              <img src="yuqing/image/shanchu7.png" class="model-delete-image"
                v-on:click="deleteExceptKeywordsOnClick(index)" />
            </div>
          </div>
          <div class="model-row-div" style="margin: 2vw 0 0 0">
            <span class="model-label">敏感词词组</span>
            <span class="model-label-description">（词组与词组之间为“或”的关系）</span>
            <div class="model-button-div2" v-on:click="addSensitiveKeywordsOnClick">
              添加
            </div>
            <div class="model-button-div2" v-on:click="openSensitiveKeywordsModelOnClick">
              导入
            </div>
          </div>
          <div class="model-row-div">
            <input type="text" class="model-input" placeholder="请输入事件敏感词，敏感词与敏感词之间以空格隔开，为“与”的关系"
              v-on:change="sensitiveKeywordsOnChange($event, 0)" v-model="sensitiveWords[0]" />
          </div>
          <div v-for="(item, index) in sensitiveWords" v-bind:key="index" class="model-for-row-div">
            <div class="model-row-div" v-if="index > 0">
              <input type="text" class="model-input" v-on:change="sensitiveKeywordsOnChange($event, index)"
                placeholder="请输入事件敏感词，敏感词与敏感词之间以空格隔开，为“与”的关系" v-model="sensitiveWords[index]" />
              <img src="yuqing/image/shanchu7.png" class="model-delete-image"
                v-on:click="deleteSensitiveKeywordsOnClick(index)" />
            </div>
          </div>
        </div>
      </div>
      <div style="margin: 0 0 0.5vw 0; width: 100%"></div>
    </div>
    <div class="model-buttons-div">
      <div class="model-button-div" v-on:click="save">保存</div>
      <div class="model-button-div" v-on:click="showedAddPlan=false">取消</div>
    </div>
  </div>
</template>
<script type="text/html" id="contactTableButtons">
</script>
<style>
.new-contact-model {
  position: fixed;
  top: -100%;
  left: 35vw;
  width: 30vw;
  opacity: 0;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 0.7vw;
  transition: all ease 500ms;
  background-color: #fff;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  z-index: 1200;
}

.showContact {
  top: 30%;
  opacity: 1;
  transition: all ease 500ms;
}

.materialLibraryModel {
  position: fixed;
  top: -100%;
  left: 20vw;
  width: 60vw;
  opacity: 0;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 0.7vw;
  transition: all ease 500ms;
  background-color: #fff;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  z-index: 1200;
}

.showMaterialLibraryModel {
  top: 10%;
  opacity: 1;
  transition: all ease 500ms;
}

.table-button-div {
  transition: all ease 500ms;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0.4vw 0.8vw 0.4vw 0.8vw;
  background-color: #13227a;
  color: #fff !important;
  margin: 0 0.1vw 0 0;
  transition: all ease 500ms;
  font-size: 0.7vw;
  width: 3.5vw;
  height: 2vw;
}

.table-button-div:hover {
  transition: all ease 500ms;
  box-shadow: 2px 2px 5px #888888;
}

.plan-button-div {
  transition: all ease 500ms;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0.4vw 0.8vw 0.4vw 0.8vw;
  background-color: #13227a;
  color: #fff;
  margin: 0 0.1vw 0 0;
  transition: all ease 500ms;
  font-size: 0.8vw;
}

.plan-button-div:hover {
  transition: all ease 500ms;
  box-shadow: 2px 2px 5px #888888;
  transform: translateY(-0.2vw);
}

.plan-button-column-div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 20%;
  height: 100%;
  margin: 0 0.5vw 0 0;
}

.plan-content-increase-div {
  font-size: 0.7vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
}

.plan-content-total-div {
  font-size: 0.9vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  font-weight: 400;
  color: #000;
  margin: 0 0 0.2vw 0;

}

.plan-content-name-div {
  text-align: left;
  font-size: 1vw;
  font-weight: 600;
  color: #000;
  margin: 0 0 0.2vw 0;
}

.plan-content-date-div {
  font-size: 0.7vw;
  font-weight: 100;
  color: #bfbfbf;
  margin: 0.5vw 0 0 0;
}

.plan-column {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 1vw 1vw 0.2vw 0;
}

.plan-name-column {
  height: 100%;
  width: 10vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 2vw 0 0 0;
}

.plan-content-row {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 0.5vw 0 0 0;
}

.plan-content-name-column-div {
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  font-size: 1vw;
  font-weight: 600;
  color: #000;
  min-width: 8vw;
}

.plan-content-detail-column-div {
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  font-size: 0.7vw;
  min-width: 8vw;
}

.breathDiv {
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

.plan-content-spliter-red-div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 0.5vw;
  height: 100%;
  background-color: red;
  margin: 0 0.5vw 0 0;

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

.plan-content-spliter-green-div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 0.5vw;
  height: 100%;
  background-color: green;
  margin: 0 0.5vw 0 0;

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

.plan-content-column-div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 79%;
  height: 100%;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: #888;
}

.plan-row-div {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 70vw;
  margin: 0 0 2px 0;
}

.planContentListRowDiv {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: 0;
  opacity: 0;
  transition: all ease 500ms;
}

.showPlanContentListRowDiv {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  opacity: 1;
  transition: all ease 500ms;
  background-color: #fff;
  margin: 0 0 0.5vw 0;
  box-shadow: 2px 2px 5px rgb(0 0 0 / 8%);
}

.plan-content-row-div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
  background-color: #fff;
  transition: all ease 500ms;
  box-shadow: 2px 2px 5px rgb(0 0 0 / 8%);
}

.plan-content-row-div:hover {
  transition: all ease 500ms;
  transform: translateY(-0.2vw);
  box-shadow: 2px 2px 5px #888888;
}

.plan-content-row-div:hover .plan-content-spliter-green-div {
  animation-name: none;
}

.plan-content-row-div:hover .plan-content-spliter-red-div {
  animation-name: none;
}

.new-plan-button {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 6vw;
  height: 2.2vw;
  font-size: 0.9vw;
  background-color: #fafafa;
  cursor: pointer;
  transition: all ease 500ms;
}

.new-plan-button:hover {
  transition: all ease 500ms;
  background-color: #13227a;
  color: #fff;
  transform: translateY(-0.5vw);
}

.warning-row-div {
  width: 13vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #888888;
  justify-content: space-between;
  padding: 0.5vw 1vw 0.5vw 1vw;
  cursor: pointer;
  transition: all ease 500ms;
}

.warning-row-div:hover {
  /*  background-image: linear-gradient(to bottom right,#002ea6,#0760FA,#4364f7);  color: #fff;*/
  background-color: #fff;
  box-shadow: 2px 2px 5px rgba(136, 136, 136, 0.5);
  transform: translateY(-0.5vw);
  transition: all ease 500ms;
  color: #13227a;
}

.warning-row-div:hover img {
  content: url(/public/yuqing/image/chakan3.png);
}

/* 
.warning-row-div:hover .warning-date-div{   
    color: #fff;
}*/

.warning-detail-row-div {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  font-size: 0.7vw;
  font-weight: 600;
  height: 2.1vw;
}

.warning-crtical-icon-column-div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #fff;
  background-image: linear-gradient(to bottom right, #e75927, red, #571111);
  box-shadow: 2px 2px 5px #888888;
  font-size: 0.9vw;
  width: 0.5vw;
  height: 0.5vw;
  border-radius: 50%;
  margin: 0.25vw 0.7vw 0 0;
}

.warning-icon-column-div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #fff;
  background-image: linear-gradient(to bottom right, #eef6f6, #1ed085, #2e90a0);
  box-shadow: 2px 2px 5px #888888;
  font-size: 0.9vw;
  width: 0.5vw;
  height: 0.5vw;
  border-radius: 50%;
  margin: 0.25vw 0.7vw 0 0;

  animation-name: breath;
  /* 动画名称 */
  animation-duration: 3s;
  /* 动画时长3秒 */
  animation-timing-function: ease-in-out;
  /* 动画速度曲线：以低速开始和结束 */
  animation-iteration-count: infinite;
  /* 播放次数：无限 */
}

@keyframes breath {
  from {
    opacity: 0.1;
  }

  /* 动画开始时的不透明度 */
  50% {
    opacity: 1;
  }

  /* 动画50% 时的不透明度 */
  to {
    opacity: 0.1;
  }

  /* 动画结束时的不透明度 */
}

.warning-title-column-div {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  font-size: 0.7vw;
  font-weight: 600;
  height: 2.1vw;
}

.warning-spliter-div {
  /*  width: 100%;
  height: 1px;
  background-color: #dadadc;
  margin: 0.7vw 0 0.7vw 0;
  box-shadow: 1px 1px 2px #888888;*/
  height: 0.7vw;
}

.warning-view-div {
  font-size: 0.6vw;
  font-weight: 400;
  color: #89898d;
  cursor: pointer;
}

.warning-date-div {
  font-size: 0.6vw;
  font-weight: 400;
  color: #89898d;
}

.view-all-div {
  cursor: pointer;
  padding: 0.2vw;
  transition: all ease 500ms;
  margin: 0.5vw 0 0 0;
}

.view-all-div:hover {
  transition: all ease 500ms;
  background-color: #13227a;
  transform: translateX(0.2vw);
}

.view-all-div:hover img {
  content: url(/public/yuqing/image/chakanquanbu2.png);
}

.view-all-icon {
  width: 1.2vw;
  transition: all ease 500ms;
}

.view-all-icon:hover {
  transition: all ease 500ms;
}

.menu-item-div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0 0 0.5vw 1vw;
  width: 8vw;
  height: 2.5vw;
  cursor: pointer;
  font-weight: 500;
  transition: all ease 500ms;
}

.menu-item-div:hover {
  transform: translateY(-0.5vw);
  transition: all ease 500ms;
  background-color: #13227a;
  color: #fff;
}

.menu-item-icon-div {
  height: 1vw;
  margin: 0 0.5vw 0 0;
}

.menu-item-div:hover .quanwenjiansuo-img {
  content: url(/public/yuqing/image/quanwenjiansuo.png);
}

.menu-item-div:hover .jianbao-img {
  content: url(/public/yuqing/image/jianbao.png);
}

.menu-item-div:hover .minganciku-img {
  content: url(/public/yuqing/image/minganciku.png);
}

.menu-item-div:hover .xitongguanli-img {
  content: url(/public/yuqing/image/xitongguanli.png);
}

.menu-item-div:hover .tuichu2-img {
  content: url(/public/yuqing/image/tuichu.png);
}

.menu-item-div:hover .yujing-img {
  content: url(/public/yuqing/image/yujing.png);
}

a {
  color: inherit !important;
}

.emergency-checkbox {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 1vw;
  margin: 0 0 0 1vw;
}

.required-item-span {
  color: red;
  width: 0.3vw;
  height: 50%;
  margin: 0 0.7vw 0 0;
  background-color: red;
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

.model {
  position: fixed;
  top: -100%;
  left: 5vw;
  width: 90vw;
  opacity: 0;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 0.7vw;
  transition: all ease 500ms;
  background-color: #fff;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  z-index: 1002;
}

.showModel {
  top: 5%;
  opacity: 1;
  transition: all ease 500ms;
}

.model-label-column-div {
  width: 15%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
}

.model-label-row-div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 95%;
  height: 3vw;
  margin: 0.5vw 0 0 0;
}

.model-value-row-div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 95%;
  min-height: 3vw;
}

.model-daynmic-row-div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  min-height: 3vw;
  margin: 0.5vw 0 0 0;
}

.model-for-row-div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
}

.model-row-div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 95%;
  height: 2vw;
  min-height: 2vw;
  margin: 0.5vw 0 0 0;
}

.model-multi-row-div {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  width: 95%;
  min-height: 2vw;
  height: auto;
  margin: 0.5vw 0 0 0;
}
.model-multi-row-div1{
  display: flex;
  margin: 0.5vw 0 0 0;
  width: 95%;
}
.model-title-div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 2.5vw;
  border-bottom: #f8f8f8 solid 2px;
  font-size: 0.8vw;
  font-weight: 500;
}

.model-value-column-div {
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.model-input {
  height: 100%;
  width: 85%;
  font-size: 0.7vw;
  border-radius: 2px;
  border: #eee solid 1px !important;
  padding: 0 0.5vw 0 0.5vw;
  transition: all ease 500ms;
  margin: 0 0.5vw 0 0;
}

.model-input::-webkit-input-placeholder {
  /* WebKit browsers 适配谷歌 */
  font-size: 0.6vw;
  color: #cdcdcd;
}

.model-input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 适配火狐 */
  font-size: 0.6vw;
  color: #cdcdcd;
}

.model-input::-moz-placeholder {
  /* Mozilla Firefox 19+ 适配火狐 */
  font-size: 0.6vw;
  color: #cdcdcd;
}

.model-input:-ms-input-placeholder {
  /* Internet Explorer 10+  适配ie*/
  font-size: 0.6vw;
  color: #cdcdcd;
}

.model-input:focus {
  transition: all ease 500ms;
  border: #d2d2d2 solid 1px !important;
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

.model-buttons-div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 1vw 0 1vw 0;
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

.model-content-div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.model-radio {
  zoom: 150%;
  margin: 0 0.2vw 0 0;
  cursor: pointer;
}

.model-input-div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: 0 1vw 0 0;
  cursor: pointer;
  height: 100%;
}

.model-checkbox {
  zoom: 150%;
  margin: 0 0.2vw 0 0;
  cursor: pointer;
}

.model-delete-image {
  width: 1.2vw;
  cursor: pointer;
  transition: all ease 500ms;
}

.model-delete-image:hover {
  content: url(/public/yuqing/image/shanchu1.png);
  transform: translateY(-0.2vw);
}

.model-button-div2 {
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
  padding: 0.5vw 0.8vw 0.5vw 0.8vw;
  margin: 0 0.5vw 0 0;
}

.model-button-div2:hover {
  transition: all ease 500ms;
  box-shadow: 2px 2px 5px #888888;
  transform: translateY(-0.2vw);
}

.model-half-column {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  width: 50%;
  height: 100%;
}

.model-half-row {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 50%;
  height: auto;
}

.model-date-input {
  height: 100%;
  width: 25%;
  font-size: 0.7vw;
  border-radius: 2px;
  border: #eee solid 1px !important;
  padding: 0 0.5vw 0 0.5vw;
  transition: all ease 500ms;
  margin: 0 4vw 0 0.2vw;
}

.model-date-input:focus {
  transition: all ease 500ms;
  border: #d2d2d2 solid 1px !important;
}

.model-label {
  font-weight: 600;
}

.model-label-description {
  font-size: 0.6vw;
  color: #cdcdcd;
}

.model-tip-div {
  font-size: 0.9vw !important;
  line-height: 1vw !important;
}

.plan-result-table {
  margin: 0 0.5vw 0.5vw 0.5vw;
}

.planResultsDiv {
  position: fixed;
  top: -100%;
  left: 2vw;
  width: 96vw;
  opacity: 0;
  max-height: 96vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 0.7vw;
  transition: all ease 500ms;
  background-color: #fff;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  z-index: 1003;
}

.showPlanResultsDiv {
  top: 2%;
  opacity: 1;
  transition: all ease 500ms;
}

.layui-table-cell {
  white-space: normal;
  height: auto !important;
  word-break: normal;
  max-height: 10vw;
}

th div {
  text-align: center;
}

.monitor {
  position: fixed;
  top: -100%;
  left: 5vw;
  width: 90vw;
  opacity: 0;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 0.7vw;
  transition: all ease 500ms;
  background-color: #fff;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  z-index: 1002;
}

.showMonitor {
  top: 20%;
  opacity: 1;
  transition: all ease 500ms;
}

.sensitiveWord {
  position: fixed;
  top: -100%;
  left: 5vw;
  width: 90vw;
  opacity: 0;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 0.7vw;
  transition: all ease 500ms;
  background-color: #fff;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  z-index: 1100;
}

.showSensitiveWord {
  top: 5%;
  opacity: 1;
  transition: all ease 500ms;
}

.showWeiboSerachResult {
  transition: all ease 500ms;
  height: auto;
}

.noWeiboSerachResult {
  transition: all ease 500ms;
  height: 0vw;
}

.selectedWeibo {
  color: #fff;
  background-color: #13227a;
}

.unselectedWeibo {
  color: #13227a;
  background-color: #fff;
}

.showWeiboPage {
  display: flex !important;
}

.hideWeiboPage {
  display: none !important;
}

.weiboMonitorDetailDiv {
  margin: 0 0 0.5vw 0;
}

.weiboMonitorAccountDiv {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  font-size: 0.8vw;
  width: 19vw;
  height: 6.5vw;
  cursor: pointer;
  color: #13227a;
  margin: 0 1vw 1vw 0;
  transition: all ease 500ms;
  padding: 0.5vw 0 0 0.5vw;
}

.weiboMonitorAccountDiv:hover {
  background-color: #13227a;
  color: #fff;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
  transform: translateY(-0.2vw);
}

.selectedWeiboMonitorAccountDiv {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  font-size: 0.8vw;
  width: 19vw;
  height: 6.5vw;
  cursor: pointer;
  margin: 0 1vw 1vw 0;
  transition: all ease 500ms;
  padding: 0.5vw 0 0 0.5vw;
  background-color: #13227a;
  color: #fff;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
  transform: translateY(-0.2vw);
}


.weiboMonitorAccountNickNameDiv {
  color: #13227a;
}

.summaryDiv {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  font-size: 0.9vw;
  max-width: 80vw;
  cursor: pointer;
  margin: 0 1vw 1vw 0;
  transition: all ease 500ms;
  padding: 0.7vw 1vw 0.7vw 1vw;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
  background-color: #13227a;
  color: #fff;
}

.summaryDiv:hover {
  transform: translateY(-0.2vw);
}

.event-date-input {
  height: 100%;
  width: 10vw;
  font-size: 0.7vw;
  border-radius: 2px;
  border: #eee solid 1px !important;
  padding: 0 0.2vw 0 0.5vw;
  transition: all ease 500ms;
  margin: 0 1.5vw 0 0.5vw;
}

.event-date-input:focus {
  transition: all ease 500ms;
  border: #d2d2d2 solid 1px !important;
}

.event-button-div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #13227a;
  color: #fff;
  margin: 0 0.1vw 0 0;
  transition: all ease 500ms;
  cursor: pointer;
  font-size: 0.7vw;
  padding: 0.5vw 1.2vw 0.5vw 1.2vw;
}

.event-button-div:hover {
  transition: all ease 500ms;
  box-shadow: 2px 2px 5px #888888;
}

.planResultTitleCell {
  cursor: pointer;
  transition: all ease 500ms;
  width: 100%;
  height: 100%;
}

.planResultTitleCell:hover {
  color: #13227a;
  transform: translateY(-0.2vw);
  text-shadow: 2px 2px 5px #888888;
}

.materialLibrariesItem {
  transition: all ease 500ms;
  width: 7vw;
  height: 7vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-size: 0.8vw;
  margin: 0.5vw 0.5vw 0 0;
  cursor: pointer;
}

.selectedShowMaterialLibraryModel {
  color: #fff;
  background-color: #13227a;
}

.materialLibrariesIcon {
  height: 5vw;
  position: relative;
  left: 1vw;
}

.materialLibrariesItem:hover {
  transform: translateY(-0.2vw);
}

.materialLibrariesNameInput {
  height: 100%;
  width: 10vw;
  font-size: 0.7vw;
  border-radius: 2px;
  border: #eee solid 1px !important;
  padding: 0.5vw 1.2vw 0.5vw 1.2vw;
  transition: all ease 500ms;
}

.materialLibrariesNameInput:focus {
  transition: all ease 500ms;
  border: #d2d2d2 solid 1px !important;
}

.ReportModel {
  position: fixed;
  top: -100%;
  left: 5vw;
  width: 90vw;
  opacity: 0;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 0.7vw;
  transition: all ease 500ms;
  background-color: #fff;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  z-index: 1200;
}

.showReport {
  top: 5%;
  opacity: 1;
  transition: all ease 500ms;

}

.reportNameInput {
  height: 100%;
  width: 30%;
  font-size: 0.7vw;
  border-radius: 2px;
  border: #eee solid 1px !important;
  padding: 0.5vw 1.2vw 0.5vw 1.2vw;
  transition: all ease 500ms;
  margin: 0 0 0 0.5vw;
}

.reportNameInput:focus {
  transition: all ease 500ms;
  border: #d2d2d2 solid 1px !important;
}

.templateDiv {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  font-size: 0.8vw;
  width: 12vw;
  height: 5vw;
  cursor: pointer;
  color: #13227a;
  margin: 0 1vw 1vw 0;
  transition: all ease 500ms;
  padding: 0.5vw 0.5vw 0.5vw 0.5vw;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
}

.templateDiv:hover {
  background-color: #13227a;
  color: #fff;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
  transform: translateY(-0.2vw);
}

.selectedShowTemplateModel {
  color: #fff !important;
  background-color: #13227a;
}

.warningDetailModel {
  position: fixed;
  top: -100%;
  left: 20vw;
  width: 60vw;
  opacity: 0;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 0.7vw;
  transition: all ease 500ms;
  background-color: #fff;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  z-index: 1200;
}

.showWarningDetail {
  top: 5%;
  opacity: 1;
  transition: all ease 500ms;

}

.warningListModel {
  position: fixed;
  top: -100%;
  left: 10vw;
  width: 80vw;
  opacity: 0;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 0.7vw;
  transition: all ease 500ms;
  background-color: #fff;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  z-index: 1200;
}

.showWarningList {
  top: 5%;
  opacity: 1;
  transition: all ease 500ms;

}


.warningReceiversModel {
  position: fixed;
  top: -100%;
  left: 10vw;
  width: 80vw;
  opacity: 0;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 0.7vw;
  transition: all ease 500ms;
  background-color: #fff;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  z-index: 1200;
}

.showWarningReceivers {
  top: 5%;
  opacity: 1;
  transition: all ease 500ms;

}


.layui-layer-setwin {
  height: 30px;
  width: 30px;
  top: calc(25px - 15px) !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 2vw;
}

.layui-layer-setwin a {
  margin-left: 0 !important;
}

.layui-layer-setwin:hover {
  border: #526893 2px solid;
}
</style>
<script>
/*2px 2px 5px #888;
#41d8d1 
 background-image: linear-gradient(to right,#4364f7,#359FD4,#6fb1fc);
 background-image: linear-gradient(to right,#359FD4,#36B5C8,#25D8AB)
  */
//通过this.$echarts来使用
import dayjs from 'dayjs'
import { reactive, ref, watch, defineComponent } from "vue";
import Plan from "../model/Plan";
import SensitiveWords from "../model/SensitiveKeywords";
import Warning from "../model/Warning";
import Weibo from "../model/Weibo";
import MaterialLibrary from "../model/MaterialLibrary";
import WordCloudChart from "@/components/WordCloudChart.vue";
import SensitiveChart from "@/components/SensitiveChart.vue";
import EmotionChart from "@/components/EmotionChart.vue";
import SourceChart from "@/components/SourceChart.vue";
import TotalMountChart from "@/components/TotalMountChart.vue";
import EmotionMountChart from "@/components/EmotionMountChart.vue";
import RegionChart from "@/components/RegionChart.vue";
import SourceMountChart from "@/components/SourceMountChart.vue";
import WeiboSourceChart from "@/components/WeiboSourceChart.vue";
import EventTrackChart from "@/components/EventTrack.vue";
import CommunicationChainChart from "@/components/CommunicationChainChart.vue";
import Event from "../model/Event";
import Template from "../model/Template";
import Report from "../model/Report";
import VueCookies from 'vue-cookies'

export default {
    props: {
        category: {
            type: String,
        },
        selectedPlanId: {
            type: String,
        },
    },
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
    CommunicationChainChart
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
    const communicationChainChart = ref();

 const communicationChainChartOnShow = () => {
      communicationChainChart.value.init();
    };
 const eventTrackOnShow = () => {
      eventTrackChart.value.init();
    };
    const seventTrackOnReset = () => {
      if(eventTrackChart.value != null){
      eventTrackChart.value.reset();
      }
    };
    const weiboSourceOnShow = () => {
      weiboSourceChart.value.init();
    };
    const wordCloudOnShow = () => {
      wordCloudChart.value.init();
    };
    const sensitiveOnShow = () => {
      sensitiveChart.value.load();
    };
    const sensitiveOnQuery = () => {
      sensitiveChart.value.query();
    };
    const sensitiveOnReset = () => {
      sensitiveChart.value.reset();
    };
    const emotionChartOnShow = () => {
      emotionChart.value.load();
    };
    const emotionChartOnQuery = () => {
      emotionChart.value.query();
    };
    const emotionChartOnReset = () => {
      emotionChart.value.reset();
    };
    const sourceChartOnShow = () => {
      sourceChart.value.load();
    };
    const sourceChartOnQuery = () => {
      sourceChart.value.query();
    };
    const sourceChartReset = () => {
      sourceChart.value.reset();
    };
    const totalMountChartOnShow = () => {
      totalMountChart.value.load();
    };
    const totalMountChartOnQuery = () => {
      totalMountChart.value.query();
    };
    const totalMountChartOnReset = () => {
      totalMountChart.value.reset();
    };
    const emotionMountChartOnShow = () => {
      emotionMountChart.value.load();
    };
    const emotionMountChartOnQuery = () => {
      emotionMountChart.value.query();
    };
    const emotionMountChartOnReset = () => {
      emotionMountChart.value.reset();
    };
    const regionChartOnShow = () => {
      regionChart.value.load();
    };
    const regionChartOnQuery = () => {
      regionChart.value.query();
    };
    const regionChartOnReset = () => {
      regionChart.value.reset();
    };
    const sourceMountChartOnShow = () => {
      sourceMountChart.value.load();
    };
   const sourceMountChartOnQuery = () => {
      sourceMountChart.value.query();
    };
    const sourceMountChartReset = () => {
      sourceMountChart.value.reset();
    };
    return {
      eventTrackChart,
      eventTrackOnShow,
      seventTrackOnReset,
      weiboSourceChart,
      weiboSourceOnShow,
      wordCloudChart,
      wordCloudOnShow,
      sensitiveChart,
      sensitiveOnShow,
      sensitiveOnQuery,
      sensitiveOnReset,
      emotionChart,
      emotionChartOnShow,
      emotionChartOnQuery,
      emotionChartOnReset,
      sourceChart,
      sourceChartOnShow,
      sourceChartOnQuery,
      sourceChartReset,
      totalMountChart,
      totalMountChartOnShow,
      totalMountChartOnQuery,
      totalMountChartOnReset,
      emotionMountChart,
      emotionMountChartOnShow,
      emotionMountChartOnQuery,
      emotionMountChartOnReset,
      regionChart,
      regionChartOnShow,
      regionChartOnQuery,
      regionChartOnReset,
      sourceMountChart,
      sourceMountChartOnShow,
      sourceMountChartOnQuery,
      sourceMountChartReset,
     communicationChainChart,
      communicationChainChartOnShow
    };
  },
  created() {
      this.getLatestWarningRecords();
  },
  mounted() {
    let _this = this;
    console.log('this.$router')
    console.log(this.$route.query.form)
    if(this.$route.query.form && this.$route.query.form==='dashboard'){
      let obj={
        fid:this.$route.query.key
      }
      if(this.$route.query.date){
        let date=this.$route.query.date
        this.createdStartDate=dayjs(date).format("YYYY-MM-DD")
        this.createdEndDate=dayjs(this.createdStartDate).add(1, 'day').format("YYYY-MM-DD")
      }
      if(this.$route.query.sensitive){
        this.sensitive=this.$route.query.sensitive
      }
      if(this.$route.query.emotion){
        this.emotion=this.$route.query.emotion
      }
      this.viewList(obj)
      this.showedPlanResult = true;
    }
    window.removeContact = function (index) {
      _this.removeContact(index);
    };
    element = layui.element;
    table = layui.table;
    layer = layui.layer;
    laydate = layui.laydate;
    laydate.render({
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

    /*   element.on('tab(eventTab)', function (data) {
                //    alert($(this).html());
                //    alert(data.index); //得到当前Tab的所在下标
                //   alert(data.elem); //得到当前的Tab大容器
                //   alert(this.getAttribute('lay-id'));
               selectedTab = this.getAttribute('lay-id');
                if (selectedTab == "importDataTab") {
                } 
            });*/

    this.initPlanResultTable();
    this.initContactTable();
    this.initWarningListTable();
    this.LoadData();
                this.checkLogin();

  },
  updated() {},
  data() {
    return {
      warningRecords: [],
      plans: [],
      showedAddPlan: false,
      showedPlanResult: false,
      monitor: false,
      warning: false,
      showSensitiveWordModel: false,
      showContactModel: false,
      planId: "",
      planName: "",
      priority: "",
      match: "",
      startDate: "",
      endDate: "",
      checkAll:false,
      checkboxes: [],
      selectedSensitiveWords: [],
      eventKeywords: [""],
      regionKeywords: [""],
      exceptKeywords: [""],
      sensitiveWords: [""],
      selectedPlan: "",
      selectedPlanName: "",
      selectedPlanResults: null,
      selectedPlanResultCount: null,
      limit: 10,
      planResultTable: null,
      types: [],
      words: [],
      crawlers: [],
      selectedType: null,
      WordsCaseText:'',
      showWordsCase: false,
      contacts: [],
      contactName: "",
      contanctPhone: "",
      contactTable: null,
      warningCount: "",
      warningPeecent: "",
      warningKeyword: "",
      selectedSensitives: [],
      selectedEmotions: [],
      weibo: false,
      weiboText: "",
      weiboAccounts: [],
      weiboTableSize: 0,
      weiboTablePageSize: 48,
      weiboTablePageId: 0,
      selectedWeiboAccount: [],
      selectedWeiboMonitor:[],
      weiboMonitors: [],
      event: false,
      Summary: "",
      SummarySentiments: [],
      planText: "",
      sensitive: "0",
      emotion: "",
      releaseStartDate: "",
      releaseEndDate: "",
      createdStartDate: "",
      createdEndDate: "",
      sources: [],
      selectedSources: "",
      selectedTableRows: [],
      showMaterialLibrary: "",
      materialLibraries: [],
      selectedMaterialLibrary: "",
      newMaterialLibraryName: "",  
      showReportModel: false,
      reportName: "",
      templates: [],
      selectedTemplate: "",
      showWarningDetailModel: false,
      selectedWarning: {
        programmeName: '',
        timeText: '',
        message: '',
        receivers: [],
      },
      showWarningListModel: false,
      warningList: [],
      warningListTable: null,
      warningReceiversModel: false,
      warningReceiversTable: null,
sourceCommunicationChains:[],
      user: {
        roleRights:{
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
  openSourceCommunicationChain(){
            let _this = this;
Event.SourceCommunicationChain(
                    this.selectedPlan,
                    function (data, response) {
                        console.log(data);
                        let chains = [];
let chain;;
for(let item of data){
chain = {
  name: '',
  count: 0,
  date: '',
};
for(let key in item){
if(key == "name" || item[key] == 0){
  continue;
}
if(item[key] > chain.count){
chain = {
  name: key,
count: item[key],
date: item.name
};
}

}
if(chain.count > 0){
  _this.sourceCommunicationChains.push(chain);
}
}

console.log(_this.sourceCommunicationChains);
//_this.sourceCommunicationChains = data;
                       
                    },
                    function (error) {
                        console.log(error);
                    }
                );
  },
    addReport(){
      if(this.reportName == ''){
        this.showTip("reportNameInput", "请输入简报名称！");
return;
      }
      if(this.selectedTemplate == ''){
        this.showTip("selectedTemplateLabel", "请输入模板！");
return;
      }
      layer.msg('正在生成...', {
  time: 60000 
},);
            let _this = this;
Report.Add(this.selectedPlan, this.reportName, this.selectedTemplate, this.selectedMaterialLibrary,
                function (data, response) {
                    console.log(data);
if(data.generateFile == 1){
                layer.msg('生成成功！');
                _this.hideModel();
}

                },

                _this.errorHanlder
            );
    },
    warningPeecentOnChange(){
    let value = parseInt(this.warningPeecent);
    console.log(value);
if(isNaN(value)  || value > 100){
  this.warningPeecent = "";
}
    },
    errorHanlder(error){
          console.log(error);
          if(error.message.indexOf("403") >= 0){
            this.logOut();
          }
    }, 
        logOut() {
            VueCookies.remove("user");
            window.location.href = "?page=index";//"index";
        },
        checkLogin() {
let user = VueCookies.get("user");
            if (user == null || !user.roleRights.publicOpinionMonitoring) {
                this.logOut();
            } else{
              this.user = user;
            }
        },
        initWarningReceiverTablePageBar(number) {
            let _this = this;
            page.render({
                elem: "warningReceiversTablePageBar",
                layout: [
                    //   "limit",
                    //  "limits",
                    "count",
                    "prev",
                    "page",
                    "next",
                    "skip",
                ], //自定义分页布局
                //,curr: 5 //设定初始在第 5 页
                limit: 10,
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
                        Warning.GetReceivers(obj.curr - 1, obj.limit, function (data, response) {
                            console.log(data);
                            _this.warningReceiversTable.reload({
                                data: data,
                            });
                        },
        _this.errorHanlder
                        );
                    }
                },
            });
        },
    importWarningReceiver(){      
      console.log(this.selectedTableRows);
 if (this.selectedTableRows.length == 0) {
        return;
      }
      for(let item of this.selectedTableRows){

        this.contacts.push({
        name: item.name,
        phone: item.phone,
      });
      }

      this.contactTable.reload({
        data: this.contacts,
      });

      this.hideWarningReceivers();
    },
    showWarningReceivers(){
      this.initWarningReceiversTable();
            let _this = this;
        Warning.GetReceivers(0, 10, function (data, response) {
                console.log(data);
                _this.warningReceiversTable.reload({
                    data: data.content,
                });
_this.warningReceiversModel = true;
                _this.initWarningReceiverTablePageBar(data.number);
            },
        _this.errorHanlder
            );
    },
    hideWarningReceivers(){
this.warningReceiversModel = false;
this.selectedTableRows = [];
    },
    initWarningReceiversTable() {
      if(this.warningReceiversTable == null){
            let _this = this;
      this.warningReceiversTable = table.render({
                elem: "#warningReceiversTable", //"#table" + item.fid,
                data: [],
                cols: [
                    [  {
              //    fixed: "left",
              field: "id",
              type: "checkbox",
              title: "全选",
              sort: false,
              align: "center",
              width: 60,
            },
                        {
                            field: "name",
                            title: "姓名",
                            sort: true,
                            align: "center",
                            edit: false,
                        },
                        {
                            field: "phone",
                            title: "手机",
                            sort: true,
                            align: "center",
                            edit: false,
                        },
                    ],
                ],
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log("请求对象: " + XMLHttpRequest);
                    console.log("错误类型: " + textStatus);
                    console.log("异常对象: " + errorThrown);
                },
            });
            
      table.on("checkbox(warningReceiversTable)", function (obj) {
        var checkStatus = table.checkStatus("warningReceiversTable");
        console.log(checkStatus.data); //选中行数据
        _this.selectedTableRows = checkStatus.data;
      });
      }
    },
    initWarningListTable() {
      this.warningListTable = table.render({
        elem: "#warningListTable",
        data: this.warningList,
        cols: [
          [
            { field: "id", hide: true },
            {
              title: "方案",
              sort: true,
              align: "center",
              edit: false,
              templet: function (d) {
            
                                let color = "";
                                if (d.category == "emergency") {
                                    color = "red";
                                } else if (d.category == "normal") {
                                    color = "green";
                                }
                                return (
                                    "<div style='width:100%;display: flex;flex-direction: row;align-items: center;justify-content: flex-start;'><div style='margin:0 0.5vw 0 0;width:0.3vw; height:1.2vw; background-color:" + color + ";'></div>" +
                                    d.programmeName +
                                    "</div>"
                                );
              },
            },
            {
              field: "timeText",
              title: "预警时间",
              sort: true,
              align: "center",
              edit: false,
            },
            {
              field: "message",
              title: "预警内容",
              sort: true,
              align: "left",
              edit: false,
            },
            {
              title: "预警人员",
              sort: true,
              align: "left",
              edit: false,
              templet: function (d) {
            //    console.log(d);
                let members = "";
                for(let item of d.receivers){
                  members+= item.name + "（" + item.phone +  "），";
                }
                return members;
              },
            },
          ],
        ],
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          console.log("请求对象: " + XMLHttpRequest);
          console.log("错误类型: " + textStatus);
          console.log("异常对象: " + errorThrown);
        },
      });
    },
     initWarningListPageBar(number) {
            let _this = this;
            page.render({
                elem: "warningListPageBar",
                layout: [
                    //   "limit",
                    //  "limits",
                    "count",
                    "prev",
                    "page",
                    "next",
                    "skip",
                ], //自定义分页布局
                //,curr: 5 //设定初始在第 5 页
                limit: 10,
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
                        Warning.GetRecords(obj.curr - 1, obj.limit, 
                function (data, response) {
                    console.log(data);
                    _this.warningList = data.warningRecordContent;
                     _this.warningListTable.reload({
        data: _this.warningList,
      });
                },
        _this.errorHanlder
            );
                    }
                },
            });

        },
    getWarningList(pageId, pageSize){
let _this = this;
Warning.GetRecords(pageId, pageSize, 
                function (data, response) {
                    console.log(data);
                    _this.warningList = data.warningRecordContent;
                            _this.warningListTable.reload({
        data: _this.warningList,
      });
                    _this.initWarningListPageBar(data.number);
                },
        _this.errorHanlder
            );
    },
    showWarningList(){
      this.showWarningListModel = true;
      this.getWarningList(0, 10);
    },
    showWarningDetail(item){
      this.showWarningDetailModel = true;
this.selectedWarning = item;
    },
    getLatestWarningRecords(){
let _this = this;
   Warning.GetRecords(0, 10, 
                function (data, response) {
                    console.log(data);
                    _this.warningRecords = data.warningRecordContent;
                },
        _this.errorHanlder
            );
    },
  selectedTemplateOnClick(item){
         if (this.selectedTemplate == item.id) {
        this.selectedTemplate = "";
      } else {
        this.selectedTemplate = item.id;
      }
  },
     showReport(item){
      this.selectedPlan = item.fid;

let _this = this;

      MaterialLibrary.Get(
        this.selectedPlan,
        function (data, response) {
          console.log(data);
          _this.materialLibraries = data;

           Template.GetAll(
                function (data, response) {
                    console.log(data);
                    _this.templates = data;
_this.showReportModel = true;
                },
        _this.errorHanlder
            );
        },
        _this.errorHanlder
      );
    },

    addMaterialLibrary(){
      if (this.newMaterialLibraryName == "") {
        this.showTip("newMaterialLibraryName", "请输入新素材库的名字！");
        return;
      }
      let _this = this;
         MaterialLibrary.AddLibrary(
        this.selectedPlan,
        this.newMaterialLibraryName,
        function (data, response) {
          console.log(data);
          if(data.addMaterialLib == 1){
_this.materialLibraries.push({
  materialLibName: _this.newMaterialLibraryName,
  id: data.newId,
  number: 0
});

      _this.newMaterialLibraryName = "";
      }
        },
        _this.errorHanlder
      );
    },
    deleteMaterialLibrary(){
      if (this.selectedMaterialLibrary == "") {
        this.showTip("materialLibrariesDiv", "请选择所要删除的素材库！");
        return;
      }
 let _this = this;

    layer.confirm('是否确定删除该素材库？', 
      {icon: 3, title:'请确认'}, function(index){
  //do something
  
       MaterialLibrary.DeleteLibrary(
        _this.selectedMaterialLibrary,
        function (data, response) {
          console.log(data);

          if(data.deleteMaterialLib == 1){
            for(let i = 0; i < _this.materialLibraries.length; i ++){
if(_this.materialLibraries[i].id == _this.selectedMaterialLibrary){
  _this.materialLibraries.splice(i, 1);
        _this.selectedMaterialLibrary = "";
  break;
}
            }
          }
        },
        _this.errorHanlder
      );

  layer.close(index);
});


    
    },
    addMaterials() {
      if (this.selectedMaterialLibrary == "") {
        this.showTip("materialLibrariesDiv", "请选择所要保存的素材库！");
        return;
      }
      let _this = this;

      let materials = [];
          for(let item of this.selectedTableRows){
        materials.push(item.id);
      }


      MaterialLibrary.Add(
        this.selectedMaterialLibrary,
        materials,
        function (data, response) {
          console.log(data);
          _this.hideSelectMaterialLibrary();
        },
        _this.errorHanlder
      );
    },
    selectedMaterialLibraryOnClick(item) {
      if (this.selectedMaterialLibrary == item.id) {
        this.selectedMaterialLibrary = "";
      } else {
        this.selectedMaterialLibrary = item.id;
      }
    },
    selectMaterialLibrary() {
      if (this.selectedTableRows.length == 0) {
        this.showTip("planResultTable", "请选择所要添加的舆情素材！");
        return;
      }
      let _this = this;

      MaterialLibrary.Get(
        this.selectedPlan,
        function (data, response) {
          console.log(data);

          _this.materialLibraries = data;
          _this.showMaterialLibrary = true;
        },
        _this.errorHanlderresetDate
      );
    },
    resetDate(category) {
      this.startDate = "";
      this.endDate = "";
      console.log(category);
      if (category == "SensitiveChart") {
        this.sensitiveOnReset();
      } else if (category == "RegionChart") {
        this.regionChartOnReset();
      } else if (category == "SourceChart") {
        this.sourceChartReset();
      } else if (category == "TotalMountChart") {
        this.totalMountChartOnReset();
      } else if (category == "EmotionChart") {
        this.emotionChartOnReset();
      } else if (category == "EmotionMountChart") {
        this.emotionMountChartOnReset();
      } else if (category == "SourceMountChart") {
        this.sourceMountChartReset();
      }
    },
    getSummaries() {
      if (this.Summary != "") {
        return;
      }
      let _this = this;
      Event.Summary(
        this.selectedPlan,
        function (data, response) {
          console.log(data);
          _this.Summary = data.text;

          Event.GetExtracs(
            _this.selectedPlan,
            function (data, response) {
              console.log(data);
              _this.SummarySentiments = data.yuQingContent;
            },
        _this.errorHanlder
          );
        },
        _this.errorHanlder
      );
    },
    showEvent(item) {
      this.selectedPlan = item.fid;
      this.selectedPlanName = item.programmeName;
      this.event = true;
      
    },
    getWeiBoAccunts() {
      let _this = this;
      Weibo.Get(
        this.selectedPlan,
        function (data, response) {
          console.log(data);
          _this.weiboMonitors = data;
        },
        _this.errorHanlder
      );
    },
    refreshWeiboMonitors(uri){
for(let i = 0; i <  this.weiboMonitors.length; i ++){
  if(this.weiboMonitors[i].uri == uri){
          this.weiboMonitors.splice(i, 1);
    break;
  }
}
    },
    removeWeiboMonitor(){
   let _this = this;
      if (this.selectedWeiboMonitor.length == 0) {
        return;
      }
      Weibo.Delete(
        this.selectedPlan,
        this.selectedWeiboMonitor[0].uri,
        function (data, response) {
          console.log(data);
          if(data.deleteMonitoringWeiboUser == 1){
          _this.refreshWeiboMonitors(_this.selectedWeiboMonitor[0].uri);
          _this.selectedWeiboMonitor.splice(0, 1);
          if (_this.selectedWeiboMonitor.length > 0) {
            _this.removeWeiboMonitor();
          } 
          }
        },
        _this.errorHanlder
      );
    },
    selectedWeiboMonitorOnClick(item) {
      console.log(item);
      for (let i = 0; i < this.selectedWeiboMonitor.length; i++) {
        if (this.selectedWeiboMonitor[i].uri == item.uri) {
          this.selectedWeiboMonitor.splice(i, 1);
          return;
        }
      }
      this.selectedWeiboMonitor.push(item);
    },
    findSelecteddWeiboMonitor(item) {
      for (let account of this.selectedWeiboMonitor) {
        if (item.uri == account.uri) {
          return true;
        }
      }
      return false;
    },
    importWeiboAccount() {
      let _this = this;
      if (this.selectedWeiboAccount.length == 0) {
        _this.weiboText = "";
        _this.weiboAccounts = [];
        _this.weiboTableSize = 0;
        _this.weiboTablePageId = 0;
        _this.selectedWeiboAccount = [];
        return;
      }
      Weibo.Add(
        this.selectedPlan,
        this.selectedWeiboAccount[0].uri,
        this.selectedWeiboAccount[0].nickname,
        function (data, response) {
          console.log(data);
          _this.selectedWeiboAccount.splice(0, 1);
          console.log(_this.selectedWeiboAccount);
          if (_this.selectedWeiboAccount.length > 0) {
            _this.importWeiboAccount();
          } else {
            _this.weiboText = "";
            _this.weiboAccounts = [];
            _this.weiboTableSize = 0;
            _this.weiboTablePageId = 0;
            _this.selectedWeiboAccount = [];
            _this.getWeiBoAccunts();
          }
        },
        _this.errorHanlder
      );
    },
    findSelecteddWeiboAccount(item) {
      for (let account of this.selectedWeiboAccount) {
        if (item.id == account.id) {
          return true;
        }
      }
      return false;
    },
    selectedWeiboAccountOnClick(item) {
      console.log(item);
      for (let i = 0; i < this.selectedWeiboAccount.length; i++) {
        if (this.selectedWeiboAccount[i].id == item.id) {
          this.selectedWeiboAccount.splice(i, 1);
          return;
        }
      }
      this.selectedWeiboAccount.push(item);
    },
    searchWeibo() {
      this.selectedWeiboAccount = [];
      let _this = this;
      Weibo.Search(
        this.selectedPlan,
        this.weiboText,
        this.weiboTablePageId,
        this.weiboTablePageSize,
        function (data, response) {
          console.log(data);
          _this.weiboAccounts = data.weiboUserContent;
          _this.weiboTableSize = data.number;

          _this.initWeiboTablePage(data.number);
        },
        _this.errorHanlder
      );
    },
    initWeiboTablePage(number) {
      let _this = this;
      page.render({
        elem: "weiboTablePageBar",
        layout: [
          //   "limit",
          //  "limits",
          "count",
          "prev",
          "page",
          "next",
          "skip",
        ], //自定义分页布局
        //,curr: 5 //设定初始在第 5 页
        limit: this.weiboTablePageSize,
        groups: 10, //只显示 10 个连续页码
        count: number, //数据总数，从服务端得到
        //    limits: [10, 50, 100, 200, 300], //数据总数，从服务端得到
        theme: "#13227a",
        jump: function (obj, first) {
          //obj包含了当前分页的所有参数，比如：
          //  alert(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
          //    alert(obj.limit); //得到每页显示的条数

          //首次不执行

          if (first) {
          } else {
            Weibo.Search(
              _this.selectedPlan,
              _this.weiboText,
              obj.curr - 1,
              _this.weiboTablePageSize,
              function (data, response) {
                console.log(data);
                _this.weiboAccounts = data.weiboUserContent;
                _this.selectedWeiboAccount = [];
              },
        _this.errorHanlder
            );
          }
        },
      });
    },
    showWeibo(item) {
      this.selectedPlan = item.fid;
      this.weibo = true;
      this.getWeiBoAccunts();
    },
    initContactTable() {
      this.contactTable = table.render({
        elem: "#warningUserTable",
        data: this.contacts,
        cols: [
          [
            { field: "id", hide: true },
            {
              field: "name",
              title: "姓名",
              sort: true,
              align: "center",
              edit: false,
            },
            {
              field: "phone",
              title: "手机号",
              sort: true,
              align: "center",
              edit: false,
            },
            {
              title: "操作",
              fixed: "right",
              sort: false,
              align: "center",
              width: 200,
              templet: function (d) {
                console.log(d);
                return (
                  '<a class="layui-btn layui-btn-primary layui-btn-xs table-button-div"  lay-event="remove" onclick="removeContact(' +
                  d.LAY_INDEX +
                  ')">移除</a>'
                );
              },
            },
          ],
        ],
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          console.log("请求对象: " + XMLHttpRequest);
          console.log("错误类型: " + textStatus);
          console.log("异常对象: " + errorThrown);
        },
      });
    },
    SelectedEmotionsOnClick(event) {
      console.log(event.target.dataset.value);
      if (this.selectedEmotions.indexOf(event.target.dataset.value) >= 0) {
        this.selectedEmotions.splice(
          this.selectedEmotions.indexOf(event.target.dataset.value),
          1
        );
      } else {
        this.selectedEmotions.push(event.target.dataset.value);
      }
    },
    SelectedSensitivesOnClick(event) {
      console.log(event.target.dataset.value);
      if (this.selectedSensitives.indexOf(event.target.dataset.value) >= 0) {
        this.selectedSensitives.splice(
          this.selectedSensitives.indexOf(event.target.dataset.value),
          1
        );
      } else {
        this.selectedSensitives.push(event.target.dataset.value);
      }
    },
    addContact() {
      this.contacts.push({
        name: this.contactName,
        phone: this.contanctPhone,
      });

      this.contactTable.reload({
        data: this.contacts,
      });

      console.log(this.contacts);

      this.contactName = "";
      this.contanctPhone = "";
      this.hideModel();
    },
    removeContact(index) {
      //   console.log(index);
      this.contacts.splice(index - 1, 1);
      //   console.log(this.contacts);
      this.contactTable.reload({
        data: this.contacts,
      });
    },
    ShowContact() {
      this.showContactModel = true;
    },
    saveWarning() {
      if (this.warningKeyword == "") {
        this.showTip("warningKeywordInput", "请输入预警关键字！");
        return;
      }

      if (
        this.selectedSensitives.indexOf("2") < 0 &&
        this.selectedSensitives.indexOf("3") < 0 &&
        this.selectedSensitives.indexOf("4") < 0 &&
        this.selectedSensitives.indexOf("5") < 0 &&
        this.selectedSensitives.indexOf("6") < 0
      ) {
        this.showTip("sensitiveDiv", "请进行情感属性设置！");
        return;
      }

      if (
        this.selectedEmotions.indexOf("fear") < 0 &&
        this.selectedEmotions.indexOf("surprise") < 0 &&
        this.selectedEmotions.indexOf("sad") < 0 &&
        this.selectedEmotions.indexOf("neutral") < 0 &&
        this.selectedEmotions.indexOf("happy") < 0 &&
        this.selectedEmotions.indexOf("angry") < 0
      ) {
        this.showTip("emotionDiv", "请进行情感属性设置！");
        return;
      }

      if (this.match == "") {
        this.showTip("matchRadio2", "请选择匹配方式！");
        return;
      }

      if (
        this.checkboxes.indexOf("warningCount") < 0 &&
        this.checkboxes.indexOf("warningPeecent") < 0
      ) {
        this.showTip("yuzhiDiv", "请进行阈值设置！");
        return;
      }

      if (
        this.checkboxes.indexOf("warningCount") >= 0 &&
        this.warningCount == ""
      ) {
        this.showTip("warningCountInput", "请输入信息条数！");
        return;
      }

      if (
        this.checkboxes.indexOf("warningPeecent") >= 0 &&
        this.warningPeecent == ""
      ) {
        this.showTip("warningPeecentInput", "请输入条数所占百分比！");
        return;
      }

      // if (this.contacts.length == 0) {
      //   this.showTip("warningUserTable", "请添加预警人员！");
      //   return;
      // }

      let newContacts = [];

      for (let item of this.contacts) {
        newContacts.push({
          name: item.name,
          phone: item.phone,
        });
      }
      console.log(newContacts);

      let _this = this;
      let enabledwarningCount =  this.checkboxes.indexOf("warningCount") >= 0;
      let enabledwarningPeecent =  this.checkboxes.indexOf("warningPeecent") >= 0;

      let warningCount =  0;
      let warningPeecent =  0;

      if(enabledwarningCount){
warningCount =  parseInt(this.warningCount);
if(isNaN(warningCount)){
warningCount =  0;
}
      }
      if(enabledwarningPeecent){
        warningPeecent =  parseInt(this.warningPeecent);
        if(isNaN(warningPeecent)){
warningPeecent =  0;
}
      }
      Warning.Save(
        this.planId,
        [this.warningKeyword],
        this.selectedSensitives,
        this.selectedEmotions,
        this.match,
        warningCount,
        enabledwarningCount,
        warningPeecent,
        enabledwarningPeecent,
        newContacts,
        function (data, response) {
          console.log(data);
          if (data.saveEarlyWarningByFid)
            //_this.SaveContact();
            _this.hideModel();
        },
        _this.errorHanlder
      );
    } /*
    getContacts() {
      let _this = this;
      Warning.GetContacts(
        this.planId,
        function (data, response) {
          console.log(data);
          _this.contacts = data;
          _this.contactTable.reload({
            data: _this.contacts,
          });
          _this.warning = true;
        },
        _this.errorHanlder
      );
    },*/,
    showWarning(item) {
      this.planId = item.fid;
      let _this = this;
      Warning.Get(
        this.planId,
        function (data, response) {
          console.log(data);

          let keywords = JSON.parse(data.keywords.replace(/\'/g, '"'));
          if (keywords.length > 0) {
            _this.warningKeyword = keywords[0];
          }
          _this.selectedSensitives = JSON.parse(
            data.sensitiveType.replace(/\'/g, '"')
          );
          _this.selectedEmotions = JSON.parse(data.emotion.replace(/\'/g, '"'));
          _this.match = data.matchType;
          if (data.thresholdNumSwitch) {
            _this.checkboxes.push("warningCount");
          }
          if (data.thresholdPercentageSwitch) {
            _this.checkboxes.push("warningPeecent");
          }
          if (data.thresholdNum > -1)
            _this.warningCount = data.thresholdNum.toString();
          if (data.thresholdPercentage > -1)
            _this.warningPeecent = data.thresholdPercentage.toString();

          _this.contacts = data.warningReceiverList;
          _this.contactTable.reload({
            data: _this.contacts,
          });

          _this.warning = true;
          //   _this.getContacts();
        },
        _this.errorHanlder
      );
    },
    ImportSensitiveWordsClick() {
      let newWords = "";
      for (let item of this.selectedSensitiveWords) {
        newWords += item + " ";
      }

      this.sensitiveWords.push(newWords);
      this.selectedSensitiveWords = [];
      this.hideModel();
    },
    SensitiveWordsClick(id) {
      if (this.selectedSensitiveWords.indexOf(id) >= 0) {
        this.selectedSensitiveWords.splice(
          this.selectedSensitiveWords.indexOf(id),
          1
        );
      } else {
        this.selectedSensitiveWords.push(id);
      }
    },
    openSensitiveKeywordsModelOnClick() {
     /* this.showWordsCase = false;
      this.words = [];
      this.WordsCaseText = '';*/
      this.showSensitiveWordModel = true;
      if (this.types.length == 0) {
        this.GetTypes();
      } else{
      //  this.changeType(this.types[0]);
      }
    },
    changeType(type) {
      this.showWordsCase = type == null;
      this.selectedType = type;
        this.words = [];
      if(!this.showWordsCase){
      this.GetKeywords(type.id);
      } 
    },
    analyseWordsCase(){
 let _this = this;
      SensitiveWords.AnalysisCase(this.WordsCaseText,
        function (data, response) {
          console.log(data);
          _this.words = [];
          for(let item of data){
_this.words.push({
  text: item
});
          }
        },
        _this.errorHanlder
      );
    },
    GetTypes() {
      let _this = this;
      SensitiveWords.GetTypes(
        function (data, response) {
          console.log(data);
          _this.types = data;
          _this.selectedType = data[0];
          _this.GetKeywords(data[0].id);
        },
        _this.errorHanlder
      );
    },
    GetKeywords(id) {
      console.log(id);
      let _this = this;
      SensitiveWords.GetWords(
        id,
        function (data, response) {
          console.log(data);
          _this.words = data;
        },
        _this.errorHanlder
      );
    },
    importSensitiveWord() {
      this.showSensitiveWordModel = false;
    },
    deletePlan(item) {
      let _this = this;
      layer.confirm('是否确定删除方案：' + item.programmeName , 
      { title:'请确认'}, function(index){
  //do something
  
      Plan.Delete(
        item.fid,
        function (data, response) {
          console.log(data);
          _this.LoadData();
        },
        _this.errorHanlder
      );
  layer.close(index);
});


    },
    saveMonitor() {
      let _this = this;
      console.log(this.checkboxes);
      Plan.SaveMoniterCrawlers(
        this.selectedPlan,
        this.checkboxes,
        function (data, response) {
          console.log(data);
          _this.hideModel();
        },
        _this.errorHanlder
      );
    },
    showMonitor(item) {
      this.selectedPlan = item.fid;

      let _this = this;
      // this.checkboxes=[];
      if (this.crawlers.length == 0) {
        Plan.GetCrawlers(
          function (data, response) {
            console.log(data);
            _this.crawlers = data;

            Plan.GetMoniterCrawlers(
              _this.selectedPlan,
              function (data, response) {
                console.log(data);
                for (let item of data) {
                  _this.checkboxes.push(item.websiteId);
                }
                _this.checkAll=(_this.crawlers.length==_this.checkboxes.length);
                _this.monitor = true;
              },
        _this.errorHanlder
            );
          },
        _this.errorHanlder
        );
      } else {
        Plan.GetMoniterCrawlers(
          _this.selectedPlan,
          function (data, response) {
            console.log(data);
            for (let item of data) {
              _this.checkboxes.push(item.websiteId);
            }
            _this.checkAll=(_this.crawlers.length==_this.checkboxes.length);
            _this.monitor = true;
          },
        _this.errorHanlder
        );
      }
    },
    initPlanResultTable() {
      let _this = this;

      _this.planResultTable = table.render({
        elem: "#planResultTable", //"#table" + item.fid,
        data: [],
        cols: [
          [
            {
              //    fixed: "left",
              field: "id",
              type: "checkbox",
              title: "全选",
              sort: false,
              align: "center",
              width: 60,
            },
            { field: "webpageUrl", hide: true },
            {
              //  field: "title",
              title: "标题",
              sort: true,
              align: "left",
              edit: false,
              width: 200,
              templet: function (d) {
                //   console.log(d);
                let title = d.title; 
                   let noduplicatedKeys = [];

                for (let word of _this.eventKeywords) {
                //   console.log(item);

                   let keys = word.split(/\s+/);
let duplicated = false;
                for (let key of keys) {
                  duplicated = false;
                  for (let item of noduplicatedKeys) {
if(item == key)
duplicated = true;
break;
}
if(!duplicated){
  noduplicatedKeys.push(key);
}
                }
              }

                for (let key of noduplicatedKeys) {
                  if (title.indexOf(key) >= 0) {
                    title = title.replaceAll(
                      key,
                      "<span style='color:red;'>" + key + "</span>"
                    );
                  }
                }
                if (
                  _this.planText != "" &&
                  title.indexOf(_this.planText) >= 0
                ) {
                  title = title.replaceAll(
                    _this.planText,
                    "<span style='color:orange; font-weight:600;'>" +
                      _this.planText +
                      "</span>"
                  );
                }
                //layer.tips(\"点击可访问来源网站\", \"#title" + d.id + "\", {tips: [1],  time: 1000 })
                return (
                  "<div id='title" +
                  d.id +
                  "' onmouseover='' class='planResultTitleCell' Target='_BLANK' onclick='window.open(\"" +
                  d.webpageUrl +
                  "\");'>" +
                  title +
                  "</div>"
                );
              },
            },
            {
              // field: "content",
              title: "内容",
              sort: true,
              align: "left",
              edit: false,
              templet: function (d) {
                //  console.log(d);
                let content = d.content;

                
                if(content == "" ){
                  content = "（视频内容）";
                }{
                   let noduplicatedKeys = [];

                   for (let word of _this.eventKeywords) {
                //   console.log(item);

                   let keys = word.split(/\s+/);
let duplicated = false;
                for (let key of keys) {
                  duplicated = false;
                  for (let item of noduplicatedKeys) {
if(item == key)
duplicated = true;
break;
}
if(!duplicated){
  noduplicatedKeys.push(key);
}
                }
              }
                //   let title = '';


                for (let key of noduplicatedKeys) {

               /*    let start = content.indexOf("key");
                  title = content.substring(0, start) + "<span style='color:red;'>" + key + "</span>";
*/


                 if (content.indexOf(key) >= 0) {
                    content = content.replaceAll(
                      key,
                      "<span style='color:red;'>" + key + "</span>"
                    );
                  }
                }
                if (
                  _this.planText != "" &&
                  content.indexOf(_this.planText) >= 0
                ) {
                  content = content.replaceAll(
                    _this.planText,
                    "<span style='color:orange; font-weight:600;'>" +
                      _this.planText +
                      "</span>"
                  );
                }
              }
                return (
                  "<div id='content" +
                  d.id +
                  "'  class='planResultTitleCell' Target='_BLANK' onclick='window.open(\"" +
                  d.webpageUrl +
                  "\");'>" +
                  content +
                  "</div>"
                );
              },
            },
            {
              field: "resource",
              title: "来源",
              sort: true,
              align: "center",
              edit: false,
              width: 130,
            },
            {
              //  field: "emotion",
              title: "情感",
              sort: true,
              align: "center",
              edit: false,
              width: 70,
              templet: function (d) {
                //  console.log(d);
                if (d.emotion == "angry") {
                  return "愤怒";
                } else if (d.emotion == "fear") {
                  return "恐惧";
                } else if (d.emotion == "surprise") {
                  return "震惊";
                } else if (d.emotion == "sad") {
                  return "悲伤";
                } else if (d.emotion == "neutral") {
                  return "中立";
                } else if (d.emotion == "happy") {
                  return "积极";
                }
              },
            },
            {
              field: "sensitiveType",
              title: "敏感度",
              sort: true,
              align: "center",
              edit: false,
              width: 60,
            },
            {
              field: "tag",
              title: "分类",
              sort: true,
              align: "center",
              edit: false,
              width: 60,
            },
            {
              field: "commentAmount",
              title: "评论数",
              sort: true,
              align: "center",
              edit: false,
              width: 80,
            },
            {
              field: "likesAmount",
              title: "点赞数",
              sort: true,
              align: "center",
              edit: false,
              width: 80,
            },
            {
              field: "publishedDayText",
              title: "发布时间",
              sort: true,
              align: "center",
              edit: false,
              width: 100,
            },
            {
              field: "captureTimeText",
              title: "采集时间",
              sort: true,
              align: "center",
              edit: false,
              width: 100,
            },
          ],
        ],
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          console.log("请求对象: " + XMLHttpRequest);
          console.log("错误类型: " + textStatus);
          console.log("异常对象: " + errorThrown);
        },
      });
      table.on("checkbox(planResultTable)", function (obj) {
        var checkStatus = table.checkStatus("planResultTable");
        console.log(checkStatus.data); //选中行数据
        _this.selectedTableRows = checkStatus.data;
      });
    },
    planResultReset() {
      this.planText = "";
      this.sensitive = "0";
      this.emotion = "";
      this.releaseStartDate = "";
      this.releaseEndDate = "";
      this.createdStartDate = "";
      this.createdEndDate = "";
      this.selectedSources = "";
      this.planResultQuery();
    },
    planResultQuery() {
      let _this = this;
      console.log(this.releaseStartDate);
      console.log(this.releaseEndDate);
      console.log(this.selectedPlan);
      console.log(this.planText);
      Plan.GetPlanResults(
        this.selectedPlan,
        this.planText,
        this.sensitive,
        this.emotion,
        this.releaseStartDate + " 00:00:00",
        this.releaseEndDate + " 00:00:00",
        this.createdStartDate + " 00:00:00",
        this.createdEndDate + " 00:00:00",
        this.selectedSources,
        0,
        100,
        0,
        function (data, response) {
          console.log(data);
          console.log(data.yuQingContent);
          _this.selectedPlanResults = data.yuQingContent;
          _this.selectedPlanResultCount = data.hitNumber; 

          _this.planResultTable.reload({
            data: data.yuQingContent,
            limit: 10,
          });

          page.render({
            elem: "tablePageBar",
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
            groups: 10, //只显示 10 个连续页码
            count: data.hitNumber, //数据总数，从服务端得到
            limits: [10, 50, 100, 200, 300], //数据总数，从服务端得到
            theme: "#46A1F0",
            jump: function (obj, first) {
              //obj包含了当前分页的所有参数，比如：
              //  alert(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
              //    alert(obj.limit); //得到每页显示的条数

              //首次不执行
              console.log(obj.limit);
              console.log(obj.curr);
              _this.limit = obj.limit;

              if (first) {
              } else {
                Plan.GetPlanResults(
                  _this.selectedPlan,
                  _this.planText,
                  _this.sensitive,
                  _this.emotion,
                  _this.releaseStartDate + " 00:00:00",
                  _this.releaseEndDate + " 00:00:00",
                  _this.createdStartDate + " 00:00:00",
                  _this.createdEndDate + " 00:00:00",
                  _this.selectedSources,
                  obj.curr - 1,
                  obj.limit,
                  0,
                  function (data, response) {
                    console.log(data);
                    console.log(data.yuQingContent);
                    _this.selectedPlanResults = data.yuQingContent;
                    _this.selectedPlanResultCount = data.hitNumber;

                    _this.planResultTable.reload({
                      data: data.yuQingContent,
                      limit: obj.limit,
                    });
                  },
        _this.errorHanlder
                );
              }
            },
          });
          _this.showedPlanResult = true;
        },
        _this.errorHanlder
      );
    },
    viewList(item) {
      let _this = this;
      // console.log(item);
      if(item.fid){
        this.selectedPlan = item.fid;
      }
      if(item.eventKeyword){
        this.eventKeywords = JSON.parse(item.eventKeyword.replace(/\'/g, '"'));
      }
      
      if (this.sources.length > 0) {
        this.planResultQuery();
      } else {
        Plan.GetSources(
          function (data, response) {
            console.log(data);
            _this.sources = data;
            _this.planResultQuery();
          },
        _this.errorHanlder
        );
      }
    },
    viewDetail(item) {
      
      this.planId = item.fid;
      this.planName = item.programmeName;
      this.startDate = item.startDate.substring(0, 10);
      this.endDate = item.endDate.substring(0, 10);
      this.match = item.matchType.toString();
      this.priority = item.priority.toString();
      this.eventKeywords = JSON.parse(item.eventKeyword.replace(/\'/g, '"'));
      this.regionKeywords = JSON.parse(item.regionKeyword.replace(/\'/g, '"'));
      this.sensitiveWords = JSON.parse(item.sensitiveword.replace(/\'/g, '"'));
      this.exceptKeywords = JSON.parse(item.exceptKeyword.replace(/\'/g, '"'));

      if (item.notifiedWhenCompleted) {
        this.checkboxes.push("notifyWhenComplete");
      }
      if (item.category == "emergency") {
        this.checkboxes.push("criticalPlan");
      }
      this.addPlan();
     
    },
    showTip(id, tip) {
      layer.tips("<div class='model-tip-div'>" + tip + "</div>", "#" + id, {
        tips: [1, "#13227a"],
      });
    },
    save() {
      if (this.planName == "") {
        this.showTip("planNameInput", "请输入方案！");
        return;
      }
      if (this.startDate == "") {
        this.showTip("startDateInput", "请输选择始时间！");
        return;
      }
      if (this.endDate == "") {
        this.showTip("endDateInput", "请选择结束！");
        return;
      }
      if (this.priority == "") {
        this.showTip("priorityRadio", "请选择紧急程度！");
        return;
      }
      if (this.match == "") {
        this.showTip("matchRadio", "请选择匹配方式！");
        return;
      }

      let encodedEventKeywords = [];
      for (let item of this.eventKeywords) {
        if (item == "") {
          encodedEventKeywords = [];
          break;
        }
        encodedEventKeywords.push((item));
      }
      if (encodedEventKeywords.length == 0) {
        this.showTip("eventKeywordInput", "请输入事件关键字！");
        return;
      }

      let category = "normal";
      if (this.checkboxes.indexOf("criticalPlan") >= 0) {
        category = "emergency";
      }
      let notifyWhenComplete =
        this.checkboxes.indexOf("notifyWhenComplete") >= 0;

      let encodedSensitiveWords = [];
      for (let item of this.sensitiveWords) {
        if(item != "")
        encodedSensitiveWords.push((item));
      }
      let encodedExceptKeywords = [];
      for (let item of this.exceptKeywords) {
        if(item != "")
        encodedExceptKeywords.push((item));
      }
      let encodedRegionKeywords = [];
      for (let item of this.regionKeywords) {
        if(item != "")
        encodedRegionKeywords.push((item));
      }
      let _this = this;
      Plan.Save(
        this.planId,
        "1111",
        this.planName,
        this.match,
        encodedRegionKeywords,
        [],
        encodedEventKeywords,
        encodedSensitiveWords,
        this.priority,
        category,
        this.startDate + " 00:00:00",
        this.endDate + " 00:00:00",
        notifyWhenComplete,
        encodedExceptKeywords,
        function (data, response) {
          _this.LoadData();
          _this.hideModel();
        },
        _this.errorHanlder
      );
    },
    startDateOnChange(event) {
      console.log(event);
      this.startDate = event.target.value;
    },
    endDateOnChange(event) {
      console.log(event);
      this.endDate = event.target.value;
    },
    reset() {
      this.plans=[];
      this.planId = "";
      this.planName = "";
      this.startDate = "";
      this.endDate = "";
      this.match = "";
      this.priority = "";
      this.regionKeywords = [""];
      this.eventKeywords = [""];
      this.sensitiveWords = [""];
      this.checkboxes = [];
      this.exceptKeywords = [""];
    },
    deleteSensitiveKeywordsOnClick(index) {
      this.sensitiveWords.splice(index, 1);
    },
    sensitiveKeywordsOnChange(event, index) {
      console.log(event.target.value);

      this.sensitiveWords[index] = (event.target.value);
    },
    addSensitiveKeywordsOnClick() {
      this.sensitiveWords.push("");
    },
    deleteExceptKeywordsOnClick(index) {
      this.exceptKeywords.splice(index, 1);
    },
    exceptKeywordsOnChange(event, index) {
      console.log(event.target.value);
      this.exceptKeywords[index] = (event.target.value);
    },
    addExceptKeywordsOnClick() {
      this.exceptKeywords.push("");
    },
    deleteRegionKeywordsOnClick(index) {
      this.regionKeywords.splice(index, 1);
    },
    regionKeywordsOnChange(event, index) {
      console.log(event.target.value);
      this.regionKeywords[index] = (event.target.value);
    },
    addRegionKeywordsOnClick() {
      this.regionKeywords.push("");
    },
    deleteEventKeyWordOnClick(index) {
      this.eventKeywords.splice(index, 1);
    },
    eventKeywordOnChange(event, index) {
      console.log(event.target.value);
      this.eventKeywords[index] = (event.target.value);
    },
    addEventKeywordOnClick() {
      this.eventKeywords.push("");
    },
    matchOnClick(event) {
      this.match = event.target.dataset.value;
    },
    selectedSensitiveOnClick(event) {
      this.sensitive = event.target.dataset.value;
    },
    selectedEmotionOnClick(event) {
      this.emotion = event.target.dataset.value;
    },
    selectedSourceOnClick(value) {
      console.log(value);
      this.selectedSources = value;
    },
    priorityOnClick(event) {
      this.priority = event.target.dataset.value;
    },
    CheckAllBoxOnClick(event){
      console.log(this.crawlers);
      for (let index = 0; index < this.crawlers.length; index++) {
        const element = this.crawlers[index];
        if (this.checkboxes.indexOf(element.id) >= 0) {
        this.checkboxes.splice(
          this.checkboxes.indexOf(element.id),
          1
        );
      } else {
        this.checkboxes.push(element.id);
      }
      }
      this.checkAll=(this.crawlers.length==this.checkboxes.length);
      console.log(event.target.dataset.value);
      console.log(event.target);
    },
    CheckBoxOnChange(){
      this.checkAll=(this.crawlers.length==this.checkboxes.length);
    },
    CheckBoxOnClick(event) {
      console.log(event.target.dataset.value);
      if (this.checkboxes.indexOf(event.target.dataset.value) >= 0) {
        this.checkboxes.splice(
          this.checkboxes.indexOf(event.target.dataset.value),
          1
        );
      } else {
        this.checkboxes.push(event.target.dataset.value);
      }
      this.checkAll=(this.crawlers.length==this.checkboxes.length);
    },
    LoadData() {
      this.GetPlans();
    },
    GetPlans() {
      var index = layer.load(0, {shade: false});
      let _this = this;
      Plan.Get(
        1,
        100,
        "1111",
        function (data, response) {
          console.log(data);
          console.log(data.fangAnContent);
          _this.plans = data.fangAnContent;
          layer.close(index); // 关闭 loading
          if(_this.category != '' && _this.category != null){
            
              for(let item of data.fangAnContent){
                if(item.fid == _this.selectedPlanId){
                  _this.showEvent(item);
                    element.tabChange("eventTab", _this.category + "Tab");
                  setTimeout(() => {
                      if(_this.category == "sensitive"){
                        _this.sensitiveOnShow();
                      } else if(_this.category == "region"){
                        _this.regionChartOnShow();
                      } else if(_this.category == "source"){
                        _this.sourceChartOnShow();
                      } else if(_this.category == "emotion"){
                        _this.emotionChartOnShow();
                      } else if(_this.category == "totalmount"){
                        _this.totalMountChartOnShow();
                      } else if(_this.category == "sourcemount"){
                        _this.sourceMountChartOnShow();
                      } else if(_this.category == "emotionmount"){
                        _this.emotionMountChartOnShow();
                      } else if(_this.category == "weibosource"){
                        _this.weiboSourceOnShow();
                      } else if(_this.category == "eventtrack"){
                        _this.eventTrackOnShow();
                      }

                   }, 500);
                break;
                }
              }

                }
        },
        
        _this.errorHanlder
      );
    },
    addPlan() {
      this.showedAddPlan = true;
    },
    hideSelectMaterialLibrary() {
      this.materialLibraries = [];
      this.showMaterialLibrary = false;
      this.selectedMaterialLibrary = "";
      this.newMaterialLibraryName = "";
    },
    hideModel() {
      this.seventTrackOnReset();
      if (this.showContactModel) {
        this.contactName = "";
        this.contanctPhone = "";
        this.showContactModel = false;
        return;
      }
      this.match = "";
      this.checkboxes = [];
      if (this.showSensitiveWordModel) {
        this.showSensitiveWordModel = false;
        return;
      }
      if (this.showedAddPlan) {
        this.reset();
        this.showedAddPlan = false;
      } else if (this.showedPlanResult) {
        this.planText = "";
        this.sensitive = "0";
        this.emotion = "";
        this.releaseStartDate = "";
        this.releaseEndDate = "";
        this.createdStartDate = "";
        this.createdEndDate = "";
        this.selectedSources = "";
        this.eventKeywords = [""];
        this.selectedTableRows = [];
        this.showedPlanResult = false;
        this.hideSelectMaterialLibrary();
      } else if (this.monitor) {
        this.monitor = false;
      } else if (this.warning) {
        this.selectedSensitives = [];
        this.selectedEmotions = [];
        this.warningKeyword = "";
        this.match = "";
        this.warningCount = "";
        this.warningPeecent = "";
        this.warning = false;
      } else if (this.weibo) {
        this.weiboText = "";
        this.weiboAccounts = [];
        this.weiboTableSize = 0;
        this.weiboTablePageId = 0;
        this.selectedWeiboAccount = [];
        this.selectedWeiboMonitor = [];
        this.weibo = false;
      } else if (this.event) {
        element.tabChange("eventTab", "defaultTab");
        this.resetDate();
        this.Summary = "";
        this.SummarySentiments = [];
        
        this.event = false;
      }
 else if (this.showReportModel) {
      this.materialLibraries = [];
      this.selectedMaterialLibrary = "";
      this.reportName = "";
        this.showReportModel = false;
      }
 else if (this.showWarningDetailModel) {
  this.selectedWarning = {
        programmeName: '',
        timeText: '',
        message: '',
        receivers: [],
      };
        this.showWarningDetailModel = false;
      }
 else if (this.showWarningListModel) {
        this.showWarningListModel = false;
  }
    },
  },
};
</script>