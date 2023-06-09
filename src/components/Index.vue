<template>
  <div style="
      width: 100vw;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      background-image: linear-gradient(to bottom right,#13227a,#002ea6,#4364f7);
    ">
    <!--    
    background-image: linear-gradient(to bottom right,#13227a,#002ea6,#4364f7);"
  -->
    <div style="
        width: 100vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
      ">
      <div style="
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: flex-start;
          height: 5vw;
          width: 100%;
        ">
        <div style="
            width: 6vw;
            height: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-end;
            font-size: 1vw;
            font-weight: 400;
            color: #ffffff;
            font-family: Verdana, Geneva, Tahoma, sans-serif;
          ">
          <!-- <img src="yuqing/image/logo.png" style="height: 50%; margin: 0 1vw 0 2vw" /> -->
        </div>
        <div style="
            width: 13vw;
            height: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            font-size: 1vw;
            font-weight: 800;
            color: #ffffff;
            font-family: Verdana, Geneva, Tahoma, sans-serif;
            text-shadow: 0.4vw 0.4vh 1.2vw #f8f8f8;
          ">
          <!-- 舆情监测分系统 -->
        </div>
        <div style="
            width: 78vw;
            height: 100%;
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: flex-end;
            padding: 0 2vw 0 0;
          ">
          <div class="header-menu" v-if="logined">
            <a href="?page=plan"><img src="yuqing/image/yuqingjiance.png" class="header-icon" />舆情监测
            </a>
          </div>
          <div class="header-menu" v-if="logined">
            <a href="?page=topic">
              <img src="yuqing/image/redianhuati.png" class="header-icon" />话题追踪
            </a>
          </div>
          <div class="header-menu" v-if="logined&&globalSearch">
            <a href="?page=search">
              <img src="yuqing/image/quanwenjiansuo.png" class="header-icon" />全文检索
            </a>
          </div>
          <div class="header-menu" v-if="logined&&briefingManagement">
            <a href="?page=report">
              <img src="yuqing/image/jianbao.png" class="header-icon" />简报管理 </a>
          </div>
          <div class="header-menu" v-if="logined">
            <a href="?page=dashboard">
              <img src="yuqing/image/shujudaping.png" class="header-icon" />
              数据大屏</a>
          </div>
          <div class="header-menu" v-if="logined&&warning">
            <a href="?page=warning">
              <img src="yuqing/image/yujing.png" class="header-icon" />
              预警配置</a>
          </div>
          <div class="header-menu" v-if="logined&&sensitiveWords">
            <a href="?page=sensitivekeywords">
              <img src="yuqing/image/minganciku.png" class="header-icon" />敏感词库
            </a>
          </div>
          <div class="header-menu" v-if="logined && systemManagement"><a href="?page=system">
              <img src="yuqing/image/xitongguanli.png" class="header-icon" />系统管理
            </a> </div>
          <div class="header-menu" v-if="logined" @click="logOut">
            <img src="yuqing/image/tuichu.png" class="header-icon" />退出
          </div>
          <div class="header-menu" v-if="!logined" @click="showLogin">
            <img src="yuqing/image/denglu.png" class="header-icon" />登录
          </div>
        </div>
      </div>
      <div style="
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          height: 3vw;
          width: 80%;
        ">
        <div class="header-item">
          <div class="header-item-text">方案</div>
          <div class="header-item-value">
            <div id="plan">{{ planCount }}</div>
            <div>&nbsp;个</div>
          </div>
        </div>
        <div class="header-item">
          <div class="header-item-text">应急方案</div>
          <div class="header-item-value">
            <div id="emergencyPlan">{{ emergencyPlanCount }}</div>
            <div>&nbsp;个</div>
          </div>
        </div>
        <div class="header-item">
          <div class="header-item-text">今日新增</div>
          <div class="header-item-value">
            <div id="increment">{{ increment }}</div>
            <div>+ 条</div>
          </div>
        </div>
        <div class="header-item">
          <div class="header-item-text">全部舆情</div>
          <div class="header-item-value">
            <div id="totalCount">{{ totalCount }}</div>
            <div>&nbsp;条</div>
          </div>
        </div>
      </div>
      <div style="
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          height: 5vw;
          width: 100%;
        ">
        <form @submit.prevent>
          <div class="serach-div2">
            <input @keyup.enter="search" type="text" v-model="searchText" id="name" placeholder="全文检索 | 全网搜索"
              class="search-input2" />
            <div v-on:click="search" style="
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
    </div>
  </div>
  <div class="news-main-div">
    <div v-bind:class="{ newsdivLoading: loadingNews, newsdiv: !loadingNews }">
      <div class="news-title-div">
        <div class="news-title-left-div">
          <img src="yuqing/image/zuixin2.png" class="news-title-new-icon-div" />
          <div class="news-title-text-div">最新舆情</div>
        </div>
        <div class="news-title-all-button" @click="viewAllNews">查看全部</div>
      </div>
      <div class="layui-carousel news-content-carousel-item-div no-news" v-if="news.length == 0">
        今日无新增
      </div>
      <div class="layui-carousel news-content-carousel-item-div" id="newsDiv" v-else>
        <div carousel-item class="news-content-carousel-item-div">
          <div class="news-content-div" v-if="news.length > 0">
            <div v-for="(item, index) in news.slice(0, 5)" v-bind:key="item" class="news-content-row-div" v-bind:class="{
              orangeLeftBorder: index == 0,
              blueLeftBorder: index == 1,
              purpleLeftBorder: index == 2,
              redLeftBorder: index == 3,
              greenLeftBorder: index == 4,
            }" v-on:click="OpenNews(item)">
              <div class="news-content-row-main-div">
                <div class="news-content-row-detail-div">
                  {{ item.title }}
                </div>
                <div class="news-content-row-source-div">
                  {{ item.resource }}
                </div>
              </div>
              <div class="news-content-row-date-div">
                {{ item.publishedDayText }}
              </div>
            </div>
          </div>
          <div class="news-content-div" v-if="news != null && news.length > 5">
            <div v-for="(item, index) in news.slice(5, 10)" v-bind:key="item" class="news-content-row-div" v-bind:class="{
              orangeLeftBorder: index == 0,
              blueLeftBorder: index == 1,
              purpleLeftBorder: index == 2,
              redLeftBorder: index == 3,
              greenLeftBorder: index == 4,
            }" v-on:click="OpenNews(item)">
              <div class="news-content-row-main-div">
                <div class="news-content-row-detail-div">
                  {{ item.title }}
                </div>
                <div class="news-content-row-source-div">
                  {{ item.resource }}
                </div>
              </div>
              <div class="news-content-row-date-div">
                {{ item.publishedDayText }}
              </div>
            </div>
          </div>
          <div class="news-content-div" v-if="news[10] != null && news.length > 10">
            <div v-for="(item, index) in news.slice(10, 15)" v-bind:key="item" class="news-content-row-div"
              v-bind:class="{
                orangeLeftBorder: index == 0,
                blueLeftBorder: index == 1,
                purpleLeftBorder: index == 2,
                redLeftBorder: index == 3,
                greenLeftBorder: index == 4,
              }" v-on:click="OpenNews(item)">
              <div class="news-content-row-main-div">
                <div class="news-content-row-detail-div">
                  {{ item.title }}
                </div>
                <div class="news-content-row-source-div">
                  {{ item.resource }}
                </div>
              </div>
              <div class="news-content-row-date-div">
                {{ item.publishedDayText }}
              </div>
            </div>
          </div>
          <div class="news-content-div" v-if="news != null && news[15] != null && news.length > 15">
            <div v-for="(item, index) in news.slice(15, 20)" v-bind:key="item" class="news-content-row-div"
              v-bind:class="{
                orangeLeftBorder: index == 0,
                blueLeftBorder: index == 1,
                purpleLeftBorder: index == 2,
                redLeftBorder: index == 3,
                greenLeftBorder: index == 4,
              }" v-on:click="OpenNews(item)">
              <div class="news-content-row-main-div">
                <div class="news-content-row-detail-div">
                  {{ item.title }}
                </div>
                <div class="news-content-row-source-div">
                  {{ item.resource }}
                </div>
              </div>
              <div class="news-content-row-date-div">
                {{ item.publishedDayText }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-bind:class="{
      newsdivLoading: loadingSensitiveNews,
      newsdiv: !loadingSensitiveNews,
    }">
      <div class="news-title-div">
        <div class="news-title-left-div">
          <img src="yuqing/image/mingan2.png" class="news-title-mingan-icon-div" />
          <div class="news-title-text-div">敏感舆情</div>
        </div>
        <div class="news-title-all-button" @click="viewAllSensitiveNews">查看全部</div>
      </div>
      <div class="layui-carousel news-content-carousel-item-div no-news" v-if="sensitiveNews.length == 0">
        今日无新增
      </div>
      <div class="layui-carousel news-content-carousel-item-div" id="sensitiveNewsDiv" v-else>
        <div carousel-item class="news-content-carousel-item-div">
          <div class="news-content-div" v-if="sensitiveNews.length > 0">
            <div v-for="(item, index) in sensitiveNews.slice(0, 5)" v-bind:key="item" class="news-content-row-div"
              v-bind:class="{
                greenLeftBorder: index == 0,
                redLeftBorder: index == 1,
                purpleLeftBorder: index == 2,
                orangeLeftBorder: index == 3,
                blueLeftBorder: index == 4,
              }" v-on:click="OpenNews(item)">
              <div class="news-content-row-main-div">
                <div class="news-content-row-detail-div">
                  {{ item.title }}
                </div>
                <div class="news-content-row-source-div">
                  {{ item.resource }}
                </div>
              </div>
              <div class="news-content-row-date-div">
                {{ item.publishedDayText }}
              </div>
            </div>
          </div>
          <div class="news-content-div" v-if="sensitiveNews.length > 5">
            <div v-for="(item, index) in sensitiveNews.slice(5, 10)" v-bind:key="item" class="news-content-row-div"
              v-bind:class="{
                greenLeftBorder: index == 0,
                redLeftBorder: index == 1,
                purpleLeftBorder: index == 2,
                orangeLeftBorder: index == 3,
                blueLeftBorder: index == 4,
              }" v-on:click="OpenNews(item)">
              <div class="news-content-row-main-div">
                <div class="news-content-row-detail-div">
                  {{ item.title }}
                </div>
                <div class="news-content-row-source-div">
                  {{ item.resource }}
                </div>
              </div>
              <div class="news-content-row-date-div">
                {{ item.publishedDayText }}
              </div>
            </div>
          </div>
          <div class="news-content-div" v-if="sensitiveNews.length > 10">
            <div v-for="(item, index) in sensitiveNews.slice(10, 15)" v-bind:key="item" class="news-content-row-div"
              v-bind:class="{
                greenLeftBorder: index == 0,
                redLeftBorder: index == 1,
                purpleLeftBorder: index == 2,
                orangeLeftBorder: index == 3,
                blueLeftBorder: index == 4,
              }" v-on:click="OpenNews(item)">
              <div class="news-content-row-main-div">
                <div class="news-content-row-detail-div">
                  {{ item.title }}
                </div>
                <div class="news-content-row-source-div">
                  {{ item.resource }}
                </div>
              </div>
              <div class="news-content-row-date-div">
                {{ item.publishedDayText }}
              </div>
            </div>
          </div>
          <div class="news-content-div" v-if="sensitiveNews.length > 15">
            <div v-for="(item, index) in sensitiveNews.slice(15, 20)" v-bind:key="item" class="news-content-row-div"
              v-bind:class="{
                greenLeftBorder: index == 0,
                redLeftBorder: index == 1,
                purpleLeftBorder: index == 2,
                orangeLeftBorder: index == 3,
                blueLeftBorder: index == 4,
              }" v-on:click="OpenNews(item)">
              <div class="news-content-row-main-div">
                <div class="news-content-row-detail-div">
                  {{ item.title }}
                </div>
                <div class="news-content-row-source-div">
                  {{ item.resource }}
                </div>
              </div>
              <div class="news-content-row-date-div">
                {{ item.publishedDayText }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-bind:class="{
      newsdivLoading: loadingHotArticles,
      newsdiv: !loadingHotArticles,
    }">
      <div class="news-title-div">
        <div class="news-title-left-div">
          <img src="yuqing/image/redian2.png" class="news-title-new-icon-div" />
          <div class="news-title-text-div">最新热文</div>
        </div>
        <div class="news-title-all-button" @click="viewAllHotArticles">查看全部</div>
      </div>
      <div class="layui-carousel news-content-carousel-item-div" id="hotArticlesDiv">
        <div carousel-item class="news-content-carousel-item-div">
          <div class="news-content-div" v-if="hotArticles.length > 0">
            <div v-for="(item, index) in hotArticles.slice(0, 5)" v-bind:key="item" class="news-content-row-div"
              v-bind:class="{
                blueLeftBorder: index == 0,
                redLeftBorder: index == 1,
                orangeLeftBorder: index == 2,
                greenLeftBorder: index == 3,
                purpleLeftBorder: index == 4,
              }" v-on:click="openHotArticleSource(item)">
              <div class="news-content-row-main-div">
                <div class="news-content-row-detail-div">
                  {{ item.title }}
                </div>
                <div class="news-content-row-source-div">
                  {{ item.resource }}
                </div>
              </div>
              <div class="news-content-row-date-div">
                <div>
                  {{ item.heat }}
                </div>
                <div>
                  {{ item.publishedDayText }}
                </div>
              </div>
            </div>
          </div>
          <div class="news-content-div" v-if="hotArticles.length > 5">
            <div v-for="(item, index) in hotArticles.slice(5, 10)" v-bind:key="item" class="news-content-row-div"
              v-bind:class="{
                blueLeftBorder: index == 0,
                redLeftBorder: index == 1,
                orangeLeftBorder: index == 2,
                greenLeftBorder: index == 3,
                purpleLeftBorder: index == 4,
              }" v-on:click="openHotArticleSource(item)">
              <div class="news-content-row-main-div">
                <div class="news-content-row-detail-div">
                  {{ item.title }}
                </div>
                <div class="news-content-row-source-div">
                  {{ item.resource }}
                </div>
              </div>
              <div class="news-content-row-date-div">
                <div>
                  {{ item.heat }}
                </div>
                <div>
                  {{ item.publishedDayText }}
                </div>
              </div>
            </div>
          </div>
          <div class="news-content-div" v-if="hotArticles.length > 10">
            <div v-for="(item, index) in hotArticles.slice(10, 15)" v-bind:key="item" class="news-content-row-div"
              v-bind:class="{
                blueLeftBorder: index == 0,
                redLeftBorder: index == 1,
                orangeLeftBorder: index == 2,
                greenLeftBorder: index == 3,
                purpleLeftBorder: index == 4,
              }" v-on:click="openHotArticleSource(item)">
              <div class="news-content-row-main-div">
                <div class="news-content-row-detail-div">
                  {{ item.title }}
                </div>
                <div class="news-content-row-source-div">
                  {{ item.resource }}
                </div>
              </div>
              <div class="news-content-row-date-div">
                <div>
                  {{ item.heat }}
                </div>
                <div>
                  {{ item.publishedDayText }}
                </div>
              </div>
            </div>
          </div>
          <div class="news-content-div" v-if="hotArticles.length > 15">
            <div v-for="(item, index) in hotArticles.slice(15, 20)" v-bind:key="item" class="news-content-row-div"
              v-bind:class="{
                blueLeftBorder: index == 0,
                redLeftBorder: index == 1,
                orangeLeftBorder: index == 2,
                greenLeftBorder: index == 3,
                purpleLeftBorder: index == 4,
              }" v-on:click="openHotArticleSource(item)">
              <div class="news-content-row-main-div">
                <div class="news-content-row-detail-div">
                  {{ item.title }}
                </div>
                <div class="news-content-row-source-div">
                  {{ item.resource }}
                </div>
              </div>
              <div class="news-content-row-date-div">
                <div>
                  {{ item.heat }}
                </div>
                <div>
                  {{ item.publishedDayText }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="coverDiv" v-bind:class="{
    showCoverDiv:
      loginModel,
  }" v-on:click="hideModel"></div>


  <div class="loginModel" v-bind:class="{
    showLogin: loginModel,
  }">
    <div class="model-title-div">
      <div class="model-title-text-div">登录</div>
      <div class="model-title-close-div" v-on:click="hideModel">
        <img src="yuqing/image/guanbi1.png" class="model-title-close-image" />
      </div>
    </div>
    <div class="model-content-div">
      <div style="
          width: 96%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          margin: 1vw 0 0 0;
        ">
        <input type="text" class="nameInput" v-model="username" placeholder="请输入用户名" />
        <input type="password" class="nameInput" v-model="password" placeholder="请输入密码" />
        <div style="
          width: 90%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          margin: 0 0 0 0;
        "> <input type="text" class="codeInput" v-model="code" placeholder="请输入验证码" />
          <VerificationCode ref="verificationCode" />
        </div>
      </div>
    </div>
    <div class="model-buttons-div">
      <div class="model-button-div" v-on:click="Login">登录</div>
      <div class="model-button-div" v-on:click="hideModel">关闭</div>
    </div>
  </div>


