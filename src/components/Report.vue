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
        width: 90vw;
        height: 100%;
        color: #888888;
        font-size: 0.8vw;
        margin: 0 0 1vw 2vw;
        background-color: #f9f9f9;
      ">
            <div class="layui-tab layui-tab-brief" lay-filter="typeTab" style="width: 97%; 
              height:100%; margin: 1vw 0 0 0">
                <ul class="layui-tab-title">
                    <li class="layui-this">
                        方案简报
                    </li>
                    <li>
                        模板管理
                    </li>
                </ul>
                <div class="layui-tab-content" style="height:calc(100% - 80px);">
                    <div class="layui-tab-item layui-show" style="
              flex-direction: column;
              align-items: center;
              justify-content: start;
              width: 100%;
              height:100%;
            ">
                        <table style="margin: 0 0.5vw 0.5vw 0.5vw;" id="reportTable" lay-filter="reportTable"></table>
                        <div id="tablePageBar"></div>

                        <input v-show="false" type="file" ref="fileInput"
                            accept="application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            @change="upload" id="uploadFileInput">


                    </div>
                    <div class="layui-tab-item" style="
              flex-direction: row;
              align-items: flex-start;
              justify-content: flex-start;
              width: 100%;
              height:100%;
            ">

                        <div style="
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: start;
              flex-wrap: wrap;
              width: 100%;
              min-height: 2vw;
              line-height: 1.5vw;
              margin: 0 0 1.5vw 0;
            ">
                            <div class="button-div" v-on:click="showAddTemplate">添加</div>
                        </div>

                        <div style="
                   display:flex;
              flex-direction: row;
              align-items: flex-start;
              justify-content: flex-start;
              width: 98%;
              flex-wrap: wrap;
              margin:0 0 0 0.5vw;
            ">
                            <div class="templateDiv" v-for="(item, index) in tempates" v-bind:key="index">
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
                                        <div> {{ item.title }}</div>
                                        <div> &nbsp;&nbsp;&nbsp;&nbsp;{{ item.version }} </div>
                                        <div v-if="item.type == 'customized'" style=" display:flex;
              flex-direction: row;
              align-items: flex-start;
              justify-content: flex-start;">
                                            <img src="yuqing/image/bianji.png" class="item-icon-div bianji-img"
                                                @click="open(item)" />
                                            <img src="yuqing/image/shanchu9.png" class="item-icon-div shanchu-img"
                                                @click="Remove(item)" />
                                        </div>
                                    </div>
                                    <div v-if="item.type == 'default1'" style="margin: 0 0 0.5vw 0;">[附件1]</div>
                                    <div v-else-if="item.type == 'default2'" style="margin: 0 0 0.5vw 0;">[附件2]</div>
                                    <div v-if="item.institution != null && item.type == 'customized'"
                                        style="margin: 0 0 0.5vw 0;">
                                        {{ item.institution }}
                                    </div>
                                    <div v-if="item.timeText != null" style="margin: 0 0 0.5vw 0;">
                                        {{ item.timeText }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="coverDiv" v-bind:class="{
        showCoverDiv: newTemplateModel,
    }" v-on:click="hideModel"></div>
    <!--
  <div class="coverDiv" v-bind:class="{
    showCoverDiv:
      showSensitiveWordModel || showContactModel || showMaterialLibrary,
  }" style="z-index: 1099" v-on:click="hideModel"></div>
