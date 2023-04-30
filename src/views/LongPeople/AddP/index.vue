<template>
 <div>
<AddPd :updateFormDatas="updateFormDatas" :flag="flag"></AddPd>
  </div>
</template>

<script>
import AddPd from '../../../components/AddPd.vue'
  export default {
    components:{AddPd},
  
    data() {
      return {
        flag:false,
        // nations:'',
        // places:'',
        // degrees:'',
        // faces:'',
        updateFormDatas: {
          // birthday:'',
          // isold:'',
          // dibao:'',
          // work:'',
          // homeplace:'',
          // address:'',
          // mobile:'',
          // id_card:'',
          // age:'',
          // marriage:'',
          // sex:'',
          // place:'',
          // face:'',
          // nation:'',
          // degree:'',
          // name: '',
          // region: '',
          // date1: '',
          // resource: '',
          // desc: '',
          // buildingcard:'',
          // housecard:'',
        },//将信息置空
       
      };
    },   
   
  }
</script>

<style>

</style>