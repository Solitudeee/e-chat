import {postRequest,putRequest,getRequest,deleteRequest} from "./api";
import {Notification,Alert} from '@arco-design/web-vue';

//登录
export function validationUser(account,psw){
    const param = {
        account:account,
        psw:psw,
    }
    // return getRequest('api/test1')
    return postRequest('/api/signin/match',param)
}

export function judgeEmail(email){
    const param = {
        email:email,
    }
    postRequest('/api/signup/judge',param).then(resp=>{
        if(resp){
            return resp.status
        }
    })
    return null
}


//邮箱验证码   2604338508@qq.com   yqygluck@163.com    3474248019@qq.com
export function sendCode(email){
    const param = {
        email:email,
    }
    return postRequest('/api/signup/judge',param).then(resp=>{
        if(resp){
            console.log("邮箱可以注册！");
            return postRequest('/api/mail',param);
        }else{
            Notification.error("邮箱已被注册!");
            console.log("邮箱已被注册")
        }
        return resp
    }).then(resp=>{
        if(resp){
            console.log("验证码是：",resp)
            return resp
        }
    })

}


export function signUp(user){
    return postRequest('/api/signup/add',user).then(resp=>{
        return resp
    })
}



