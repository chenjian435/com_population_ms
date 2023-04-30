// /* 
//     对axios网络请求方法 进行二次封装 

//     简单封装：
//         不改变本身的功能 继续扩展新的功能

//     企业封装好了：
//         项目已经创建完毕 
        
    
// */
// //先导入需要的axios模块

// import axios from 'axios'
// import qs from 'querystring'
// //可以使用自定义配置新建一个 axios 实例  axios.create([config])
// const instance = axios.create({
//     //发送请求的公共的基础路径接口位置 
//     // baseURL: 'http://iwenwiki.com',//配置请求的基础路径
//     //如果是打包的项目 请求的接口的基本的网络地址就是 配置在环境变量的了  VUE_APP_BASE_API
//     baseURL:process.env.NODE_ENV=='production'?process.env.VUE_APP_BASE_API:'',
//     timeout: 5000,//请求设置超时时间 单位毫秒 5s超时 接口请求5s没有响应数据 停止请求
// })

// // 添加请求拦截器
// instance.interceptors.request.use(function (config) {//config发送请求的配置参数信息
//     //config可以判断请求的方式get/post 请求url参数地址 headers请求头配置 参数data发送的数据等信息
//     // console.log('config-请求拦截器',config);
//     //对post请求处理参数
//     if(config.method =='post'){
//         config.data = qs.stringify(config.data)
//     }
//     // 在发送请求之前做些什么--对post请求参数 处理字符串拼接
//     return config;
//   }, function (error) {
//     // 对请求错误做些什么
//     return Promise.reject(error);
// });


// // 添加响应拦截器 -- 对错误的数据处理参数
// //网络请求常见错误信息 
// // 404 地址接口错误  500 505 服务器错误 200 成功  300 重定向 
// instance.interceptors.response.use(function (response) {
//     // 对响应数据做点什么
//     return response;
//   }, function (error) {
//     console.log('error',error);
//     // 对响应错误做点什么
//     const { response } = error;
//     //response.status 错误状态   500 服务器错误  response.info 信息提示
//     errorHandle(response.status,response.info)
//     // return Promise.reject(error);
// });

// //错误响应处理提示信息
// function errorHandle(status,info){
//     switch(status){
//         case 400:
//             console.log("400-表示请求报文中存在语法错误");
//             break;
//         case 401:
//             console.log("401-未经许可，需要通过HTTP认证");
//             break;
//         case 403:
//             console.log("403-服务器拒绝该次访问（访问权限出现问题）");
//             break;
//         case 404:
//             console.log("404-表示服务器上无法找到请求的资源");
//             break;
//         case 500:
//             console.log("500-表示服务器在执行请求时发生了错误");
//             break;
//         case 503:
//             console.log("503-表示服务器暂时处于超负载或正在进行停机维护");
//             break;
//         case 504:
//             console.log("504-（网关超时）  服务器作为网关或代理，但是没有及时从上游服务器收到请求");
//             break;
//         default:
//             console.log(info);
//             break;
//     }
// }



// //导出请求
// export default instance
