<template>
  <div class="index">

    <div>
      <h2>消息审核</h2>
      <el-table :data="dataList" style="width: 100%" border>

        <el-table-column prop="mobile" label="用户账号" align="center">
        </el-table-column>

        <el-table-column prop="username" label="用户昵称" align="center">
        </el-table-column>

        <el-table-column prop="time" label="申请时间" align="center">
        </el-table-column>

        <el-table-column prop="title" label="标题" align="center">
        </el-table-column>

        <el-table-column prop="state" label="状态" align="center">
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="xiangqing(scope.row.sys_people_sp_id)">详情</el-button>
            <el-button type="success" size="mini" @click="agree(scope.row)">同意</el-button>
            <el-button type="danger" size="mini" @click="bohui(scope.row)">驳回</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div>
      <el-dialog style=";" title="已提交信息" :visible.sync="flag">
        <Item :msg="this.msg"></Item>
      </el-dialog>

    </div>

    <!-- 添加弹层 -->
    <div>

      <el-dialog v-if="bohuiflag" style="margin: auto; " title="批注信息" :visible.sync="bohuiflag" width="500px">

        <el-form ref="dataAddForm" :rules="rules" label-width="60px">

          <el-form-item label="批注" prop="pizhu">

            <el-input type="textarea" v-model="pizhu" />

          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">

          <el-button @click="bohuiflag = false, pizhu='' ">取消</el-button>

          <el-button type="primary" @click="handleAdd()">确定</el-button>

        </div>

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
      dataList: [],
      msg: [],
      bohuiflag: false,
      updateFormDatas: {},
      pizhu: '',
      id: '',

      rules: {//校验规则
        pizhu: [{ required: true, message: '请填写批注信息', trigger: 'blur' }],
      },
    }
  },
  computed: {
    ...mapState('login', ['userinfo'])

  },

  methods: {
    getAll() {
      this.axios.get("http://localhost/news/state/审核中").then((res) => {
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

    agree(data) {
      this.$confirm("此操作同意提交当前数据，是否继续？", "提示", {
        type: 'info'
      }).then(() => {

        this.axios.get("http://localhost/peoplesps/" + data.sys_people_sp_id).then((res) => {
          this.updateFormDatas = res.data.data;

          this.updateFormDatas.birthday = this.dayjs(this.updateFormDatas.birthday).format('YYYY-MM-DD')

          if (this.updateFormDatas.marriage === "未婚" || this.updateFormDatas.marriage == 0) {
            this.updateFormDatas.marriage = 0
          }
          else {
            this.updateFormDatas.marriage = 1
          }
          if (this.updateFormDatas.isold === "否" || this.updateFormDatas.isold == 0) {
            this.updateFormDatas.isold = 0
          }
          else {
            this.updateFormDatas.isold = 1
          }
          if (this.updateFormDatas.dibao === "否" || this.updateFormDatas.dibao == 0) {
            this.updateFormDatas.dibao = 0
          }
          else {
            this.updateFormDatas.dibao = 1
          }


          //将信息保存到peoples表中


          console.log(data.title)

          if (this.updateFormDatas.oldid ==0) {  //oldid=0则是添加新的信息，oldid!=则是修改已登记的信息
            
            this.axios.get("http://localhost/peoples/getId_card/0/" + this.updateFormDatas.id_card).then((res) => {
              if (res.data.code == 20041) {
                this.$message.error("该用户已经登记");

              }

              else {


                this.axios.post("http://localhost/peoples", this.updateFormDatas).then((res) => {
                  //如果操作成功
                  if (res.data.code == 20011) {
                    this.$message.success("通过审核");

                  } else if (res.data.code == 20010) {
                    this.$message.error("审核失败");
                  } else {
                    this.$message.error(res.data.msg);
                  }
                }).then(() => {
                  data.state = '通过'
                  console.log(data, '通过')

                  this.axios.put("http://localhost/news", data).then((res) => {

                    console.log('通过')
                    this.getAll()
                  });
                });

              }
            })
          } //if

          else {

            //修改已登记的信息
            this.updateFormDatas.id=this.updateFormDatas.oldid

            this.axios.put("http://localhost/peoples/", this.updateFormDatas).then((res) => {
              console.log(this.updateFormDatas,'修改信息')
              //如果操作成功
              if (res.data.code == 20031) {

                this.$message.success("修改审核通过");

              } else if (res.data.code == 20030) {
                this.$message.error("审核失败");
              } else {
                this.$message.error(res.data.msg);
              }
            }).then(() => {
              data.state = '通过'
              console.log(data, '通过')

              this.axios.put("http://localhost/news", data).then((res) => {

                console.log('通过')
                this.getAll()
              });
            });
          } //else



        })



      }).catch(() => {
        //3.取消
        this.$message.info("取消操作");
      });
    },



    bohui(data) {
      this.bohuiflag = !this.bohuiflag
      this.pizhu=''
      this.msg = data
    },


    //添加批注
    handleAdd() {

      var pizhu = this.pizhu
      if (pizhu == '' || pizhu == null) {
        this.$message.error("请填写批注信息");
      }
      // //发送ajax请求
      else {

        this.msg.state = '驳回'
        this.msg.pizhu = this.pizhu
        console.log(this.msg, '已驳回')
        this.axios.put("http://localhost/news", this.msg).then((res) => {
          //如果操作成功
          if (res.data.code == 20031) {
            this.$message.success("驳回成功");
          } else if (res.data.code == 20030) {
            this.$message.error("驳回失败");
          } else {
            this.$message.error(res.data.msg);
          }

        }).then(() => {
          this.bohuiflag = !this.bohuiflag
          this.getAll()

        })

      }



    },
  },


  created() {
    this.getAll()
  },



}
</script>
  
<style></style>