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
      <div class="layui-tab layui-tab-brief" lay-filter="typeTab" style="width: 97%; margin: 1vw 0 0 0">
        <ul class="layui-tab-title">

          <li v-for="(item, index) in types" v-bind:key="index" v-on:click="changeType(item)" v-bind:class="{
            'layui-this': index == 0,
          }">
            {{ item.value }}
          </li>
          <li>
            分类管理
          </li>
        </ul>
        <div class="layui-tab-content">
          <div class="layui-tab-item" v-for="(item, index) in types" v-bind:key="index" v-bind:class="{
            'layui-show': index == 0,
          }">
            <div style="
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: flex-start;
              width: 100%;
              min-height: 2vw;
              line-height: 1.5vw;
              margin: 0.5vw 0 0 0;
            ">
              <div class="button-div" v-on:click="showNewWordModel">添加</div>
              <div class="button-div" v-on:click="deleteKeyWordConfirm">删除</div>
            </div>
            <div style="
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: start;
              flex-wrap: wrap;
              width: 100%;
              min-height: 2vw;
              line-height: 1.5vw;
              margin: 1vw 0 0 0;
                line-height:2vw;
            ">
              <div style="
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: start;
                margin: 0 0 0 1vw;
                font-size: 1vw;
              " v-for="(item, index2) in words" v-bind:key="index2">
                <input type="checkbox" class="model-checkbox" v-model="checkboxes" v-bind:value="item.id" />
                <div style="cursor: pointer; font-size: 1vw" v-on:click="CheckBoxOnClick(item.id)">
                  {{ item.text }}
                </div>
              </div>
            </div>
          </div>

          <div class="layui-tab-item">
            <div style="
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: flex-start;
              width: 100%;
              min-height: 2vw;
              line-height: 1.5vw;
              margin: 0.5vw 0 0 0;
            ">
              <div class="button-div" v-on:click="showNewCategoryModel">添加</div>
              <div class="button-div" v-on:click="deleteCategoryConfirm">删除</div>
              <div class="button-div" v-on:click="editCategoryConfirm">编辑</div>
            </div>
            <div style="
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: start;
              flex-wrap: wrap;
              width: 100%;
              min-height: 2vw;
              line-height: 1.5vw;
              margin: 1vw 0 0 0;
                line-height:2vw;
            ">
              <div style="
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: start;
                margin: 0 0 0 1vw;
                font-size: 1vw;
              " v-for="(item, index) in types" v-bind:key="index" v-on:click="CheckBoxOneOnClick(item)">
                <input type="checkbox" class="model-checkbox" v-model="checkboxes" v-bind:value="item.id" />
                <div style="cursor: pointer; font-size: 1vw" >
                  {{ item.value }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="coverDiv" v-bind:class="{
    showCoverDiv: showNewWord || showNewCategory,
  }" v-on:click="hideModel"></div>

  <div class="new-word-model" v-bind:class="{
    showNewCategory: showNewCategory,
  }">
    <div class="model-title-div">
      <div class="model-title-text-div">新的分类</div>
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
        分类：<input id="input" type="text" class="model-input" v-model="newCategory" placeholder="请输入新的分类"
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
        编号：<input id="input" type="text" class="model-input" v-model="order" placeholder="请输入编号"
          style="margin: 0.1vw 0 0 0; width: 80%; height: 1.7vw" />
      </div>
    </div>
    <div class="model-buttons-div">
      <div class="model-button-div" v-on:click="saveNewCategory">保存</div>
      <div class="model-button-div" v-on:click="hideModel">取消</div>
    </div>
  </div>

  <div class="new-word-model" v-bind:class="{
    showNewWord: showNewWord,
  }">
    <div class="model-title-div">
      <div class="model-title-text-div">新的敏感词</div>
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
          {{ selectedType.value }}
        </div>
        <input id="input" type="text" class="model-input" v-model="newWord" placeholder="请输入新的敏感词"
          style="margin: 0.1vw 0 0 0; width: 80%; height: 1.7vw" />
      </div>
    </div>
    <div class="model-buttons-div">
      <div class="model-button-div" v-on:click="saveNewWord">保存</div>
      <div class="model-button-div" v-on:click="hideModel">取消</div>
    </div>
  </div>
</template>
<style>
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

.layui-this {
  color: #13227a !important;
  font-weight: 600 !important;
}

.layui-this:after {
  border-bottom: 2px solid #13227a !important;
}

.layui-tab-title li {
  font-size: 0.8vw !important;
  margin: 0 0.5vw 0 0;
}

