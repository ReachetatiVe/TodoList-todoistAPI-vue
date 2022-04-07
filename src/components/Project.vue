<template>
  <v-list-item-content>
    <v-list-item-title>{{ info.name }}</v-list-item-title>
  </v-list-item-content>
</template>

<script>
// @ is an alias to /src

export default {
  name: "project-page",
  props: {
    info: {},
  },
};
</script>
