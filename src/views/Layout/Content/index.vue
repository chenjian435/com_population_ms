<template>
  <div>
    <!-- 顶部 -->
    <div class="header">

      <!-- 左侧折叠 -->
      <div class="open">
        <span v-if="!isCollapse" class="el-icon-s-fold" @click="changMenu"></span> 
        <span v-else class="el-icon-s-unfold" @click="changMenu" ></span> 
      </div>
      
      <div class="bread">
      <Breadcrumb></Breadcrumb>
     </div>


      <!-- 右侧内容--时间 登录信息等 -->
      <div class="right">
        <span>{{ time }}</span> | 
       
         
        <span >{{ userinfo.username == '' ? '游客模式' : userinfo.token+':'+userinfo.username }}</span> | 
        <span class="el-icon-switch-button icon" @click="loginOut" ></span>
      </div>

     

    </div>
     
    <!-- 内容 -->
    <div class="wrapper">
      
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import Login from '../../../components/Logind.vue'
import { mapMutations,mapState } from 'vuex'
export default {
  props: ['isCollapse'],
  components: { Login },
  data() {
    return {
      flag:false,
      time: '',
       
      
    }
  },
 
  computed:{
    ...mapState('login',['userinfo'])

  },
  methods: {
    login(){
         
        this.flag=!this.flag
        // 

    },
    ...mapMutations('menu',['removeMenuList']),
    ...mapMutations('login',['removeUser']),
    changMenu() {
      this.$emit('changeShow')
    },
   

    // //退出登录----1. 删除vuex登录信息  2. 跳转登录界面----- 3. 清空菜单导航----
    loginOut(){

      this.$confirm("是否退出登录？", "提示", {
        type: 'warning'
      }).then(() => {

        //进入登录界面
      this.$router.replace('/login')
      //清空菜单导航
      this.removeMenuList();
      //清空登录
    
      console.log('----退出登录----------------');
      localStorage.removeItem('info') //删除有问题 需要单独删除模块名称  vuex持久化注意的 插件--
      localStorage.removeItem('login')

      }).catch(() => {
        //3.取消
        this.$message.warning("取消操作");
      });

      
    }
  },
  created() {
   //显示时间
    this.time = dayjs().format('YYYY年MM月DD日 HH:mm:ss');

  }
}
</script>

<style lang="less" scoped>
.header {
  width: auto;
  height: 50px;
  background: #1e78bf;
  color: #fff;
  line-height: 50px;
  display: flex;

  .open {
    width: 50px;
    flex:  0 0 35px;
   
    font-size: 30px;

   
    .icon {
      font-size: 22px;
      cursor: pointer;
     
    }
  }

  .bread{

    flex:  1;
    margin: auto;
    font-size: 15px;
    color: #fff;
   
  }

  .right {
    width: 380px;
    font-size: 12px;

    span{
      padding:0 4px;
    }
    .icon{
      font-size: 13px;
    }
  }
}

.wrapper {
  padding: 10px;
}
</style>