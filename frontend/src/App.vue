<template>

  <body>
    <div class="navgiation"> 
    <img class="logo" src="./assets/new-icon-left-font.png" alt="logo-blanc">
     <font-awesome-icon icon="fa-solid fa-trash-can" />
    <Hello />
    </div>
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
}
.navgiation{
  display: flex;
  flex-direction: column;
}

.logo{
  width: 50%;
  margin: auto;
  margin-bottom: -100px;
  margin-top: -160px;
}

#app{
  width: 100%;
}
</style>
