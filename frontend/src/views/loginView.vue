<template>
  <div class="login">
      <label for="userName">Pseudo <input v-model="userName" type="text"></label>
      <label for="password">Mot de passe <input v-model="password" type="password"></label>
      <button v-on:click="submit"> Connection </button>
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
        console.log(res);
        localStorage.setItem('user',JSON.stringify(res.data.user))
        localStorage.setItem('token',JSON.stringify(res.data.token))
        this.$router.push('/')
      })
    }
  }
}
</script>
