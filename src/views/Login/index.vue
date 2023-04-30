<template>
    <div class="login">
        
    <div   class="login-container">
        <Login></Login>
    </div>
    </div>
  
</template>

<script>
import Login from '../../components/Logind.vue'

export default {
components: { Login },
}
</script>

<style lang="less" scoped>
.login{
    background-color: #fff;
    background-position:center;
        height:100%;
        width:100%;
        background-size:cover;
        position:fixed;
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
 
</style>