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
        @click="toggleOverlay('edit')"
        >Edit</v-btn
      >
      <v-btn
        class="task__managament-btn"
        color="primary"
        elevation="2"
        outlined
        small
        @click="toggleOverlay('create')"
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
    <v-list class="task__children" dense>
      <v-list-item
        v-for="subtask in getSubtasks"
        :key="subtask.id"
        :name="subtask.name"
      >
        <TaskEntry v-bind:info="subtask" />
      </v-list-item>
    </v-list>
    <v-overlay :value="showOverlay">
      <TaskCreator v-bind:info="info" v-bind:mode="creatorMode" />
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
      creatorMode: "",
    };
  },
  computed: {
    getSections() {
      return this.$store.getters.GET_SECTIONS;
    },
    getTasks() {
      return this.$store.getters.GET_TASKS.filter((el) => {
        return el.projectId === this.info.projectId;
      });
    },
    getSubtasks() {
      return this.getTasks.filter((task) => {
        return task.parentId === this.info.id;
      });
    },
    getCreatorModes() {
      return this.$store.getters.GET_CREATOR_MODES;
    },
    getCurrentProject() {
      return this.$store.getters.GET_CURR_PROJECT;
    },
  },
  methods: {
    //Open overlay with needed creator mode
    toggleOverlay(creatorMode) {
      this.showOverlay = !this.showOverlay;
      this.creatorMode = creatorMode;
    },
  },
  components: {
    TaskCreator,
  },
};
</script>

<style lang="scss" scoped>
.task {
  // .task__header
  &__header {
  }

  // .task__description
  &__description {
    // max-width: 75%;
  }
  &__children {
    padding-left: 15px;
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
