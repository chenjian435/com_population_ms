<template>
    <div>
       
        <Item :urls="urls"></Item>

        

      


    </div>
</template>

<script>
 import Item from '../Item'
 export default {

    name:'Face',
    components:{Item,},
    data() {
        return {
           urls:
            { 
            title:'政治面貌设置',
            label:'政治面貌',
            url:'http://localhost/faces/',
            // urlall:'http://localhost/faces',
            // urldel:'http://localhost/faces',
            // urlsea:'http://localhost/faces/',
            // urlsave:'http://localhost/faces',
           },

        }
    },
   
}
</script>

<style lang="less" scoped>
.table {
    width: 500px;
    margin: auto
}

.btn {

    margin: auto
}


</style>