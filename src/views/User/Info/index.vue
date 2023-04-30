<template>
  <div>
    <div style="width:1000px;height: 700px; padding: 50px; margin-left:295px;">

      <!-- 头像 -->
      <div style="width:300px;height: 300px;  float: left;">
        <el-avatar shape="square" :size="300" :src="imgUrl"></el-avatar>
      </div>
      <!--用户信息 -->
      <div style="width:600px;height: 300px; margin-left:350px">

        <el-descriptions :column="1" border>

          <el-descriptions-item :labelStyle="{ 'width': '100px' }" style="margin-top: 30px;">
            <template slot="label">
              <i class="el-icon-star-off"></i>
              账号：
            </template>
            <el-tag size="">{{ userinfo.mobile }}</el-tag>
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              昵称：
            </template>
            <el-tag size="">{{ userinfo.username }}</el-tag>
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-coordinate"></i>
              身份：
            </template>
            <el-tag size="">{{ userinfo.token }}</el-tag>
          </el-descriptions-item>



        </el-descriptions>

        <!-- <el-form-item style="text-align: center;"> -->
        <div style="text-align: center;margin-top: 50px;">

          <el-button type="primary" @click="ckinfo">查看账号信息</el-button>
          <!-- <el-button @click="huanbang">换绑</el-button> 插个眼，功能以后完善 -->
          <el-button type="primary" @click="xgpwd">修改密码</el-button>

        </div>


      </div>
      <!-- 用户功能 -->
      <hr>
      <div style="width:905px;height: 300px; margin-top: 50px;  display: flex;">

        <h1>功能</h1>

        <div style="width:200px;height: 200px; margin-top: 50px;margin-left: 50px;">
          <el-tooltip content="查看当前账号绑定的登记信息" placement="top">
            <img src="@/assets/image/dengji.jpg" @click="chakan" style="float: right; padding-right: 3%" />
          </el-tooltip>
        </div>

        <div style="width:200px;height: 200px; margin-top: 50px;margin-left: 50px;">
          <el-tooltip content="修改当前账号绑定的登记信息" placement="top">
            <img src="@/assets/image/xiugai.jpg" @click="xiugai" style="float: right; padding-right: 3%" />
          </el-tooltip>
        </div>

        <div style="width:200px;height: 200px; margin-top: 50px;margin-left: 50px;">
          <el-tooltip content="退出" placement="top">
            <img src="@/assets/image/tuichu.jpg" @click="loginOut" style="float: right; padding-right: 3%" />
          </el-tooltip>
        </div>


      </div>

    </div>


    <div>
      <el-dialog style=";" title="已登记信息" :visible.sync="flag">
        <Item :msg="this.msg"></Item>
      </el-dialog>

    </div>

    <div>
      <el-dialog v-if="ckinfoflag" title="当前账号信息" :visible.sync="ckinfoflag">
        <el-descriptions :column="1" border>

          <el-descriptions-item :labelStyle="{ 'width': '100px' }" style="margin-top: 30px;">
            <template slot="label">
              <i class="el-icon-star-off"></i>
              账号：
            </template>
            <el-tag size="">{{ userinfo.mobile }}</el-tag>
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              昵称：
            </template>
            <el-tag size="">{{ userinfo.username }}</el-tag>
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-coordinate"></i>
              身份：
            </template>
            <el-tag size="">{{ userinfo.token }}</el-tag>
          </el-descriptions-item>

          <el-descriptions-item :labelStyle="{ 'width': '200px' }">
            <template slot="label">
              <i class="el-icon-coordinate"></i>
              绑定的身份证号：
            </template>
            <el-tag size="">{{ userinfo.id_card }}</el-tag>
          </el-descriptions-item>



        </el-descriptions>


      </el-dialog>

    </div>

    <div>
      <el-dialog style=";" title="修改已登记信息" :visible.sync="xiugaiflag">
        <AddUI :updateFormDatas="updateFormDatas" @quxiao="quxiao" :msg="msg" :xiugaiflag="xiugaiflag">
        </AddUI>
      </el-dialog>

    </div>


    <div>
      <el-dialog v-if="hbflag" width="500px" title="换绑" :visible.sync="hbflag">

        <el-form :model="dataAddForm" ref="AddForm" :rules="rules" label-width="120px" border>



          <el-form-item label="旧的身份证号:">

            <span>{{ userinfo.id_card }}</span>

          </el-form-item>

          <el-form-item label="新的身份证号:" prop="id_card">

            <el-input v-model="dataAddForm.id_card" placeholder="请输入新的身份证号" style="width:203px;" />

          </el-form-item>

          <el-form-item label="密码:" prop="pwd">

            <el-input v-model="dataAddForm.pwd" type="password" placeholder="请输入当前账号密码" style="width:203px;" />

          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer" style="text-align: center;">

          <el-button @click="hbflag = false">取消</el-button>

          <el-button type="primary" @click="handleAdd('AddForm')">确定</el-button>

        </div>

      </el-dialog>

    </div>

    <div>
      <el-dialog v-if="xgpwdflag" width="500px" title="修改密码" :visible.sync="xgpwdflag">

        <el-form :model="pwdForm" ref="pwdForm" :rules="rules" label-width="120px" border>



          <el-form-item label="旧密码:" prop="oldpwd">

            <el-input v-model="pwdForm.oldpwd" show-password placeholder="请输入旧密码" style="width:203px;" />

          </el-form-item>

          <el-form-item label="新密码:" prop="newpwd">

            <el-input v-model="pwdForm.newpwd" show-password placeholder="请输入新密码" style="width:203px;" />

          </el-form-item>

          <el-form-item label="确认密码:" prop="againpwd">

            <el-input v-model="pwdForm.againpwd" show-password placeholder="请再次输入新密码" style="width:203px;" />

          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer" style="text-align: center;">

          <el-button @click="hbflag = false">取消</el-button>

          <el-button type="primary" @click="handlePwd('pwdForm')">确定</el-button>

        </div>

      </el-dialog>

    </div>






  </div>
