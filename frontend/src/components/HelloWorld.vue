<template>
  <nav>
    <router-link to="/" v-if="currentUser">Home</router-link> |
    <router-link to="/about"  v-if="currentUser">About</router-link> |
    <router-link to="/signup"  v-if="!currentUser">Signup</router-link> |
    <router-link to="/login"  v-if="!currentUser">login</router-link> |
    <button @click="logout" v-if="currentUser">logout</button>
  </nav>
</template>

<script>
  
  export  default {
    name: 'Hello',
    data(){
      return{
        currentUser : false
      }
    },
    computed:{
      
      logout(){
        localStorage.clear()
        this.$router.push('/login')
      }
    },
    created(){
        if (localStorage.getItem('token') == null) {
          this.currentUser = false
        } else {
          this.currentUser = true
        }       

    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
