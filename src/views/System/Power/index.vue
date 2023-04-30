<template>
    <div>
        <h2>管理员权限管理</h2>

        <el-table class="table" current-row-key="id" :data="dataList" stripe highlight-current-row border>

            <el-table-column type="index" align="center" label="序号"></el-table-column>

            <el-table-column label='姓名' align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                </template>
            </el-table-column>

            <el-table-column label='身份' align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.flag ==0 ? '超级管理员' : scope.row.flag==1 ? '管理员' : '普通用户'  }}</span>
                </template>
            </el-table-column>

            <el-table-column label='权限' align="center">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="power(scope.row)">查看</el-button>
                </template>
            </el-table-column>





        </el-table>


        <!-- 查看权限弹层 -->
        <div>

            <el-dialog class="dialog" width="70%" title="用户权限" :visible.sync="dialogFormVisible">

                <div style=" width:1250px; height: 1300px;  margin: auto;  ">

                    <Item v-for="proute in proutes" :key="proute.id" :proute="proute" :uroute="uroute" @delete="del"
                        @add="add"></Item>
                </div>

                <!-- <div slot="footer" class="dialog-footer">

                    <el-button @click="dialogFormVisible = false">取消</el-button>

                    <el-button type="primary" @click="handleAdd()">确定</el-button>

                </div> -->

            </el-dialog>

        </div>


        <!-- 添加权限弹层 -->
        <div>

            <el-dialog class="dialog" width="30%" title="权限" :visible.sync="addFormVisible">

                <div style=" height: 200px;  margin: auto;  ">

                    <el-form ref="dataAddForm" :rules="rules" label-position="right" label-width="200px">

                   
                        <el-form-item label="请选择所需要添加的权限">
                            <el-select v-model="fid" placeholder="请选择">
                                <el-option v-for="route in selectroutes" :key="route.id" :label="route.fid + route.name"
                                    :value="route.fid"></el-option>
                            </el-select>
                        </el-form-item>


                    </el-form>
                    <div slot="footer" class="dialog-footer" style="margin-left:150px; margin-top: 100px;">

                        <el-button @click="addFormVisible = false">取消</el-button>

                        <el-button type="primary" @click="handleAdd()">确定</el-button>

                    </div>
                </div>


            </el-dialog>

        </div>


    </div>
</template>

<script>
import Item from '@/views/System/Item'
export default {

    components: { Item, },
    props: ["urls"],
    data() {
        return {
            dialogFormVisible: false,//控制表单是否可见
            dataList: [],
            fid: '',
            rules: {//校验规则
                shuju: [{ required: true, message: '请填信息', trigger: 'blur' }],
            },

            routes: [],//所有路由
            proutes: [],//所有一级路由
            croutes: [],//所有二级路由
            uroute: {},//用户当前路由
            selectroutes: [],
            msg: {},
            addFormVisible: false,
        }
    },
    created() {
        this.getAll();
    },
    methods: {

        //查询全部
        getAll() {

            //发送ajax请求(异步提交）
            console.log('更新数据')

            this.axios.get('http://localhost/users/route').then((res) => {
                // this.dataList = res.data.data;

                this.routes = res.data.data;
                console.log(this.routes, '所有路由 ')
                this.routes.forEach(ele => {

                    if (ele.fid % 1 === 0) {
                        this.proutes.push(ele)
                    }
                });

            });

            this.axios.get('http://localhost/users/userroute').then((res) => {
          //筛掉非管理员
                res.data.data.forEach(ele =>{
                    // if(ele.flag != 2){
                      this.dataList.push(ele)
                      console.log(this.dataList)
                    // }
                })
                
                
            });

        },
        power(msg) {
            console.log(msg,'msg')
            this.dialogFormVisible = true
            if (msg.route != null) {
                console.log('不为空')
                this.uroute = msg.route
                console.log(this.uroute,'this.uroute')

            }
            else {

                this.uroute = []

            }
            this.msg = msg
        },

        del(fid) {

              this.$confirm("此操作永久删除当前数据，是否继续？", "提示", {
                type: 'info'
            }).then(() => {
            this.axios.get('http://localhost/users/updateRou/' + this.msg.mobile + '/' + fid + '/').then((res) => {
                if (res.data.code == 20021) {
                    this.$message.success("删除成功");
                    console.log(res.data.data, '删除成功6666')
                   
                    var user=res.data.data
                    console.log('电话号码',user.mobile)
                    this.axios.get('http://localhost/users/userroute').then((res) => {
                        this.dataList = res.data.data;
                        this.dataList.forEach(ele =>{
                            console.log('电话号码',ele.mobile)
                            if(ele.mobile === user.mobile){
                                user=ele
                            }
                        })

                        console.log(user, '删除成功oooo')
                        this.power(user);
                    });

                } else {
                    this.$message.error("删除失败");
                }
            }).finally(() => {

            });
        }).catch(() => {
                //3.取消删除
                this.$message.info("取消删除操作");
            });
        },

        add(proute) {
            this.fid = ''
            this.croutes = []
            this.selectroutes = []
            console.log(this.uroute, '用户路由')

            console.log("添加")
            this.addFormVisible = true;
            var fid = proute.fid
            this.routes.forEach(ele => {
                if (ele.fid > fid && ele.fid < fid + 1) {
                    console.log(ele)
                    this.croutes.push(ele)
                }

            })
            console.log(this.croutes, '所有的二级路由')
            // console.log(this.croutes, '所有的二级路由')
            var bz = true;
            this.uroute.forEach(ele => {
                if (ele.fid == fid) {
                    bz = false
                }
            })

            if (!bz) {

                this.uroute.forEach(ele => {
                    console.log(ele.fid, fid)
                    if (ele.fid == fid) {
                        console.log('hhhh')
                        console.log(ele.route, '对应的二级路由')
                        this.croutes.forEach(el => {
                            var flag = true
                            ele.route.forEach(e => {
                                if (el.fid == e.fid) {
                                    console.log(el.fid, e.fid, '系统')
                                    flag = false
                                }

                            })
                            if (flag) {

                                this.selectroutes.push(el);
                                console.log(this.selectroutes, '可供')
                            }
                            console.log(flag)
                        })
                    }
                })

            }

            else {
                this.selectroutes = this.croutes
            }

            console.log(this.selectroutes, "供用户选择的二级路由")


        },
        handleAdd() {
            console.log(this.fid)
            this.axios.get('http://localhost/users/addRou/' + this.msg.mobile + '/' + this.fid + '/').then((res) => {
                if (res.data.code == 20021) {
                    this.$message.success("添加成功");
                    console.log(res.data.data, '添加成功')
                    var user=res.data.data

                    this.axios.get('http://localhost/users/userroute').then((res) => {
                        this.dataList = res.data.data;
                        this.dataList.forEach(ele =>{
                            if(ele.mobile === user.mobile){
                                user=ele
                            }
                        })

                        console.log(user, '添加成功oooo')
                        this.power(user);
                    });
                   
                    this.addFormVisible = false;
                   
                } else {
                    this.$message.error("添加失败");
                }
            }).finally(() => {

            });

        },




    },



}
</script>

<style lang="less" scoped>
.table {
    // width: 500px;
    margin: auto
}

.btn {

    margin: auto
}
</style>