<template>
  <div class="fix-box">

    <div class="in-box">
<!--      <div class="ico"></div>-->
      <img src="~assets/image/search/search1.svg" alt="">
      <input class="search" v-model="keys" type="text" placeholder="搜索" @blur="submit()" @keydown="submit_fromKey($event)">
    </div>

  </div>
</template>

<script>
import {postRequest,putRequest,getRequest,deleteRequest} from "network/api";
export default {
  name: "Search",
  data(){
    return{
      keys:'',
    }
  },
  methods:{
    submit(){
      // console.log("去服务器找",this.keys);
      // this.keys='';
    },
    async submit_fromKey(event){
      if(event.keyCode===13){
        if(this.keys){
          const res = await this.getUser(this.keys);
          this.$emit('searchData',res);
        }else{
          this.$emit('searchData',[]);
        }

      }
    },
    async getUser(keys){
      const res = await getRequest('/api/search/user',{
        data:keys,
      });
      res.data.forEach((e)=>{
        e['info_show'] = false;

      })
      return res.data
    },
    async getGroup(keys){
      const res = await getRequest('/api/search/group',{
        data:keys,
      });
      return res.data
    }
  }
}
</script>

<style scoped lang="less">
.fix-box{
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}
.in-box{
  height:18px ;
  width: 90%;
  display: flex;
  padding: 2px;
  justify-content: space-between;
  background-color: #eeebeb;
  border-radius: 4px;
  border:1px solid #7d7d7f;
  img{
    width: 12px;
    height: 12px;
  }
}

.search{
  background-color: #eeebeb;
  border:none;
  border-radius: 4px;
  height:100% ;
  flex: 1;
  padding: 3px;
  font-size: 2px;
  outline: none;
}
input::-webkit-input-placeholder {
  /* placeholder颜色 */
  color: #aab2bd;
  /* placeholder字体大小 */
  font-size: 1px;
}







</style>