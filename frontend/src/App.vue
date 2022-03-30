<template>

  <body>
    <div class="navgiation"> 
    <img class="logo" src="./assets/icon-left-font-monochrome-white-2.png" alt="logo-blanc">
    </div>
  </body>
  <router-view/>
</template>

<script>
  export  default {
    name: 'App',
    data(){
      return{
      }
    },
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
}

#app{
  width: 100%;
}
@media (min-width: 720px){
  .logo{
    margin: auto;
    position: relative;
  }
}
</style>
