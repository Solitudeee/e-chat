<template>
<div class="box">

  <tab-bar @toUserInfo="changeUserInfoShow" @getListInfo="getListInfo"></tab-bar>

  <user-info v-if="userInfo_switch"></user-info>

  <div class="contain" v-else>
    <div class="left">
      <div class="search">
        <search @searchData="searchData"></search>
      </div>

      <div class="item-list">
        <list-item v-for="(value,index) in list_data"
                   :fid="value.id"
                   :info_show="value.info_show"
                   :name="value.name"
                   :markName="value.markName"
                   :url="value.imgurl?value.imgurl:''"
                   :time="value.time?value.time:''"
                   :news="value.news?value.news:''"
                   :tip="value.tip?value.tip:''"
                   :isFriend="value.isFriend"
                   :lastTime="value.lastTime"
                   :newMessage="value.newMessage"
                   :newMessageType="value.newMessageType"
                    :info="value"
                    @showFriendInfo="showFriendInfo"
                    @showDialog="showDialog"></list-item>
      </div>
    </div>
    <div class="right">

      <friend-info :fInfo="fInfo" v-if="friendInfo"></friend-info>
      <dialogue :dialog_info="dialog_info" v-if="dialogInfo"></dialogue>


    </div>

  </div>

</div>
</template>

<script>
import TabBar from "./main/TabBar";
import Search from "components/Search";
import ListItem from "components/ListItem";
import UserInfo from "./main/UserInfo";
import {postRequest,putRequest,getRequest,deleteRequest} from "network/api";
import getImage from "../commons/getImage";
import FriendInfo from "./main/FriendInfo";
import Dialogue from "./main/Dialogue";
export default {
  name: "Main",
  setup(){

  },
  components:{
    UserInfo,
    TabBar,
    Search,
    ListItem,
    FriendInfo,
    Dialogue
  },
  data(){
    return{
      info_show:true,
      list_data:[],
      userInfo_switch:false,     //控制用户信息页面的显示和关闭
      file: {}, //上传的文件对象
      progressBar: 0, // 记录上传进度的变量,
      fileList:[],
      imageurl:'',
      fInfo:Object,
      friendInfo:false,
      dialogInfo:false,
      dialog_info:Object,
    }
  },
  methods:{
    searchData(data){
      this.list_data = data;
      this.info_show=false;
    },
    fileSelect(e){
      this.file = e.target.files[0]
    },
    async fileSubmit(){
      const formData = new FormData();
      console.log("this.file:",this.file)
      console.log("name:",new Date().getTime()+window.sessionStorage.getItem('id'))
      formData.append('name',window.sessionStorage.getItem('id')+'-'+new Date().getTime())
      formData.append('url','user');
      formData.append('file',this.file);
      await postRequest('/api/profile',formData,{
        onUploadProgress: (progressEvent)=>{
          let percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
          this.progressBar = percentCompleted
        }}).then(res=>{
          this.imageurl = getImage.getImageUrl('user',res);
          console.log(this.imageurl)
          console.log(res)
      })
    },
    //控制用户信息页面的显示和关闭
    changeUserInfoShow(userInfo_switch){
        this.userInfo_switch =userInfo_switch
    },

    //控制ListItem的显示
    async getListInfo(type){
      switch (type) {
        case "dialogue":
          let res_news = await getRequest('/api/search/news');
          if(res_news.status===200){
            this.list_data = [];
            res_news.newsList.forEach(item=>{
              this.list_data.push({
                'id':item.friendID,
                'info_show':true,
                'imgurl':item.imgurl,
                'lastTime':item.lastTime,
                'newMessage':item.newMessage,
                'newMessageType':item.newMessageType,
                'markName':item.markname,
                'name':item.name,
              })
            })
          }
          console.log("新消息：",res_news)
          break
        case "friend":
          let res_friend = await getRequest('/api/search/friend');
          if(res_friend.status===200){
            this.list_data = [];
              res_friend.result.forEach(item=>{
                this.list_data.push({
                  'id':item.UserSchema.id,
                  'info_show':false,
                  'name':item.UserSchema.name,
                  'imgurl':item.UserSchema.imgurl,
                  'isFriend':item.state,
                  'birth':item.UserSchema.birth,
                  'email':item.UserSchema.email,
                  'explain':item.UserSchema.explain,
                  'lastTime':item.lastTime,
                  'markname':item.UserSchema.markname,
                  'sex':item.UserSchema.sex,
                  'time':item.time,
                  'newMessage':item.newMessage,
                  'newMessageType':item.newMessageType
                })
              })
            console.log(res_friend,this.list_data)
          }else{
            console.log("好友：",res_friend)
          }

          break
        case "group":
          break
      }
    },
    //其他用户信息
    showFriendInfo(fInfo){
      this.fInfo = fInfo;
      this.friendInfo = true;
      this.dialogInfo = false;
    },
    showDialog(dialog_info){
      this.dialog_info = dialog_info;
      this.dialogInfo = true;
      this.friendInfo = false;
    }
  },
  computed:{
    style(){ // 进度条样式
      return {
        width: this.progressBar+"%"
      }
    }
  },
  created() {
    console.log("进入主页面，打开会话连接~")
    // this.$socket.emit("login","于海静");
    // this.$socket.on('msg',(name)=>{
    //   console.log(name)
    //
    // })
  }


}
</script>

<style scoped lang="less">
.box{
  width: 750px;
  height: 480px;
  display: flex;
  justify-content: space-around;
  border-radius: 0;
}
.contain{
  display: flex;
  justify-content: space-around;
  .left{
    width: 180px;
    height: 100%;
    border-right: 1px solid #eeebeb;
    border-left: 1px solid rgba(0,0,0,0);
    //display: flex;
    //flex-direction: column;
    //justify-content: space-around;
    position: relative;
    .search{
      width: 100%;
      height: 36px;
      background-color: rgba(255,255,255,0.3);
    }
    .item-list{
      flex: 1;
      width: 100%;
      height:430px ;
      overflow-y: auto;

    }
    /* 设置滚动条的样式 */
    .item-list::-webkit-scrollbar {
      width:6px;

    }
    /* 滚动槽 */
    .item-list::-webkit-scrollbar-track :window-inactive {
      -webkit-box-shadow:inset006pxrgba(0,0,0,0.3);
      border-radius:10px;
      background:rgba(0,0,0,0.1);
    }
    /* 滚动条滑块 */
    .item-list::-webkit-scrollbar-thumb {
      height: 10px;
      border-radius:5px;
      background:rgba(0,0,0,0.1);
      //background:red;
      -webkit-box-shadow:inset006pxrgba(0,0,0,0.5);
    }
    .item-list::-webkit-scrollbar-thumb:window-inactive {
      height: 10px;
      background:rgba(0,0,0,0.2);
      //background:green;
    }

  }
  .right{
    flex: 1;
  }
}




.progress-wrap {
  width: 300px;
}
.progress-wrap p {
  width: 100%;
}
.progress {
  background-color: #c5c8ce;
  height: 20px;
}
.progress span {
  display: block;
  background-color: #19be6b;
  height: 100%;
  width: 0;
}
</style>