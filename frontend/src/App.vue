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
  padding: 1rem;
  margin: auto;
  margin-bottom: -70px;
  margin-top: -65px;

}

#app{
  width: 100%;
}
</style>