-->
    <div class="template-model" v-bind:class="{
        showTemplateModel: newTemplateModel,
    }">
        <div class="model-title-div">
            <div class="model-title-text-div">添加模板</div>
            <div class="model-title-close-div" v-on:click="hideModel">
                <img src="yuqing/image/guanbi1.png" class="model-title-close-image" />
            </div>
        </div>
        <div style="
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    overflow: auto;
    height:auto;
    
                min-height:calc(95vh - 7vw);">
            <div style="
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: flex-start;
                width:10%;
                margin:0.5vw 0 0 0;
                float:left;
              ">
                分析模块
                <div class="templateItemDiv" @mousedown="readyMove($event, '', 1, '简报概述')">
                    简报概述
                </div>
                <div class="templateItemDiv" @mousedown="readyMove($event, '', 15, '处置建议')">
                    处置建议
                </div>
                <div class="templateItemDiv" @mousedown="readyMove($event, '', 2, '监测概述')">
                    监测概述
                </div>
                <div class="templateItemDiv templateItemBackgroundDiv" style="background-image: url(yuqing/image/ciyun.png);
                " @mousedown="readyMove($event, 'ciyun', 3, '词云')">
                    词云
                </div>
                <div class="templateItemDiv templateItemBackgroundDiv" @mousedown="readyMove($event, '', 4, '摘要')">
                    摘要
                </div>
                <div class="templateItemDiv templateItemBackgroundDiv" style="background-image: url(yuqing/image/minggan.png);
                " @mousedown="readyMove($event, 'minggan', 5, '敏感度')">
                    敏感度
                </div>
                <div class="templateItemDiv templateItemBackgroundDiv" style="background-image: url(yuqing/image/diyufenxi.png);
                " @mousedown="readyMove($event, 'diyufenxi', 6, '地域分布')">
                    地域分布
                </div>
                <div class="templateItemDiv templateItemBackgroundDiv" style="background-image: url(yuqing/image/laiyuan.png);
                " @mousedown="readyMove($event, 'laiyuan', 7, '来源分布')">
                    来源分布
                </div>
                <div class="templateItemDiv templateItemBackgroundDiv" style="background-image: url(yuqing/image/qingganfenxi.png);
                " @mousedown="readyMove($event, 'qingganfenxi', 8, '情感分布')">
                    情感分布
                </div>
                <div class="templateItemDiv templateItemBackgroundDiv" style="background-image: url(yuqing/image/qushifenxi.png);
                " @mousedown="readyMove($event, 'qushifenxi', 9, '总量趋势（柱状图）')">
                    总量（柱）
                </div>
                <div class="templateItemDiv templateItemBackgroundDiv" style="background-image: url(yuqing/image/qushifenxi.png);
                " @mousedown="readyMove($event, 'qushifenxizhexian', 17, '总量趋势（折线图）')">
                    总量（折）
                </div>
                <div class="templateItemDiv templateItemBackgroundDiv" style="background-image: url(yuqing/image/laiyuanqushi.png);
                " @mousedown="readyMove($event, 'laiyuanqushi', 10, '来源趋势（柱状图）')">
                    来源（柱）
                </div>
                <div class="templateItemDiv templateItemBackgroundDiv" style="background-image: url(yuqing/image/laiyuanqushi.png);
                " @mousedown="readyMove($event, 'laiyuanqushizhexian', 18, '来源趋势（折线图）')">
                    来源（折）
                </div>
                <div class="templateItemDiv templateItemBackgroundDiv" style="background-image: url(yuqing/image/qingganqushi.png);
                " @mousedown="readyMove($event, 'qingganqushi', 11, '情感趋势（柱状图）')">
                    情感（柱）
                </div>
                <div class="templateItemDiv templateItemBackgroundDiv" style="background-image: url(yuqing/image/qingganqushi.png);
                " @mousedown="readyMove($event, 'qingganqushizhexian', 19, '情感趋势（折线图）')">
                    情感（折）
                </div>
                <div class="templateItemDiv templateItemBackgroundDiv" style="background-image: url(yuqing/image/weibosuyuan.png);
                " @mousedown="readyMove($event, 'weibosuyuan', 12, '微博溯源')">
                    微博溯源
                </div>
                <div class="templateItemDiv templateItemBackgroundDiv" style="background-image: url(yuqing/image/shijiansuyuan.png);
                " @mousedown="readyMove($event, '', 16, '事件溯源')">
                    事件溯源
                </div>
                <div class="templateItemDiv" @mousedown="readyMove($event, '', 13, '舆情导览')">
                    舆情导览
                </div>
                <div class="templateItemDiv" @mousedown="readyMove($event, '', 14, '文本')">
                    文本
                </div>
            </div>
            <div style="
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: flex-start;
                width:88%;
                min-height:96%;
                height:96%;
                overflow-y: auto;
                padding: 0 0 1vw 0;
    box-shadow: 2px 2px 5px #888888;
    margin:0.5vw 0 0 0;
  padding-bottom: 2vh;
              ">
                <input type="text" v-model="template.title" id="title" placeholder="标题" style="
                width:100%;
                margin:0.5vw 0 0.5vw 0;
                font-size: 1vw;
                background-color: transparent;
                border: 0rem;
                color: #000000;
                text-align: center;" />
                <input type="text" v-model="template.version" id="version" placeholder="版本" style="
                width:100%;
                margin:0 0 0.5vw 0;
                font-size: 0.7vw;
                background-color: transparent;
                border: 0rem;
                color: #000000;
                text-align: center;" />
                <input type="text" v-model="template.institution" id="institution" placeholder="发布单位" style="
                width:100%;
                margin:0 0 0.5vw 0;
                font-size: 0.7vw;
                background-color: transparent;
                border: 0rem;
                color: #000000;
                text-align: center;" />
                <div style="
                width:96%;
                min-height: 0.5vw;
                margin:0 0 0.5vw 0;
                background-color:red;
              ">
                </div>
                <div style="width:100%;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: flex-start;
                            margin: 0 0 0.5vw 0;" v-for="(item, index) in template.detail" v-bind:key="index">
                    <div class="position" @dragleave="hidePoistion($event, index)"
                        @dragover="showPoistion($event, index)" v-bind:class="{
                            positionOnHover: dragOverIndex == index,
                        }">
                    </div>
                    <div style="width:94%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    height:2vw;">
                        <div style="width:0.5vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center
    height:1.5vw;
    background-color:#13227a;margin: 0 0.5vw 0 0;"> </div>
                        <div class="templateContentItemTitle" v-if="item.key == 1">简报概述</div>
                        <div class="templateContentItemTitle" v-else-if="item.key == 2">监测概述</div>
                        <div class="templateContentItemTitle" v-else-if="item.key == 3">词云</div>
                        <div class="templateContentItemTitle" v-else-if="item.key == 4">摘要</div>
                        <div class="templateContentItemTitle" v-else-if="item.key == 5">敏感度</div>
                        <div class="templateContentItemTitle" v-else-if="item.key == 6">地域分布</div>
                        <div class="templateContentItemTitle" v-else-if="item.key == 7">来源分布</div>
                        <div class="templateContentItemTitle" v-else-if="item.key == 8">情感分布</div>
                        <div class="templateContentItemTitle" v-else-if="item.key == 9">总量趋势</div>
                        <div class="templateContentItemTitle" v-else-if="item.key == 17">总量趋势（折线图）</div>
                        <div class="templateContentItemTitle" v-else-if="item.key == 10">来源趋势（柱状图）</div>
                        <div class="templateContentItemTitle" v-else-if="item.key == 18">来源趋势（折线图）</div>
                        <div class="templateContentItemTitle" v-else-if="item.key == 11">情感趋势（柱状图）</div>
                        <div class="templateContentItemTitle" v-else-if="item.key == 19">情感趋势（折线图）</div>
                        <div class="templateContentItemTitle" v-else-if="item.key == 12">微博溯源（柱状图）</div>
                        <div class="templateContentItemTitle" v-else-if="item.key == 13">舆情导览</div>
                        <div class="templateContentItemTitle" v-else-if="item.key == 14">文本</div>
                        <div class="templateContentItemTitle" v-else-if="item.key == 15">处置建议</div>
                        <div class="templateContentItemTitle" v-else-if="item.key == 16">事件溯源</div>
                        <img src="yuqing/image/shanchu8.png" class="deleteItemImage" @click="deleteItem(index)" />
                    </div>
                    <textarea rows="5" cols="1" placeholder="简报概述" v-if="item.key == 1" style="
             width: 94%; 
    box-shadow: 2px 2px 5px #888888;
                font-size: 1vw;" v-model="template.detail[index].content"></textarea>
                    <textarea rows="5" cols="1" placeholder="监测概述" v-if="item.key == 2" style="
             width: 94%; 
    box-shadow: 2px 2px 5px #888888;
                font-size: 1vw;" v-model="template.detail[index].content"></textarea>
                    <div class="templateContentItem" v-else-if="item.key == 3"
                        style="background-image: url(yuqing/image/ciyun.png);">
                    </div>
                    <div class="templateContentItem" v-else-if="item.key == 4"
                        style="background-image: url(yuqing/image/zhaiyao.png);">
                    </div>
                    <div class="templateContentItem" v-else-if="item.key == 5"
                        style="background-image: url(yuqing/image/minggan.png);">
                    </div>
                    <div class="templateContentItem" v-else-if="item.key == 6"
                        style="background-image: url(yuqing/image/diyufenxi.png);">
                    </div>
                    <div class="templateContentItem" v-else-if="item.key == 7"
                        style="background-image: url(yuqing/image/laiyuan.png);">
                    </div>
                    <div class="templateContentItem" v-else-if="item.key == 8"
                        style="background-image: url(yuqing/image/qingganfenxi.png);">
                    </div>
                    <div class="templateContentItem" v-else-if="item.key == 9"
                        style="background-image: url(yuqing/image/qushifenxi.png);">
                    </div>
                    <div class="templateContentItem" v-else-if="item.key == 17"
                        style="background-image: url(yuqing/image/qushifenxizhexiantu.png);">
                    </div>
                    <div class="templateContentItem" v-else-if="item.key == 10"
                        style="background-image: url(yuqing/image/laiyuanqushi.png);">
                    </div>
                    <div class="templateContentItem" v-else-if="item.key == 18"
                        style="background-image: url(yuqing/image/laiyuanqushizhexiantu.png);">
                    </div>
                    <div class="templateContentItem" v-else-if="item.key == 11"
                        style="background-image: url(yuqing/image/qingganqushi.png);">
                    </div>
                    <div class="templateContentItem" v-else-if="item.key == 19"
                        style="background-image: url(yuqing/image/qingganqushizhexiantu.png);">
                    </div>
                    <div class="templateContentItem" v-else-if="item.key == 12"
                        style="background-image: url(yuqing/image/weibosuyuan.png);">
                    </div>
                    <div class="templateContentItem" v-else-if="item.key == 13">
                    </div>
                    <textarea rows="5" cols="1" v-else-if="item.key == 14" style="
             width: 94%; 
    box-shadow: 2px 2px 5px #888888;
                font-size: 1vw;" v-model="template.detail[index].content"></textarea>
                    <textarea rows="5" cols="1" placeholder="处置建议" v-else-if="item.key == 15" style="
             width: 94%; 
    box-shadow: 2px 2px 5px #888888;
                font-size: 1vw;" v-model="template.detail[index].content"></textarea>

                    <div class="templateContentItem" v-else-if="item.key == 16"
                        style="background-image: url(yuqing/image/shijiansuyuan.png);">
                    </div>
                </div>
                <div class="position" @dragleave="hidePoistion($event, template.detail.length)"
                    @dragover="showPoistion($event, template.detail.length)" v-bind:class="{
                        positionOnHover: dragOverIndex == template.detail.length,
                    }">
                </div>
            </div>
        </div>
        <div class="model-buttons-div">
            <div class="model-button-div" v-on:click="save">保存</div>
            <div class="model-button-div" v-on:click="hideModel">取消</div>
        </div>
    </div>
    <div v-if="showThumbnail" class="thumbnail" :style="thumbnailStyle" draggable="true"
        @dragend="endMove($event, thumbnailStyle.key)">
        {{ thumbnailStyle.text }}
    </div>
