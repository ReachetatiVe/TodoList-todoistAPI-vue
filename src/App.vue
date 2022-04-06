<template>
  <div id="app">
    <button @click="authorization()">Ауф</button>
    <!-- <Login/> -->
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/creator">Create task</router-link> |
      <router-link to="/project-list">List of projects</router-link> |
    </nav>
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
    };
  },
  components: {},
  beforeMount() {
    this.$store.commit("initialiseStore");
  },
  methods: {
    authorization() {
      window.location.href =
        "https://todoist.com/oauth/authorize?client_id=65d3dc9ff5dc4d698a1288bb4a769065&scope=data:read_write,data:delete&state=secretstring";
    },
  },
};
</script>

<style lang="scss">
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
