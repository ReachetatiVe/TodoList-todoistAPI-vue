<template>
  <v-container>
    <v-btn @click="loadAllSections()">Волшебная кнопка</v-btn>
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item link>Calendar</v-list-item>
        <v-list-item link>Filters & labels</v-list-item>
      </v-list>
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

    <ProjecBrowser v-if="getCurrentProject.id" />
  </v-container>
</template>

<script>
// import { TodoistApi } from "@doist/todoist-api-typescript";
import Project from "./Project.vue";
import ProjecBrowser from "./ProjectBrowser.vue";

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
    getCurrentProject() {
      return this.$store.getters.GET_CURR_PROJECT;
    },
  },

  methods: {
    loadAllSections(){
      this.$store.dispatch("getSectionsInSelProj");
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

  // unmounted() {
  //   console.log("ListUnmounted");
  // },
  components: {
    Project,
    ProjecBrowser,
  },
};
</script>
