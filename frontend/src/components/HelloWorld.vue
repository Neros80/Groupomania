<template>
  <nav>
    <img src="D:\Projet_N°7\Project\frontend\images/icon-left-font-monochrome-white.png" alt="">
    <router-link id="link" to="/" v-if="currentUser">Home</router-link>
    <router-link id="link" to="/about"  v-if="currentUser">About</router-link>
    <router-link id="link" to="/signup"  v-if="!currentUser">Signup</router-link>
    <router-link id="link" to="/login"  v-if="!currentUser">login</router-link>
    <router-link id="link" to="/admin">admin</router-link>
    <button id="logout--btn" @click="logout" v-if="currentUser">logout</button>
    <font-awesome-icon icon="fa-solid fa-trash-can" />
    
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
nav{
  width: 100%;
  display: flex;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
}
#link{
  padding: 1rem;
  text-decoration: none;
  color: white;
}
#link:hover{
  color: rgb(205, 230, 252);
}
#logout--btn{
  position: absolute;
  right: 20px;
  border: none;
  top: 30px;
}
</style>