</template>
<style>
.uploadColumnButton {
    width: 4vw;
    height: 1.5vw;
    color: #fff;
    background-color: #13227a;
    font-size: 0.6vw;
    cursor: pointer;
    transition: all ease 500ms;
}

.uploadColumnButton:hover {
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
}


.deleteItemImage {
    height: 1vw;
    cursor: pointer;
    margin: 0 0 0 0.5vw;
}

.deleteItemImage:hover {
    content: url(/public/yuqing/image/shanchu1.png);
}

.downloadImageIcon {
    transition: all ease 500ms;
    height: 2vw;
    margin: 0.2vw 0.5vw 0.2vw 0;
    cursor: pointer;
}

.downloadImageIcon:hover {
    box-shadow: 2px 2px 5px #888888;
}

.uploadImageIcon {
    transition: all ease 500ms;
    height: 2vw;
    margin: 0.2vw 0.5vw 0.2vw 0;
    cursor: pointer;
}

.uploadImageIcon:hover {
    box-shadow: 2px 2px 5px #888888;
    content: url(/public/yuqing/image/shangchuanwendang3.png);
}


.templateContentItemTitle {
    font-size: 0.9vw;
}

.templateContentItem {
    width: 94%;
    height: 15vw;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    box-shadow: 2px 2px 5px #888888;
}

