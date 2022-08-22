<template>
  <div id="app">
    <router-view class="rv"></router-view>
  </div>
</template>

<script>
import Home from "./views/Home";

export default {
  name: 'App',
  components: {
    Home
  },
  data(){
    return{
    }
  },
}
</script>

<style lang="less">
@import "assets/css/base.css";
@import "assets/css/normalize.css";
#app{
  padding: 0;
  margin: 0;
  height: 100vh;
  width: 100%;
  //background-image: url("./assets/image/bg/4.jpg");
  background-image: url("~assets/image/bg/1.jpg");
  opacity: 1;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.rv {
  border-radius: 10px;
  overflow: hidden;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.6);
  color: #fff;
  backdrop-filter: blur(2px);

}


</style>
