<!-- <template>
  <div>
<XiangQingd :msg="msg" ></XiangQingd>

  </div>
</template>

<script>
import XiangQingd from '../../../components/XiangQingd.vue'

export default {
 
    name:'XiangQing',
    props:['msg'],
    components:{XiangQingd},
    data() {
        return {
          
            ruleForm:{},
            dialogFormVisible: false,//控制表单是否可见
            dataList: [],
            formData: {},//表单数据
            rules: {//校验规则
                shuju: [{ required: true, message: '请填信息', trigger: 'blur' }],
            },
        }
    },
   
    methods:{
     
      submitForm(){

      }
     
    }


}
</script>

<style>

</style> -->