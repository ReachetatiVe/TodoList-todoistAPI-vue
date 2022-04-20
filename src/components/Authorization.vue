<template>
  <div class="autorization">
    <v-btn x-large color="primary" elevation="6" @click="authorization()"
      >LogIn</v-btn
    >
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "AuthorizationPage",
  computed: {
    getClientId() {
      return this.$store.getters.GET_CLIENT_ID;
    },
  },
  methods: {
    authorization() {
      window.location.href =
        `https://todoist.com/oauth/authorize?client_id=${this.getClientId}&scope=data:read_write,data:delete&state=secretstring`;
    },
  },
};
</script>

<style scoped lang="scss">
.autorization {
  padding: 25px 0;
  margin: 0 auto;
  max-width: 900px;
  text-align: center;

  // .autorization__btn
  &__btn {
    padding: 10px 15px;
    background-color: #42b983;
  }
}
</style>