a {
  color: inherit !important;
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

.new-word-model {
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
  z-index: 1002;
}

.showNewWord {
  top: 30%;
  opacity: 1;
  transition: all ease 500ms;
}

.showNewCategory {
  top: 30%;
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
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-height: 90vh;
  height: auto;
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
</style>
<script>
/*2px 2px 5px #888;
#41d8d1 
 background-image: linear-gradient(to right,#4364f7,#359FD4,#6fb1fc);
 background-image: linear-gradient(to right,#359FD4,#36B5C8,#25D8AB)
  */
//通过this.$echarts来使用
import { reactive, ref, watch } from "vue";

import SensitiveWords from "../model/SensitiveKeywords";
import VueCookies from 'vue-cookies'
//import { components } from "load-vue";
export default {
  created() {
    this.GetTypes();
  },
  mounted() {
    table = layui.table;
    layer = layui.layer;
    this.checkLogin();
  },
  updated() { },
  data() {
    return {
      types: [],
      words: [],
      showNewCategory: false,
      showNewWord: false,
      selectedType: { value: '' },
      newWord: "",
      newCategory: "",
      order:'',
      checkboxes: [],
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
  methods: {
    deleteCategoryConfirm() {
      if (this.checkboxes.length == 0) {
        return;
      }
      let _this = this;
      layer.confirm('是否确定删除？',
        { title: '请确认' }, function (index) {
          //do something
          _this.deleteCategory();
          layer.close(index);
        });
    },
    //编辑分类
    editCategoryConfirm(){
      if (this.checkboxes.length == 0) {
        layer.msg('请选择一条数据')
        // alert('请选择一条数据')
        return;
      }
      if(this.checkboxes.length>1){
        layer.msg('只能选择一条数据')
        return
      }
      this.newCategory=this.currentObj.value;
      this.order=this.currentObj.order
      this.showNewCategory=true
    },
    deleteCategory() {
      let _this = this;
      let id = this.checkboxes[0];
      this.checkboxes = this.checkboxes.slice(1);
      console.log(id);
      console.log(this.checkboxes);
      SensitiveWords.DeleteSensitiveCategory(
        id,
        function (data, response) {
          if (_this.checkboxes.length > 0) {
            _this.deleteCategory();
          } else {
            _this.GetTypes();
          }
        },
        _this.errorHanlder
      );
    },
    saveNewCategory() {
      let _this = this;
      if(this.currentObj.id){
        SensitiveWords.UpdateSensitiveWordType(
          {order:Number(_this.order),text: _this.newCategory,typeId:_this.currentObj.id},
          function (data, response) {
            if (data.updateSensitiveWordType == 1) {
              _this.GetTypes();
              _this.hideModel();
            }
          },
          _this.errorHanlder
        );
      }else{
        SensitiveWords.AddSensitiveCategory(
          {order:Number(_this.order),text: _this.newCategory},
          function (data, response) {
            if (data.addSensitiveWordType == 1) {
              _this.GetTypes();
              _this.hideModel();
            }
          },
          _this.errorHanlder
        );
      }
      
    },
    showNewCategoryModel() {
      this.currentObj={}
      this.order=''
      this.newCategory = "";
      this.showNewCategory = true;
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
      if (VueCookies.get("user") == null || !user.roleRights.sensitiveWords) {
        this.logOut();
      } else {
        this.user = user;
      }
    },
    deleteKeyWordConfirm() {
      if (this.checkboxes.length == 0) {
        return;
      }
      let _this = this;
      layer.confirm('是否确定删除？',
        { title: '请确认' }, function (index) {
          //do something
          _this.deleteKeyWord();
          layer.close(index);
        });
    },
    deleteKeyWord() {
      let _this = this;

      let wordId = this.checkboxes[0];
      this.checkboxes = this.checkboxes.slice(1);
      SensitiveWords.DeleteSensitiveWord(
        wordId,
        function (data, response) {
          _this.changeType(_this.selectedType);
          if (_this.checkboxes.length > 0) {
            _this.deleteKeyWord();
          } else {
            _this.changeType(_this.selectedType);
          }
        },
        _this.errorHanlder
      );
    },
    saveNewWord() {
      if (this.newWord == "") {
        return;
      }
      let _this = this;
      layer.msg('正在保存...', {
        time: 60000
      });
      SensitiveWords.AddSensitiveWord(
        _this.selectedType.id,
        _this.newWord,
        function (data, response) {
          layer.msg('保存成功！');
          _this.hideModel();
          _this.changeType(_this.selectedType);
        },
        _this.errorHanlder
      );
    },
    showNewWordModel() {
      this.newWord = "";
      this.showNewWord = true;
    },
    changeType(type) {
      this.selectedType = type;
      this.GetKeywords(type.id);
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
    hideModel() {
      this.checkboxes = [];
      if (this.showNewWord) {
        this.showNewWord = false;
      } else if (this.showNewCategory) {
        this.showNewCategory = false;
      }
    },
    CheckBoxOnClick(id) {
      if (this.checkboxes.indexOf(id) >= 0) {
        this.checkboxes.splice(this.checkboxes.indexOf(id), 1);
      } else {
        this.checkboxes.push(id);
      }
    },
    CheckBoxOneOnClick(item){
      this.currentObj={...item}
      let id=item.id
      if (this.checkboxes.indexOf(id) >= 0) {
        this.checkboxes.splice(this.checkboxes.indexOf(id), 1);
      } else {
        this.checkboxes.push(id);
      }
    }
  },
};
</script>