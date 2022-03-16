<template>
  <nav>
    <router-link to="/">Login</router-link> |
    <router-link to="/Signup">Sigup</router-link>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #ff381e;
}

img{
  height: 100px;
  width: auto;
  position: absolute;
  top: 5px;
  left: 20px;
}

label{
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0.2rem;
}
input{
  width: 50%;
  margin: auto;
  margin-top: 1rem;
}
</style>
