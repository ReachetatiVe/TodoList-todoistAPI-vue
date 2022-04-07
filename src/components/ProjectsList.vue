<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item>Inbox</v-list-item>
        <v-list-item>Today</v-list-item>
        <v-list-item>Upcoming</v-list-item>
        <v-list-item>Filters & labels</v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header> Projects </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-list>
              <v-list-item
                v-for="project in getProjects"
                :key="'_' + project.id"
                link
                ><Project v-bind:info="project" />
              </v-list-item>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Manager</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <!--  -->
    </v-main>
  </v-app>
</template>

<script>
// import { TodoistApi } from "@doist/todoist-api-typescript";
import Project from "./Project.vue";

// @ is an alias to /src

export default {
  name: "Redirect-page",
  data() {
    return {
      drawer: null,
      api: "",
      projects: [],
    };
  },

  computed: {
    getToken() {
      return this.$store.getters.GET_TOKEN;
    },
    getProjects() {
      return this.$store.getters.GET_PROJECTS;
    },
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

  // unmounted() {
  //   console.log("ListUnmounted");
  // },
  methods: {},
  components: {
    Project,
  },
};
</script>
