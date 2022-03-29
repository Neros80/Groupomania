<template>
  <div class="login">
      <label for="userName">Pseudo <input v-model="userName" type="text"></label>
      <label for="password">Mot de passe <input v-model="password" type="password"></label>
      <button class="response--btn" v-on:click="submit"> Connexion </button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  methods: {
    submit(){
          axios
      .post('http://localhost:3000/api/users/login',{
        userName: this.userName,
        password: this.password
      }).then((res) => {
        localStorage.setItem('user',JSON.stringify(res.data.user))
        localStorage.setItem('token',JSON.stringify(res.data.token))

          this.$router.push('/')  

     
      })
    }
  }
}
</script>

<style scoped>
.login{
  color: white;
  display: flex;
  flex-direction: column;

  padding: 1rem;
}

label{
  text-align: center;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
}

input{
  border-radius: 5px;
  height: 2.5rem;
  margin-top: 1rem;
}


</style>
