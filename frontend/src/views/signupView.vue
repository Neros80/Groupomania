<template>
  <div> 
    <Hello />
    <div class="signup">
      <label for="userName">Pseudo <input v-model="userName" type="text"/></label>
      <label for="password">Mot de passe <input v-model="password" type="password"/></label>
     <button class="response--btn" v-on:click="submit">Connexion</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Hello from '@/components/HelloWorld.vue'

export default {
  name: 'SignupView',
    data(){
      return{
        currentUser : false
      }
    },
    components:{
      Hello
    },
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
<style scoped>
.signup{
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

@media (min-width: 720px){
  .signup{
    width: 30%;
    margin: auto;
    background-color: #AEAEAF;
    border-radius: 15px;
    color:black;
  }
  .response--btn{
    margin: auto;
    margin-top: 1rem;
  }
}
</style>