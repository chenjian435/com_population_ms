<template>
  <el-breadcrumb separator="/" class="bread">
    <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
    <el-breadcrumb-item v-for="item in navs" :key="item.path" :to="{ path: item.path }">{{ item.meta.title }}</el-breadcrumb-item>
</el-breadcrumb>
</template>

<script>
export default {
    computed:{
        navs(){
            console.log('路由信息',this.$route.matched);
            let routes = this.$route.matched;
            //处理第一个路由的信息
            routes[0].path ='shouye'; // 将第一个路由的path改掉以防冲突
            return routes
        }
    },
    created(){
        console.log(this.$route);//包含当前的路由信息 以及上级路由信息 
    }
}
</script>

<style lang="less" scoped>
.bread{
    margin-bottom: 10px;
}
</style>