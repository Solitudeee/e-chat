<template>
  <div class="contain">
    <div style="border:1px solid rgba(1,1,1,0)"></div>
    <a-form class="su-form" ref="formRef" size="small" :model="form" :style="{width:'420px'}" @submit="handleSubmit">
      <a-form-item field="email" label="邮箱"
                   :rules="[{required:true,message:'请输入邮箱'}]"
                   :validate-trigger="['change','input']">
        <a-input v-model="form.email" placeholder="请输入邮箱...." :style="{width:'200px'}"  />
        <a-button class="send-code" type="primary" size="small" shape="round" @click="sendCode()">发送验证码</a-button>
      </a-form-item>

      <a-form-item field="name" label="用户名"
                   :rules="[{required:true,message:'请输入用户名'}]"
                   :validate-trigger="['change','input']">
        <a-input v-model="form.name" placeholder="请输入用户名...."  :style="{width:'200px'}" />
      </a-form-item>

      <a-form-item field="psw" label="密码"
                   :rules="[{required:true,message:'请输入密码！'}]" :validate-trigger="['change','input']">
        <a-input-password v-model="form.psw" :style="{width:'200px'}" placeholder="请输入密码....." allow-clear/>
      </a-form-item>

      <a-form-item field="psw2" label="确认密码"
                   :rules="[{required:true,message:'请再次输入密码！'},{match:new RegExp('^'+form.psw+'$'),message:'两次输入密码不同！'}]" :validate-trigger="['change','input']">
        <a-input-password v-model="form.psw2" :style="{width:'200px'}" placeholder="请再次输入密码....." allow-clear/>
      </a-form-item>


      <a-form-item field="code" label="验证码"
                   :rules="[{required:true,message:'请输入验证码！'},{match:new RegExp('^'+form.e_code+'$'),message:'验证码错误！'}]"
                   :validate-trigger="['blur']">
        <a-input v-model="form.code" placeholder="请输入验证码...."  :style="{width:'200px'}" />
      </a-form-item>

      <a-form-item>
        <a-space>
          <a-button html-type="submit">提交</a-button>
          <a-button @click="$refs.formRef.resetFields()">重置</a-button>
          <a-button @click="fanhui()">返回</a-button>
        </a-space>
      </a-form-item>
    </a-form>
<!--    {{ form }}-->

  </div>
</template>

<script>
import {judgeEmail, sendCode,signUp} from '../../network/sign'
import {Notification} from '@arco-design/web-vue';
export default {
  name: "signIn",
  data() {
    return {
      form: {
        email:'',
        name: '',
        psw:'',
        psw2:'',
        code:'',
        e_code:''
      },

    }
  },
  methods: {
    //发送验证码
    sendCode(){
      if(this.form.email !== ''){
        sendCode(this.form.email).then((res)=>{
          console.log("是这里吗？",res)
          this.form.e_code = res;
          Notification.success('邮件已发送！')
        })
      }
    },
    //确认注册
    handleSubmit({ values, errors }) {
      console.log('values:', values, '\nerrors:', errors);
      if(errors === undefined){
        if(values.code.length){
          let user = {
            email:values.email,
            name:values.name,
            psw: values.psw
          }
          signUp(user).then(res=>{
            if(res){
              Notification.success('注册成功!')
            }else{
              Notification.success('注册失败!')
            }
          })
        }
      }

    },

    //返回
    fanhui(){
      this.$router.go(-1);
    }

  }

}
</script>

<style scoped>
.contain{
  width: 500px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.su-form{
  margin:200px auto;

}
.send-code{
  font-size: 2px;
  width: 10px;
  height: 10px;
  background-color: rgba(1,1,1,0);
}
.send-code:hover{
  font-size: 2px;
  width: 10px;
  height: 10px;
  color:silver;
  background-color: rgba(1,1,1,0);
}
</style>