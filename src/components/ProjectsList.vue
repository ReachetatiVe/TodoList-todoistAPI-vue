<template>
  <v-container>
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item>
          <v-btn outlined color="primary" @click="logout()"> LogOut </v-btn></v-list-item>
          <v-divider></v-divider>
        <v-list-item link @click="toggleShowCalendar">Calendar</v-list-item>
        <v-list-item link @click="toggleShowLabels">Labels</v-list-item>
      </v-list>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <h3>Projects</h3>
            <div>
              <v-btn
                elevation="2"
                icon
                x-small
                class="mx-2"
                fab
                dark
                color="indigo"
                ><v-icon hover @click.stop="showOverlay = true">{{
                  icons.mdiPlus
                }}</v-icon>
              </v-btn>
            </div>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-list>
              <v-list-item
                v-for="project in getProjects"
                :key="'_' + project.id"
                link
                ><Project
                  v-bind:info="project"
                  v-on:toggleProjectBrowser="toggleShowProjectBrowser"
                />
              </v-list-item>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Manager </v-toolbar-title>
    </v-app-bar>

    <ProjecBrowser v-if="showProjectBrowser" />
    <LabelBrowser v-if="showLabels" />
    <Calendar v-if="showCalendar"/>

    <v-overlay :value="showOverlay">
      <ProjectCreator
        v-bind:mode="'create'"
        v-on:cancelFunc="toggleOverlay"
      />
    </v-overlay>
  </v-container>
</template>

<script>
import Project from "./Project.vue";
import ProjecBrowser from "./ProjectBrowser.vue";
import ProjectCreator from "./ProjectCreator.vue";
import LabelBrowser from "./LabelBrowser.vue";
import Calendar from "./Calendar.vue";
import { mdiPlus } from "@mdi/js";

export default {
  name: "Project-list",
  data() {
    return {
      drawer: null,
      api: "",
      projects: [],
      icons: {
        mdiPlus,
      },
      showOverlay: false,
      showCalendar: false,
      showLabels: false,
    };
  },

  methods: {
    toggleOverlay() {
      this.showOverlay = !this.showOverlay;
    },
    toggleShowCalendar() {
      this.showLabels = false;
      this.showOverlay = false;
      this.showCalendar = !this.showCalendar;
    },
    toggleShowLabels() {
      this.showOverlay = false;
      this.showCalendar = false;
      this.showLabels = !this.showLabels;
    },
    toggleShowProjectBrowser() {
      this.showOverlay = false;
      this.showCalendar = false;
      this.showLabels = false;
    },
    logout(){
      this.$store.commit("CLEAR_STORAGE");
      this.$router.push("/");
    },
  },

  computed: {
    getProjects() {
      return this.$store.getters.GET_PROJECTS;
    },
    getCurrentProject() {
      return this.$store.getters.GET_CURR_PROJECT;
    },
    showProjectBrowser() {
      return (
        this.getCurrentProject.id &&
        this.showLabels === false &&
        this.showCalendar === false
      );
    },
  },

  mounted() {
    this.$store.dispatch("initialiseStore");
  },

  components: {
    Project,
    ProjecBrowser,
    ProjectCreator,
    LabelBrowser,
    Calendar,
  },
};
</script>
