const {defineConfig} = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const {ElementPlusResolver} = require('unplugin-vue-components/resolvers')

module.exports = defineConfig({
    transpileDependencies: true,
    // 打包路径
    // publicPath: './',
    // 导入element-plus
    configureWebpack: {
        plugins: [
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
        ],
    },
    // 解决跨域问题
    devServer: {
        open: true,
        // https: true,
        proxy: {
            '/api': {
                target: 'http://192.168.149.196:8080/', // 192.168.100.196
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/static-data': {
                target: 'https://static-data.gaokao.cn/',
                changeOrigin: true,
                pathRewrite: {
                    '^/static-data': ''
                }
            },
            '/voice': {
                target: 'https://dict.youdao.com/',
                changeOrigin: true,
                pathRewrite: {
                    '^/voice': ''
                }
            },
            '/voice2': {
                target: 'https://web-yuban-tlias.oss-cn-shenzhen.aliyuncs.com/',
                changeOrigin: true,
                pathRewrite: {
                    '^/voice2': ''
                }
            },
            'translate': {
                target: 'https://itrans.xfyun.cn/',
                changeOrigin: true,
                pathRewrite: {
                    '^/translate': '/v2/its'
                }
            },
        }
    }
})
