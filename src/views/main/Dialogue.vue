<template>
<div class="contain">
  <div class="contain_top">
      <div class="name">
        {{getName}}
      </div>
    <div class="contain_top_right">

    </div>
  </div>


  <div class="chat-main" ref="viewBox">
      <div  class="chat-ls"  v-for="(item,index) in messages" :key="index">
        <div class="chat-time" v-if="item.showTime">
          {{transferTimeFormat(item.time)}}
        </div>
        <!--        对方发来的消息-->
        <div class="msg-m msg-left" v-if="item.userID === dialog_info.fid">
          <img :src="getImgUrl(dialog_info.url)" class="user-img" alt="">
          <div class="msg-text">{{item.message}}</div>
        </div>

        <!--        本用户发来的消息-->
        <div class="msg-m msg-right" v-else>
          <div class="msg-text">{{item.message}}</div>
          <img :src="getImgUrl(imageurl)" class="user-img" alt="">
        </div>

      </div>
  </div>


  <div class="contain_bottom">
      <div class="chat-bar">
        <svg t="1640576220941" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3003" width="18" height="18"><path d="M512 85.333333c235.648 0 426.666667 191.018667 426.666667 426.666667s-191.018667 426.666667-426.666667 426.666667S85.333333 747.648 85.333333 512 276.352 85.333333 512 85.333333z m0 64C311.701333 149.333333 149.333333 311.701333 149.333333 512s162.368 362.666667 362.666667 362.666667 362.666667-162.368 362.666667-362.666667S712.298667 149.333333 512 149.333333z m-145.173333 471.338667A180.970667 180.970667 0 0 0 512 693.333333a180.650667 180.650667 0 0 0 128.746667-53.653333c5.888-5.930667 11.370667-12.266667 16.384-18.944a32 32 0 0 1 51.2 38.421333c-6.784 9.024-14.186667 17.578667-22.122667 25.6A244.629333 244.629333 0 0 1 512 757.333333c-78.208 0-150.357333-36.906667-196.373333-98.261333a32 32 0 1 1 51.2-38.4zM341.333333 384a42.666667 42.666667 0 1 1 0 85.333333 42.666667 42.666667 0 0 1 0-85.333333z m341.333334 0a42.666667 42.666667 0 1 1 0 85.333333 42.666667 42.666667 0 0 1 0-85.333333z" fill="#8a8a8a" p-id="3004"></path></svg>
        <svg t="1640576815451" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4059" width="18" height="18"><path d="M815.020408 167.183673a114.938776 114.938776 0 0 1 114.938776 114.938776v438.857143a114.938776 114.938776 0 0 1-114.938776 114.938775h-606.040816A114.938776 114.938776 0 0 1 94.040816 720.979592v-438.857143A114.938776 114.938776 0 0 1 208.979592 167.183673z m-459.755102 472.732735L221.936327 773.22449h266.637061L355.265306 639.916408z m290.230857-63.007347l-140.07902 124.510041 60.10253 60.081633c3.406367 3.427265 5.872327 7.439673 7.397878 11.723755H815.020408c2.821224 0 5.600653-0.20898 8.317388-0.668735l-177.841633-195.646694zM815.020408 229.877551h-606.040816A52.244898 52.244898 0 0 0 156.734694 282.122449v438.857143c0 8.380082 1.964408 16.300408 5.475265 23.322122l170.882612-170.882612a31.346939 31.346939 0 0 1 41.963102-2.15249l2.382368 2.15249 83.570939 83.591837 165.992489-147.539592a31.346939 31.346939 0 0 1 39.350858-1.880816l2.424163 1.985306 2.256979 2.236081 195.855674 215.45796c0.250776-2.068898 0.376163-4.179592 0.376163-6.290286v-438.857143a52.244898 52.244898 0 0 0-52.244898-52.244898zM344.816327 292.571429a104.489796 104.489796 0 1 1 0 208.979591 104.489796 104.489796 0 0 1 0-208.979591z m0 62.693877a41.795918 41.795918 0 1 0 0 83.591837 41.795918 41.795918 0 0 0 0-83.591837z" fill="#707070" p-id="4060"></path></svg>
        <svg t="1640576852045" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4378" width="18" height="18"><path d="M224 554.666667a32 32 0 0 1 3.072 63.850666L224 618.666667h-21.333333a10.666667 10.666667 0 0 0-10.496 8.746666L192 629.333333v192a53.333333 53.333333 0 0 0 49.834667 53.226667L245.333333 874.666667h533.333334a53.333333 53.333333 0 0 0 53.226666-49.834667L832 821.333333v-192a10.666667 10.666667 0 0 0-8.746667-10.496L821.333333 618.666667h-21.333333a32 32 0 0 1-3.072-63.850667L800 554.666667h21.333333a74.666667 74.666667 0 0 1 74.56 70.570666L896 629.333333v192a117.333333 117.333333 0 0 1-112.618667 117.248L778.666667 938.666667h-533.333334a117.333333 117.333333 0 0 1-117.248-112.618667L128 821.333333v-192a74.666667 74.666667 0 0 1 70.570667-74.56L202.666667 554.666667h21.333333zM512 85.333333c153.045333 0 277.333333 123.946667 277.333333 277.12 0 89.130667-66.986667 217.322667-200.106666 388.821334a99.285333 99.285333 0 0 1-16.213334 16.512 97.28 97.28 0 0 1-138.282666-16.576l-13.610667-17.706667C297.088 570.944 234.666667 448.533333 234.666667 362.496 234.666667 209.28 358.954667 85.333333 512 85.333333z m0 64c-117.930667 0-213.333333 96.597333-213.333333 215.488 0 69.333333 57.536 182.421333 173.44 335.317334l6.4 8.426666a41.749333 41.749333 0 0 0 59.946666 7.274667c2.602667-2.133333 4.970667-4.565333 7.04-7.253333C665.642667 551.36 725.333333 435.413333 725.333333 364.8 725.333333 245.930667 629.930667 149.333333 512 149.333333z m0 106.666667a106.666667 106.666667 0 1 1 0 213.333333 106.666667 106.666667 0 0 1 0-213.333333z m0 64a42.666667 42.666667 0 1 0 0 85.333333 42.666667 42.666667 0 0 0 0-85.333333z" fill="#707070" p-id="4379"></path></svg>
      </div>
      <div class="text">
        <textarea maxlength="50" class="text_content" v-model="textarea_message"></textarea>
      </div>
    <div class="sendBtn">
      <button @click="sendMsg">发送</button>
    </div>
  </div>

