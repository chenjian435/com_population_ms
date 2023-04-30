/* 
    路由守卫
    routes = [
        {
            path: "/login",
            name: "login",
            component: Login,
        },
    ];
*/
//配置路由全局前置守卫导航-----------------------
import router from "@/router";
import store from "@/store";
import { resetRouter } from "@/router";
// import NProgress from "nprogress";
// import "nprogress/nprogress.css";

router.beforeEach((to, from, next) => {
  //每次切换页面时，调用进度条
//   NProgress.start();
  console.log("路由守卫--------", to); //{matched:[]}
  //首先 判断进入的路由界面是否需要登录  不需要登录直接进入
  if (to.matched.length == 0 || to.matched.some((ele) => ele.meta.isLogin)) {

    //需要登录
    console.log("需要登录-----");
    //然后 判断是否已经登录了  token值是否存在
    if (store.state.login.userinfo.token) {
      //登录过了 可以查看页面了
      console.log("登录过了 可以查看页面了-----");
      //继续 判断当前存储的vuex里面是否已经有动态导航了  如果没有菜单导航 需要获取菜单导航
      if (store.state.menu.dyMenuList.length != 0) {
        //有导航
        next();
      } else {
        //没有导航
        //获取导航
        store.dispatch("menu/getMenuList").then((mybaseRoutes) => {
          console.log("没有导航----获取导航", mybaseRoutes);
          resetRouter(); //添加路由之前 清空路由实例内容
          //把导航菜单追加到路由实例上
          mybaseRoutes.forEach((ele) => {
            router.addRoute(ele);
          });
        });
        next();
      }
    } else {
      //没有登录--去登录
      next("/login");
    }
  } else {
    //不需要登录
    console.log("不需要登录-----");
    next();
  }
});

router.afterEach(() => {
  // 在即将进入新的页面组件前，关闭掉进度条
//   NProgress.done();
});