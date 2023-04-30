// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'
//引入组件
// import Login from '../components/Login'
import Register from '../components/Register'

//引入页面
import Layout from '../views/Layout'
import Login from '../views/Login'
import Home from '../views/Home/Home.vue'


const Basic = ()=>import('@/views/Basic')
const Degree = ()=>import('@/views/Basic/Degree')
const Face = ()=>import('@/views/Basic/Face')
const Nation = ()=>import('@/views/Basic/Nation')
const Place = ()=>import('@/views/Basic/Place')
const LongPeople = ()=>import('@/views/LongPeople')
const AddP = ()=>import('@/views/LongPeople/AddP')
const SeaP = ()=>import('@/views/LongPeople/SeaP')
const TxP = ()=>import('@/views/LongPeople/TxP')
const XiangQing = ()=>import('@/views/LongPeople/XiangQing')

//第一步：缓存原始的push和replace
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
//第二步:增强push
VueRouter.prototype.push = function(location,okCallback,errCallback){
	//若程序员使用push的时候，没有传递成功、失败的回调，那就靠catch
	if(okCallback === undefined && errCallback === undefined){
		return originalPush.call(this,location).catch(()=>{})
	}else{
		return originalPush.call(this,location,okCallback,errCallback)
	}
	}
//第三步:增强replace
VueRouter.prototype.replace=function(location,okCallback,errCallback){
	if(okCallback === undefined && errCallback === undefined){
	return originalReplace.call(this,location).catch(()=>{})
}else{
	return originalReplace.call(this,location,okCallback,errCallback)
}
}



//创建并暴露一个路由器
const router =  new VueRouter({
	routes:[ 
		{
			path:'/',
			component:Layout,
			meta:{
                title:'首页',
				isLogin:true, //是否需要登录
			},
			children:[
				{
					path:'/',
					name:'home',
					component:Home
				},
				{
					path:'/basic',
					name:'basic',
					component:Basic,
					children:[
						{
						path:'degree',
						name:'degree',
						component:Degree
					},
					{
						path:'face',
						name:'Face',
						component:Face
					},
					{
						path:'place',
						name:'place',
						component:Place
					},
					{
						path:'nation',
						name:'nation',
						component:Nation
					}
                           

					]
				},
				{
					path:'/longpeople',
					name:'longpeople',
					component:LongPeople,
					children:[

						{
						path:'addp',
						name:'addp',
						component:AddP,
						props(route){
							return {...route.query}
					  }
						},
						
						{
							path:'seap',
							name:'seap',
							component:SeaP
							},
							
						{
							path:'txp',
							name:'txp',
							component:TxP
							},

							{
								path:'xiangqing',
								name:'xiangqing',
								component:XiangQing,
								props(route){
                                      return {...route.query}
								}
								},



					]

				}

			]

		},
		{
			path:'/login',
			name:'login',
			component:Login,
		},
		{
			path:'/Register',
			component:Register,
			
		},
		
	]
})

export default router;
