<template>
    <div>
         
      <Item :urls="urls"></Item>
  
          
    </div>
  </template>
  
  <script>
   import Item from '../Item'
  export default {
    name:'Buliding',
      components:{Item,},
      data() {
          return {
             urls:
              { 
              title:'楼牌号设置',
              label:'楼牌号',
              url:'http://localhost/buildings/',
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