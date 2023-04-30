<template>
  <div>
   
        <Item :urls="urls"></Item>

        

      


    
  </div>
</template>

<script>
 import Item from '../Item'
export default {
  name:'Place',
    components:{Item,},
    data() {
        return {
           urls:
            { 
            title:'籍贯信息设置',
            label:'籍贯信息',
            url:'http://localhost/places/',
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