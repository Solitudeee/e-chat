<template>
<div class="userinfo_box">

  <div class="rest-img">
    <label for="file"></label>
    <input id="file" type="file" style="display:none;" formenctype="multipart/form-data" @change="fileSelect($event)" />
    <img :src="imageurl" alt="" >
  </div>



  <span class="email_box" >邮箱：{{form.email}}</span>
  <span class="time_box">注册时间：{{form.time}}</span>
  <a-form  class="form_box" ref="formRef" :disabled="formDisabled" size="mini" :model="form"  @submit="handleSubmit">

<!--    性别-->
    <a-form-item field="sex" label="性别" >
      <a-radio-group v-model="form.sex">
        <a-radio value="1">男</a-radio>
        <a-radio value="0">女</a-radio>
      </a-radio-group>
    </a-form-item>
<!--昵称-->
    <a-form-item field="name" label="昵称" >
      <a-input v-model="form.name" :style="{width:'200px'}"/>
    </a-form-item>
<!--    手机-->
    <a-form-item field="phone" label="手机号">
      <a-input v-model="form.phone" :style="{width:'200px'}"/>
    </a-form-item>
<!--    出生日期-->
    <a-form-item field="date" label="出生日期">
      <a-date-picker v-model="form.birth" :style="{width:'200px'}"/>
    </a-form-item>
<!--    描述-->
    <a-form-item field="explain" label="个性签名">
      <a-input v-model="form.explain" allow-clear/>
    </a-form-item>
<!--    提交按钮-->
    <a-form-item>
      <a-space>
        <a-button html-type="submit" ref="saveBut">{{saveButLable}}</a-button>
        <a-button class="resetpsw" @click="restPsw()">重置密码</a-button>
      </a-space>
    </a-form-item>

  </a-form>

<!--  重置密码对话框-->
  <a-modal :visible="visible" @ok="handleOk" @cancel="handleCancel" okText="保存" cancelText="取消" unmountOnClose>
    <template #title>
      重置密码
    </template>
    <a-form>
      <a-form-item field="psw" label="密码">
        <a-input-password v-model="resetPSW1" :style="{width:'200px'}" placeholder="请输入密码....." allow-clear/>
      </a-form-item>

      <a-form-item field="psw2" label="确认密码">
        <a-input-password v-model="resetPSW2" :style="{width:'200px'}" placeholder="请再次输入密码....." allow-clear/>
      </a-form-item>
    </a-form>

  </a-modal>


</div>
</template>

<script>
import getImage from "commons/getImage";
import {postRequest,putRequest,getRequest,deleteRequest} from "network/api";
import {Notification} from '@arco-design/web-vue';
export default {
  name: "UserInfo",
  data(){
    return {
      imageurl:'',
      form:{
        name:"",
        sex:"",
        phone:undefined,
        birth:"",
        explain:"无",
        time:"",
        email:"",
      },
      formDisabled:true,
      saveButLable:"修改",
      visible: false,
      resetPSW1:'',
      resetPSW2:'',
    }
  },
  async mounted() {
    if(this.$store.state.imgUrl===""){
      let res = await getRequest('/api/search/userbyid');
      this.imageurl = getImage.getImageUrl('user',res.result.imgurl)
      this.$store.commit('imgUrlChange',res.result.imgurl);
    }else{
      this.imageurl = getImage.getImageUrl('user',this.$store.state.imgUrl);
    }
    this.initData();
  },
  methods:{
    //初始化用户信息
    async initData(){
      let res = await getRequest('/api/search/userbyid');
      console.log(res);
      this.form.name = res.result.name;
      this.form.sex = res.result.sex;
      this.form.phone = res.result.phone;
      this.form.birth = res.result.birth;
      this.form.explain = res.result.explain;
      this.form.time = res.result.time;
      this.form.email = res.result.email;
    },
    //更新用户信息
    async handleSubmit(){
        this.formDisabled = !this.formDisabled;
        this.saveButLable = this.formDisabled ? "修改":"保存" ;
        if(this.formDisabled){
          let res = await postRequest("/api/user/updateUserInfo",{
              sex:this.form.sex,
              name:this.form.name,
              birth:this.form.birth,
              explain:this.form.explain,
              phone:this.form.phone
          });
          if(res.status === 200){
            Notification.success('修改成功!');
          }else{
            Notification.warning("修改失败！");
          }
        }

    },
    //显示修改密码弹窗
    restPsw(){
      this.visible = true
    },
    handleClick2(){
      this.$modal({});
    },
    //修改密码
    async handleOk() {
      if (!this.resetPSW1 || !this.resetPSW2){
        Notification.error('请输入新密码！');
      }else if(! (this.resetPSW1 === this.resetPSW2)){
        Notification.error('两次密码输入不一致!');
      }else{
        let res = await postRequest('/api/user/updateUserPsw',{
          uid:window.sessionStorage.getItem("id"),
          psw:this.resetPSW1,
        });
        if(res.status === 200){
          Notification.success('修改成功!');
          this.visible = false;
          this.resetPSW1 = '';
          this.resetPSW2 = '';
        }else{
          Notification.error('失败，请重试!');
        }

      }

    },
    //取消修改密码
    handleCancel() {
      this.visible = false;
      this.resetPSW1 = '';
      this.resetPSW2 = '';
    },
    //修改头像
    async fileSelect(e){
      const formData = new FormData();
      formData.append('name','-'+new Date().getTime())
      formData.append('url','user');
      formData.append('file',e.target.files[0]);
      await postRequest('/api/profile',formData).then(res=>{
        this.imageurl = getImage.getImageUrl('user',res.url);
        this.$store.commit('imgUrlChange',res.url);
        this.$bus.emit("imgChange");


      })
    },
  },
}
</script>

<style scoped lang="less">
.userinfo_box{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  color:black;
  .rest-img{
    width: 80px;
    height: 80px;
    margin-left: 20px;
    margin-top: 10px;
    position: relative;
    label{
      display: inline-block;
      width: 80px;
      height: 80px;
      position: absolute;
      top:0;
      left: 0;
      z-index: 1;
    }
    img{
      width: 80px;
      height: 80px;
      border-radius: 50%;

      position: absolute;
      top:0;
      left: 0;
    }
  }

  .email_box,.time_box{
    margin-left: 115px;
    margin-top: 10px;
  }
  .form_box{
    width: 550px;
    margin-top: 20px;
  }

  .resetpsw{
    margin-left: 80px;
  }

}
</style>