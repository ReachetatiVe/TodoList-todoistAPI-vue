<template>
  <div>
    <h1>List of projects</h1>
    <ul>
      <li v-for="project in getProjects" v-bind:key="'_'+project.id">
        <Project v-bind:info="project"/>
      </li>
    </ul>
      <router-view/>
  </div>
</template>

<script>
// import { TodoistApi } from "@doist/todoist-api-typescript";
import Project from "./Project.vue"

// @ is an alias to /src

export default {
  name: "Redirect-page",
  data() {
    return {
      api: "",
      projects: [],
    };
  },

  computed: {
    getToken() {
      return this.$store.getters.GET_TOKEN;
    },
    getProjects(){
      return this.$store.getters.GET_PROJECTS;
    }
  },

  mounted() {
    this.$store.dispatch("getAllProjects");
    //TODO: почему не срабатывает unmounted и переделать
    // this.$store.commit("CLEAR_PROJECTS");
    // this.api = new TodoistApi(this.getToken);
    // this.api
    //   .getProjects()
    //   .then((projects) => {
    //     console.log(projects);
    //     // projects.forEach(element => {
    //     //   this.projects.push(element)
    //     // });
    //     this.$store.commit("SET_PROJECTS", projects);
    //   })
    //   .catch((error) => console.log(error));
  },

  unmounted() {
    console.log("ListUnmounted");
  },
  methods: {
  },
  components: {
    Project,
  }
};
</script>