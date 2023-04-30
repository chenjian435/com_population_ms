<template>
  <div>


    <div class="header">
      <div>

        <el-form :inline="true" :model="formInline" ref="ruleForm" class="demo-form-inline">
          <el-form-item label="查询方式">
            <el-select size="small" placeholder="请选择" v-model="search_name">
              <el-option label="按姓名查找" value="按姓名查找"></el-option>
              <el-option label="按性别查找" value="按性别查找"></el-option>
              <el-option label="按楼牌号查找" value="按楼牌号查找"></el-option>
              <el-option label="按门牌号查找" value="按门牌号查找"></el-option>
              <el-option label="按姓名+性别查找" value="按姓名+性别查找"></el-option>
              <el-option label="按楼牌号+门牌号查找" value="按楼牌号+门牌号查找"></el-option>

            </el-select>
          </el-form-item>

          <el-form-item
            v-if="this.search_name != '按性别查找' && this.search_name != '按楼牌号查找' && this.search_name != '按姓名+性别查找' && this.search_name != '按楼牌号+门牌号查找'"
            :label="this.search_name">
            <el-input v-model=search size="small" :placeholder='this.tip'></el-input>
          </el-form-item>


          <el-form-item v-if="this.search_name == '按性别查找'" :label="this.search_name" prop="sex">
            <el-select size="small" v-model=search :placeholder='this.tip'>
              <el-option label="男" value=男></el-option>
              <el-option label="女" value=女></el-option>
            </el-select>
          </el-form-item>

          <el-form-item v-if="this.search_name == '按楼牌号查找'" :label="this.search_name" prop="buildingcard">
            <el-select size="small" v-model=search :placeholder='this.tip'>
              <el-option v-for="building in buildings" :key="building.id" :label="building.shuju"
                :value="building.shuju"></el-option>
            </el-select>
          </el-form-item>


          <el-form-item v-if="this.search_name == '按姓名+性别查找'" label="姓名">
            <el-input v-model="formInline.name" size="small" placeholder="请输入姓名"></el-input>
          </el-form-item>

          <el-form-item v-if="this.search_name == '按姓名+性别查找'" label="性别" prop="sex">
            <el-select size="small" v-model="formInline.sex" placeholder='请选择性别'>
              <el-option label="男" value=男></el-option>
              <el-option label="女" value=女></el-option>
            </el-select>
          </el-form-item>

          <el-form-item v-if="this.search_name == '按楼牌号+门牌号查找'" label="楼牌号" prop="buildingcard">
            <el-select  size="small" v-model="formInline.buildingcard"  placeholder='请选择楼牌号'>
              <el-option v-for="building in buildings" :key="building.id" :label="building.shuju"
                :value="building.shuju"></el-option>
            </el-select>
          </el-form-item>

          
          <el-form-item v-if="this.search_name == '按楼牌号+门牌号查找'" label="门牌号">
            <el-input v-model="formInline.housecard" size="small" placeholder="请输入三位门牌号"></el-input>
          </el-form-item>

        



          <el-form-item>
            <el-button type="primary" size="small" @click="onSubmit">查询</el-button>
            <el-button type="danger" size="small" @click="onReset">重置</el-button>
            <el-button type="success" size="small" @click="onGetAll">查看全部</el-button>
          </el-form-item>
        </el-form>
      </div>
    

    </div>

    <div class="content">
      <el-table size="small" current-row-key="id" :data="dataList" stripe highlight-current-row border>

        <el-table-column type="index" :index="indexMethod" align="center" label="序号"></el-table-column>

        <el-table-column prop="name" label="姓名" align="center"></el-table-column>

        <el-table-column prop="sex" label="性别" align="center"></el-table-column>

        <el-table-column v-if="!sflag" prop="birthday" label="生日" align="center"></el-table-column>
        <el-table-column v-if="sflag" prop="date" label="来本地日期" align="center"></el-table-column>
        <el-table-column prop="place" label="籍贯" align="center"></el-table-column>

        <el-table-column prop="buildingcard,housecard" label="现居" align="center">
          <template slot-scope="scope">
            {{ scope.row.buildingcard }}{{ scope.row.housecard }}
          </template>


        </el-table-column>





        <el-table-column label="操作" align="center">

          <template slot-scope="scope">

            <el-button type="primary" size="mini" @click="handleXiangQing(scope.row)">详情</el-button>


          </template>

        </el-table-column>


      </el-table>
    </div>

  </div>
</template>

<script>



export default {
  name: 'List',

  props: ['dataList', 'current', 'pageSize', 'sflag'],
  components: {},
  data() {
    return {
      search_name: '按姓名查找',
      buildings: '',
      tip: "",
      formInline: {
        // search_name: '按姓名查找',
        name: '',
        sex: '',
        buildingcard: '',
        housecard: '',
        page: '',

      },



    }
  },

  methods: {

    //查看详情
    handleXiangQing(msg) {
      console.log(msg)
      this.$emit('handleXiangQing', msg)
    },

    indexMethod(index) {


      return (this.current - 1) * this.pageSize + index + 1
    },

    onReset() {

      // this.$refs[ruleForm].resetFields();
      this.formInline.name = '',
        this.formInline.sex = '',
        this.formInline.buildingcard = '',
        this.formInline.housecard = ''
    },

    onSubmit() {
      if (this.formInline.name != '' || this.formInline.sex != '' || this.formInline.buildingcard != '' || this.formInline.housecard != '') {
       
          this.$emit('onSubmit', this.formInline, 1)
      
        // else{
        
      
        // return;
      // }
      }

    },
    onGetAll() {
      this.onReset()
      this.$emit('onGetAll')
    },

    getshuju() {

      this.axios.get("http://localhost/buildings/").then((res) => {
        this.buildings = res.data.data;
      });
    },

  },

  watch: {
    search_name: {
      handler() {
        console.log(" search_name变了", this.search_name)

        //重置
        this.onReset()
        // this.$emit('getAll')

      }
    },
    immediate: true,

    // ruleForm: {
    //   handler() {
    //     console.log("handlerrrrrr",)
    //     this.$emit('getAll')
    //     // location.reload();
    //   }
    // },

  },

  computed: {
    search: {
      get() {
        if (this.search_name == '按姓名查找') {
          // console.log(this.formInline.name,"9900")

          this.tip = "请输入姓名"
          return this.formInline.name
        }
        if (this.search_name == '按性别查找') {
          // console.log(this.formInline.name,"9900")
          this.tip = "请选择性别"
          return this.formInline.sex
        }
        if (this.search_name == '按楼牌号查找') {
          // console.log(this.formInline.name,"9900")
          this.tip = "请选择楼牌号"
          return this.formInline.buildingcard
        }
        if (this.search_name == '按门牌号查找') {
          // console.log(this.formInline.name,"9900")
          this.tip = "请输入三位门牌号"
          return this.formInline.housecard
        }
      },
      set(val) {


        if (this.search_name == '按姓名查找') {

          this.formInline.name = val
        }
        if (this.search_name == '按性别查找') {

          this.formInline.sex = val
        }
        if (this.search_name == '按楼牌号查找') {

          this.formInline.buildingcard = val
        }
        if (this.search_name == '按门牌号查找') {

          this.formInline.housecard = val
        }
        //  console.log(this.formInline.name,"9900")
        //  console.log(this.formInline.sex,"9900")
        // return val  
      }

    }
  },
  created() {

    this.getshuju();

  },

}
</script>

<style></style>