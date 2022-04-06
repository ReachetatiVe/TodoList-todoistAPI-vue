<template>
  <div>
    <h1>Create task</h1>
  </div>
</template>

<script>
import { TodoistApi } from "@doist/todoist-api-typescript";

// @ is an alias to /src

export default {
  name: "Redirect-page",
  data() {
    return {
      api: "",
    };
  },

  computed: {
    getToken() {
      return this.$store.getters.GET_TOKEN;
    },
  },

  mounted() {
    this.api = new TodoistApi(this.getToken);
    this.api
      .getProjects()
      .then((projects) => {
        console.log(projects);
        this.$store.commit("SET_PROJECTS", projects);
      })
      .catch((error) => console.log(error));
  },

  methods: {
    getProjects() {},
  },
};
</script>
