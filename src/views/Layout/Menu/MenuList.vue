<template>
    <fragment>
        <template v-for="item in dyMenuList">
            <!-- 多级菜单 -->
            <el-submenu :index="item.name" :key="item.path" v-if="item.children && item.children.length > 0">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>{{ item.meta.title }}</span>
                </template>
                <el-menu-item-group>
                    <!-- 继续判断当前的item.children里面的导航 是否是一级或者多级 -->
                    <MenuList  :dyMenuList="item.children"></MenuList>
                    <!-- <el-menu-item index="/product/category">
                        <i class="el-icon-setting"></i>
                        <span slot="title">产品分类</span>
                    </el-menu-item> -->
                </el-menu-item-group>
            </el-submenu>

            <!-- 一级菜单 -->
            <!-- 点击多级菜单是折叠效果  点击一级菜单才是跳转路由 -->
            <el-menu-item v-show="item.name!='ProductPage'" :index="item.name" @click="toPage(item.name)" :key="item.name" v-else>
                <i class="el-icon-location"></i>
                <span slot="title">{{ item.meta.title }}</span>
            </el-menu-item>

        </template>
    </fragment>
</template>

<script>

export default {
    name:'MenuList',//组件名称  name  使用name就是调用当前的组件
    props:['dyMenuList'],
    methods:{
        //编程式路由跳转
        toPage(name){
            this.$router.push({
                name
            })
        }
    }
  
}
</script>

<style>

.is-active {
  background: #1e78bf !important;   
  color: #fff !important;
  
}

</style>