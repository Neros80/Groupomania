<template>
  <div class="home">
    <div class="post" v-for="post in posts" :key="post">
      <h2 id="user"> {{post.UserId}} </h2>
        <h3 id="title"> {{post.title}} </h3>
      <span> {{post.messages}} </span>
      <textarea name="comment" id="comment" cols="10" rows="5"></textarea>
      <button class="response">repondre</button>
    </div>


  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  data(){
       return {
      posts : []
    }
  },
  mounted() {
    axios
      .get('http://localhost:3000/api/post/')
      .then(response => this.posts = response.data)
      // .then(response => (console.log(response)))
  
}
}
</script>

<style>

.home{
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 900px;
  padding: 1rem;  
}
.post{
  margin: auto;
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 1rem;
  padding: 1rem;
  background-color: rgb(255, 255, 255);
  position: relative;
}
.response{
  color: white;
  background-color: rgb(0, 174, 255);
  list-style: none;
  width: 100px;
  height: 25px;
  border-radius: 15px;
  margin-top: 1rem;
  position: relative;
  left: 795px;
}

</style>
