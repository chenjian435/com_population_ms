//登录组件
<template>
  <div id="poster">
    <el-form class="login-container">
      <h3 class="login_title">
        系统登录

      </h3>
      <el-form-item label="">
        <el-input type="text" v-model="loginForm.mobile" autocomplete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input  show-password v-model="loginForm.pwd" autocomplete="off" placeholder="密码"></el-input>

      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;background:#505458;border:none" v-on:click="Login()">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'Login',

  data() {
    return {
      loginForm: {
        mobile: '',
        pwd: ''
      }
    }
  },
  methods: {
    ...mapMutations('login', ['setUser']),
    async Login() {


      this.axios.post('http://localhost/users/user', this.loginForm).then((res) => {

      
        if (res.data.code == 20041) {
          this.$message.success("登录成功!");


          this.$emit('removeUser')
          this.$emit('removeMenuList')
          this.setUser({ 
            username: res.data.data.name, 
            token: res.data.data.flag == 0 ? '超级管理员' : res.data.data.flag == 1 ? '管理员' : '普通用户', 
            routes: res.data.data.route,
            mobile:res.data.data.mobile,
            id_card:res.data.data.id_card,
        
        
        })

          this.$emit('login')

          this.$router.replace('/')

        }
        else if(res.data.code == 20040){
          this.$message.error("密码错误，登录失败!");
        }
      })

    },
    // toRegister(){
    //   this.$router.push({path:'/Register'})
    // }
  }

}
</script>

<style >
/* #poster{
      background-position:center;
      height:100%;
      width:100%;
      background-size:cover;
      position:fixed;
  }
  body{
      margin:0px;
      padding:0px;
  }
  .login-container{
      border-radius:15px;
      background-clip:padding-box;
      margin:90px auto;
      width:350px;
      padding: 35px 35px 15px 35px;
      background:#fff;
      border:1px solid #eaeaea;
      box-shadow:0 0 25px #cac6c6;
  }
  .login_title{
      margin : 0px auto 40px auto;
      text-align:center;
      color:#505458;
  } */
</style>