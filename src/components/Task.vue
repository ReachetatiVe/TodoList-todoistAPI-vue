<template>
  <div class="task">
    <h3 class="task__header">{{ info.content }}</h3>
    <div class="task__description">
      {{ info.description }}
    </div>
    <v-btn class="task__managament-btns" color="success" elevation="2" outlined small>Edit</v-btn>
    <v-btn color="primary" elevation="2" outlined small>Add subtask</v-btn>
    <v-overlay :value="showOverlay">
      <TaskCreator />
      <v-btn color="success" @click="showOverlay = false"> Hide Overlay </v-btn>
    </v-overlay>
  </div>
</template>

<script>
import TaskCreator from "./TaskCreator.vue";

export default {
  name: "Section-page",
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
  },
  methods: {
    getTasks() {
      this.$store.dispatch("getTasksInProject");
    },
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

  &__managament-btns{
    margin-right: 10px;
    &:last-child{
      margin-right: 0;
    }
  }
}
</style>
