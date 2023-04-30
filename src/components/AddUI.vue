//添加、修改功能组件
<template>
    <!-- <div style="width: 500px;margin: auto;margin-top: 10px;background-color: aquamarine;"> -->
    <div class="wrapper">
        <div class="my-title">
            <el-form :model="updateFormDatas" ref="updateFormDatas" :rules="rules" label-width="100px"
                class="demo-ruleForm">

                <el-form-item label="姓名" prop="name">
                    <el-input v-model="updateFormDatas.name"></el-input>
                </el-form-item>
                <el-row :gutter="24">
                    <el-col :span="8">
                        <el-form-item label="性别" prop="sex">
                            <el-select v-model="updateFormDatas.sex" placeholder="请选择">
                                <el-option label="男" value="男"></el-option>
                                <el-option label="女" value="女"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="生日" prop="birthday">
                            <el-date-picker type="date" placeholder="选择日期" v-model="updateFormDatas.birthday"
                                style="width:203px;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="婚姻状况" prop="marriage">
                            <el-select v-model="updateFormDatas.marriage" placeholder="请选择">
                                <el-option label="未婚" value=0></el-option>
                                <el-option label="已婚" value=1></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>






                <el-row :gutter="24">
                    <el-col :span="8">
                        <el-form-item label="籍贯" prop="place">
                            <el-select v-model="updateFormDatas.place" placeholder="请选择">
                                <el-option v-for="place in places" :key="place.id" abel="place.shuju"
                                    :value="place.shuju"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8">
                        <el-form-item label="民族" prop="nation">
                            <el-select v-model="updateFormDatas.nation" placeholder="请选择">
                                <el-option v-for="nation in nations" :key="nation.id" abel="nation.shuju"
                                    :value="nation.shuju"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8">

                        <el-form-item label="学历" prop="degree">
                            <el-select v-model="updateFormDatas.degree" placeholder="请选择">
                                <el-option v-for="degree in degrees" :key="degree.id" abel="degree.shuju"
                                    :value="degree.shuju"></el-option>
                            </el-select>
                        </el-form-item>

                    </el-col>

                </el-row>


                <el-row :gutter="24">

                    <el-col :span="8">


                        <el-form-item label="政治面貌" prop="face">
                            <el-select v-model="updateFormDatas.face" placeholder="请选择">
                                <el-option v-for="face in faces" :key="face.id" :label="face.shuju"
                                    :value="face.shuju"></el-option>
                            </el-select>
                        </el-form-item>

                    </el-col>

                    <el-col :span="8">
                        <el-form-item label="身份证号：" prop="id_card">
                            <el-input maxlength="18" v-model="updateFormDatas.id_card" placeholder="请输入证件号"
                                style="width:203px;"></el-input>
                        </el-form-item>

                    </el-col>

                    <el-col :span="8">

                        <el-form-item label="联系电话：" prop="mobile">
                            <el-input maxlength="11" @input="
                                updateFormDatas.mobile = updateFormDatas.mobile.replace(
                                    /^(0+)|[^\d]+/g,
                                    ''
                                )
                            " v-model="updateFormDatas.mobile" placeholder="请输入手机号码" style="width:203px;"></el-input>
                        </el-form-item>

                    </el-col>
                </el-row>

                <el-row :gutter="24" style="margin-top: 10px;">
                    <el-col :span="8">
                        <el-form-item label="楼牌号" prop="buildingcard" >
                            <el-select v-model="updateFormDatas.buildingcard" placeholder="请选择">
                                <el-option v-for="building in buildings" :key="building.id" :label="building.shuju"
                                    :value="building.shuju"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="门牌号：" prop="housecard">
                            <el-input maxlength="3" v-model="updateFormDatas.housecard" placeholder="请输入门牌号例如:109"
                                style="width:203px;"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item label="详细地址" prop="address">
                    <el-input type="textarea" v-model="updateFormDatas.address"></el-input>
                </el-form-item>



                <el-form-item label="户口所在地" prop="homeplace">
                    <el-input type="textarea" v-model="updateFormDatas.homeplace"></el-input>
                </el-form-item>

                <el-form-item label="工作单位" prop="work">
                    <el-input type="textarea" v-model="updateFormDatas.work"></el-input>
                </el-form-item>


                <el-form-item label="是否低保" prop="dibao">
                    <el-select v-model="updateFormDatas.dibao" placeholder="请选择">
                        <el-option label="是" value=1></el-option>
                        <el-option label="否" value=0></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="是否老年" prop="isold">
                    <el-select v-model="updateFormDatas.isold" placeholder="请选择">
                        <el-option label="是" value=1></el-option>
                        <el-option label="否" value=0></el-option>
                    </el-select>
                </el-form-item>




                <el-form-item v-show="!flag" style="text-align: center;">
                    <el-button type="primary" @click="submitForm('updateFormDatas')">提交</el-button>
                    <el-button @click="resetForm('updateFormDatas')">重置</el-button>
                </el-form-item>

                <el-form-item v-show="flag" style="text-align: center;">
                    <el-button type="primary" @click="updateForm('updateFormDatas')">提交修改</el-button>
                    <el-button type="danger" @click="cancelForm()">取消修改</el-button>

                </el-form-item>


            </el-form>
        </div>
        <hr>
        <div class="my-footer">
            <h3>注意事项:</h3>
            <p>♡请按照要求填写信息</p>
            <p>♡若显示已登记，则该用户身份证已经登记</p>
            <p>♡暂住登记，请联系社区保安 tel:188xxxx</p>

        </div>
    </div>
