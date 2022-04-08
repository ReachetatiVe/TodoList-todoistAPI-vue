<template>
  <div class="task">
    <h3 class="task__header">{{ info.content }}</h3>
    <div class="task__description">
      {{ info.description }}
    </div>
    <div class="tasks__managament-btns">
      <v-btn
        class="task__managament-btn"
        color="success"
        elevation="2"
        outlined
        small
        >Edit</v-btn
      >
      <v-btn
        class="task__managament-btn"
        color="primary"
        elevation="2"
        outlined
        small
        >Add subtask</v-btn
      >
      <v-btn
        class="task__managament-btn"
        color="red darken-2"
        elevation="2"
        outlined
        small
        >Delete</v-btn
      >
    </div>
    <div class="tasks__children">
      <TaskEntry
        v-for="subtask in getSubtasks"
        :key="subtask.id"
        :name="subtask.name"
        v-bind:info="subtask"
      />
    </div>

    <v-overlay :value="showOverlay">
      <TaskCreator />
      <v-btn color="success" @click="showOverlay = false"> Hide Overlay </v-btn>
    </v-overlay>
  </div>
</template>

<script>
import TaskCreator from "./TaskCreator.vue";

export default {
  name: "TaskEntry",
  props: {
    info: {},
  },
  data() {
    return {
      checked: false,
      showOverlay: false,
    };
  },
  computed: {
    getSections() {
      return this.$store.getters.GET_SECTIONS;
    },
    getTasks() {
      return this.$store.getters.GET_CURR_PROJ_TASKS;
    },
    getSubtasks() {
      return this.getTasks.filter((task) => {
        return task.parentId === this.info.id;
      });
    },
  },
  methods: {
    toggleOverlay() {
      this.showOverlay = !this.showOverlay;
    },
  },
  components: {
    TaskCreator,
  },
};
</script>

<style lang="scss" scoped>
.task {
  max-width: 75%;
  // cursor: pointer;
  // .task__header
  &__header {
  }

  // .task__description
  &__description {
    // max-width: 75%;
  }

  &__managament-btns {
    position: relative;
  }
  &__managament-btn {
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
