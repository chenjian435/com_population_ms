<template>
  <div>
    <el-menu :default-active="$route.path" class="el-menu-vertical-demo" background-color="#112f50" text-color="#fff"
      active-text-color="#ffd04b" router  :collapse="isCollapse"  >

      <el-menu-item>
        <span slot="title">社区人口管理系统</span>
      </el-menu-item>

      <el-menu-item index="/">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>


      <el-submenu   index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span >基本信息设置</span>
        </template>
        <el-menu-item-group unique-opened=true>
       
          <el-menu-item index="/basic/nation">
            <i class="el-icon-location"></i>
          <span> 民族信息设置</span>
           
          </el-menu-item>

          <el-menu-item index="/basic/place">
            <i class="el-icon-location"></i>
          <span >籍贯信息设置</span>
          </el-menu-item>


          <el-menu-item index="/basic/face">
            <i class="el-icon-location"></i>
          <span >政治面貌设置</span>
          </el-menu-item>

          <el-menu-item index="/basic/degree">
            <i class="el-icon-location"></i>
          <span >文化程度设置</span>
          </el-menu-item>
        </el-menu-item-group>
       
      </el-submenu>
      

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span >常住人口</span>
        </template>
        <el-menu-item-group>
       
          <el-menu-item index="/longpeople/addp">
            <i class="el-icon-location"></i>
          <span> 居民户口添加</span>
           
          </el-menu-item>

          <el-menu-item index="/longpeople/seap">
            <i class="el-icon-location"></i>
          <span> 居民户口查看</span>   
           
          </el-menu-item>

          <el-menu-item index="/longpeople/txp">
            <i class="el-icon-location"></i>
          <span> 居民通讯录</span>
           
          </el-menu-item>
        </el-menu-item-group>
       
      </el-submenu>

      <el-menu-item index="/longpeople">
        <i class="el-icon-menu"></i>
        <span slot="title">常住人口</span>
      </el-menu-item>

      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>

    </el-menu>
  </div>
</template>

<script>
export default {
  props:['isCollapse',],
   data(){
    return{
      // isCollapse:false,
    }
   },
   methods: {
     
    }
}
</script>

<style  lang="less" scoped>
.el-menu {
  border-right: 0;
}

//折叠样式
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.is-active {
  background: #1e78bf !important;   
  color: #fff !important;
}
</style>