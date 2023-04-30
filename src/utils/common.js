/* 
    组件公共的方法
*/

/* 
    处理数据html标签显示界面
*/
export function removeHTMLTag(htmlStr) {
  let html = htmlStr
    .replace(/<img.*?>/g, "[图片]")
    .replaceAll(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, "");
  return html;
}


/* 
  定义菜单匹配规则
  menu 前端定义的路由文件
  dyMenu 后端动态路由文件
  匹配：
    [{1,2,3},{3,4,5}] [{1,2},{4,5}] => [{1,2},{4,5}]
*/
import {cloneDeep} from 'lodash'  //新的深拷贝
export function rulesMenu(menu,dyMenu){
    //定义存储匹配好的菜单路由容器
    let menuArr=[];
    //遍历前端路由  判断menu里面的每一项的meta.title 是否后端返回里面有这个信息
    //深拷贝：JSON.parse(JSON.stringify()) 不要包含函数
    let arr = cloneDeep(menu)
    arr.forEach(ele => {
        dyMenu.forEach( item=>{
          if(ele.meta.title == item.name){
              // menuArr.push(ele)
              //继续判断下级菜单 children 
              if(item.route && item.route.length>0 ){
                console.log(item.route.length,'------')
                 ele.children=rulesMenu(ele.children,item.route) // 递归
              }
            menuArr.push(ele)
          }
        })
    });

    return menuArr;
}


/* 
  自定义校验规则
 
*/

// export function checkVal(rule, value,callback) {
//   if(value <0) {
//     callback(new Error('请输入正整数'));
//   } else {
//     callback();
//   }
// }


