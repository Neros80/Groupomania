<template>
  <div>
    <Hello />
    <div class="admin">
      <div class="users" v-for="user in users" :key="user">
        <div>
          <span class="adminBoard__users"> {{ user.userName }}</span>
          <div class="btn"> 
          <!-- <label id="isAdmin" for="isAdmin">Admin : <input type="checkbox" v-if="updateCheck"></label> -->
          <a class="delete" v-if="userData.id != user.id" @click="deleteUser(user.id)"><font-awesome-icon icon="trash-can" /></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


// @ is an alias to /src
import Hello from "@/components/HelloWorld.vue";
import axios from "axios";

export default {
  name: "AdminBoard",
  components: {
    Hello,
  },
  data() {
    return {
      currentUser : false,
      users: [],
      userData: JSON.parse(localStorage.getItem('user'))
    };
  },
  beforeMount() {
    this.getAllUsers()
    if(this.userData.isAdmin != true){
      this.$router.push("/")
    }
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
  background-color: rgb(177, 176, 176);
  position: relative;
  height: 50px;
  margin-top: 1rem;
}

.adminBoard__users{
  margin: 1rem;
  display: flex;
  position: absolute;
  left: 10px
   
}
.isAdmin{
  padding: 1rem;
}
.btn {
  position: absolute;
  right: 30px;
  top: 15px
}
@media (min-width: 720px){
  .admin{
    width: 50%;
    margin: auto;
    border-radius: 15px;
    color: black;
    margin-top: 3rem;
  }
  .users{
    margin: 1rem;
    border-radius: 10px;
  }
}


</style>