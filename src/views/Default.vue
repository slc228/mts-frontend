<template>
  <Index v-if="page == null || page == 'index'" />
        <Dashboard v-if="page == 'dashboard'" />
  <div v-if="page != null && page != 'index' && page != 'dashboard'" style="
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      width: 100%;
      height: 100%;
    ">
    <!-- <div style="
      width: 100%;
      height: 4vw;
      flex-shrink:0
    ">
      <Header v-if="page != null && page != 'index' && page != 'dashboard'" />
    </div> -->
    <div style="
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: flex-start;
      width: 100%;
      height: 96vw;
    ">
      <div style="
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      width: 10%;
      height: 100%;
      flex-shrink:0
    ">
        <Menu v-if="page != null && page != 'index' && page != 'dashboard'" :page="page" />
      </div>
      <div style="
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      width: 90%;
      height: 100%;
    ">
      <!--  <Library v-if="page == 'library'" />-->
        <News v-if="page == 'news'" />
        <SensitiveNews v-if="page == 'sensitivenews'" />
        <HotArticles v-if="page == 'hotarticles'" />
        <Topic v-if="page == 'topic'" />
        <Warning v-if="page == 'warning'" />
        <System v-if="page == 'system'" />
        <SensitiveKeywords v-if="page == 'sensitivekeywords'" />
        <Search v-if="page == 'search'" :keywordText="key" />
        <Report v-if="page == 'report'" />
        <Plan v-if="page == 'plan'" :category="category" :selectedPlanId="key"/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src    <Menu />

import Index from "@/components/Index.vue";
import Warning from "@/components/Warning.vue";
import System from "@/components/System.vue";
import SensitiveKeywords from "@/components/SensitiveKeywords.vue";
import Search from "@/components/Search.vue";
import Report from "@/components/Report.vue";
import Plan from "@/components/Plan.vue";
import Header from "@/components/Header.vue";
import Menu from "@/components/Menu.vue";
import News from "@/components/News.vue";
import SensitiveNews from "@/components/SensitiveNews.vue";
import HotArticles from "@/components/HotArticles.vue";
import Topic from "@/components/Topic.vue";
//import Library from "@/components/Library.vue";
import Dashboard from "@/components/DashBoard.vue";

export default {
  components: {
    Index,
    Warning,
    System,
    SensitiveKeywords,
    Search,
    Report,
    Plan,
    Header,
    Menu,
    News,
    SensitiveNews,
    HotArticles,
    Topic,
    Dashboard,
  //  Library,
  },
  data() {
    return {
      page: null,
      key: "",
      category: ""
    };
  },
  beforeMount() {
    this.page = this.$router.currentRoute.value.query.page;

    this.key = this.$router.currentRoute.value.query.key;
      if (this.key == null) {
        this.key = "";
      }
    this.category = this.$router.currentRoute.value.query.category;
      if (this.category == null) {
        this.category = "";
      } 
      this.key = this.$router.currentRoute.value.query.key;
      if (this.key == null) {
        this.key = "";
      }

  },
};
</script>