</template>
<style>
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

a {
  color: inherit !important;
}

.news-main-div {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-around;
  position: absolute;
  top: 12vw;
  width: 99vw;
  margin: 1vw 0 0 0;
}

.news-content-row-main-div {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  height: 100%;
  width: 85%;
  margin: 0 0 0 1vw;
}

.news-content-row-detail-div {
  text-align: start;
  font-size: 0.8vw;
}

.news-content-row-source-div {
  color: #99abb4;
  font-size: 0.7vw;
}

.news-content-row-date-div {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  height: 100%;
  color: #99abb4;
  font-size: 0.8vw;
  width: 10%;
  text-align: end;
  margin: 0 3% 0 0;
}

.news-content-row-div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 4vw;
  border-bottom: #eeeeee 1px solid;
  color: #455a64;
  cursor: pointer;
}

.news-content-row-div:hover {
  background-color: #13227a;
  color: #ffffff;
  transition: all 0.5s ease;
}

.news-title-div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 4.5vw;
  width: 100%;
  font-size: 0.9vw;
}

.news-title-left-div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
}

.news-title-all-button {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0 0 0 0;
  cursor: pointer;
  color: #13227a;
  width: 6vw;
  height: 2.5vw;
  background-color: #f8f8f8;
  transition: all ease 500ms;
}

