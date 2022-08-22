<template>
  <div class="box">
    <div class="contain" >
      <a-space class="button-box">
        <a-button type="dashed" class="button" @click="signIn()">登录</a-button>
        <a-button type="dashed" class="button" @click="signUp()">注册</a-button>
      </a-space>
    </div>

  </div>
</template>

<script>
import signIn from "./sign/SignIn";
import signUp from "./sign/SignUp";
export default {
  name: 'Home',
  components: {
    signIn,
    signUp                      //子组件
  },
  data(){
    return{
      signInVisible:false,
      signUpVisible:false,
    }
  },
  computed:{

  },
  methods:{
    signIn(){
      this.$router.push('/signin')
    },
    signUp(){
      this.$router.push('/signup')
    },

  }
}
</script>
<style lang="less">
.box{
  width: 30vw;
  height: 30vh;
}
.contain{
  width: 100%;
  height: 100%;
}
.button-box{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  .button{
    width: 4em;
    height: 2em;
    margin: 0 10px;
    background-color: rgba(0,0,0,0.3);
    font-size: large;
    border:0px solid rgba(0,0,0,0.5);
    color:#ffffff;
    border-radius: 5px;
  }
  .button:hover{
    background-color: rgba(0,0,0,0.4);
    border: 0px solid rgb(0,0,0,0);
  }
}



</style>
