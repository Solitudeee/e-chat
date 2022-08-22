<template>
<div class="listitem-box">
  <div class="image">
    <span class="tip" v-show="tip">{{tip}}</span>
    <img :src="imageUrl" alt="">
  </div>

  <div v-if="info_show" class="content_dialogue" @click="showDialog">
    <div class="content_top">
      <span class="name">
            {{getName}}
      </span>
      <span class="time">
            {{getTime}}
      </span>
    </div>
    <div class="news">
        {{newMessage}}
    </div>
  </div>

  <div v-else class="content_info" @click="showFriendInfo">
    <span class="span1">{{name}}</span>
    <span class="span2" @click="addFriend()">{{relation}}</span>
<!--    <span class="span2">{{relation}}</span>-->
  </div>

</div>
</template>

<script>
import {postRequest,putRequest,getRequest,deleteRequest} from "network/api";
import getImage from "commons/getImage";
import getTime from "commons/getTime";
export default {
  name: "ListItem",
  props:{
    //true代表是对话信息，false代表用户信息
    info_show:{
      default:true,
    },
    fid:{

    },
    name:{
      default:''
    },
    markName:{
      default:''
    },
    url:{
      default:''
    },
    time:{
      default:''
    },
    lastTime:{
      default:''
    },
    newMessage:{
      default:'哈哈哈'
    },
    newMessageType:{
      default:0
    },
    tip:{
      default:0
    },
    isFriend:{
      default:5
    },
    info:{
      default:[]
    }
  },
  data(){
    return{
      relation:"",
      imageUrl:"~assets/image/avatar/avatar_cat.jpg"
    }
  },
  mounted() {
    // console.log(this.isFriend)   //3不是好友   2已经申请添加好友  0已是好友   1申请中
    if(this.isFriend===3){
        this.relation="添加好友"
      }else if(this.isFriend===2){
        this.relation="已经申请"
      }else if(this.isFriend===0){
        this.relation='删除好友';
      }else if(this.isFriend===1){
      this.relation='同意添加';
    }
    this.imageUrl=getImage.getImageUrl("user",this.url);
  },
  methods:{
    async addFriend(){
      if(this.isFriend === 0){
        //当前已是好友，点击后删除好友
        const res = await postRequest('/api/friend/deletefriend',{
          fid:this.fid,
          state:3
        })
        if(res.status===200){
          this.relation="添加好友"
        }
      }else if(this.isFriend === 1){
        //对方请求添加好友，点击后成为好友
        const res = await postRequest('/api/friend/updatefriendstate',{
          fid:this.fid,
          state:0
        })
        if(res.status===200){
          this.relation="删除好友"
          this.isFriend === 0
        }
      }else if(this.isFriend === 2){

      }else if(this.isFriend === 3){
        //当前不是好友，点击后申请添加好友
        const res = await postRequest('/api/friend/applyfriend',{
          fid:this.fid,
          msg:"请求添加好友！",
        })
        if(res.status===200){
          this.relation="已经申请"
        }
      }

    },
    showFriendInfo(){
      this.$emit("showFriendInfo",this.info)
    },
    showDialog(){
      let dialog_info={
        markName:this.markName,
        name:this.name,
        url:this.url,
        fid:this.fid,
      }
      this.$emit("showDialog",dialog_info)
    }
  },
  computed:{
    getTime(){
      return getTime.dateTime(this.lastTime)
    },
    getName(){

      if(this.markName===null){
        return this.name
      }else{
        return this.markName
      }
    }
  }

}
</script>

<style scoped lang="less">
.listitem-box{
  height: 50px;
  width: 100%;
  //border:1px solid black;
  display: flex;
  padding: 5px;
  background-color: rgba(233,233,233,0.2);
  .image{
    width: 35px;
    height: 35px;
    position: relative;
    .tip{
      position:absolute;
      z-index: 10;
      top: -6px;
      left: 22px;
      min-width: 17px;
      height: 17px;
      background:red;
      border-radius: 50%;
      font-size:1px;
      color: white;
      line-height: 16px;
      text-align: center;
    }
    img{
      width: 35px;
      height: 35px;
    }
  }
  .content_dialogue{
    //border:1px solid red;
    flex:1;
    margin-left: 5px;
    height: 35px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 1px;
    .content_top{
      //border:1px solid yellow;
      position: relative;
      height: 14px;
      .name{
        display: inline-block;
        width: 63px;
        color:black;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        font-size: 2px;
      }
      .time{
        display: inline-block;
        width: 63px;
        position: absolute;
        top:0;
        right: 0;
        color:gray;
      }
    }
    .news{
      height: 21px;
      line-height: 21px;
      flex:1;
      color:gray;
      //border: 1px solid green;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      font-size: 1px;

    }
  }

  .content_info{
    //border:1px solid pink;
    flex:1;
    margin-left: 5px;
    height: 35px;
    line-height: 35px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 2px;
    color:black;
    .span1{
      //border:1px solid red;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
    .span2{
      //border:1px solid blue;
      color: #5e5e5e;
    }
    .span2:hover{
      color: black;
    }
  }
}
.listitem-box:hover{
  background-color: rgba(233,233,233,0.4);
}
</style>