//该文件用于创建vuex中最核心的store
import Vue from 'vue'
Vue.use(Vuex)
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import login from './modules/login'
import menu from './modules/menu'

//用于响应组件中的动作
const actions = {}

const mutations = {}

const state = {

}

export default new Vuex.Store({
    actions,
    mutations,
    state,
    modules:{  //注册模块
        login,
        menu,

    },

    plugins: [
        createPersistedState({
          // 存储方式：localStorage、sessionStorage、cookies
          //   storage: window.cookies,//存储到cookie
          // storage:window.sessionStorage 存储到sessionStorage
          // 如果不写默认存储到localStorage
          // 存储的 key 的key值
          key: "info",
          paths:['login']
        //   render(state) {
        //     // 要存储的数据：本项目采用es6扩展运算符的方式存储了state中所有的数据
        //     return { ...state };
        //     //需要存储其中的某些数据的话需要单独取出来
        //    // return {
        //         //只储存state中的assessmentData
        //         //assessmentData: val.assessmentData
        //   }
        })
      ]
    

})




//导出store
// export default store