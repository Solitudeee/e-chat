import { createStore } from 'vuex'
import {postRequest,putRequest,getRequest,deleteRequest} from "network/api";
import persistedState from 'vuex-persistedstate'
export default createStore({
  state: {
    imgUrl:"",
    name:"",
    email:"",
    sex:"",
    birth:"",
    phone:"",
    explain:"",
    time:"",
    socket:null,
  },
  mutations: {
    imgUrlChange(state,newUrl){
      state.imgUrl = newUrl;
      //子组件中使用：this.$store.commit('imgUrlChange',newUrl)
    },
    initUser(state,data){
      state.name = data.name;
      state.imgUrl = data.imgUrl;
      state.email = data.email;
      state.sex = data.sex;
      state.birth = data.birth;
      state.phone = data.phone;
      state.explain = data.explain;
      state.time = data.time;
    },
    setSocket(state,socket){
        state.socket = socket;
      console.log("socketID:",socket.id);
    }
  },
  actions: {
    async initData(context){
      let res = await getRequest('/api/search/userbyid');
      // console.log("****************store中的：",res.result);
      context.commit('initUser',res.result)
      // this.form.name = res.result.name;
      // this.form.sex = res.result.sex;
      // this.form.phone = res.result.phone;
      // this.form.birth = res.result.birth;
      // this.form.explain = res.result.explain;
      // this.form.time = res.result.time;
      // this.form.email = res.result.email;
      return 22222222
    },
  },
  modules: {

  },
  plugins:[
      persistedState({
        storage:window.sessionStorage
      })
  ]

})
