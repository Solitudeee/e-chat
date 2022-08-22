import axios from 'axios';
import router from '../router'
// axios.defaults.baseUrl = 'http://localhost:3030'
axios.defaults.baseUrl = '49.233.30.233:8005'

//请求拦截器
axios.interceptors.request.use(config=>{
    //如果存在这个token,请求携带这个token
    // if(window.sessionStorage.getItem('tokenStr')){
    //     config.headers['Authorization'] = window.sessionStorage.getItem('tokenStr');
    // }
    return config;
},error=>{
    console.log(error)
})
//响应拦截器
axios.interceptors.response.use(success=>{
    //token不对
    console.log("响应拦截处",success.data.status)
    if(success.data.status === 401){
        console.log("得跳转~~~~~~~~~~")
        router.replace("/signin")
    }
    //业务逻辑错误
    if(success.status && success.status===200){
        // console.log("打印状态码：",success.status)
        if(success.data.code === 500 || success.data.code === 401 ||success.data.code === 403){

            return ;
        }
        if(success.data.message){
            // Message.success({message:success.data.message});
        }
    }
    return success.data
},error => {
    console.log(error)
});

//传送json格式的post请求  用来增加资源
export const postRequest = (url,params)=>{
    return axios({
        method:'post',
        url:url,
        data:params
    })
}

//传送json的put请求  用来改资源
export const putRequest = (url,params)=>{
    return axios({
        method:'put',
        url:url,
        data:params
    })
}


//传送json的get请求
// export const getRequest = (url,params)=>{
//     console.log(params)
//     return axios({
//         method:'get',
//         url:url,
//         params:params,
//     })
// }


export const getRequest = (url,params)=>{
    return axios.get(url,{
        params,
    })
}

//传送json的delete请求
export const deleteRequest = (url,params)=>{
    return axios({
        method:'delete',
        url:url,
        data:params
    })
}