</div>
</template>

<script>
import getImage from "commons/getImage";
import getTime from "commons/getTime";
import {postRequest,putRequest,getRequest,deleteRequest} from "../../network/api";
export default {
  name: "Dialogue",
  props:{
    // markName,name,url,fid
    dialog_info: {

    },
    name:{
      default:"于海静"
    },


  },
  data(){
    return {
      textarea_message:"",
      messages:{
        type:Array,

        // default:[
        //   {
        //     id:"a",
        //     imgurl:"24-1639561300182.jpg",
        //     message:"本人发送的一条新消息本人发送的一条新消息本人发送的一条新消息本人发送的一条新消息本人发送的一条新消息本人发送的一条新消息本人发送的一条新消息本人发",
        //     types:0,
        //     time:new Date(),
        //     tip:0,
        //   },
        //   {
        //     id:"b",
        //     imgurl:"24-1639561300182.jpg",
        //     message:"对方发送的一条新消息对方发送的一条新消息对方发送的一条新消息对方发送的一条新消息对方发送的一条新消息对方发送的一条",
        //     types:0,
        //     time:new Date(),
        //     tip:0,
        //   }
        // ]
      },
      imageurl:"",
    }
  },
  computed:{
    getName(){
      if(this.dialog_info.markName===null){
        return this.dialog_info.name
      }else{
        return this.dialog_info.markName
      }
    }
  },
  methods:{
    getImgUrl(url){
      return getImage.getImageUrl('user',url)
    },
    transferTimeFormat(time){
      return getTime.dateTime(time)
    },
    sendMsg(){
      if(this.textarea_message!==''){
        let newMsg = {
          friendID:this.dialog_info.fid,
          userID:this.dialog_info.fid+1,
          message:this.textarea_message,
          time:new Date(),
          types:0,
          state:1
        }
        this.messages.push(newMsg)
        this.$store.state.socket.emit("msg",newMsg);
        console.log(this.messages)
      }
      window.setTimeout(()=>{
        let vB = this.$refs.viewBox
        vB.scrollTop=vB.scrollHeight;
      },500)


    },
    // handleScroll() {
    //   this.viewBox = this.$refs.viewBox;
    //   console.log(this.viewBox.scrollTop, '到头部的距离-------------------')
    //   console.log(this.viewBox.scrollHeight, '滚动条的总高度-------------------')
    // }

  },
  watch:{
    async dialog_info(val){
      this.messages = [];
      //  markName,name,url,fid
      let fid = val.fid;
      const res = await getRequest('/api/friend/getMessageByUid',{fid:fid});
      //friendID,id,message,state,time,types,userID
      this.messages = res.res;
      this.messages[0].showTime = true;
      for(let i=1;i<this.messages.length;i++){
        let diff = Date.parse(this.messages[i].time) - Date.parse(this.messages[i-1].time);
        this.messages[i].showTime = Math.floor(diff / 1000 / 60) >= 5;
      }
      window.setTimeout(()=>{
        let vB = this.$refs.viewBox
        vB.scrollTop=vB.scrollHeight;
      },500)

      // this.$refs.viewBox.scrollTop = this.$refs.viewBox.scrollHeight;
    }
  },
  async mounted() {
    // window.addEventListener('scroll', this.handleScroll, true);  // 监听（绑定）滚轮滚动事件
    this.imageurl = this.$store.state.imgUrl;
    this.$bus.on("imgChange",()=>{
      this.imageurl = getImage.getImageUrl('user',this.$store.state.imgUrl);
    })

    window.setTimeout(()=>{
      let vB = this.$refs.viewBox
      vB.scrollTop=vB.scrollHeight;
    },500)

  },
  async created() {
    this.messages = [];
    //  markName,name,url,fid
    let fid = this.dialog_info.fid;
    const res = await getRequest('/api/friend/getMessageByUid',{fid:fid});
    //friendID,id,message,state,time,types,userID
    this.messages = res.res;
    this.messages[0].showTime = true;
    for(let i=1;i<this.messages.length;i++){
        let diff = Date.parse(this.messages[i].time) - Date.parse(this.messages[i-1].time);
        this.messages[i].showTime = Math.floor(diff / 1000 / 60) >= 5;
    }
    this.$store.state.socket.on('msg',(uid,message,types,time)=>{
      console.log(uid,message,types,time);
      let newMsg = {
        friendID:uid,
        userID:uid+1,
        message:message,
        time:new Date(time),
        types:0,
        state:0
      }
      this.messages.push(newMsg)
      window.setTimeout(()=>{
        let vB = this.$refs.viewBox
        vB.scrollTop=vB.scrollHeight;
      },500)
    })

  }


}
</script>