.template-model {
    position: fixed;
    top: -100%;
    left: 5vw;
    width: 90vw;
    opacity: 0;
    height: 95vh;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 0.7vw;
    transition: all ease 500ms;
    background-color: #fff;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    z-index: 1002;
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

.model-buttons-div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 1vw 0 1vw 0;
}

.showTemplateModel {
    top: 2.5%;
    opacity: 1;
    transition: all ease 500ms;
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

.model-content-div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
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

.model-title-div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 2.5vw;
    border-bottom: #f8f8f8 solid 2px;
    font-size: 0.8vw;
    font-weight: 500;
}

.item-icon-div {
    height: 0.9vw;
    margin: 0 0 0 0.5vw;
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

.bianji-img:hover {
    transition: all ease 500ms;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
    transform: translateY(-0.2vw);
}

.shanchu-img:hover {
    transition: all ease 500ms;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
    transform: translateY(-0.2vw);
}

.templateDiv:hover .bianji-img {
    content: url(/public/yuqing/image/bianji2.png);
}

.templateDiv:hover .shanchu-img {
    content: url(/public/yuqing/image/shanchu10.png);
}

.templateDiv:hover {
    background-color: #13227a;
    color: #fff;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
    transform: translateY(-0.2vw);
}

.button-div {
    width: 3vw;
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
    padding: 0.3vw 0.5vw 0.3vw 0.5vw;
    margin: 0.5vw 0.5vw 0 0.5vw;
}

.button-div:hover {
    transition: all ease 500ms;
    box-shadow: 2px 2px 5px #888888;
    transform: translateY(-0.2vw);
}

.templateItemDiv {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 6vw;
    height: 2vw;
    font-weight: 500;
    font-size: 0.9vw;
    transition: all ease 500ms;
    margin: 0.3vw 0 0 0;
    border: #888888 solid 2px;
    cursor: pointer;
}

.templateItemDiv:hover {
    box-shadow: 2px 2px 5px #888888;
    transform: translateY(-0.2vw);
}


.templateItemBackgroundDiv {
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
}

.thumbnail {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 20vw;
    height: 10vw;
    background-repeat: no-repeat;
    background-size: contain;
    z-index: 1100;
    opacity: 0.8;
    position: absolute;
    background-position: center;
    background-color: #fff;
    box-shadow: 2px 2px 5px #888888;
    cursor: move;
    font-size: 1vw;
    font-weight: 600;
    color: #13227a;
}

.position {
    width: 94%;
    height: 0.5vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

}

.positionOnHover {
    border: #888888 dashed 2px;
    margin: 0 0 0.5vw 0;
}
</style>
<script>
/*2px 2px 5px #888;
#41d8d1 
 background-image: linear-gradient(to right,#4364f7,#359FD4,#6fb1fc);
 background-image: linear-gradient(to right,#359FD4,#36B5C8,#25D8AB)
  */
//通过this.$echarts来使用
import { reactive, ref, watch, defineComponent } from "vue";
import Report from "../model/Report";
import Template from "../model/Template";
import VueCookies from 'vue-cookies'

export default {
    components: {
    },
    created() {
    },
    mounted() {
        console.log(this.template.detail);
        let _this = this;
        element = layui.element;
        table = layui.table;
        layer = layui.layer;
        laydate = layui.laydate;
        upload = layui.upload;

        this.getTemplates();
        this.getReports(0, 10);
        this.initReportTable();

        window.download = function (id, type) {
            _this.download(id, type);
        };
        window.deleteFile = function (id) {
            _this.deleteFile(id);
        };
        window.setSelectedReport = function (id) {
            console.log(id);
            _this.selectedReport = id;
        };

        /*  laydate.render({
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
    
         element.on('tab(eventTab)', function (data) {
                    //    alert($(this).html());
                    //    alert(data.index); //得到当前Tab的所在下标
                    //   alert(data.elem); //得到当前的Tab大容器
                    //   alert(this.getAttribute('lay-id'));
                   selectedTab = this.getAttribute('lay-id');
                    if (selectedTab == "importDataTab") {
                    } 
                });*/
        this.checkLogin();
    },
    updated() { },
    data() {
        return {
            thumbnailStyle: {
                left: '0px',
                top: '0px',
                backgroundImage: '',
                text: '',
                key: -1
            },
            showThumbnail: false,
            tempates: [],
            newTemplateModel: false,
            dragOverIndex: -1,
            relatedPoistionIndex: -1,
            template: {
                //    id:"",
                title: "舆情简报",
                version: "第( )期",
                institution: "网络舆情中心",
                detail: []
            },
            selectedReport: '',
            reportTable: null,
            initedPageBar: false,
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
            loadIndex: -1,
        };
    },
    methods: {
        upload(event) {
            if (event.target.files.length == 0) {
                return;
            }
            let _this = this;

            console.log(event.target.files[0]);
            _this.loadIndex = layer.load(1);

            Report.Upload(this.selectedReport, event.target.files[0],
                function (data, response) {
                    console.log(data);
                    layer.close(_this.loadIndex);
                }
                , function (error) {
                    layer.close(loadIndex);
                    _this.errorHanlder(error);
                });
        },
        deleteItem(index) {
            console.log(index);
            this.template.detail.splice(index, 1);
        },
        errorHanlder(error) {
            console.log(error);
            if (error.message.indexOf("403") >= 0) {
                this.logOut();
            }
        },
        logOut() {
            VueCookies.remove("user");
            window.location.href = "?page=index";//"index";
        },
        checkLogin() {
            let user = VueCookies.get("user");
            if (VueCookies.get("user") == null || !user.roleRights.briefingManagement) {
                this.logOut();
            } else {
                this.user = user;
            }
        },
        initReportTable() {
            let _this = this;
            _this.reportTable = table.render({
                elem: "#reportTable", //"#table" + item.fid,
                data: [],
                cols: [
                    [
                        { field: "id", hide: true },
                        {
                            //  field: "title",
                            title: "方案",
                            sort: true,
                            align: "left",
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
                                    "<img onclick='deleteFile(\"" + d.id + "\");' src='yuqing/image/shanchu9.png' class='item-icon-div shanchu-img'/></div>"
                                );
                            },
                        },
                        {
                            field: "name",
                            title: "简报",
                            sort: true,
                            align: "center",
                            edit: false,
                        },
                        {
                            title: "模板",
                            sort: true,
                            align: "center",
                            edit: false,
                            templet: function (d) {
                                if (d.type == "customized") {
                                    return "自定义";
                                } else if (d.type == "default1") {
                                    return "附件1";
                                } else if (d.type == "default2") {
                                    return "附件2";
                                }
                            },
                        },
                        {
                            title: "状态",
                            sort: true,
                            align: "center",
                            edit: false,
                            templet: function (d) {
                                if (d.status == 'created') {
                                    return "未发送";
                                } else if (d.status == 'sent') {
                                    return "已发送";
                                }else if (d.status == 'failed') {
                                    return "审核不通过";
                                }else if (d.status == 'passed') {
                                    return "审核通过";
                                }
                                return "";
                            },
                        },
                        {
                            field: "timeText",
                            title: "生成时间",
                            sort: true,
                            align: "center",
                            edit: false,
                        },
                        {
                            title: "下载",
                            sort: false,
                            align: "center",
                            edit: false,
                            templet: function (d) {
                                let excelDownloadTag = '';//'<div style="width:2.4vw;"></div><div style="width:2.4vw;"></div>';
                                if(d.wordFlag){
                                    excelDownloadTag+="<img onclick='download(\"" + d.id + "\", \"word\");' src='yuqing/image/word.png' class='downloadImageIcon'/>";
                                }
                                if(d.pdfFlag){
                                    excelDownloadTag+="<img onclick='download(\"" + d.id + "\", \"pdf\");' src='yuqing/image/Pdf.png' class='downloadImageIcon' />";
                                }
                                if(d.excelFlag){
                                    excelDownloadTag +="<img onclick='download(\"" + d.id + "\", \"excel\");' src='yuqing/image/Excel.png'  class='downloadImageIcon'/>";
                                }
                                // if (d.type == "customized") {
                                //     excelDownloadTag = "<img onclick='download(\"" + d.id + "\", \"pdf\");' src='yuqing/image/Pdf.png' class='downloadImageIcon' />" + "<img onclick='download(\"" + d.id + "\", \"excel\");' src='yuqing/image/Excel.png'  class='downloadImageIcon'/>";
                                // }
                                return (
                                    "<div style='width:100%;display: flex;flex-direction: row;align-items: center;justify-content: center;'>" +
                                /*    "<a href='" + Report.GetDownloadUrl(d.id, "word") + "' target='_blank'><img src='yuqing/image/word.png' class='downloadImageIcon'/></a>" +
                                    "<a href='" + Report.GetDownloadUrl(d.id, "pdf") + "' target='_blank'><img src='yuqing/image/pdf.png' class='downloadImageIcon' /></a>" +
                                    "<a href='" + Report.GetDownloadUrl(d.id, "excel") + "' target='_blank'><img src='yuqing/image/excel.png'  class='downloadImageIcon'/></a>" +
                                  */  
                                //  "<img onclick='download(\"" + d.id + "\", \"word\");' src='yuqing/image/word.png' class='downloadImageIcon'/>" +
                                    excelDownloadTag +
                                    "</div>");
                            },
                        },
                        // {
                        //     title: "更新",
                        //     sort: false,
                        //     align: "center",
                        //     edit: false,
                        //     templet: function (d) {
                        //         if (d.status == 'sent') {
                        //             return "";
                        //         } else{
                        //         return '<button onclick="setSelectedReport(\'' + d.id + '\');document.all.uploadFileInput.click();" class="uploadColumnButton"  type="button">' +
                        //             '上传简报' +
                        //             '</button>';
                        //         }
                        //     },
                        // },
                        {
                            field: "checkTimeText",
                            title: "反馈时间",
                            sort: true,
                            align: "center",
                            edit: false,
                        },
                        {
                            field: "feedback",
                            title: "反馈意见",
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
        },
        deleteFile(id){
            let _this = this;
            Report.DeleteFile(id,function (data, response) {
                _this.getReports(0, 10);
                _this.initReportTable();
                layer.msg('已删除');
            },
                _this.errorHanlder);
        },
        download(id, type) {
            let _this = this;
            layer.msg('正在下载，请稍等...', {
                time: 60000
            });
            Report.Download(id, type, function (data, response) {
                console.log(data);
                console.log(response);

                let mimeType = response.headers['content-type'];

                if (type == 'pdf') {
                    mimeType = "application/pdf";
                }
                //     mimeType = 'application/octet-stream';

                // mimeType  = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
                let aLink = document.createElement('a');
                let blob = new Blob([data], { type: mimeType });
                var patt = new RegExp('filename=([^;]+\\.[^\\.;]+);*');
                var contentDisposition = decodeURI(response.headers['content-disposition']);
                var result = patt.exec(contentDisposition);
                var fileName = result[1];
                fileName = fileName.replace(/\"/g, '');
                // 从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
                aLink.href = URL.createObjectURL(blob);
                //   console.log(fileName);
                aLink.setAttribute('download', fileName);
                document.body.appendChild(aLink);
                aLink.click();
                document.body.removeChild(aLink);
                layer.msg('已下载');
            },
                _this.errorHanlder);
        },
        Remove(item) {
            let _this = this;

            layer.confirm('是否确定删除该模板：' + item.title,
                { title: '请确认' }, function (index) {
                    //do something

                    Template.Remove(item.id,
                        function (data, response) {
                            console.log(data);
                            _this.getTemplates();
                        },
                        _this.errorHanlder
                    );
                    layer.close(index);
                });
        },
        open(item) {
            this.template = item;
            if (item.detail == null) {
                item.detail = [];
            }
            this.showAddTemplate();
        },
        hidePoistion(event, index) {
            console.log(event);
            if (event.relatedTarget == null) {
                this.relatedPoistionIndex = index;
            }
            if (this.dragOverIndex == index) {
                this.dragOverIndex = -1;
            }
        },
        showPoistion(event, index) {
            //   console.log(event);
            this.dragOverIndex = index;
        },
        moveThumbnail(event) {
            //   console.log(event);
            this.thumbnailStyle.left = event.x - 10 + 'px';
            this.thumbnailStyle.top = event.y - 10 + 'px';
            //    console.log(this.thumbnailStyle);
        },
        endMove(event, key) {
            console.log(this.relatedPoistionIndex);
            console.log(event);
            this.showThumbnail = false;
            if (this.relatedPoistionIndex != -1) {
                let content = "";
                if (key == 1) {
                    content = "本报告截至{date}共采集{total}条相关舆情信息，并对其进行分析。其中，{source}。目前主要的报道集中在{main}等几大站点。详细报告请继续浏览。";
                } else if (key == 2) {
                    content = "监测主题相关信息{total}条，其中敏感{sensitive}条，敏感占比{sensitiveperc}%，非敏感{nonsensitive}条，非敏感占比{nonsensitiveperc}%。";
                } else if (key == 15) {
                    content = "对于网情信息中具有潜在危害的事件及情况应给予关注并积极处理，防止不良影响产生及扩散。此外，密切关注此前敏感预警事件的发展情况，及时制定有效应对措施。鉴于监测结果中负面网情时有发生， 应吸取相关经验教训，做好预防和处理工作。";
                }
                this.template.detail.splice(this.relatedPoistionIndex, 0, {
                    key: key,
                    content: content
                });
                this.relatedPoistionIndex = -1;
            }
        },
        readyMove(event, name, key, text) {
            //   console.log(event);
            this.showThumbnail = true;
            this.thumbnailStyle.left = event.x - 10 + 'px';
            this.thumbnailStyle.top = event.y - 10 + 'px';
            if (name != "") {
                this.thumbnailStyle.backgroundImage = 'url(yuqing/image/' + name + '.png)';
            } else {
                this.thumbnailStyle.backgroundImage = '';
            }
            this.thumbnailStyle.text = text;
            this.thumbnailStyle.key = key;
            //    console.log(this.thumbnailStyle);
        },
        showAddTemplate() {
            this.newTemplateModel = true;
        },
        initPageBar(number) {
            let _this = this;
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
                count: number, //数据总数，从服务端得到
                limits: [10, 50, 100, 200, 300], //数据总数，从服务端得到
                theme: "#46A1F0",
                jump: function (obj, first) {
                    //obj包含了当前分页的所有参数，比如：
                    //  alert(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                    //    alert(obj.limit); //得到每页显示的条数

                    //首次不执行
                      console.log(obj.limit);

                    if (first) {
                    } else {
                        _this.getReports(obj.curr - 1, obj.limit);
                    }
                },
            });
            this.initedPageBar = true;
        },
        getReports(pageId, pageSize) {
            let _this = this;
            Report.GetAll(pageId, pageSize,
                function (data, response) {
                    console.log(data);
                    //   console.log(data.briefingFileContent);

                    _this.reportTable.reload({
                        data: data.briefingFileContent,
                        limit: pageSize,
                    });

                    if (!_this.initedPageBar) {
                        _this.initPageBar(data.number);
                    }
                },

                _this.errorHanlder
            );
        },
        getTemplates() {
            let _this = this;
            Template.GetAll(
                function (data, response) {
                    console.log(data);
                    _this.tempates = data;
                },

                _this.errorHanlder
            );
        },
        save() {
            console.log(this.template);
            let _this = this;
            Template.Save(this.template,
                function (data, response) {
                    console.log(data);
                    _this.hideModel();
                    _this.getTemplates();
                },

                _this.errorHanlder
            );
        },
        hideModel() {
            if (this.newTemplateModel) {
                this.dragOverIndex = -1;
                this.relatedPoistionIndex = -1;
                this.template = {
                    //    id:"",
                    title: "舆情简报",
                    version: "第( )期",
                    institution: "网络舆情中心",
                    detail: []
                };
                this.newTemplateModel = false;
            }
        },
    },
};
</script>