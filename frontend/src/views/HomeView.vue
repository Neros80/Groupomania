<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/icon-left-font.png" />
    <h1>Login</h1>
    <label for="userName">
      pseudo :
      <input type="text" name="userName" id="userName" />
    </label>
    <br/>
    <label for="password">
      Mot de passe :

      <input type="text" name="password" id="password" />
    </label>

    <input type="button" src="http://localhost:8080/Forum" value="Connection">
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Compteur from "@/components/Compteur.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
    Compteur,
  },
};
</script>
