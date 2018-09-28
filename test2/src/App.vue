<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Calculer</router-link> |
      <router-link to="/options">Options</router-link> | 
      <router-link to="/about">About</router-link> | 
      <router-link to="/meview">Me :D</router-link>
    </div>
    <router-view/>
  </div>
</template>


<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
