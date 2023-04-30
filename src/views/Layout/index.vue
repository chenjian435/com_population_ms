<template>
 <div class="layout">
   <div class="menu">
   <Menu  :isCollapse="isCollapse"></Menu>

   </div>
   <div class="content"  :class="{small:isCollapse}">
   <Content   :isCollapse="isCollapse"  @changeShow="changeShow"></Content>

   </div>


 </div>

</template>

<script>
import Menu from './Menu'
import Content from './Content'
export default {
  components:{
    Menu,
    Content
  },
  data(){
    return{
      isCollapse:false
    }
  },
  methods:{
    changeShow(){
      this.isCollapse=!this.isCollapse;
    }
  }
}
</script>

<style scoped lang="less" >
 .layout{
  .menu{
    // width: 200px;
    background:#112f50;
    position: fixed;
    left: 0;
    top:0;
    bottom:0;
  }
  .content{
    padding-left: 200px;

  }
  .small{
    padding-left: 64px;
  }
 }

</style>