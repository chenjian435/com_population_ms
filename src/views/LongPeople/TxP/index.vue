<template>
  <div>
    <div class="header">
      <div class="form">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="姓名">
            <el-input v-model="formInline.name" size="small" placeholder="请输入查询用户名"></el-input>
          </el-form-item>


          <el-form-item>
            <el-button type="primary" size="small" @click="onSubmit(formInline, 1)">查询</el-button>
            <el-button type="danger" size="small" @click="onReset">重置</el-button>
            <el-button type="success" size="small" @click="onGetAll">查看全部</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="group">

        <!-- 导出选中的订单编号 -->
        <download-excel class="export-excel-wrapper" :data="dataList" :fields="json_fields" :header="title"
          name="常住人口社区通讯录.xls">
          <el-button size="small" type="warning">导出</el-button>
        </download-excel>
      </div>

    </div>

    <div>
      <el-table size="small" current-row-key="id" :data="dataList" stripe highlight-current-row border>

        <el-table-column type="index" :index="indexMethod" align="center" label="序号"></el-table-column>

        <el-table-column prop="name" label="姓名" align="center"></el-table-column>

        <el-table-column prop="sex" label="性别" align="center"></el-table-column>


        <el-table-column prop="buildingcard,housecard" label="现居" align="center">
          <template slot-scope="scope">
            {{ scope.row.buildingcard }}{{ scope.row.housecard }}
          </template>


        </el-table-column>


        <el-table-column prop="mobile" label="电话号码" align="center"></el-table-column>




      </el-table>
    </div>
    <!-- 分页组件 -->

    <div class="pagination">
        <Pagination :total="total" :pageSize="pageSize" @CurrentChange="CurrentChange" ref="child"></Pagination>
      </div>

  </div>
</template>
  
<script>
import { cloneDeep } from 'lodash'  //新的深拷贝
import Pagination from '@/components/pagination/Pagination.vue'
export default {
  components: { Pagination },
  data() {
    return {

      dataList: [],
      total: 10,
      pageSize: 1,
      current: 1,//
      pageval: '',
      formInline: {
        name: '',
        sex: '',
        buildingcard: '',
        housecard: '',
        page: '',
      },
      onflag: false,

      DetailsForm: [],//需要导出的数据 [{},{}]
      json_fields: {//映射字段值
        // "编号": 'code',
        //数字处理--

        "姓名": 'name',
        "性别": 'sex',
        "楼牌号": 'buildingcard',
        "门牌号": 'housecard',
        "电话号码": 'mobile',

      },
      title: '常住人口社区通讯录',//


    }
  },
  created() {
    this.getAll();
  },

  methods: {
    //查询全部
    getAll(val) {

      //发送ajax请求(异步提交）

      this.axios.get("http://localhost/peoples/getByPage/" + val).then((res) => {
        // console.log(res, '1111')
        // console.log(res.data, '2222')
        // console.log(res.data.data, '3333')
        this.dataList = res.data.data.data;
        this.total = res.data.data.total;

        console.log(this.total)
        this.pageSize = 10;
      });




    },

    //表单调用
    indexMethod(index) {
      
      return (this.current - 1) * this.pageSize + index + 1
    },

    //分页组件传过来的页码------------------------------------
    CurrentChange(val) {

      this.current = val;

      if (this.onflag) {
        console.log(this.onflag, 'hhhhhhhhhhhhhhhhhhhhhhhhhhh')
        this.onSearch(this.formInline, val)
      }
      else {
        this.getAll(val)
      }

    },



    onSubmit(formInline, val) {
      if (val == 1) {
        this.$refs.child.searchClick();
        this.current = 1
      }

      this.onflag = true
      this.formInline = cloneDeep(formInline)  //防止重置时的影响
      // this.formInline=formInline
      this.formInline.page = val

      console.log(this.formInline, 'fm')

      this.axios.post("http://localhost/peoples/search", this.formInline).then((res) => {
        console.log(res, '1111')
        console.log(res.data, '2222')
        console.log(res.data.data, '3333')

        console.log('搜索数据--', res.data);
        if (res.data.code === 20041) {//有数据
          this.dataList = res.data.data.data;
          //分页处理
          this.total = res.data.data.total;

          this.$message.success("已为你查询到" + this.total + "条记录");
          this.pageSize = 10;
        } else {//查无数据
          this.dataList = []
          this.total = 1;
          this.pageSize = 1
        }
      });

    },

    onSearch(formInline, val) {
      if (val == 1) {
        this.$refs.child.searchClick();
        this.current = 1
      }

      this.onflag = true
      this.formInline = formInline
      this.formInline.page = val
      console.log(val)
      console.log(formInline, 'hhhhhhh')


      this.axios.post("http://localhost/peoples/search", this.formInline).then((res) => {
        console.log(res, '1111')
        console.log(res.data, '2222')
        console.log(res.data.data, '3333')

        console.log('搜索数据--', res.data);
        if (res.data.code === 20041) {//有数据
          this.dataList = res.data.data.data;
          console.log('搜索数据--', this.dataList);
          //分页处理
          this.total = res.data.data.total;


          this.flags = true;


          this.pageSize = 10;

          // this.pageSize = res.data.data.length;
        } else {//查无数据
          this.dataList = []
          this.total = 1;
          this.pageSize = 1
        }
      });

    },


    onReset() {
      this.formInline.name = '',
        this.formInline.sex = '',
        this.formInline.buildingcard = '',
        this.formInline.housecard = ''
    },

    onGetAll() {
      this.onReset()
      this.onflag = false
      this.$refs.child.searchClick();
      this.current = 1

      this.axios.get("http://localhost/peoples/getByPage/" + 1).then((res) => {

        this.dataList = res.data.data.data;
        this.total = res.data.data.total;
        this.$message.success("已为你查询到" + this.total + "条记录");
        this.pageSize = 10;
      });


    }

  },
  created() {

    this.getAll(1);
  },

}
</script>
  
<style></style>