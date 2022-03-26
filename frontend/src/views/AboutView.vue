<template>
  <div class="about">
    <h1>userName</h1>
    <p>title</p>
    <textarea v-model="title" name="title" id="title" cols="10" rows="5"></textarea>
    <p>message</p>
    <textarea v-model="messages" name="messages" id="message" cols="30" rows="10"></textarea>
    <button v-on:click="submit">envoyer</button>
  </div>
</template>


<script>
// @ is an alias to /src

import axios from 'axios'

export default {
  data(){
       return {
      user: JSON.parse(localStorage.getItem('user'))
    }
  },
  methods: {
    submit(){
          axios
      .post('http://localhost:3000/api/post/new',{
        title: this.title,
        messages: this.messages,
        userName: this.user.userName
      }, {headers: {authorization: JSON.parse(localStorage.getItem("token"))}})
      .then(() => this.$router.push('/'))
    }
  },
    created(){
      console.log(localStorage.getItem('token'));
      if(localStorage.getItem('token') == null) {
        this.$router.push('/login')
      }
    }
}

</script>



<style scoped>
.about{
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 900px;
  padding: 1rem;  
}
</style>