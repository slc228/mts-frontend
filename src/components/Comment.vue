<template>
</template>
<script>

//通过this.$echarts来使用
import { reactive, ref, watch, defineComponent } from "vue";
import Plan from "../model/Plan";
import VueCookies from 'vue-cookies'

export default {
    props: {
    },
    components: {
    },
    created() {
    },
    mounted() {
        this.init();
    },
    updated() { },
    data() {
        return {

        };
    },
    methods: {
        init() {
            let _this = this;
            Plan.GetPlanResults(
                97,
                '',
            "0",
                '',
                " 00:00:00",
                " 00:00:00",
                " 00:00:00",
                " 00:00:00",
                '',
                0,
                100,
                0,
                function (data, response) {
                    console.log(data);
                    console.log(data.yuQingContent);
                },
                _this.errorHanlder
            );

        },
    },
    errorHanlder(error) {
        console.log(error);
    },
};
</script>