</template>

<script>
// import { checkVal } from '@/utils/common'
import imgUrl from '@/assets/image/tx.jpg'
// import { mapState } from 'vuex'
// import { mapMutations } from 'vuex'
import { mapMutations,mapState } from 'vuex'
import Item from '@/views/User/Item'
import AddUI from '@/components/AddUI.vue'
export default {

  components: { Item, AddUI },
  data() {

    //自定义校验规则
    var checkId_card = (rule, value, callback) => {
      if (value == this.userinfo.id_card) {
        return callback(new Error('请输入新的身份证号'));
      }
      else {
        callback();
      }

    };

    var check_oldpwd = (rule, value, callback) => {
      var dataForm = {

        mobile: "",
        pwd: ""

      }

      dataForm.mobile = this.userinfo.mobile
      dataForm.pwd = value

      this.axios.post('http://localhost/users/user', dataForm).then((res) => {

        if (res.data.code == 20041) {
          callback();
        }
        else if (res.data.code == 20040) {
          return callback(new Error('密码错误！'));
        }
      })

    };

    var check_againpwd = (rule, value, callback) => {


      if (value == this.pwdForm.newpwd) {
        callback();
      }
      else {
        return callback(new Error('两次密码不同！'));
      }


    };


    return {
      xgpwdflag: false,
      ckinfoflag: false,
      hbflag: false,
      xiugaiflag: false,
      flag: false,
      imgUrl: imgUrl,
      msg: [],
      info:[],
      dataList: this.userinfo,
      updateFormDatas: [],
      dataAddForm: {
        id: '',
        name: '',
        mobile: "",
        id_card: '',
        pwd: '',
        flag: '',
        routes: '',
      },

      pwdForm: {
        oldpwd: '',
        newpwd: '',
        againpwd: '',
      },

      rules: {
        id_card: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          {
            pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            message: "请输入合法身份证号", trigger: "blur"
          },
          { validator: checkId_card, trigger: 'blur' },

        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],

        oldpwd: [
          { validator: check_oldpwd, trigger: 'blur' },
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],

        newpwd: [

          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, max: 20, message: '长度不低于8个字符', trigger: 'blur' },
        ],

        againpwd: [

          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, max: 20, message: '长度不低于8个字符', trigger: 'blur' },
          { validator: check_againpwd, trigger: 'blur' },
        ],


      },

    };

  },

  computed: {
    ...mapState('login', ['userinfo'])

  },
  methods: {

    ...mapMutations('login', ['setUser']),
    quxiao() {
      this.xiugaiflag = !this.xiugaiflag
    },

    getAll() {
      this.axios.get("http://localhost/peoples/id_card/" + this.userinfo.id_card).then((res) => {


        if (res.data.code == 20041) {
          this.msg = res.data.data;
          console.log("当前用户登记信息访问成功")
        } else if (res.data.code == 20040) {
          this.msg = []
          console.log("当前用户登记信息访问失败")

        }

      });
    },

    chakan() {

      this.getAll()

      if (this.msg.length == 0) {

        this.$message.error("暂无信息，赶紧去登记吧");
      }
      else {
        this.flag = !this.flag
      }


    },
    xiugai() {

      if (this.msg.length == 0) {

        this.$message.error("暂无信息，赶紧去登记吧");
      }
      else {


        this.xiugaiflag = !this.xiugaiflag
        this.getAll()
        this.updateFormDatas = this.msg


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



      }

    },
    ckinfo() {
      this.ckinfoflag = !this.ckinfoflag
      // this.info = this.userinfo
    },
    huanbang() {
      this.dataAddForm = {}
      this.hbflag = !this.hbflag

    },

    handleAdd(formName) {


      this.$refs[formName].validate((valid) => {
        if (valid) {

          this.dataAddForm.mobile = this.userinfo.mobile



          this.axios.post('http://localhost/users/user', this.dataAddForm).then((res) => {

            if (res.data.code == 20041) {

              this.dataAddForm.id = res.data.data.id
              this.dataAddForm.flag = res.data.data.flag
              this.dataAddForm.name = res.data.data.name
              this.dataAddForm.routes = res.data.data.route
              this.axios.put('http://localhost/users/', this.dataAddForm).then((res) => {
                if (res.data.code == 20031) {
                  this.$message.success("修改成功");

                  // this.userinfo.id_card = this.dataAddForm.id_card //修改了本地存储的信息，有点不妥，插个眼以后改进
                  this.setUser({


                    username: this.dataAddForm.name,
                    token: this.dataAddForm.flag == 0 ? '超级管理员' : res.data.data.flag == 1 ? '管理员' : '普通用户',
                    mobile: this.dataAddForm.mobile,
                    id_card: this.dataAddForm.id_card,
                    routes: this.dataAddForm.routes,


                  })
                  this.hbflag = !this.hbflag


                }
                else {
                  this.$message.error("修改失败");
                }
              })


            }
            else if (res.data.code == 20040) {
              this.$message.error("密码错误！");
            }


          })

        }

        else {
          console.log('error submit!!');
          return false;
        }



      })


    },

    xgpwd() {
      this.pwdForm = {}
      this.xgpwdflag = !this.xgpwdflag
    },

    handlePwd(formName) {


      this.$refs[formName].validate((valid) => {
        if (valid) {

          this.dataAddForm.mobile = this.userinfo.mobile
          this.dataAddForm.pwd = this.pwdForm.oldpwd
          this.axios.post('http://localhost/users/user', this.dataAddForm).then((res) => {

            if (res.data.code == 20041) {



              this.dataAddForm = res.data.data
              this.dataAddForm.pwd = this.pwdForm.newpwd
              this.axios.put('http://localhost/users/', this.dataAddForm).then((res) => {
                if (res.data.code == 20031) {
                  this.$message.success("修改成功");


                  this.xgpwdflag = !this.xgpwdflag


                }
                else {
                  this.$message.error("修改失败");
                }
              })


            }
            else if (res.data.code == 20040) {
              this.$message.error("密码错误！");
            }


          })

        }

        else {
          console.log('error submit!!');
          return false;
        }



      })


    },

    ...mapMutations('menu',['removeMenuList']),
    ...mapMutations('login',['removeUser']),
    // //退出登录----1. 删除vuex登录信息  2. 跳转登录界面----- 3. 清空菜单导航----
    loginOut() {

      this.$confirm("是否退出登录？", "提示", {
        type: 'warning'
      }).then(() => {

        //进入登录界面
        this.$router.replace('/login')
        //清空菜单导航
        this.removeMenuList();
        //清空登录

        console.log('----退出登录----------------');
        localStorage.removeItem('info') //删除有问题 需要单独删除模块名称  vuex持久化注意的 插件--
        localStorage.removeItem('login')

      }).catch(() => {
        //3.取消
        this.$message.warning("取消操作");
      });


    }


  },

  created() {
    this.getAll()
  },



}
</script>

<style></style>