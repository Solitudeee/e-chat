<template>
  <div class="bar">
    <div class="bar_top">
      <img :src="imageurl" alt="" @click="imgClick()">

      <!--        :style="{border:'1px solid red'}"-->

      <div class="dialogue" @click="getDialogue()">
        <bar-item :isActivate="dialogueActivate">
          <template v-slot:item-icon>
            <a-space size="large">
              <icon-message class="defaultColor" :style="{fontSize:'28px',color:'grey'}"/>
            </a-space>
          </template>

          <template v-slot:item-icon-active>
            <a-space size="large">
              <icon-message :style="{fontSize:'28px',color:'#eeebeb'}"/>
            </a-space>
          </template>
        </bar-item>
      </div  >

      <div class="friend" @click="getFriend()">
        <bar-item :isActivate="friendActivate">
          <template v-slot:item-icon>
            <a-space size="large">
              <icon-user :style="{fontSize:'28px',color:'grey'}"/>
            </a-space>
          </template>

          <template v-slot:item-icon-active>
            <a-space size="large">
              <icon-user :style="{fontSize:'28px',color:'#eeebeb'}"/>
            </a-space>
          </template>
        </bar-item>
      </div>

      <div class="group" @click="getGroup()">
        <bar-item :isActivate="groupActivate">
          <template v-slot:item-icon>
            <a-space size="large">
              <icon-user-group :style="{fontSize:'28px',color:'grey'}"/>
            </a-space>
          </template>

          <template v-slot:item-icon-active>
            <a-space size="large">
              <icon-user-group :style="{fontSize:'28px',color:'#eeebeb'}"/>
            </a-space>
          </template>
        </bar-item>
      </div>

    </div>
    <div class="bar_bottom">
      我是下面的
    </div>
  </div>
</template>

<script>
import BarItem from "components/BarItem";
import {IconMessage,IconUser,IconUserGroup} from '@arco-design/web-vue/es/icon';
import {postRequest,putRequest,getRequest,deleteRequest} from "network/api";
import getImage from "commons/getImage";
export default {
  name: "TabBar",
  components:{
    BarItem,
    IconMessage,
    IconUser,
    IconUserGroup
  },
  data(){
    return{
      dialogueActivate:false,
      friendActivate:false,
      groupActivate:false,
      imageurl:"",
    }
  },
  async mounted() {
    this.$bus.on("imgChange",()=>{
      this.imageurl = getImage.getImageUrl('user',this.$store.state.imgUrl);
    })
    if(this.$store.state.imgUrl===""){
      let res = await getRequest('/api/search/userbyid');
      this.imageurl = getImage.getImageUrl('user',res.result.imgurl)
      this.$store.commit('imgUrlChange',res.result.imgurl);
    }else{
      this.imageurl = getImage.getImageUrl('user',this.$store.state.imgUrl);
    }
  },
  methods:{
    imgClick(){
      this.dialogueActivate=false;
      this.friendActivate = false;
      this.groupActivate = false;
      this.$emit("toUserInfo",true);
    },
    getDialogue(){
      this.dialogueActivate=true;
      this.friendActivate = false;
      this.groupActivate = false;
      this.$emit("toUserInfo",false);
      this.$emit("getListInfo",'dialogue')
    },
    getFriend(){
      this.dialogueActivate=false;
      this.friendActivate = true;
      this.groupActivate = false;
      this.$emit("toUserInfo",false);
      this.$emit("getListInfo",'friend');
    },
    getGroup(){
      this.dialogueActivate=false;
      this.friendActivate = false;
      this.groupActivate = true;
      this.$emit("toUserInfo",false)
      this.$emit("getListInfo",'group');
    }
  }
}
</script>

<style scoped lang="less">
.bar{
  color: #eeebeb;
  border-right: 1px solid #eeebeb;
  border-left: 1px solid rgba(0,0,0,0);
  width: 45px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
.bar_top{
  width: 100%;
  height: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
img{
  width: 32px;
  height: 32px;
  margin-top: 25px;

}
.dialogue,.friend,.group{
  margin-top: 20px;
}

}
}
</style>