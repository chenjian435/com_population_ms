<template>
    <div>
   <AddPd  :updateFormDatas="updateFormDatas" :sflag="sflag"></AddPd>
     </div>
   </template>
   
   <script>
   import AddPd from '../../../components/AddPd.vue'
     export default {
       components:{AddPd},
       data() {
         return {
           sflag:true,
          //  nations:'',
          //  places:'',
          //  degrees:'',
          //  faces:'',
           updateFormDatas: { },//将信息置空
          
         };
       },   
      
     }
   </script>
   
   <style>
   
   </style>