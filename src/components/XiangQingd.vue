
<template>
  <div>
    <div v-if="!flag">

    <!-- <el-radio-group v-model="size">
        <el-radio label="">默认</el-radio>
        <el-radio label="medium">中等</el-radio>
        <el-radio label="small">小型</el-radio>
        <el-radio label="mini">超小</el-radio>
        </el-radio-group> -->

      <el-descriptions class="margin-top" :model="ruleForm" :column="3" :size="size" border>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            姓名：
          </template>
          <el-tag size="">{{ ruleForm.name }}</el-tag>
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            性别：
          </template>
          {{ ruleForm.sex }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            婚姻状况：
          </template>
          {{ ruleForm.marriage == 0 ? '未婚' : '已婚' }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets"></i>
            生日：
          </template>
          {{ ruleForm.birthday }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            籍贯：
          </template>
          {{ ruleForm.place }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            学历：
          </template>
          {{ ruleForm.degree }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            身份证号：
          </template>
          {{ ruleForm.id_card }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            民族：
          </template>
          {{ ruleForm.nation }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            政治面貌：
          </template>
          {{ ruleForm.face }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            联系电话：
          </template>
          {{ ruleForm.mobile }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            现居：
          </template>
          {{ ruleForm.buildingcard + ruleForm.housecard }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            详细地址：
          </template>
          {{ ruleForm.address }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            户口所在地：
          </template>
          {{ ruleForm.homeplace }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            工作单位：
          </template>
          {{ ruleForm.work }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            是否低保：
          </template>
          {{ ruleForm.dibao == 0 ? '否' : '是' }}
        </el-descriptions-item>


        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            是否老年：
          </template>
          {{ ruleForm.isold == 0 ? '否' : '是' }}
        </el-descriptions-item>

        <el-descriptions-item v-if="sflag">
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            房主姓名：
          </template>
          <el-tag size="">{{ ruleForm.fzname }}</el-tag> 
        </el-descriptions-item>

        <el-descriptions-item v-if="sflag">
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            与房主关系：
          </template>
          <el-tag size="">{{ ruleForm.fzgx }}</el-tag> 
        </el-descriptions-item>

        <el-descriptions-item v-if="sflag">
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            来本地日期：
          </template>
          <el-tag size="">{{ ruleForm.date }}</el-tag>
        </el-descriptions-item>


        <template slot="extra">
          <el-button type="primary" @click="updateForm(ruleForm)">修改</el-button>
          <el-button type="danger" @click="delForm(ruleForm)">删除</el-button>
        </template>

      </el-descriptions>



    <!-- <el-form :model="ruleForm" label-width="100px" class="demo-ruleForm" size="mini">

        <el-form-item label="姓名：">
          <span>{{ ruleForm.name }}</span>
        </el-form-item>

        <el-form-item label="性别：">
          <span>{{ ruleForm.sex }}</span>
        </el-form-item>

        <el-form-item label="婚姻状况：">
          <span>{{ ruleForm.marriage == 0 ? '未婚' : '已婚' }}</span>
        </el-form-item>

        <el-form-item label="生日：">
          <span>{{ ruleForm.birthday }}</span>
        </el-form-item>



        <el-form-item label="籍贯：">
          <span>{{ ruleForm.place }}</span>
        </el-form-item>

        <el-form-item label="学历：">
          <span>{{ ruleForm.degree }}</span>
        </el-form-item>

        <el-form-item label="身份证号：">
          <span>{{ ruleForm.id_card }}</span>
        </el-form-item>

        <el-form-item label="民族：">
          <span>{{ ruleForm.nation }}</span>
        </el-form-item>

        <el-form-item label="政治面貌：">
          <span>{{ ruleForm.face }}</span>
        </el-form-item>

        <el-form-item label="联系电话：">
          <span>{{ ruleForm.mobile }}</span>
        </el-form-item>

        <el-form-item label="现居：">
          <span>{{ ruleForm.buildingcard + ruleForm.housecard }}</span>
        </el-form-item>


        <el-form-item label="详细地址：">
          <span>{{ ruleForm.address }}</span>
        </el-form-item>

        <el-form-item label="户口所在地：">
          <span>{{ ruleForm.homeplace }}</span>
        </el-form-item>

        <el-form-item label="工作单位：">
          <span>{{ ruleForm.work }}</span>
        </el-form-item>


        <el-form-item label="是否低保：">
          <span>{{ ruleForm.dibao == 0 ? '否' : '是' }}</span>
        </el-form-item>

        <el-form-item label="是否老年：">
          <span>{{ ruleForm.isold == 0 ? '否' : '是' }}</span>
            </el-form-item> -->


    <!-- <el-form-item v-show="sflag" label="房主姓名" prop="fzname">
   
        <span>{{ ruleForm.fzname }}</span>
      </el-form-item>

      <el-form-item v-show="sflag" label="与房主关系" prop="fzgx">
      
        <span>{{ ruleForm.fzgx }}</span>
      </el-form-item>

      <el-form-item v-show="sflag" label="来本地日期" prop="date">
        <el-col :span="11">
          <el-form-item prop="date">
         
            <span>{{ ruleForm.date }}</span>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item style="text-align: center;">
        <el-button type="primary" @click="updateForm(ruleForm)">编辑</el-button>
        <el-button type="danger" @click="delForm(ruleForm)">删除</el-button>
      </el-form-item>


        </el-form> -->
    </div>

    <div v-else-if="flag">
      <AddPd :updateFormDatas="updateFormDatas" :flag="flag" @xiugai="xiugai" @quxiao="quxiao" :sflag="sflag"></AddPd>
    </div>

  </div>
</template>
  
<script>
import { cloneDeep } from 'lodash'  //新的深拷贝
import AddPd from '../components/AddPd.vue'
export default {
  components: { AddPd },
  name: 'XiangQing',
  props: ['msg', 'sflag',],
  data() {
    return {
      size: '',
      flag: false,//控制表单是否可见
      // flags:this.flag,
      ruleForm: this.msg,
      updateFormDatas: {},
      // dialogFormVisible: false,
    }
  },
  // computed:{
  //   ruleForm:{
  //     get(){
  //       return this.msg
  //     },
  //     set(val){
  //       console.log(val)
  //       this.msg=val
  //     }

  //   }
  // },
  watch: {
    msg: {
      handler() {
        console.log("handler", this.msg)
        // this.$emit('getAll')
        this.ruleForm = this.msg
      }
    },
    immediate: true,

    ruleForm: {
      handler() {
        console.log("handlerrrrrr",)
        this.$emit('getAll')
        // location.reload();
      }
    },

  },


  methods: {


    quxiao() {
      this.flag = !this.flag
    },

    xiugai(ruleForm) {

      this.ruleForm = cloneDeep(ruleForm)
      // this.ruleForm=ruleForm
      this.flag = false
    },
    updateForm(ruleForm) {

      this.flag = !this.flag
      if (!this.sflag) {
        console.log('常住人口')
        var url = "http://localhost/peoples/"
      }
      else {
        console.log('暂住人口')
        var url = "http://localhost/speoples/"
      }
      this.axios.get(url + ruleForm.id).then((res) => {

        if (res.data.code == 20041) {


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


          this.flag = true;
        } else {
          this.$message.error(res.data.msg);
        }
      });


    },
    delForm(msg) {
      //1.弹出提示框
      this.$confirm("此操作永久删除当前数据，是否继续？", "提示", {
        type: 'info'
      }).then(() => {
        //2.做删除业务
        if (!this.sflag) {
          console.log('常住人口')
          var url = "http://localhost/peoples/"
        }
        else {
          console.log('暂住人口')
          var url = "http://localhost/speoples/"
        }
        this.axios.delete(url + msg.id).then((res) => {
          if (res.data.code == 20021) {
            this.$message.success("删除成功");
            this.$emit('handlequxiao')
          } else {
            this.$message.error("删除失败");
          }
        })
        // .finally(() => {

        //   location.reload();

        // }
        // );
      }).catch(() => {
        //3.取消删除
        this.$message.info("取消删除操作");
      });

    },

  },
  created() {
    console.log("created")
    this.flag = false
  }


}
</script>
  
<style></style>