<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      <h2>{{ info.name }}</h2></v-expansion-panel-header
    >
    <v-expansion-panel-content>
      <v-list dense>
        <v-list-item v-for="task in getTasksInThisSections" :key="task.id">
          <TaskEntry v-bind:info="task" />
        </v-list-item>
      </v-list>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import TaskEntry from "./TaskEntry.vue";

export default {
  name: "Section-page",
  props: {
    info: {},
  },
  computed: {
    getTasks() {
      return this.$store.getters.GET_CURR_PROJ_TASKS;
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
  components: {
    TaskEntry,
  },
};
</script>
