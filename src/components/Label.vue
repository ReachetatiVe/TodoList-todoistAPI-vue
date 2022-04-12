<template>
    <v-expansion-panel>
    <v-expansion-panel-header>
      <div class="label">
        <span class="label__item" v-bind:style="{ color: getColorById }">
          {{ " " + info.name }}
        </span>
        <div class="label__controls">
          <v-btn outlined elevation="2" icon class="label__control" small
            ><v-icon hover @click.stop="toggleOverlay()">{{
              icons.mdiPencil
            }}</v-icon>
          </v-btn>
          <v-btn
            outlined
            elevation="2"
            icon
            color="red darken-2"
            class="label__control"
            small
            ><v-icon hover @click.stop="deleteLabel()">{{
              icons.mdiDelete
            }}</v-icon>
          </v-btn>
        </div>
      </div>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-list dense>
        <v-list-item v-for="task in getTasksWithLabel" :key="task.id">
          <TaskEntry v-bind:info="task" />
        </v-list-item>
      </v-list>
    </v-expansion-panel-content>
    <v-overlay :value="showOverlay">
      <template>
        <LabelCreator
          v-bind:mode="'edit'"
          v-bind:info="this.info"
          v-on:toggleOverlay="toggleOverlay"
        />
      </template>
    </v-overlay>
  </v-expansion-panel>

</template>
<script>
import { mdiPencil, mdiDelete } from "@mdi/js";
import LabelCreator from "./LabelCreator.vue";
import TaskEntry from "./TaskEntry.vue";

export default {
  name: "LabelItem",
  props: {
    info: {},
  },
  data: () => ({
    icons: {
      mdiPencil,
      mdiDelete,
    },
    showOverlay: false,
  }),
  methods: {
    deleteLabel() {
      console.log(this.info);
      this.$store.dispatch("deleteLabel", this.info.id);
    },
    toggleOverlay() {
      this.showOverlay = !this.showOverlay;
    },
  },
  computed: {
    getTasks() {
      return this.$store.getters.GET_TASKS;
    },
    getTasksWithLabel() {
      return this.getTasks.filter((task) => {
        return task.labelIds.includes(this.info.id);
      });
    },
    getColorById() {
      let color = "#fff";
      color = this.$store.getters.GET_COLORS.find(el => el.id === this.info.color).hex;
      return color;
    },
  },
  components: {
    LabelCreator,
    TaskEntry,
  },
};
</script>

<style scoped lang="scss">
.label {
  display: flex;
  max-width: 60%;
  justify-content: space-between;
  align-items: center;
  &__controls {
    position: relative;
  }
  &__control {
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
  }
  &__item {
    display: inline-block;
    border-radius: 5%;
    padding: 5px;
    border: 1px solid;
    cursor: pointer;
  }
}
</style>