.news-title-all-button:hover {
  margin: 0 0.5vw 0 0;
  cursor: pointer;
  color: #ffffff;
  background-color: #13227a;
  opacity: 0.8;
  transition: all ease 500ms;
}

.news-title-text-div {
  margin: 0 0 0 0.3vw;
  color: #13227a;
}

.orangeLeftBorder {
  border-left: #ff9800 0.3vw solid;
}

.blueLeftBorder {
  border-left: #2196f3 0.3vw solid;
}

.purpleLeftBorder {
  border-left: #673ab7 0.3vw solid;
}

.redLeftBorder {
  border-left: #e91e63 0.3vw solid;
}

.greenLeftBorder {
  border-left: #1ed085 0.3vw solid;
}

.news-content-div {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.news-content-carousel-item-div {
  width: 100% !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 22vw !important;
}

.news-div {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 30vw;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  position: relative;
  top: 2vw;
  opacity: 0;
}

.newsdiv {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 30vw;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  position: relative;
  top: 0vw;
  transition: all ease 1000ms;
  opacity: 1;
  background-color: #f8f8f8;
  border-radius: 0.5vw;
}

.newsdivLoading {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 30vw;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  position: relative;
  top: -10vw;
  opacity: 0;
  background-color: #f8f8f8;
  border-radius: 0.5vw;
}

.news-title-new-icon-div {
  height: 40%;
  margin: 0 0 0 0.5vw;
}

.news-title-mingan-icon-div {
  height: 52%;
  margin: 0 0 0 0.5vw;
}

.no-news {

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 0.8vw;
}

.header-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  height: 3vw;
}

