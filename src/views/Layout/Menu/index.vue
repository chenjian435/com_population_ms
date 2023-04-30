<template>
  <div>
    <el-menu :default-active="active" class="el-menu-vertical-demo" background-color="#112f50" text-color="#fff"
      active-text-color="#ffd04b" :collapse="isCollapse" :unique-opened="true">
      <el-menu-item>
        <span slot="title">社区人口管理系统</span>
      </el-menu-item>


      <el-menu-item index="home" @click="toPage('home')" >
        <i class="el-icon-s-home"></i>
        <!-- <span slot="title">{{ $t('menu.home') }}</span> -->
        <span slot="title">首页</span>
      </el-menu-item>

      <!-- 动态菜单导航组件 -->
      <MenuList :dyMenuList="dyMenuList"></MenuList>
     
    </el-menu>
  </div>
</template>

<script>
import MenuList from './MenuList.vue'
import { mapState } from 'vuex'
export default {
  props: ['isCollapse'],
  components: {
    MenuList
  },
  computed: {
    ...mapState('menu', ['dyMenuList'])
  },
  data() {
    return {
      // isCollapse:false
      active: ''
    }
  },
  methods:{
    toPage(name){
            this.$router.push({
                name
            })
        }
  },
  created() {
    // console.log('menu',this.$route);
    //首次处理一下-----------------------
    if (this.$route.meta.activeMenu) {
      this.active = this.$route.meta.activeMenu
    } else {
      this.active = this.$route.name
    }

    console.log('动态菜单导航目录', this.dyMenuList);
  },
  watch: {
    //监听路由的变化---切换页面组件
    $route(to, from) {
      // console.log('watch---to',to);
      //判断当前的路由里面 meta:{ activeMenu:'/product/list'}
      let { meta, name } = to;
      if (meta.activeMenu) {
        this.active = meta.activeMenu
      } else {
        this.active = name
      }
    }
  }


}
</script>

<style lang="less" scoped>
// .el-menu {
//   border-right: 0;

//   /deep/ .is-active {
//     background: #1e78bf !important;
//     color: #fff !important;
//   }
// }

// .el-menu-vertical-demo:not(.el-menu--collapse) {
//   width: 200px;
//   min-height: 400px;
// }
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