<template>
  <div class="home">
    <div class="post" v-for="post in posts.slice().reverse()" :key="post">
      <button
        class="delete"
        v-if="post.userId == user.id || user.isAdmin == true"
        @click="deletePost(post.id)"
      >
        supprimer
      </button>
      <font-awesome-icon icon="fa-solid fa-trash-can" />

      <h1 id="user">{{ post.userName }}</h1>
      <div class="userPost">
        <h2 id="title">{{ post.title }}</h2>
        <span class="message"> {{ post.messages }} </span>
      </div>
      <div v-for="com in post.Coms" :key="com.id">
        <p id="coms">
          {{ com.coms }}
          <button
            @click="deleteComs(com.id)"
            v-if="com.userName == user.userName || user.isAdmin == true"
          >
            supprimer
          </button>
        </p>
      </div>
      <div id="response">
        <textarea
          name="comment"
          id="comment"
          cols="10"
          rows="5"
          v-model="commentContent"
        ></textarea>
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
        .delete("http://localhost:3000/api/post/", {
          data: { com: id },
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
  color: black;
}
.post {
  margin: auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 1rem;
  padding: 1rem;
  background-color: rgb(143, 143, 143);
  position: relative;
  border-radius: 10px;
}
.userPost {
  display: flex;
  flex-direction: column;
  align-content: center;
  width: 80%;
  padding: 1rem;
  margin: auto;
  background-color: rgb(177, 176, 176);
  border-radius: 15px;
}

#user {
  width: 90%;
  margin: auto;
  padding: 1rem;
}
#title {
  width: 100%;
  margin: auto;
}
.message {
  margin: auto;
}

#coms {
  border-radius: 10px;
  width: 66%;
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
  margin-left: 15%;
  padding: 1rem;
  position: relative;
  color: black;
  background-color: rgb(177, 176, 176);
}
#coms button {
  position: absolute;
  right: 20px;
}
#comment {
  width: 66%;
  margin: auto;
  border-radius: 10px;
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
  right: 10px;
  position: absolute;
  bottom: 25px;
  right: 60px;
}

@media screen and (max-width: 680px) {
  body {
    display: flex;
    flex-direction: column;
    width: 100%;
    border: 1px solid rgb(0, 247, 255);
  }
  .home{
   border: 1px solid rgb(0, 255, 55);
  }
  .post {
    width: 100%;
    border: 1px solid red;
  }
    #coms {
      border: 1px solid red;
    display: flex;
    flex-direction: column;
  }
}
</style>
