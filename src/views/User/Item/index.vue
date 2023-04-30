
<template>
  <div>
    <div>

      <el-descriptions class="margin-top" :model="ruleForm" :column="3"  border>
      

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

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            户口所在地：
          </template>
          {{ ruleForm.homeplace }}
        </el-descriptions-item>




      <!--   
          <template slot="extra">
            <el-button type="primary" @click="updateForm(ruleForm)">修改</el-button>
            <el-button type="danger" @click="delForm(ruleForm)">删除</el-button>
              </template> -->

      </el-descriptions>

    </div>



  </div>
</template>
    
<script>
export default {
  name: 'Item',
  props: ['msg'],
  data() {
    return {

      ruleForm: this.msg,
    }
  },

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





}
</script>
    
<style></style>