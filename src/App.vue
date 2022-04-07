<template>
  <div id="app">
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/creator">Create task</router-link> |
     <router-link to="/project-list">List of projects</router-link> |
     </nav> -->
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "HomeView",
  data() {
    return {
      info: "",
      errored: false,
      autorized: false
    };
  },
  components: {},
  beforeMount() {
    // this.$store.commit("initialiseStore");
  },
};
</script>

<style lang="scss">
@import "./assets/null.scss";

.autorization {
  padding: 25px;
  // .autorization__btn
  &__btn {
    padding: 10px 15px;
    background-color: #42b983;
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
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
