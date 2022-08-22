let proxyObj = {}
proxyObj['/api'] = {
    //websocket
    ws:true,
    //目标地址
    // target:'http://localhost:3030',
    target:'http://49.233.30.233:3030',
    //发送请求头host会被设置为target
    changeOrigin:true,
    //不重写
    pathRewrite:{
        '^/api':'/'
    }
}

module.exports = {
    devServer:{
        host:'localhost',
        // host:'49.233.30.233',
        port:8080,
        proxy:proxyObj,
    },
    configureWebpack:{
        resolve:{
            extensions:[],  //配置后缀名
            alias:{        //配置别名
                // '@':'src'    //这个不用配，自带的有
                'assets':'@/assets',
                'components':'@/components',
                'network':'@/network',
                'views':'@/views',
                'commons':'@/commons'
            }
        },
        performance:{
            "maxEntrypointSize": 10000000,
            "maxAssetSize": 30000000
        }
    },
}

