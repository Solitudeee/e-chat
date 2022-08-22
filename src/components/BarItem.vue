<template>
  <div class="bar-item">
    <div v-if="isActivate"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
  </div>
</template>

<script>
export default {
  name: "BarItem",
  props:{
    // path:String,
    isActivate:false,
  },
  data(){
    return {

    }
  },
  computed:{
    //控制文字颜色
    // isActive(){
    //   //查看当前路径中是否含有子组件传来的path
    //   console.log(this.$route.path)
    //   return this.$route.path.indexOf(this.path)!==-1
    // },
    // nextPath(){
    //   return '/main'+this.path
    // }
  },
  methods:{
    //当item单击时调用router，通过push改变路径
    // itemClick(){
    //   // this.$router.push(this.nextPath)
    // }
  }
}
</script>

<style scoped>
.bar-item{
  flex: 1;
  text-align: center;
  height: 28px;
  width: 28px;
}

</style>