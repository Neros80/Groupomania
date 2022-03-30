<template>
  <div class="home">
    <div class="post" v-for="post in posts.slice().reverse()" :key="post">
      <button id="delete" v-if="post.userId == user.id || user.isAdmin == true" @click="deletePost(post.id)">
        supprimer
      </button>

      <h1 id="user">{{ post.userName }}</h1>
      <div class="userPost">
        <h2 id="title">{{ post.title }}</h2>
        <span class="message"> {{ post.messages }} </span>
      </div>
      <div class="coms_content" v-for="com in post.Coms" :key="com.id">
        <div id="coms">
        <p id="userComs">{{com.userName}}</p>
        <p id="coms--content"> {{ com.coms }}</p>
        <button id="delete" @click="deleteComs(com.id)" v-if="com.userName == user.userName || user.isAdmin == true">Supprimer</button>
      </div>
      </div>
      <div id="response">
        <textarea name="comment" id="comment" cols="10" rows="5" placeholder="Commentaire" v-model="commentContent"></textarea>
        <button class="response--btn" @click="createComment(post.id)">
          repondre
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import axios from "axios";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
  data() {
    return {
      posts: [],
      user: JSON.parse(localStorage.getItem("user")),
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/post/")
      .then((response) => (this.posts = response.data));
  },
  created() {
    console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token") == null) {
      this.$router.push("/login");
    }
    console.log(this.user);
  },
  methods: {
    createComment(id) {
      axios
        .post("http://localhost:3000/api/coms/new", {
          coms: this.commentContent,
          PostId: id,
          userName: this.user.userName,
        })
        .then(() => {
          this.commentContent = "";
          axios
            .get("http://localhost:3000/api/post/")
            .then((response) => (this.posts = response.data));
        });
    },
    deletePost(id) {
      axios
        .delete("http://localhost:3000/api/post/", {
          data: { PostId: id },
        })
        .then(() => {
          this.getAllPost();
        });
    },
    getAllPost() {
      axios
        .get("http://localhost:3000/api/post/")
        .then((response) => (this.posts = response.data))
        .catch((err) => console.log(err));
    },
    deleteComs(id) {
      axios
        .delete(`http://localhost:3000/api/coms/${id}`)
        .then(() => {
          this.getAllPost();
        });
    },
    getAllComs() {
      axios
        .get("http://localhost:3000/api/coms/")
        .then((response) => (this.coms = response.data))
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style>
.home {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 1rem;
  color: black;
}
.post {
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  width: 90%;
  background-color: #AEAEAF;
  position: relative;
  border-radius: 10px;
}

.userPost {
  display: flex;
  flex-direction: column;
  align-content: center;
  padding: 1rem;
  background-color: #C4C5C5;
  box-shadow:0.1em rgb(41, 41, 41);
}

#user {
  background-color: #D1515A;
  padding: 1rem;
  color: #ffffff;
  margin-top: 0;
  border-radius: 10px 10px 0 0;
}
#title {
  width: 100%;
  margin: auto;
}
.message {
  margin: auto;
  font-size: 1rem;
}
.coms_content{
  width: 100%;
  margin: auto;
}

#coms {
  display: flex;
  align-items: center;
  padding: 1rem;
  position: relative;
  background-color: rgb(221, 220, 220);
  box-shadow: 0 0 0.3em rgb(41, 41, 41);
  border: 1px solid rgb(80, 80, 80);
  margin-top: 0.5rem;
  margin-bottom: 0.1rem;
  flex-wrap: wrap;
}
#coms > button {
  position: absolute;
  right: 20px;
  top: 20px;
}
#userComs{
    width: 100%;
    padding-bottom: 0.2rem;
    font-size: 22px;
    margin: 0.2rem;
}
#coms--content{
  padding: 1rem;
  width: 90%;
}
#comment {
  margin: auto;
  margin-top: 1rem;
  border-radius: 10px;
  width: 90%;
}

.delete {
  position: absolute;
  right: 20px;
}
.message {
  margin: 1rem;
}
#response {
  display: flex;
  flex-direction: column;
  position: relative;
  
}

.response--btn {
  color: white;
  text-decoration: none;
  border: none;
  background-color: rgb(0, 174, 255);
  border-radius: 5px;
  padding: 0.5rem;
  box-shadow: 0 0 0.3em rgb(41, 41, 41);
  margin: 1rem;
  font-size: 20px;

}
.post > #delete{
  width: 25%;
  position: absolute;
  right: 5px;
  top:10px; 
}
#delete{
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.2rem;
  box-shadow: 0 0 0.3em rgb(41, 41, 41);
}
#delete:hover{
  box-shadow: 0 0 0.5em red;
}

@media (min-width: 720px){
  .home{
    width: 66%;
    margin: auto;
  }
  .userPost{
    margin: 1rem;
    border-radius: 15px;
  }
  .coms_content{
    width: 90%;
  }
  #coms{
    border-radius: 15px;
    padding: 0.1rem;
  }
  #coms--content{
    padding: 0.5rem;
    margin: 0.1rem;
  }

  #response{
    display: flex;
    align-items: center;
  }
  .response--btn{
    width: 33%;
    justify-content: center;
  }
}


</style>
