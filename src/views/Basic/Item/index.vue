<template>
    <div>
        <h2>{{ urls.title }}</h2>

        <el-table class="table" current-row-key="id" :data="dataList" stripe highlight-current-row border>

            <el-table-column type="index" align="center" label="序号"></el-table-column>

            <el-table-column :label='urls.label' align="center">
                <template slot-scope="scope">
                    <span v-show="!scope.row.flag">{{ scope.row.shuju }}</span>
                    <input v-show="scope.row.flag" :value="scope.row.shuju" v-focus="scope.row.flag"
                        @blur="handleBlur(scope.row, $event)">
                </template>
            </el-table-column>



            <el-table-column label="操作" align="center">

                <template slot-scope="scope">

                    <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>

                    <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>

                </template>

            </el-table-column>


        </el-table>



        <div class="btn" style="text-align:center;margin-top: 10px;">
            <el-button type="primary" @click="handleCreate()">新建</el-button>
        </div>

        <!-- 添加弹层 -->
        <div>

            <el-dialog style="width: 1000px;margin: auto; " title="新增信息" :visible.sync="dialogFormVisible">

                <el-form ref="dataAddForm" :model="formData" :rules="rules" label-position="right" label-width="100px">

                    <el-row>

                        <el-col :span="12">

                            <el-form-item label="新的信息" prop="shuju">

                                <el-input v-model="formData.shuju" />

                            </el-form-item>

                        </el-col>

                    </el-row>

                </el-form>
                <div slot="footer" class="dialog-footer">

                    <el-button @click="dialogFormVisible = false">取消</el-button>

                    <el-button type="primary" @click="handleAdd()">确定</el-button>

                </div>

            </el-dialog>

        </div>


    </div>
</template>

<script>
export default {

    name: 'Item',
    props: ["urls"],
    data() {
        return {
            dialogFormVisible: false,//控制表单是否可见
            dataList: [],
            formData: {},//表单数据
            rules: {//校验规则
                shuju: [{ required: true, message: '请填信息', trigger: 'blur' }],
            },
        }
    },
    created() {
        this.getAll();
    },
    //让输入框获取焦点
    directives: {
        Focus: {
            update: function (el, { value }) {
                if (value) {
                    // if(true)就聚焦
                    el.focus();
                }
            },
        },
    },

    methods: {

        //查询全部
        getAll() {

            //发送ajax请求(异步提交）

            this.axios.get(this.urls.url).then((res) => {
                this.dataList = res.data.data;
            });
        },

        //删除       
        handleDelete(row) {
            //1.弹出提示框
            this.$confirm("此操作永久删除当前数据，是否继续？", "提示", {
                type: 'info'
            }).then(() => {
                //2.做删除业务
                this.axios.delete(this.urls.url + row.id).then((res) => {
                    if (res.data.code == 20021) {
                        this.$message.success("删除成功");
                    } else {
                        this.$message.error("删除失败");
                    }
                }).finally(() => {
                    this.getAll();
                });
            }).catch(() => {
                //3.取消删除
                this.$message.info("取消删除操作");
            });
        },

        //弹出添加框      
        handleCreate() {

            this.dialogFormVisible = true;
            this.resetForm();
        },
        //重置表单
        resetForm() {
            this.formData = {};
        },

        //添加
        handleAdd() {

            var shuju = this.formData.shuju
            if (shuju == '' || shuju == null) {
                this.$message.error("字段为空，添加失败");
            }
            // //发送ajax请求
            else {
                this.axios.get(this.urls.url + shuju).then((res) => {
                    if (res.data.code == 20041) {
                        this.$message.error("该字段已经存在");
                    }


                    else {
                        this.axios.post(this.urls.url, this.formData).then((res) => {
                            //如果操作成功，关闭弹层，显示数据
                            if (res.data.code == 20011) {
                                this.dialogFormVisible = false;
                                this.$message.success("添加成功");
                            } else if (res.data.code == 20010) {
                                this.$message.error("添加失败");
                            } else {
                                this.$message.error(res.data.msg);
                            }
                        }).finally(() => {
                            this.getAll();
                        })
                    }
                })
            }
        },

        //编辑
        handleUpdate(row) {

            row.flag = 1



        },

        //提交编辑后的信息
        handleBlur(row, e) {
            row.flag = 0
            var shuju = e.target.value

            if (!e.target.value.trim()) {
                this.$message.error("字段不能为空");
            }

            else {
                this.axios.get(this.urls.url + shuju).then((res) => {
                    if (res.data.code == 20041) {
                        this.$message.error("该字段已经存在或未修改");
                    }



                    //发送ajax请求
                    else {
                        this.axios.put(this.urls.url, { id: row.id, shuju: shuju }).then((res) => {
                            //如果操作成功，关闭弹层，显示数据
                            if (res.data.code == 20031) {

                                this.$message.success("修改成功");
                            } else if (res.data.code == 20030) {
                                this.$message.error("修改失败");
                            } else {
                                this.$message.error(res.data.msg);
                            }
                        }).finally(() => {
                            this.getAll();
                        });



                    }
                })
            }
        }

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