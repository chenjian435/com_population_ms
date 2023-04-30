const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  
   lintOnSave:false, // 关闭掉脚手架的语法检查（关闭eslint校验工具报错）

   devServer:{  //自动打开时在浏览器显示
    port:8080,
    host:'localhost',
   }
  
})
