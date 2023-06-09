<template>
    <canvas id="codeCanvas" :width="width" :height="height" @click="generateCode" style="cursor:pointer;"></canvas>
</template>
<script>
import { getCurrentInstance } from "vue";

export default {
    name: 'SIdentify',
    props: {
        /*     identifyCode: { // 默认注册码
                 type: String,
                 default: '1234'
             },*/
        codeLength: { // 默认注册码
            type: Number,
            default: 4
        },
        fontSizeMin: { // 字体最小值
            type: Number,
            default: 25
        },
        fontSizeMax: { // 字体最大值
            type: Number,
            default: 35
        },
        backgroundColorMin: { // 验证码图片背景色最小值
            type: Number,
            default: 200
        },
        backgroundColorMax: { // 验证码图片背景色最大值
            type: Number,
            default: 220
        },
        dotColorMin: { // 背景干扰点最小值
            type: Number,
            default: 60
        },
        dotColorMax: { // 背景干扰点最大值
            type: Number,
            default: 120
        },
        width: { // 容器宽度
            type: Number,
            default: 90
        },
        height: { // 容器高度
            type: Number,
            default: 38
        },
    },
    setup(props, context) {
        const instance = getCurrentInstance();

        return {
            getCode() {
                return this.code;
            },
            // 生成一个随机数
            randomNum(min, max) {
                return Math.floor(Math.random() * (max - min) + min)
            },
            // 生成一个随机的颜色
            randomColor(min, max) {
                let r = this.randomNum(min, max)
                let g = this.randomNum(min, max)
                let b = this.randomNum(min, max)
                return 'rgb(' + r + ',' + g + ',' + b + ')'
            },
            generateCode() {
                let data = instance.data;
                data.code = '';
                let canvas = document.getElementById('codeCanvas')
                let ctx = canvas.getContext('2d')
                ctx.textBaseline = 'bottom'
                // 绘制背景
                ctx.fillStyle = '#e6ecfd'
                ctx.fillRect(0, 0, props.width, props.height)
                // 绘制文字
                //  for (let i = 0; i < this.identifyCode.length; i++) {
                for (let i = 0; i < props.codeLength; i++) {
                    //    this.drawText(ctx, this.identifyCode[i], i)
                    let code = data.codeLetter[this.randomNum(0, data.codeLetter.length)];
                //    console.log(code);
                    data.code += code;
                    this.drawText(ctx, code, i)
                }
             //   console.log(data.code);
                this.drawLine(ctx)
                this.drawDot(ctx)
            },

            drawText(ctx, txt, i) {
                ctx.fillStyle = this.randomColor(50, 160) // 随机生成字体颜色
                ctx.font = this.randomNum(props.fontSizeMin, props.fontSizeMax) + 'px SimHei' // 随机生成字体大小
                //   let x = (i + 1) * (this.width / (this.identifyCode.length + 1))
                let x = (i + 1) * (props.width / (props.codeLength + 1));
                let y = this.randomNum(props.fontSizeMax, props.height - 5)
                var deg = this.randomNum(-30, 30)
                // 修改坐标原点和旋转角度
                ctx.translate(x, y)
                ctx.rotate(deg * Math.PI / 180)
                ctx.fillText(txt, 0, 0)
                // 恢复坐标原点和旋转角度
                ctx.rotate(-deg * Math.PI / 180)
                ctx.translate(-x, -y)
            },

            drawLine(ctx) {
                // 绘制干扰线
                for (let i = 0; i < 4; i++) {
                    ctx.strokeStyle = this.randomColor(100, 200)
                    ctx.beginPath()
                    ctx.moveTo(this.randomNum(0, props.width), this.randomNum(0, props.height))
                    ctx.lineTo(this.randomNum(0, props.width), this.randomNum(0, props.height))
                    ctx.stroke()
                }
            },

            drawDot(ctx) {
                // 绘制干扰点
                for (let i = 0; i < 30; i++) {
                    ctx.fillStyle = this.randomColor(0, 255)
                    ctx.beginPath()
                    ctx.arc(this.randomNum(0, props.width), this.randomNum(0, props.height), 1, 0, 2 * Math.PI)
                    ctx.fill()
                }
            }
        }
    },
    data() {
        return {
            codeLetter: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
            code: '',
        };
    },
    methods: {

    },
    watch: {
        /*  identifyCode() {
              this.generateCode()
          }*/
    },
    mounted() {
        this.generateCode()
    }
}
</script>