.header-item-text {
  font-size: calc(0.8vmax + 0.8vmin);
  font-weight: 600;
  color: #ffffff;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.header-item-value {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-size: calc(0.65vmax + 0.65vmin);
  font-weight: 200;
  color: #ffffff;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.header-menu {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 0.8vw;
  font-weight: 400;
  width: 7%;
  height: 4vh;
  color: #f8f8f8;
  margin: 1vh 0 0 0;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  cursor: pointer;
  transition: all 0.5s ease;
}

.header-menu:hover {
  transition: all 0.5s ease;
  transform: translateY(-5px);
  background-color: #539ddb;
}

.serach-div2 {
  background-color: #f8f8f8;
  border-radius: 2rem;
  border: #fbfbfb 2px solid;
  opacity: 0.5;
  height: 4vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 35vw;
}

.search-input2 {
  width: 90%;
  max-width: 90vw;
  font-size: 1.2vw;
  background-color: transparent;
  margin: 0 0 0 1.5vw;
  border: 0rem;
  color: #000000;
}

.header-icon {
  margin: 2px 5px 0 0;
  height: 0.8vw;
  cursor: pointer;
}

.model-dialog {
  border-radius: 0.5vw;
}

.layui-layer-content {
  padding: 1.5vw 2vw 1.5vw 2vw !important;
  font-size: 1.2vw !important;
  line-height: 2.2vw !important;
}

