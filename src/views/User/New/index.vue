<template>
  <div class="index">

    <div>
      <h2>消息</h2>
      <el-table :data="dataList" style="width: 100%" border>
        <el-table-column prop="time" label="申请时间" align="center">
        </el-table-column>

        <el-table-column prop="title" label="标题" align="center">
        </el-table-column>

        <el-table-column  label="状态" align="center">
          <template slot-scope="scope">
          <el-tag :type="scope.row.state==='通过' ? 'success' :
          scope.row.state==='驳回' ? 'danger':
           scope.row.state==='已撤回' ? 'info': '' " > 
            {{ scope.row.state }} </el-tag>
        </template>
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="xiangqing(scope.row.sys_people_sp_id)">详情</el-button>
            <el-button v-if="scope.row.state === '审核中'" type="info" size="mini" @click="chehui(scope.row)">撤回</el-button>
            <el-button v-if="scope.row.state === '已撤回' || scope.row.state === '驳回'" type="warning" size="mini"
              @click="xiugai(scope.row)">修改</el-button>
            <!-- <el-button v-if="scope.row.state === '驳回'" type="info" size="mini" @click="pizhu(scope.row)">查看批注</el-button> -->

            <el-popover  v-if="scope.row.state === '驳回'" placement="bottom" title="驳回批注:" width="200" trigger="click" :content="scope.row.pizhu" style=" margin-left: 5px;margin-right: 5px;">
              <el-button type="info" size="mini" @click="pizhu(scope.row)" slot="reference">查看批注</el-button>
            </el-popover>

            <el-button v-if="scope.row.state === '已撤回' || scope.row.state === '通过' || scope.row.state === '驳回'"
              type="danger" size="mini" @click="del(scope.row)">删除</el-button>

          </template>
        </el-table-column>
      </el-table>
    </div>

    <div>
      <el-dialog style=";" title="已提交信息" :visible.sync="flag">
        <Item :msg="this.msg"></Item>
      </el-dialog>

    </div>

    <div>
      <el-dialog v-if="xiugaiflag" style=";" title="修改已提交信息" :visible.sync="xiugaiflag">
        <AddUI :updateFormDatas="updateFormDatas" :flag="xiugaiflag" @quxiao="quxiao" :msg="msg" @shanchu="shanchu">
        </AddUI>
      </el-dialog>

    </div>


  </div>
</template>

<script>
import { mapState } from 'vuex'

import Item from '@/views/User/Item'
import AddUI from '@/components/AddUI.vue'
export default {
  components: { Item, AddUI },
  data() {
    return {
      flag: false,
      xiugaiflag: false,
      pizhuflag: false,
      dataList: [],
      
      msg: [],  //保存当前news的信息

      updateFormDatas: {}, //保存当前peoplesps的信息
    }
  },
  computed: {
    ...mapState('login', ['userinfo'])

  },

  methods: {
    getAll() {
      this.axios.get("http://localhost/news/" + this.userinfo.mobile).then((res) => {
        this.dataList = res.data.data;
      });
    },

    quxiao() {
      this.xiugaiflag = !this.xiugaiflag
    },


    xiangqing(id) {
      this.flag = true
      this.axios.get("http://localhost/peoplesps/" + id).then((res) => {
        this.msg = res.data.data;
      });

    },
    
    chehui(data) {
      this.$confirm("此操作永久撤回当前数据，是否继续？", "提示", {
        type: 'info'
      }).then(() => {


        data.state = '已撤回'
        console.log(data, '已撤回')
        this.axios.put("http://localhost/news", data).then((res) => {
          this.msg = res.data.data;
          console.log(this.msg, '已撤回')
        });



      }).catch(() => {
        //3.取消撤回
        this.$message.info("取消撤回操作");
      });
    },

    xiugai(data) {
      this.xiugaiflag = !this.xiugaiflag
      this.msg = data
      this.axios.get("http://localhost/peoplesps/" + data.sys_people_sp_id).then((res) => {

        this.updateFormDatas = res.data.data;

        if (this.updateFormDatas.marriage == 0) {
          this.updateFormDatas.marriage = '未婚'
        }
        else {
          this.updateFormDatas.marriage = '已婚'
        }
        if (this.updateFormDatas.isold == 0) {
          this.updateFormDatas.isold = '否'

        }
        else {
          this.updateFormDatas.isold = '是'
        }
        if (this.updateFormDatas.dibao == 0) {

          this.updateFormDatas.dibao = '否'
        }
        else {
          this.updateFormDatas.dibao = '是'
        }




      });

    },



    del(data) {

      this.$confirm("此操作永久删除当前数据，是否继续？", "提示", {
        type: 'info'
      }).then(() => {

        this.axios.delete("http://localhost/news/delete/" + data.id).then((res) => {
          if (res.data.code == 20021) {

            this.axios.delete("http://localhost/peoplesps/" + data.sys_people_sp_id)
            this.$message.success("删除成功");
            this.getAll();
          } else {
            this.$message.error("删除失败");
          }
        })

      }).catch(() => {
        //3.取消撤回
        this.$message.info("取消删除操作");
      })
    },

   //同上，只不过这个删除没有提示框
    shanchu(id) {
      this.axios.delete("http://localhost/news/delete/" + id).then((res) => {
   
        this.getAll();

      })


    },

    pizhu() {
      this.pizhuflag = !this.pizhuflag

    },
  },


  created() {
    this.getAll()
  },

}
</script>

<style lang="less" scoped>
.index {}
</style>