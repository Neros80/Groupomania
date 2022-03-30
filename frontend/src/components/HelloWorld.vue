<template>
  <nav>
    <div class="nav--content">
    <router-link id="link" to="/" v-if="currentUser">Accueil</router-link>
    <router-link id="link" to="/about"  v-if="currentUser">Post</router-link>
    <router-link id="link" to="/signup"  v-if="!currentUser">Signup</router-link>
    <router-link id="link" to="/login"  v-if="!currentUser">login</router-link>
    <router-link id="link" to="/admin" v-if="currentUser && user.isAdmin == true">admin</router-link>
    </div>
    <a href="#" id="logout--btn" @click="logout" v-if="currentUser">Déconnexion</a>
    
  </nav>
</template>

<script>
  
  export  default {
    name: 'Hello',
    data(){
      return{
        currentUser : false,
        user: JSON.parse(localStorage.getItem("user")),
      }
    },
    computed:{
      
      logout(){
        localStorage.clear()
        this.currentUser = false
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
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: white;
  font-size: 1.5rem;
  margin: auto;

}

.nav--content{
  margin: auto;
  align-content: center;
}
#link{
  padding: 1rem;
  text-decoration: none;
  color: white;
}
#link:hover{
  color: rgb(205, 230, 252);
  text-shadow:  rgb(205, 230, 252) 1px 0 5px;
}
#logout--btn{
  margin: auto;
  text-decoration: none;
  color: white;
}
#logout--btn:hover{
  color: red;
  text-shadow:  red 1px 0 5px;
}

@media (min-width: 720px){
  nav{
    display: flex;
    flex-direction: row ;
    max-width: 20%;
    margin-bottom: 2rem;
    margin-top: 1rem;
  }

#logout--btn{
  padding-left: 1rem;
}

}
</style>
