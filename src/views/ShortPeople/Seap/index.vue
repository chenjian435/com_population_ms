<template>
  <div>
    <div>
      <List :dataList="dataList" @handleXiangQing="handleXiangQing" @onGetAll="onGetAll" :current="current"
        :pageSize="pageSize" @onSubmit="onSubmit" :sflag="sflag"></List>
      <!-- 分页组件 -->
      <div class="pagination">
        <Pagination :total="total" :pageSize="pageSize" @CurrentChange="CurrentChange" ref="child"></Pagination>
      </div>

    </div>

    <el-dialog v-if="flag" style=";" title="详细信息" :visible.sync="flag">
      <XiangQing :sflag="sflag" :msg="this.msg" @getAll="getAll(current)" @handleXiangQing="handleXiangQing"></XiangQing>
      <!-- <Login @login="login" @removeMenuList="removeMenuList" @removeUser="removeUser"></Login> -->
    </el-dialog>





  </div>
</template>
    
<script>
import { cloneDeep } from 'lodash'  //新的深拷贝
import List from '@/components/Listd.vue'
import XiangQing from '@/components/XiangQingd.vue'
import Pagination from '@/components/pagination/Pagination.vue'
export default {
  components: { List, XiangQing, Pagination },
  data() {
    return {


      total: 10,
      pageSize: 1,
      current: 1,//
      pageval: '',
      formInline: {
        name: '',
        sex: '',
        page: ''
      },

      sflag: true,
      flag: false,
      onflag: false,
      dataList: [],
      msg: [],
    }
  },
  methods: {

    //查询全部
    getAll(val) {

      //发送ajax请求(异步提交）

      this.axios.get("http://localhost/speoples/getByPage/" + val).then((res) => {
        // console.log(res, '1111')
        // console.log(res.data, '2222')
        // console.log(res.data.data, '3333')
        this.dataList = res.data.data.data;
        this.total = res.data.data.total;

        console.log(this.total)
        this.pageSize = 10;
      });




    },

    handleXiangQing(msg) {
      // this.flag = !this.flag
      // this.msg = msg

      this.flag=!this.flag
      this.msg=msg
      this.axios.get("http://localhost/peoples/getByPage/"+1).then((res) => {
      
         this.total = res.data.data.total;  //获取总条数
  
          console.log( this.total,'条yyy')
        this.pageSize = 10;
        console.log(this.total,'条')
      if(this.current * this.pageSize - this.total !=0 &&(this.current * this.pageSize - this.total)%this.total===0){
        this.current=this.current-1
        this.getAll( this.current)
        console.log(this.msg,this.current,'页ye',this.total)
      }
      else{
        console.log(this.msg,this.current,'页')
      this.getAll( this.current)
      }
      });

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



      this.axios.post("http://localhost/speoples/search", this.formInline).then((res) => {
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
    onGetAll() {
      this.onflag = false
      this.$refs.child.searchClick();
      this.current = 1

      this.axios.get("http://localhost/speoples/getByPage/" + 1).then((res) => {
        // console.log(res, '1111')
        // console.log(res.data, '2222')
        // console.log(res.data.data, '3333')
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