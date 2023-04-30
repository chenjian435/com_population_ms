//引入Vue
import Vue from 'vue'
//引入App
import App from './App.vue'
//引入VueRouter
import VueRouter from 'vue-router'
//引入路由器
import router from './router'
//引入vuex
import Vuex from 'vuex'
// Vue.use(Vuex)
//引入permission许可
import './permission'
//引入store
import store from './store'
//引入UI组件库
import {Button,Row,Col,Menu,Submenu,MenuItem,MenuItemGroup,Table,TableColumn,Dialog,Message,MessageBox,Input,Form,FormItem,Select,Option,DatePicker,TimePicker,Switch,CheckboxGroup,
	Checkbox,RadioGroup,Radio,Pagination,Breadcrumb,BreadcrumbItem,Carousel,CarouselItem,Descriptions,DescriptionsItem,Tag,Popover,Avatar,Tooltip


} from 'element-ui';
//引入css
import 'normalize.css';
import '@/assets/css/base.css';
//引入阿里icon图标
import './assets/iconfont/iconfont.css'
import './assets/iconfont/iconfont.js'
//引入axios
import axios from 'axios'
import VueAxios from 'vue-axios'
import { options } from 'less';
Vue.use( VueAxios , axios)
//使用dayjs
var dayjs = require('dayjs');
Vue.prototype.dayjs = dayjs

//使用工具解决导航栏不会折叠
import Fragment from 'vue-fragment'
Vue.use(Fragment.Plugin)
//面包屑
import Breadcrumbs from './components/Breadcrumb/Breadcrumb.vue'
Vue.component('Breadcrumb',Breadcrumbs)
//引入echarts
// import * as echarts from 'echarts'
// Vue.prototype.$echarts = echarts
//引入导出excel功能
import JsonExcel from 'vue-json-excel'
Vue.component('downloadExcel',JsonExcel)

//关闭Vue的生产提示
Vue.config.productionTip = false
//应用插件
Vue.use(VueRouter)
Vue.component('HHH',Button);
Vue.component(Button.name,Button);
Vue.component(Row.name,Row);
Vue.component(Col.name,Col);
Vue.component(Menu.name,Menu);
Vue.component(Submenu.name,Submenu);
Vue.component(MenuItem.name,MenuItem);
Vue.component(MenuItemGroup.name,MenuItemGroup);
Vue.component(Table.name,Table);
Vue.component(TableColumn.name,TableColumn);
Vue.component(Input.name,Input);
Vue.component(Dialog.name,Dialog);
Vue.component(Form.name,Form);
Vue.component(FormItem.name,FormItem);
Vue.component(Select.name,Select);
Vue.component(Option.name,Option);
Vue.component(DatePicker.name,DatePicker);
Vue.component(TimePicker.name,TimePicker);
Vue.component(Switch.name,Switch);
Vue.component(CheckboxGroup.name,CheckboxGroup);
Vue.component(Checkbox.name,Checkbox);
Vue.component(RadioGroup.name,RadioGroup);
Vue.component(Radio.name,Radio);
Vue.component(Pagination.name,Pagination);
Vue.component(Breadcrumb.name,Breadcrumb);
Vue.component(BreadcrumbItem.name,BreadcrumbItem);
Vue.component(Carousel.name,Carousel);
Vue.component(CarouselItem.name,CarouselItem);
Vue.component(Descriptions.name,Descriptions);
Vue.component(DescriptionsItem.name,DescriptionsItem);
Vue.component(Tag.name,Tag);
Vue.component(Popover.name,Popover);
Vue.component(Avatar.name,Avatar);
Vue.component(Tooltip.name,Tooltip);
//挂载提示框
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message= Message

//创建vm
new Vue({
	el:'#app',
	render: h => h(App),
	router:router,
	store,
	//创建全局事件总线bus
	beforeCreate(){
		Vue.prototype.$bus=this
	}
	
	
})