<template>
  <div class="about"> 
    <img alt="Vue logo" src="../assets/icon-left-font.png" />
    <h1>Signup</h1>
    <label for="userName">
      pseudo : 
      <input type="text" name="userName" id="userName" />
    </label>
    <br/>
    <label for="password">
      Mot de passe : 
      <input type="text" name="password" id="password" />
    </label>
    <input type="button" value="Connection">
  </div>
</template>

<script>

import Compteur from '@/components/Compteur.vue'

export default {
  name: 'signup',
  components: {
  Compteur
  }
}
</script>

