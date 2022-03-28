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
  background-color: rgba(255, 199, 199, 0.548);
  display: flex;
  justify-content: center;
  width: 100%;
}

#app{
  width: 66%;
}
</style>
