<template>
    <div class="forum">
      <img alt="Vue logo" src="../assets/icon-left-font.png" />
      <div class="sendNewPost">
        <label for="send">
          <input type="button" value="Nouveau commentaire">
        </label>
      </div>
      <div class="newPost">
        <img id="avatar"  v-bind:src="imageUrl" alt="default-avatar">
        <span id="userName">{{user}}</span>
        <span id="postText">{{ message }}</span>
        <span id="response">{{ commentaire }}</span>
        <textarea name="comment" id="comment" cols="30" rows="3" placeholder="Commentaire"></textarea>
        <input v-on:click="res()" type="button" value="Répondre">

        <input type="button" value="supprimer">

      </div>
    </div>
</template>

<script>

export default {
    name: 'forum',
    // data: {
    //   user: "Antoine",
    //   message: "Coucou",
    //   Commentaire: "coucou2"
    // }
}
</script>

<style scoped>
.forum {
  display: flex;
  width: 100%;
  flex-direction: column;
}
i{
  position: absolute;
  height: 50px;
  width: 50px;
  right: 20px;
  color: black;
  font-size: 50px;
}

#app{
  width: 100%;
}

.newPost{
  background-color: rgba(170, 221, 255, 0.664);
  border-radius: 5px 5px;
  box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  margin: auto;
  margin-top: 2rem;
  position: relative;
}
#userName{
  margin-top: 1rem;
  margin-left: 1rem;
  padding: 0.25rem;
}
#postText{
  text-align: center;
  width: 90%;
  margin: auto;
  padding: 0.75rem;
}

#comment{
  width: 100%;
  padding: 1rem;
  margin: 1rem;
}
#response{
  width: 90%;
  margin: auto;
  padding: 0.75rem;
  background-color: rgb(197, 220, 243);
  border: 1px solid grey;

}

#avatar{
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

input{
  position: relative;
  margin-right: 1rem;
  right: 1px;
}

</style>
