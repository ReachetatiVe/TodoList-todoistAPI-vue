<template>
  <v-list-item-content>
    <v-list-item-title @click="makeProjectCurrent()">{{
      info.name
    }}</v-list-item-title>
  </v-list-item-content>
</template>

<script>
// @ is an alias to /src

export default {
  name: "project-page",
  props: {
    info: {},
  },
  methods: {
    makeProjectCurrent() {
      this.$store.commit("SET_CURRENT_PROJECT_ID", this.info.id);
      this.$store.dispatch("getCurrentProjInfo");
    },
  },
};
</script>