</template>
  
<script>
import dayjs from 'dayjs'
import { mapState } from 'vuex'
export default {
    name: 'AddUI',
    props: ['updateFormDatas', 'flag', 'msg', 'xiugaiflag'],//xiugaiflag是修改已登记信息的标记
    data() {



        //自定义校验规则
        var checkId_card = (rule, value, callback) => {
            if (value != this.userinfo.id_card) {
                return callback(new Error('该身份证号与当前账号绑定的身份证号不符'));
            }
            else {
                callback();
            }

        };

        return {

            news: {
                time: '',
                mobile: '',
                username: '',
                id_card: '',
                title: '用户信息添加',
                peoplespd: [],
                sys_people_sp_id: '',
                state: '审核中',
                pizhu: '',

            },
            nations: '',
            places: '',
            degrees: '',
            faces: '',
            buildings: '',

            rules: {
                mobile: [
                    { required: true, message: "请输入手机号", trigger: "blur" },
                    // 这个只能验证手机号
                    // { pattern:/^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/, message: "请输入合法手机号", trigger: "blur" }
                    { pattern: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/, message: "请输入合法手机号/电话号", trigger: "blur" }
                ],
                id_card: [
                    { required: true, message: "请输入身份证号", trigger: "blur" },
                    { validator: checkId_card, trigger: 'blur' },
                    { pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/, message: "请输入合法身份证号", trigger: "blur" }
                ],
                name: [
                    { required: true, message: '请输入真实姓名', trigger: 'blur' },
                    { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
                ],
                sex: [{ required: true, message: '性别不能为空', trigger: 'change' }],

                marriage: [
                    { required: true, message: '请选择信息', trigger: 'change' }
                ],
                face: [
                    { required: true, message: '请选择政治面貌', trigger: 'change' }
                ],
                buildingcard: [
                    { required: true, message: '请选择楼牌号', trigger: 'change' }
                ],
                place: [
                    { required: true, message: '请选择籍贯', trigger: 'change' }
                ],
                nation: [
                    { required: true, message: '请选择民族', trigger: 'change' }
                ],
                degree: [
                    { required: true, message: '请选择学历', trigger: 'change' }
                ],
                birthday: [
                    { required: true, message: '请选择日期', trigger: 'change' }
                ],
                address: [{ required: true, message: '地址不能为空' }],
                homeplace: [{ required: true, message: '户口所在地不能为空' }],
                work: [{ required: true, message: '工作单位不能为空' }],
                housecard: [{ required: true, message: '门牌号不能为空' }],
                dibao: [{ required: true, message: '请选择' }],
                isold: [{ required: true, message: '请选择' }],
                //暂住人口
                fzname: [{ required: true, message: '房主姓名不能为空' }],
                fzgx: [{ required: true, message: '房主关系不能为空' }],
                date: [
                    { required: true, message: '请选择日期', trigger: 'change' }
                ],

            }
        };
    },
    computed: {
        ...mapState('login', ['userinfo'])

    },

    methods: {
        cancelForm() {
            this.$emit("quxiao")
        },

        checkForm() {
            this.axios.get("http://localhost/peoples/getId_card/" + this.updateFormDatas.id + this.updateFormDatas.id_card).then((res) => {

                return res.data.code



            })
        },


        //添加申请
        addUser() {

            console.log(this.aflag, 'hhhh')
            this.updateFormDatas.birthday = this.dayjs(this.updateFormDatas.birthday).format('YYYY-MM-DD')
            this.updateFormDatas.date = this.dayjs(this.updateFormDatas.date).format('YYYY-MM-DD')

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
            if (this.xiugaiflag) {
                //修改已登记信息将id存储到oldid
                this.updateFormDatas.oldid = this.updateFormDatas.id
            }
            else { this.updateFormDatas.oldid = 0 }


            this.axios.post("http://localhost/peoplesps", this.updateFormDatas).then((res) => {

                if (res.data.code == 20011) {

                    this.$message.success("提交成功，请等待审核");

                    this.news.sys_people_sp_id = res.data.data
                    this.news.time = dayjs().format('YYYY-MM-DD HH:mm:ss');
                    this.news.mobile = this.userinfo.mobile
                    this.news.username = this.userinfo.username
                    this.news.id_card = this.userinfo.id_card
                    this.news.peoplespd = this.updateFormDatas

                    if (this.xiugaiflag) {
                        this.news.title = '修改已登记信息'
                    }

                    //保存提交信息
                    this.axios.post("http://localhost/news", this.news).then((res) => {
                        //如果操作成功，关闭弹层，显示数据
                        if (res.data.code == 20011) {

                        } else if (res.data.code == 20010) {

                        } else {
                            this.$message.error(res.data.msg);
                        }
                    })


                } else if (res.data.code == 20010) {
                    this.$message.error("提交失败");
                } else {
                    this.$message.error(res.data.msg);
                }
            }).finally(() => {
                this.$router.replace({
                    path: '/user/new',
                    // query:{
                    //     msg:this.updateFormDatas
                    // }
                }).then(() => {
                    this.$emit("quxiao")
                })
            });




        },

        //修改申请
        updateUser() {

            console.log(this.aflag, 'hhhh')
            this.updateFormDatas.birthday = this.dayjs(this.updateFormDatas.birthday).format('YYYY-MM-DD')
            this.updateFormDatas.date = this.dayjs(this.updateFormDatas.date).format('YYYY-MM-DD')

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



            this.axios.put("http://localhost/peoplesps", this.updateFormDatas).then((res) => {

                if (res.data.code == 20031) {

                    this.$message.success("提交修改成功，请等待审核");

                    this.news.sys_people_sp_id = res.data.data
                    this.news.time = dayjs().format('YYYY-MM-DD HH:mm:ss');
                    this.news.mobile = this.userinfo.mobile
                    this.news.username = this.userinfo.username
                    this.news.id_card = this.userinfo.id_card
                    this.news.peoplespd = this.updateFormDatas
                    if (this.updateFormDatas.oldid != 0) {
                        this.news.title = '修改已登记信息'
                    }

                    //保存提交信息
                    this.axios.post("http://localhost/news", this.news).then((res) => {
                        //如果操作成功，关闭弹层，显示数据
                        if (res.data.code == 20011) {

                        } else if (res.data.code == 20010) {

                        } else {
                            this.$message.error(res.data.msg);
                        }
                    })


                } else if (res.data.code == 20010) {
                    this.$message.error("提交失败");
                } else {
                    this.$message.error(res.data.msg);
                }
            }).finally(() => {
                this.$router.replace({
                    path: '/user/new',
                    // query:{
                    //     msg:this.updateFormDatas
                    // }
                }).then(() => {
                    this.$emit("quxiao")
                })
            });




        },


        submitForm(formName) {

            this.$refs[formName].validate((valid) => {

                if (valid) {
                    console.log(this.xiugaiflag, "8888", this.news.title)
                    if (!this.xiugaiflag) { //如果不是修改已登记信息则要校验该用户是否已经添加
                        console.log(this.xiugaiflag, "8888", this.news.title)
                        this.axios.get("http://localhost/peoples/getId_card/0/" + this.updateFormDatas.id_card).then((res) => {

                            if (res.data.code == 20041) {
                                this.$message.error("该用户已经登记");

                                console.log(this.aflag, "该用户已经登记")
                            }
                            else {
                                this.addUser()
                            }
                        })
                    }

                    else {
                        this.addUser()

                    }

                }


                else {
                    console.log('error submit!!');
                    return false;
                }
            });

        },


        updateForm(formName) {
            console.log('hhhhhhhhhh', this.updateFormDatas)



            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log(this.updateFormDatas.oldid, "88999", this.news.title)
                    if (this.updateFormDatas.oldid == 0) {//如果不是修改已登记的信息则要校验,oldid为0则是修改添加信息，不为0则是修改已登记信息
                        this.axios.get("http://localhost/peoples/getId_card/0/" + this.updateFormDatas.id_card).then((res) => {


                            if (res.data.code == 20041) {
                                this.$message.error("该用户已经登记");

                            }


                            else {
                                this.updateUser()

                                this.$emit("shanchu", this.msg.id)

                            }

                        })
                    }
                    else {//否则不要校验
                        this.updateUser()

                        this.$emit("shanchu", this.msg.id)
                    }

                }


                else {
                    console.log('error submit!!');
                    return false;
                }
            })


        },


        resetForm(formName) {
            this.$refs[formName].resetFields();
        },



        getshuju() {
            this.axios.get("http://localhost/places/").then((res) => {
                this.places = res.data.data;
            });
            this.axios.get("http://localhost/degrees/").then((res) => {
                this.degrees = res.data.data;
            });
            this.axios.get("http://localhost/nations/").then((res) => {
                this.nations = res.data.data;
            });
            this.axios.get("http://localhost/faces/").then((res) => {
                this.faces = res.data.data;
            });
            this.axios.get("http://localhost/buildings/").then((res) => {
                this.buildings = res.data.data;
            });


        },

    },
    created() {

        this.getshuju();

    },

}
</script>
  
<style lang="less" scoped>
.wrapper {
    width: 100.7%;
    height: 870px;
    background: #fff;

    .my-title {

        // padding: 14px;
        color: #333333;
        font-weight: bold;
    }

    .demo-ruleForm {
        // padding: 20px;
    }

    .my-footer {
        width: 60%;
        height: 80px;
        // margin-top: 20px;
        margin-left: 30px;
        // background: aqua; 
        line-height: 25px;
        font-size: medium;

        p {
            font-size: medium;
            font-weight: bold;
        }

        h3 {
            color: brown;
        }
    }
}
</style>