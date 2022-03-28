<template>
  <div class="signup">
    <label for="userName">Pseudo <input v-model="userName" type="text"/></label>
    <label for="password">Mot de passe <input v-model="password" type="password"/></label>
    <button v-on:click="submit">Connection</button>


  </div>
</template>

<script>
import axios from "axios";

export default {
  methods: {
    submit() {
      axios
        .post("http://localhost:3000/api/users/signup", {
          userName: this.userName,
          password: this.password,
        })
        .then(() => this.$router.push("/login"));
    },
  },
};
</script>
