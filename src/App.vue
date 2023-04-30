<template>
  <div class="app">

  <router-view></router-view>

  </div>
 
</template>

<script>
// import Login from './components/Login'
// import Register from './components/Register'

export default {
    name:'App',
    // components:{Login,Register}

}
</script>

<style lang="less">
html,body {

/* overflow-y: scroll; */

margin: 0;

}
.app{
  // width: 1920px;
  // height: 935px;
  // 全局不可选择
  -webkit-user-select: none;
  // background: #ff8c00;

  background-image:url(@/assets/image/beijing2.jpg);
}

</style>
