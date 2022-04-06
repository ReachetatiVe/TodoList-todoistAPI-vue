<template>
  <div>
    <h1>REDIRECT</h1>
  </div>
</template>

<script>
import axios from "axios";
// @ is an alias to /src

export default {
  name: "Redirect-page",
  data() {
    return {
      clientId: "65d3dc9ff5dc4d698a1288bb4a769065",
      clientSecret: "7012a5dd7357481a94736d4304f3bc90",
    };
  },

  methods: {
    getToken(code) {
      axios
        .post(
          `https://todoist.com/oauth/access_token?client_id=${this.clientId}&client_secret=${this.clientSecret}&code=${code}`
        )
        .then((response) => {
          console.log(response);
          const token = response.data.access_token;
        //   this.$store.commit("SET_TOKEN", token);
          this.$store.dispatch("getApi", token)
          this.$router.push("./");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  watch: {
    $route: {
      handler: function (route) {
        console.log(route.query.code);
        if (route.query.code !== null || route.query.code !== undefined) {
          this.getToken(route.query.code);
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>
