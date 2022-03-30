<template>
  <div>
    <Hello />
    <div class="about">
      <h1 id='user'>{{ user.userName }}</h1>
      <p>Titre du Post :</p>
      <textarea v-model="title" name="title" id="title" cols="10" rows="5"></textarea>
      <p>Message :</p>
      <textarea v-model="messages" name="messages" id="message" cols="30" rows="10"></textarea>
      <button class="response--btn" v-on:click="submit">envoyer</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import axios from "axios";
import Hello from '@/components/HelloWorld.vue'

export default {
  name: 'AboutView',
  data() {
    return {
      currentUser : false,
      posts: [],
      user: JSON.parse(localStorage.getItem("user")),
    };
  },
  components:{
      Hello
    },
  methods: {
    submit() {
      axios
        .post(
          "http://localhost:3000/api/post/new",
          {
            title: this.title,
            messages: this.messages,
            userName: this.user.userName,
          },
          {
            headers: {
              authorization: JSON.parse(localStorage.getItem("token")),
            },
          }
        )
        .then(() => this.$router.push("/"));
    },
  },
  created() {
    console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token") == null) {
      this.$router.push("/login");
    }
  },
};
</script>

<style scoped>
.about {
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: white;
}
  #user{
    border-radius: 10px;
  }
p{
  font-size: 20px;
  padding: 1rem;
}

#title,
#message {
  margin: auto;
  margin-top: 1rem;
  border-radius: 10px;
  width: 90%;
  
}

@media (min-width: 720px){
  .about{
    width: 50%;
    margin: auto;
    margin-top: 3rem;
    background-color: #AEAEAF;
    border-radius: 15px;
    color: black;
  }
  #user{
    border-radius: 15px 15px 0 0;
  }
  .response--btn{
    margin: auto;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
}

</style>
