<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      <h2>
        {{ info.name }}
        <v-btn elevation="2" icon
          ><v-icon hover @click.stop="editSection">{{
            icons.mdiPencil
          }}</v-icon>
        </v-btn>
      </h2>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-list dense>
        <v-list-item v-for="task in getTasksInThisSections" :key="task.id">
          <TaskEntry v-bind:info="task" />
        </v-list-item>
      </v-list>
    </v-expansion-panel-content>
    <v-overlay :value="showOverlay">
      <template>
        <SectionCreator v-bind:mode="'edit'" v-bind:info="this.info" />
        <v-btn color="success" @click="showOverlay = false">
          Hide Overlay
        </v-btn>
      </template>
    </v-overlay>
  </v-expansion-panel>
</template>

<script>
import TaskEntry from "./TaskEntry.vue";
import SectionCreator from "./SectionCreator.vue";
import { mdiPencil, mdiDelete } from "@mdi/js";

export default {
  name: "Section-page",
  data: () => ({
    icons: {
      mdiPencil,
      mdiDelete,
    },
    showOverlay: false,
  }),
  props: {
    info: {},
  },
  computed: {
    getCurrentProject() {
      return this.$store.getters.GET_CURR_PROJECT;
    },
    getTasks() {
      return this.$store.getters.GET_TASKS.filter((el) => {
        return el.projectId === this.getCurrentProject.id;
      });
    },
    getTasksInThisSections() {
      //Tasks from this section && !substasks
      return this.getTasks.filter((el) => {
        return (
          el.sectionId === this.info.id &&
          (el.parentId === null ||
            el.parentId === undefined ||
            el.parentId === "")
        );
      });
    },
  },
  methods: {
    editSection() {
      this.showOverlay = true;
      console.log(this.info);
    },
  },
  components: {
    TaskEntry,
    SectionCreator,
  },
};
</script>
