<template>
 <Search :key="key"/>
</template>

<script>
// @ is an alias to /src    <Menu />

import Search from "@/components/Search.vue";

export default {
  components: {
    Search,
  },
   props: {
        key: { // 默认注册码
            type: String,
            default: ''
        },
    },
    mounted() {
      console.log(this.key);
    }
};
</script>