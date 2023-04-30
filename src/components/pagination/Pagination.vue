<template>
  <div>
    <!-- 
        el-pagination 分页组件
            small	是否使用小型分页样式	boolean
            background	是否为分页按钮添加背景色	boolean
            page-size	每页显示条目个数，支持 .sync 修饰符	number	—	10
            total	总条目数	number	
            current-page	当前页数
            layout	组件布局，子组件名用逗号分隔	String
            page-sizes	每页显示个数选择器的选项设置	number[]	—	[10, 20, 30, 40, 50, 100]，这里不用这个
        event:
            size-change	pageSize 改变时会触发	每页条数
            current-change	currentPage 改变时会触发	当前页
     -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="total,   prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
    props:{
        total:{
            type:Number,
            default:100
        },
        pageSize:{
            type:Number,
            default:10
        } 
    },  
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.$emit('CurrentChange',val)
      },
      searchClick() { //搜索
				this.currentPage = 1;//cur_page 当前页				
				// this.OMS00501()  //渲染数据的函数
			},
    },
    data() {
      return {
        currentPage:1
      };
    }
}
</script>

<style>

</style>