import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';

import mitt from "mitt";

import {postRequest,putRequest,getRequest,deleteRequest} from "./network/api.js";

//引入socket模块
import io from 'socket.io-client'


const app = createApp(App)
// app.config.globalProperties.$baseUrl = "https://localhost:3030/";
// app.config.globalProperties.$socket = io('http://localhost:3030');
app.config.globalProperties.$io = io;

// console.log(io('http://localhost:3030'))


// const socket = io('http://localhost:8000');


app.use(store).use(router).use(ArcoVue, {
    // 用于改变使用组件时的前缀名称
    componentPrefix: 'a'
}).mount('#app')


app.config.globalProperties.$bus = mitt();



router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        getRequest('/api/user/initUserInfo').then(res=>{
            if(res.status === 401){
                console.log("跳转到登录页")
                next({
                    path: '/signin',
                    query: { redirect: to.fullPath }
                })
            }else{
                store.commit('imgUrlChange',res.result.imgurl);
                store.commit('initUser',{
                    name:res.result.name,
                    imgUrl:res.result.imgurl,
                    email:res.result.email,
                    sex:res.result.sex,
                    birth:res.result.birth,
                    phone:res.result.phone,
                    explain:res.result.explain,
                    time:res.result.time
                });
                store.commit('setSocket',io('ws://49.233.30.233:8005',{
                    withCredentials:true
                }));   //建立会话
                store.state.socket.emit("login");
                next();
            }
        })
    } else {
        next() // 确保一定要调用 next()
    }
});


