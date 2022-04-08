<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      <h2>{{ info.name }}</h2></v-expansion-panel-header
    >
    <v-expansion-panel-content>
      <h3>List of tasks</h3>
      <v-list dense>
        <v-list-item v-for="task in getTasksInThisSections" :key="task.id">
          <Task v-bind:info="task" />
        </v-list-item>
      </v-list>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import Task from "./Task.vue";

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
      return this.getTasks.filter((el) => {
        return (
          el.sectionId === this.info.id
        );
      });
    },
  },
  components: {
    Task,
  },
};
</script>
