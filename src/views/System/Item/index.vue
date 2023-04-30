<template>
  <div class="index">
    <h2 style="text-align: center; margin-top: 5px; ">{{ proute.name }}</h2>
    <el-table :data="routes" style="width: 100%; margin-top: 10px;"  border> 


      <el-table-column prop="fid" label="编号" width="180"  align="center" >
      </el-table-column>

      <el-table-column prop="name" label="权限名" width="180" align="center">
      </el-table-column>

      <el-table-column  label="操作" align="center">

        <template slot-scope="scope">



          <el-button type="danger" size="mini" @click="del(scope.row.fid)">删除</el-button>
         

        </template>

      </el-table-column>

     
    </el-table>
    <div style="margin-left: 250px;">
    <el-button type="success" size="mini" @click="add(proute)">添加权限</el-button>
  </div>
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: ['proute', 'uroute'],
  data() {
    return {
      // routes:[],
    }
  },
  computed: {
    routes: {
      get() {
        let ro = []
        this.uroute.forEach(ele => {
          if (ele.fid == this.proute.fid) {
            ro = ele.route
          }
        });
        return ro
      },


    }
  },
  methods: {
    del(fid){
      console.log("删除调用",fid)
      this.$emit('delete',fid)
    },
    add(proute){
      console.log("添加调用",proute)
      this.$emit('add',proute)
    }
  },
}
</script>

<style scoped>
.index {
  width: 600px;
  height: 400px;
  margin-top: 20px;
  margin-right: 20px;
  border: 1px solid rgb(194, 191, 191);
  float: left;
  background-image: url('@/assets/image/system1.jpg');
  /* border-width:5px 5px 5px 5px */

}
</style>