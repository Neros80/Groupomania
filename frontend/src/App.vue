<template>
  <nav>
    <router-link to="/" v-if="currentUser">Home</router-link> |
    <router-link to="/about"  v-if="currentUser">About</router-link> |
    <router-link to="/signup"  v-if="!currentUser">Signup</router-link> |
    <router-link to="/login"  v-if="!currentUser">login</router-link>
  </nav>
  <body>
    
  </body>
  <router-view/>
</template>

<script>
  export  default {
    name: 'App',
    data(){
      return{
        user: null
      }
    },
    computed:{
      currentUser(){
        if (localStorage.getItem('token') == null) {
          return false
        } else {
          return true
        }       
      }
    },
    // created(){
    //   if(localStorage.getItem('user') != null){
    //     this.user = JSON.parse(localStorage.getItem('user'))
    //   }
    // }
  }
</script>


<style>
body{
  background-color: antiquewhite;
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>
