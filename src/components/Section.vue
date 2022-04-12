<template>
  <v-expansion-panel class="section">
    <v-expansion-panel-header>
      <div class="section__header">
        <h2>
          {{ info.name }}
        </h2>
        <div class="section__controls">
          <v-btn outlined elevation="2" icon  class="section__control"
            ><v-icon hover @click.stop="editSection()">{{
              icons.mdiPencil
            }}</v-icon>
          </v-btn>
          <v-btn
            outlined
            elevation="2"
            icon
            color="red darken-2"
            
            class="section__control"
            ><v-icon hover @click.stop="deleteSection()">{{
              icons.mdiDelete
            }}</v-icon>
          </v-btn>
        </div>
      </div>
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
        <SectionCreator v-bind:mode="'edit'" v-bind:info="this.info" v-on:cancelFunc="toggleOverlay"/>
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
    },
    deleteSection() {
      this.$store.dispatch("deleteSection", this.info.id);
    },
    toggleOverlay(){
      this.showOverlay = !this.showOverlay;
    }
  },
  components: {
    TaskEntry,
    SectionCreator,
  },
};
</script>

<style lang="scss" scoped>
.section {
  &__header {
    display: flex;
    max-width: 75%;
    justify-content: space-between;
  }
  &__controls {
    display: flex;
    max-width: 100px;
    justify-content: space-between;
    position: relative;
  }
  &__control {
    margin-right: 15px;
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
