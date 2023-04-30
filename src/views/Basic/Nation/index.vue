<template>
  <div>
    
        <Item :urls="urls"></Item>

        

      


    
  </div>
</template>

<script>
 import Item from '../Item'
export default {
  name:'Nation',
    components:{Item,},
    data() {
        return {
           urls:
            { 
            title:'民族信息设置',
            label:'民族信息',
            url:'http://localhost/nations/',
            // urlall:'http://localhost/faces',
            // urldel:'http://localhost/faces',
            // urlsea:'http://localhost/faces/',
            // urlsave:'http://localhost/faces',

            
           },

            
           
            dialogFormVisible: false,//控制表单是否可见
            dataList: [],
            formData: {},//表单数据
            rules: {//校验规则
                face: [{ required: true, message: '政治面貌为必填项', trigger: 'blur' }],
            },
        }
    },

}
</script>

<style>

</style>