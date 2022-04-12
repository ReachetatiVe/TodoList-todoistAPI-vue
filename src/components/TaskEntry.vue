<template>
  <div class="task">
    <div class="task__header" @click.stop="addTaskIdToSelected()">
      <v-checkbox v-model="checkbox">
        <template v-slot:label>
          <h3>{{ info.content }}</h3>
        </template>
      </v-checkbox>
    </div>

    <div class="task__description">
      {{ info.description }}
    </div>
    <div class="task__status">
      {{ "Status: " + getStatus }}
    </div>
    <div class="task__date" v-if="hasDate">
      {{ info.due.date }}
    </div>
    <div class="task__labels" v-if="getTaskLabels !== -1">
      <span
        v-for="label in getTaskLabels"
        :key="label.id"
        class="task__label"
        @click="removeLabelById(label.id)"
        v-bind:style="{ color: getLabelColor(label.color) }"
      >
        {{ label.name }}
        <v-icon x-small> {{icons.mdiDelete}} </v-icon>
      </span>
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
        @click="deleteTask()"
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
      <TaskCreator
        v-bind:info="info"
        v-bind:mode="creatorMode"
        v-on:cancelFunc="toggleOverlay"
      />
    </v-overlay>
  </div>
</template>

<script>
import TaskCreator from "./TaskCreator.vue";
import {mdiDelete} from "@mdi/js";

export default {
  name: "TaskEntry",
  props: {
    info: {},
  },
  data() {
    return {
      showOverlay: false,
      creatorMode: "",
      checkbox: false,
      icons: {
        mdiDelete
      },
    };
  },
  computed: {
    hasDate() {
      if (
        this.info.due === undefined ||
        this.info.due.date === undefined ||
        this.info.due.date === null
      )
        return false;
      else return true;
    },
    getTaskLabelIds() {
      if (
        this.labelIds !== undefined &&
        this.labelIds !== null &&
        this.labelIds.length === 0
      )
        return this.info.labelIds;
      return -1;
    },
    getLabels(){
      return this.$store.getters.GET_LABELS;
    },
    getTaskLabels() {
      if (this.getTaskLabelIds !== -1) {
        const tmp = [];
        this.getLabels.forEach((label) => {
          if (this.getTaskLabelIds.includes(label.id)) tmp.push(label);
        });
        return tmp;
      }
      return -1;
    },
    getStatus() {
      if (this.info.completed) return "Closed";
      else return "Opened";
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
  },
  methods: {
    deleteTask() {
      this.$store.dispatch("deleteTask", this.info);
    },
    removeLabelById(labelId) {
      this.$store.dispatch("removeLabelFromTask", {
        labelId: labelId,
        task: this.info,
      });
    },
    toggleOverlay(creatorMode) {
      this.showOverlay = !this.showOverlay;
      this.creatorMode = creatorMode;
    },
    addTaskIdToSelected() {
      if (this.checkbox === true)
        this.$store.commit("SET_TASK_TO_SELECTED", this.info);
      else this.$store.commit("DELETE_TASK_FROM_SELECTED", this.info);
    },
    getLabelColor(labelColor) {
      let color = "#fff";
      color = this.$store.getters.GET_COLORS.find(
        (el) => el.id === labelColor
      ).hex;
      return color;
    },
  },
  components: {
    TaskCreator,
  },
};
</script>

<style lang="scss" scoped>
.task {
  &__header {
    cursor: pointer;
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
  &__labels {
    position: relative;
    margin-bottom: 3px;
  }
  &__label {
    cursor: pointer;
    align-items: center;
    margin-right: 5px;
    padding: 2px;
    border: 1px solid;
    border-radius: 3px;
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
