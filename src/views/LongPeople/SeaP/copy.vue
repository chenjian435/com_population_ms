<template>
  <div>
    <el-table size="small" current-row-key="id" :data="dataList" stripe highlight-current-row>

      <el-table-column type="index" align="center" label="序号"></el-table-column>

      <el-table-column prop="name" label="姓名" align="center"></el-table-column>

      <el-table-column prop="sex" label="性别" align="center"></el-table-column>

      <el-table-column prop="birthday" label="生日" align="center"></el-table-column>
      <el-table-column prop="place" label="籍贯" align="center"></el-table-column>
      <el-table-column prop="address" label="详细地址" align="center"></el-table-column>

      
      

      <el-table-column label="操作" align="center">

        <template slot-scope="scope">

          <el-button type="primary" size="mini" @click="handleXiangQing(scope.row)">详情</el-button>


        </template>

      </el-table-column>

    </el-table>
  </div>
</template>
  
<script>
export default {
  data() {
        return {
            dialogFormVisible: false,//控制表单是否可见
            dataList: [],
            formData: {},//表单数据
            rules: {//校验规则
                shuju: [{ required: true, message: '请填信息', trigger: 'blur' }],
            },
        }
    },
    created() {
        this.getAll();
    },
    methods: {

//查询全部
getAll() {

    //发送ajax请求(异步提交）

    this.axios.get("http://localhost/peoples").then((res) => {
      console.log(res,'1111')
      console.log(res.data,'2222')
      console.log(res.data.data,'3333')
        this.dataList = res.data.data;
    });
 },
   
 handleXiangQing(msg){
      console.log(msg.name)
       this.$router.push({
          name:'xiangqing',
          query:{
           
            msg: msg

           
          }

       })

 }

},

}
</script>
  
<style></style>