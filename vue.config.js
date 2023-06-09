const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '/publicSentiment/',
  // publicPath: './',
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
         //target: 'http://202.120.40.69:58082', //接口域名
        target: 'http://139.196.185.231:56000/',
      //   target: 'http://192.168.40.32:8082',
        changeOrigin: true,             //是否跨域
         ws: true,                       //是否代理 websockets
        // secure: false,                   //是否https接口
        pathRewrite: {                  //路径重置
          '^/api': ''
        }
      },
      '/er/yuqing': {
         //target: 'http://202.120.40.69:58082', //接口域名
        target: 'http://139.196.185.231:56000/',
      //   target: 'http://192.168.40.32:8082',
        changeOrigin: true,             //是否跨域
         ws: true,                       //是否代理 websockets
        // secure: false,                   //是否https接口
        pathRewrite: {                  //路径重置
          '^/er/yuqing': ''
        }
      },
      '/yuqing': {
         //target: 'http://202.120.40.69:58082', //接口域名
        target: 'http://139.196.185.231:56000/',
      //   target: 'http://192.168.40.32:8082',
        changeOrigin: true,             //是否跨域
         ws: true,                       //是否代理 websockets
        // secure: false,                   //是否https接口
        pathRewrite: {                  //路径重置
          '^/er/yuqing': ''
        }
      },
    }
  }
})

