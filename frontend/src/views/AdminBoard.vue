<template>
  <div class="Admin">
    <div class="users" v-for="user in users" :key="user">
      <div>
        <span id="adminBoard__users"> {{ user.userName }}</span>
        <div class="btn"> 
        <!-- <label id="isAdmin" for="isAdmin">Admin : <input type="checkbox" v-if="updateCheck"></label> -->
        <button v-if="userData.id != user.id" @click="deleteUser(user.id)">supprimer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import axios from "axios";

export default {
  name: "AdminBoard",
  components: {
    HelloWorld,
  },
  data() {
    return {
      users: [],
      userData: JSON.parse(localStorage.getItem('user'))
    };
  },
  beforeMount() {
    this.getAllUsers()
  },
  methods: {
    deleteUser(id) {
      axios
        .delete('http://localhost:3000/api/users/',{
          data: {userId: id,}
        })
        .then(() => {
          this.getAllUsers();
        });
  },
    getAllUsers(){
       axios
      .get("http://localhost:3000/api/users/")
      .then((response) => (this.users = response.data))
      .catch((err) => console.log(err))
    }
   }
};
</script>

<style scoped>

.users{
  
  justify-content: center;
  margin: auto;
  background-color: beige;
  position: relative;
  display: flex;
  flex-direction: row;
  position: relative;
  height: 50px;
  margin: 1rem
}

#adminBoard__users{
  margin: 1rem;
  display: flex;
  position: absolute;
  left: 10px
   
}
#isAdmin{
  margin: 1rem;
  padding: 1rem;
}
.btn {
  position: absolute;
  right: 30px;
  top: 15px
}

</style>