<style scoped lang="less">
.contain{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .contain_top{
    width: 100%;
    height: 36px;
    border-bottom: 1px solid #eeebeb;
    line-height: 36px;
    .name{
      margin-left: 10px;
      color:black;
    }

  }
  .chat-main{
    flex: 1;
    border-bottom: 1px solid #eeebeb;
    overflow-y: auto;
    .chat-ls{
      //border:1px solid black;
      color: black;
      margin-bottom: 10px;
      .chat-time{
        text-align: center;
        color:#eeebeb
      }
      .msg-m{
        display: flex;
        .user-img{
          width: 25px;
          height: 25px;
          margin: 0 5px;
        }
        .msg-text{
          //border:1px solid red;
          //width: 300px;
          max-width: 300px;
          line-height: 25px;
          background-color: rgba(241, 237, 237, 0.5);
          border-radius: 10px;
          padding:5px
        }
      }
      .msg-left{
        .user-img{
        }

      }
      .msg-right{
        justify-content: flex-end;
      }

    }

  }
  /* 设置滚动条的样式 */
  .chat-main::-webkit-scrollbar {
    width:6px;

  }
  /* 滚动槽 */
  .chat-main::-webkit-scrollbar-track :window-inactive {
    -webkit-box-shadow:inset006pxrgba(0,0,0,0.3);
    border-radius:10px;
    background:rgba(0,0,0,0.1);
  }
  /* 滚动条滑块 */
  .chat-main::-webkit-scrollbar-thumb {
    height: 10px;
    border-radius:5px;
    background:rgba(0,0,0,0.1);
    //background:red;
    -webkit-box-shadow:inset006pxrgba(0,0,0,0.5);
  }
  .chat-main::-webkit-scrollbar-thumb:window-inactive {
    height: 10px;
    background:rgba(0,0,0,0.2);
    //background:green;
  }
  .contain_bottom{
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .chat-bar{
      padding: 2px;
      //border:1px solid #8a8a8a;
      height: 23px;
      width: 100%;
      svg{
        width: 18px;
        height: 18px;
        margin-left: 8px;
        path{
          fill: #6c6c6c;
        }
      }
      svg:hover{
        path{
          fill: #111111;
        }
      }
    }
    .text{
      flex:1;
      padding:5px;
      .text_content{
        height: 32px;
        width: 100%;
        padding:3px;
        background-color: rgba(0,0,0,0);
        outline: none;
        resize: none;
        border:none;

      }
      .text_content:focus{
        border:none;
      }
      /* 设置滚动条的样式 */
      .text_content::-webkit-scrollbar {
        width:0px;

      }
    }
    .sendBtn{

      height: 25px;
      width: 100%;
      button{
        width: 40px;
        height: 18px;
        background-color: #1aad19;
        border:0;
        color:black;
        float:right;
        margin-right: 5px;
        margin-top: 2px;
      }
      button:hover{
        background-color: #189417;
      }
    }

  }


}


</style>