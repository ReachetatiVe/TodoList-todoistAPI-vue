<template>
  <div>
    Redirecting...
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Redirect-page",
  computed: {
    getClientId(){
      return this.$store.getters.GET_CLIENT_ID;
    },
    getClientSecret(){
      return this.$store.getters.GET_CLIENT_SECRET;
    }
  },

  methods: {
    getToken(code) {
      axios
        .post(
          `https://todoist.com/oauth/access_token?client_id=${this.getClientId}&client_secret=${this.getClientSecret}&code=${code}`
        )
        .then((response) => {
          const token = response.data.access_token;
          this.$store.dispatch("getApi", token);
          this.$router.push("./project-list");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  watch: {
    $route: {
      handler: function (route) {
        if (route.query.code !== null && route.query.code !== undefined) {
          this.getToken(route.query.code);
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>
