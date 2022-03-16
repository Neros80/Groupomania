<template>

  <div class="post">
        <img alt="Vue logo" src="../assets/icon-left-font.png" />
    
    <h2>Nouveau messages</h2>


    <label for="title">
        <span>Titre :</span>
      <input type="text" name="title" id="title" />
    </label>

    
    <label for="message">
        Message :
      <textarea name="message" id="message" cols="60" rows="10"></textarea>
    </label>

    <div class="btn">
      <button id="post">Post</button>
      <button id="back">Retour</button>
    </div>
  </div>
</template>

<style scoped>
img{
    position: absolute;
    top: -100px;
    left: -50px;
}
.post {
  display: flex;
  justify-content: center;
  margin: auto;
  flex-direction: column;
  width: 70%;
  position: relative;
}
span{
    position: absolute;
    top: 60px;
}
input{
    width: 100%;
}

.btn {
  position: absolute;
  top: 350px;
  right: 5px;
}
button {
  width: 50px;
  margin: 0.2rem;
}
#post {
  background-color: green;
  color: white;
  border-radius: 5px;
  padding: 0.2rem;
}
#back {
  background-color: rgb(235, 0, 0);
  color: white;
  border-radius: 5px;
  padding: 0.2rem;
}
</style>
