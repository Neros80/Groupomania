<template>

  <body>
    <div class="navgiation"> 
    <img class="logo" src="./assets/icon-left-font-monochrome-white.png" alt="logo-blanc">
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
  font-family: 'Hind Siliguri', sans-serif;
  background-color: #091F43;
  display: flex;
  justify-content: center;
  min-width: 450px;
}
.navgiation{
  display: flex;
  flex-direction: column;
}

.logo{
  width: 50%;
  margin: auto;
  margin-bottom: -100px;
}

#app{
  width: 100%;
}
</style>
