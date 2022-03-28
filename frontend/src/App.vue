<template>

  <body> 
    <Hello />
    
  </body>
  <router-view/>
</template>

<script>
import Hello from '@/components/HelloWorld.vue'

  
  export  default {
    name: 'App',
    data(){
      return{
        currentUser : false
      }
    },
    components:{
      Hello
    }
}
</script>


<style>
body{
  font-family: 'Open Sans', sans-serif;
  background-color: rgb(24, 24, 24);
  display: flex;
  justify-content: center;
  width: 100%;
}

#app{
  width: 66%;
}
</style>
