<template>
  <div>
       
    <Item :urls="urls"></Item>

        
  </div>
</template>

<script>
 import Item from '../Item'
export default {
  name:'Degree',
    components:{Item,},
    data() {
        return {
           urls:
            { 
            title:'文化程度设置',
            label:'文化程度',
            url:'http://localhost/degrees/',
            // urlall:'http://localhost/faces',
            // urldel:'http://localhost/faces',
            // urlsea:'http://localhost/faces/',
            // urlsave:'http://localhost/faces',

            
           },

        }
    },

}
</script>

<style>

</style>