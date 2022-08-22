<template>
  <div class="contain">
    <div style="border:1px solid rgba(1,1,1,0)"></div>
    <a-form class="si-form" ref="formRef"  :model="form"  @submit="handleSubmit" size="small">
      <a-form-item ref="account_ref" field="account" label="账号" :style="{width:'200px'}"
                   :rules="[{required:true,message:'请输入账号！'},]"
                   :validate-trigger="['change','input']"
      >
        <a-input v-model="form.account" placeholder="请输入用户名/邮箱...." />
      </a-form-item>
      <a-form-item field="psw" label="密码"
                   :rules="[{required:true,message:'请输入密码！'}]" :validate-trigger="['change','input']">
        <a-input-password v-model="form.psw" :style="{width:'200px'}" placeholder="请输入密码....." allow-clear/>
      </a-form-item>

      <a-form-item>
        <a-space>
          <a-button html-type="submit">登录</a-button>
          <a-button @click="$refs.formRef.resetFields()" >重置</a-button>
        </a-space>
      </a-form-item>

    </a-form>

  </div>

</template>

<script>
import {validationUser} from '../../network/sign';
import {Notification} from '@arco-design/web-vue';
import {postRequest,putRequest,getRequest,deleteRequest} from "network/api";
export default {
  name: "signIn",
  data() {
    return {
      form: {
        account: '1036700477@qq.com',
        psw:'888',
      },
    }
  },
  methods: {
    async handleSubmit({ values, errors }) {
      console.log('values:', values, '\nerrors:', errors)
      if(errors === undefined){
        const res = await validationUser(values.account,values.psw)
        console.log(res)
        if(res.status === 200){
          Notification.success('登录成功!')
          this.$store.dispatch("initData").then(res=>{
            console.log("初始化用户成功！")
          }).catch(err=>{
            console.log("初始化用户失败！错误：",err)
          })
          this.$store.commit('imgUrlChange',res.data.imgurl);
          let path = this.$route.query.redirect;
          // this.$router.replace('/main')
          this.$router.replace((path == '/' || path == undefined) ? '/main' : path)
          this.$store.commit('setSocket',this.$io('ws://49.233.30.233:8005',{
            withCredentials:true
          }));   //建立会话
          this.$store.state.socket.emit("login");
        }else if(res.status === 201){
          Notification.success("密码错误！")
        }else if(res.status === 202){
          Notification.success("用户不存在！")
        }
      }
    }
  }
}
</script>

<style scoped>

.contain{
  width: 350px;
  height: 300px;

  display: flex;
  justify-content: center;
  align-items: center;
}


</style>