<template>
  <div class="home">
    <div class="post" v-for="post in posts.slice().reverse()" :key="post">
      <button class="delete" v-if="post.userId == user.id || user.isAdmin == true" @click="deletePost(post.id)">
        supprimer
      </button>
      <font-awesome-icon icon="fa-solid fa-trash-can" />
      <h2 id="user">{{ post.userName }}</h2>
      <h3 id="title">{{ post.title }}</h3>
      <span class="message"> {{ post.messages }} </span>
      <div v-for="com in post.Coms" :key="com.id">
        <p>
          {{ com.coms }}
          <button @click="deleteComs(com.id)" v-if="com.userName == user.userName || user.isAdmin == true">
            supprimer
          </button>
        </p>
      </div>
      <textarea
        name="comment"
        id="comment"
        cols="10"
        rows="5"
        v-model="commentContent"
      ></textarea>
      <button class="response" @click="createComment(post.id)">repondre</button>
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
        .delete("http://localhost:3000/api/post/", {
          data: { com : id },
        })
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
}
.post {
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
.message {
  margin: 1rem;
}
.response {
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
