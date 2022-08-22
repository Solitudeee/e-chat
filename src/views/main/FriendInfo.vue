<template>
<div class="friendinfo">

  <div class="friendinfo_top">
    <div class="top_left">
        <div class="name">
            {{fInfo.name}}
        </div>
        <div class="explain">
            {{fInfo.explain}}
        </div>
    </div>
    <div class="top_right">
      <img :src="imgUrl" alt="">
    </div>
  </div>
  <div class="friendinfo_bottom">
    <div class="markname">
      <span>备注</span> {{fInfo.markname}}
    </div>
    <div class="age">
      <span>年龄</span>{{age}}
    </div>
    <div class="phone">
      <span>手机号</span>{{fInfo.phone}}
    </div>
    <div class="phone">
      <span>邮箱</span>{{fInfo.email}}
    </div>
    <div class="time">
      <span>成为好友天数</span>{{becomeFDays}}
    </div>
  </div>
  <button v-if="fInfo.isFriend===0">发消息</button>
</div>
</template>

<script>
import getImage from "commons/getImage";
import getTime from "commons/getTime";
export default {
  name: "FriendInfo",
  props: {
    fInfo: {

    }
  },
  data(){
    return{

    }
  },
  computed:{
    imgUrl(){
      return getImage.getImageUrl('user',this.fInfo.imgurl)
    },
    age(){
      if(this.fInfo.birth){
        return getTime.getAge(this.fInfo.birth)
      }else{
        return "保密"
      }
    },
    becomeFDays(){
      if(this.fInfo.time){
        return getTime.DateDiff(this.fInfo.time)
      }else{
        return "不是好友"
      }
    }

  },
  mounted() {

  }


}
</script>

<style scoped lang="less">
.friendinfo{

  width: 350px;
  margin:150px auto;
  .friendinfo_top{
    height: 60px;
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid #e7e7e7;
    .top_left{

      flex:1;
      .name{
        color:black;
      }
      .explain{
        color: #5e5e5e;
        font-size: 1px;
        margin-top: 10px;
      }
    }
    .top_right{

      width: 56px;
      height: 56px;
      img{
        width: 56px;
        height: 56px;
      }
    }
  }

  .friendinfo_bottom{
    border-bottom: 1px solid #e7e7e7;
    margin-top: 20px;
    padding-bottom: 20px;
    color: black;
    font-size: 2px;
    div{
      margin-top: 10px;
    }
    span{
      color:#5e5e5e;
      margin-right: 5px;
    }
  }
  button{
    width: 100px;
    height: 20px;
    margin:20px 124px;
    background-color: #1aad19;
    border:0;
    color:white;
    font-size: 1px;
  }
  button:hover{
    background-color: #189417;
  }
}
</style>