.layui-layer-btn1 {
  background-color: transparent !important;
  border-color: transparent !important;
  font-size: 0.8vw !important;
  padding: 0.6vw 1vw 0.6vw 1vw !important;
  transition: all ease 1000ms;
}

.layui-layer-btn1:hover {
  background-color: #13227a !important;
  transform: translateY(-0.5vw);
  color: #fff !important;
  transition: all ease 500ms;
}

.layui-layer-btn0 {
  background-color: transparent !important;
  border-color: transparent !important;
  font-size: 0.8vw !important;
  padding: 0.6vw 1vw 0.6vw 1vw !important;
  transition: all ease 1000ms;
}

.layui-layer-btn0:hover {
  background-color: #13227a !important;
  color: #fff !important;
  transform: translateY(-0.5vw);
  transition: all ease 500ms;
}

.layui-layer-setwin {
  height: 2vw;
  width: 2vw;
  top: 0.5vw !important;
  margin: 0 0.5vw 0 0;
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

.loginModel {
  position: fixed;
  top: -100%;
  left: 37.5vw;
  width: 25vw;
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

.showLogin {
  top: 30%;
  opacity: 1;
  transition: all ease 500ms;

}

.nameInput {
  height: 1.5vw;
  width: 80%;
  font-size: 0.8vw;
  border-radius: 2px;
  border: #eee solid 1px !important;
  padding: 0.5vw 1.2vw 0.5vw 1.2vw;
  transition: all ease 500ms;
  margin: 0 0 0.5vw 0;
}

.codeInput {
  height: 1vw;
  width: 70%;
  font-size: 0.8vw;
  border-radius: 2px;
  border: #eee solid 1px !important;
  padding: 0.5vw 1.2vw 0.5vw 1.2vw;
  transition: all ease 500ms;
}
</style>
<script>
/*
#41d8d1 
 background-image: linear-gradient(to right,#4364f7,#359FD4,#6fb1fc);
 background-image: linear-gradient(to right,#359FD4,#36B5C8,#25D8AB)
  */
//通过this.$echarts来使用
import { reactive, ref, watch } from "vue";

import Plan from "../model/Plan";
import News from "../model/News";
import User from "../model/User";
import VerificationCode from "@/components/VerificationCode";
import VueCookies from 'vue-cookies'

VueCookies.config('1d', 'mts')

//import { components } from "load-vue";
export default {
  components: {
    VerificationCode,
  },
  setup() {
    const user_auth={"id":1369224926994432,"name":"舆情管理员","cellphone":"13425463257","serviceTypes":"24,3","enableAuthentication":false,"privilegeCodeList":["system:situationSubSystem","system:publicSentiment"],"roleList":[{"roleName":"综合态势管理员","roleCode":"situationSubAdmin"},{"roleName":"舆情监测管理员","roleCode":"R_psadmin"},{"roleName":"普通用户","roleCode":"PS_ADMIN"}]};
    const userInfo={"accessToken":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJwc2FkbWluIiwic2NvcGUiOlsiYWxsIl0sIm5hbWUiOiLoiIbmg4XnrqHnkIblkZgiLCJjZWxscGhvbmUiOiIxMzQyNTQ2MzI1NyIsImlkIjoxMzY5MjI0OTI2OTk0NDMyLCJleHAiOjE2NzI0Nzc1NDcsImp0aSI6IjY0ZjM2N2QyLWNiZDMtNGM5MC05YjEwLTc4ZTc1OTE1MDkwYSIsImNsaWVudF9pZCI6ImVtZXJnZW5jeS1yZXNwb25zZSJ9.rDXjYhPBB7II-Cm-tf7iQEGv_FyAEUlK5IpWa77a6uAf7yZh4c7u8bDdLSBM6h0LcpYQz3pXRmmOSHfTP_67jq_ik71mLDHbgjeGZa_4Bjsq-vTwGNcfkoRvZYGMlw_b4ZwFHFoqHcQEvRb-Z16uC3RGLYQUDvpxtROTxUV2T2Q","tokenType":"bearer","refreshToken":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJwc2FkbWluIiwic2NvcGUiOlsiYWxsIl0sImF0aSI6IjY0ZjM2N2QyLWNiZDMtNGM5MC05YjEwLTc4ZTc1OTE1MDkwYSIsIm5hbWUiOiLoiIbmg4XnrqHnkIblkZgiLCJjZWxscGhvbmUiOiIxMzQyNTQ2MzI1NyIsImlkIjoxMzY5MjI0OTI2OTk0NDMyLCJleHAiOjE2NzI1MTcxNDcsImp0aSI6IjM0OWQ1OThjLTFhOGUtNDM4MC1iYWRkLTI5YzVlNTE3MTA2MCIsImNsaWVudF9pZCI6ImVtZXJnZW5jeS1yZXNwb25zZSJ9.JwVbi3H8kPTZSvo10fwylPKTCHbI6zXcNYMREo3Sq-ZBPfOWhTivaR2EHmlGG000TCNeYbcnnT5Lo3sw7Kry1K96HUhjwukD7tdfoUijUMqupGGdWHwWaQZHEDUfFBFtjnhJpnT6ObEjRqBXolIarOnaEtsOcgtbrYVAW5jc87A","expiresIn":3599,"scope":["all"],"jti":"64f367d2-cbd3-4c90-9b10-78e75915090a"};
    sessionStorage.setItem("userInfo",JSON.stringify(userInfo));
    sessionStorage.setItem("user_auth",JSON.stringify(user_auth));
    // console.log(sessionStorage.getItem("userInfo"));
    // console.log(sessionStorage.getItem("user_auth"));
    const verificationCode = ref();
    const getCode = () => {
      return verificationCode.value.getCode();
    };
    const generateCode = () => {
      return verificationCode.value.generateCode();
    };
    return {
      verificationCode,
      getCode,
      generateCode,
    };
  },
  created() {
    this.LoadData();
    this.LoginWithOutCode();
    this.checkLogin();
  },
  mounted() {
    this.refresh();
    this.checkLogin();
  },
  updated() {
    //   console.log("updated");
    //   console.log(carousel);
    this.checkLogin();
    this.initNewsCarousel();
    this.initSensitiveNewsCarousel();
    this.initHotArticlesCarousel();
  },
  data() {
    return {
      refreshTime: 60000,
      planCount: 0,
      emergencyPlanCount: 0,
      increment: 0,
      totalCount: 0,
      news: [],
      sensitiveNews: [],
      hotArticles: [],
      searchText: "",
      loadingNews: true,
      loadingSensitiveNews: true,
      loadingHotArticles: true,
      newsCarousel: null,
      sensitiveNewsCarousel: null,
      hotArticlesCarousel: null,
      loginModel: false,
      username: '',
      password: '',
      code: '',
      logined: false,
      warning: false,
      briefingManagement: false,
      globalSearch: false,
      systemManagement: false,
      sensitiveWords: false,
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
      this.logined = VueCookies.get("user") != null;
      if (VueCookies.get("user") != null) {
        this.warning = VueCookies.get("user").roleRights.warning;
        this.briefingManagement = VueCookies.get("user").roleRights.briefingManagement;
        this.globalSearch = VueCookies.get("user").roleRights.globalSearch;
        this.systemManagement = VueCookies.get("user").roleRights.systemManagement;
        this.sensitiveWords = VueCookies.get("user").roleRights.sensitiveWords;
      };
    },
    Login() {
      console.log(this.getCode());
      if (this.getCode().toLowerCase() != this.code.toLowerCase()) {
        this.generateCode();
        return;
      }

      let _this = this;
      User.Login(this.username, this.password, function (data, response) {
        //console.log(data);
        if (data.login == 1) {
          data.username = _this.username;
          VueCookies.set("user", data);
          //   console.log(VueCookies.get("user"));
          _this.logined = true;
          _this.hideModel();
        } else {
          _this.generateCode();
        }
      }, _this.errorHanlder
      );
    },
    LoginWithOutCode() {
      let user_auth = sessionStorage.getItem("user_auth");
      console.log(user_auth);
      if (user_auth != null) {
        let name;
        try {
          name = user_auth ? JSON.parse(user_auth).name : "";
        } catch {
          name = "";
        }
        this.username = name;
        this.password = "123456";
        let _this = this;
        User.Login(this.username, this.password, function (data, response) {
          //console.log(data);
          if (data.login == 1) {
            data.username = _this.username;
            VueCookies.set("user", data);
            //   console.log(VueCookies.get("user"));
            _this.logined = true;
            _this.hideModel();
          } else {
            _this.generateCode();
          }
        }, _this.errorHanlder
        );
      }
    },
    showLogin() {
      //    console.log(VueCookies.get("user"));
      this.generateCode();
      this.code = '';
      this.username = '';
      this.password = '';
      this.loginModel = true;
    },
    OpenNews(item) {
      layer.open({
        // area: ['90vw', '90vh']
        title: [
          item.title,
          "display: flex;flex-direction: column;align-items: flex-start;justify-content: center;font-size:0.9vw; height:3vw; margin: 0 0 0 1vw;",
        ],
        content: item.content + "<br><br>" + item.sender,
        fixed: true,
        type: 1,
        anim: 2,
        resize: false,
        btnAlign: "c",
        shade: 0.7,
        skin: "model-dialog",
        //   , success: success
        btn: ["原始页面", "确定"],
        yes: function (index, layero) {
          window.open(item.webpageUrl);
        },
        cancel: function (index, layero) {
          layer.close(index);
        },
      });
    },
    initNewsCarousel() {
      let _this = this;
      if (
        carousel != null &&
        _this.newsCarousel == null &&
        _this.news.length > 0
      ) {
        let option = {
          elem: "#newsDiv",
          width: "30%", //设置容器宽度
          height: "100%", //设置容器宽度
          arrow: "none", //始终显示箭头 hover  none
          indicator: "outside",
          interval: 5000,
          anim: "fade", //切换动画方式
        };

        _this.newsCarousel = carousel.render(option);
      }
    },
    initSensitiveNewsCarousel() {
      let _this = this;
      //  console.log(_this.sensitiveNews.length);
      //   console.log(_this.sensitiveNews);
      //   console.log(_this.sensitiveNewsCarousel);

      if (
        carousel != null &&
        _this.sensitiveNewsCarousel == null &&
        _this.sensitiveNews.length > 0
      ) {
        _this.sensitiveNewsCarousel = carousel.render({
          elem: "#sensitiveNewsDiv",
          width: "30%", //设置容器宽度
          height: "100%", //设置容器宽度
          arrow: "none", //始终显示箭头 hover  none
          indicator: "outside",
          interval: 5000,
          anim: "fade", //切换动画方式
        });
      }
    },
    initHotArticlesCarousel() {
      let _this = this;
      //  console.log(_this.hotArticles.length);
      //  console.log(_this.hotArticles);
      //  console.log(_this.hotArticlesCarousel);

      if (
        carousel != null &&
        _this.hotArticlesCarousel == null &&
        _this.hotArticles.length > 0
      ) {
        _this.hotArticlesCarousel = carousel.render({
          elem: "#hotArticlesDiv",
          width: "30%", //设置容器宽度
          height: "100%", //设置容器宽度
          arrow: "none", //始终显示箭头 hover  none
          indicator: "outside",
          interval: 5000,
          anim: "fade", //切换动画方式
        });
      }
    },
    LoadData() {
      this.GetPlanCount();
      this.GetEmergencyPlanCount();
      this.GetIncrement();
      this.GetTotoal();
      this.GetNews();
      //   this.GetSensitiveNews();
      //   this.GetHotArticles();
    },
    GetIncrement() {
      let _this = this;
      Plan.GetIncrement(
        function (data, response) {
          console.log(data);
          console.log(data.quantity);

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
        },
        this.errorHanlder
      );
    },
    GetNews() {
      let _this = this;
      News.Get(
        "",
        0,
        "",
        "",
        0,
        20,
        0,
        1,
        function (data, response) {
          console.log(data);
          _this.news = data.yuQingContent;
          _this.loadingNews = false;
          _this.GetSensitiveNews();
        },
        this.errorHanlder
      );
    },
    GetSensitiveNews() {
      let _this = this;
      News.Get(
        "",
        1,
        "",
        "",
        0,
        20,
        0,
        1,
        function (data, response) {
          console.log(data);
          _this.sensitiveNews = data.yuQingContent;
          _this.loadingSensitiveNews = false;
          _this.GetHotArticles();
        },
        this.errorHanlder
      );
    },
    GetHotArticles() {
      let _this = this;
      News.GetHotArticles(
        0,
        20,
        function (data, response) {
          console.log(data);
          _this.hotArticles = data.hotArticleContent;
          _this.loadingHotArticles = false;
        },
        this.errorHanlder
      );
    },
    GetPlanCount() {
      let _this = this;
      Plan.GetPlanCount(
        function (data, response) {
          console.log(data);

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
        },
        this.errorHanlder
      );
    },
    refresh() {
      let _this = this;
      setTimeout(function () {
        _this.LoadData();
        _this.refresh();
      }, this.refreshTime);
    },
    search() {
      if (this.logined) {
        window.location.href = "?page=search&key=" + this.searchText;// "search";
      } else {
        this.showLogin();
      }
    },
    viewAllNews() {
      if (this.logined) {
        window.location.href = "?page=news";
      } else {
        this.showLogin();
      }
    },
    viewAllSensitiveNews() {
      if (this.logined) {
        window.location.href = "?page=sensitivenews";
      } else {
        this.showLogin();
      }
    },
    viewAllHotArticles() {
      if (this.logined) {
        window.location.href = "?page=hotarticles";
      } else {
        this.showLogin();
      }
    },
    openHotArticleSource(item) {
      window.open(item.url);
    },
    hideModel() {
      if (this.loginModel) {
        this.loginModel = false;
        this.code = '';
        this.username = '';
        this.password = '';
      }
    },
  },
};
</script>