/* 
    存储当前登录信息

*/
export default {
    namespaced: true,
    state: {
      userinfo: {
        //用户信息
        username: "",
        token: "",
        mobile:"",
        id_card:"",
        routes:"",
       
      },
    },
    mutations: {
      //登录设置信息
      setUser(state, paylod) {
        state.userinfo = paylod;
      },
      //退出清空数据
      removeUser(state, payload) {
        state.userinfo = {
          username: "",
          token: "",
          routes:"",
          mobile:"",
        };
      },
    },
  };
  