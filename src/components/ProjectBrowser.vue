<template>
  <div>
    <div class="creators">
      <v-btn
        color="primary"
        large
        class="creators__btn"
        v-for="item in modes"
        :key="item.id"
        @click="selectMode(item)"
        >Add {{ item }}</v-btn
      >
      <TaskCreator v-if="mode === 'task'" />
      <SectionCreator v-if="mode === 'section'" />
      <ProjectCreator v-if="mode === 'project'" />
    </div>
    <h2></h2>
    <div class="text-center d-flex pb-4">
      <v-btn @click="all"> Show all </v-btn>
      <v-btn @click="none"> Hide all </v-btn>
    </div>
    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel v-show="getTasksWithoutSections.length > 0">
        <v-expansion-panel-header>
          <h2>Tasks Without section</h2></v-expansion-panel-header
        >
        <v-expansion-panel-content>
          <v-list>
            <v-list-item v-for="task in getTasksWithoutSections" :key="task.id">
              <TaskEntry v-bind:info="task" />
            </v-list-item>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-divider></v-divider>
      <Section
        v-for="section in getSections"
        :key="section.id"
        v-bind:info="section"
      />
    </v-expansion-panels>
  </div>
</template>

<script>
import Section from "./Section.vue";
import TaskCreator from "./TaskCreator.vue";
import SectionCreator from "./SectionCreator.vue";
import ProjectCreator from "./ProjectCreator.vue";
import TaskEntry from "./TaskEntry.vue";

export default {
  data() {
    return {
      panel: [],
      showTaskCreator: false,
      mode: "",
      modes: ["task", "section", "project"],
    };
  },
  computed: {
    getSections() {
      return this.$store.getters.GET_SECTIONS;
    },
    getTasks() {
      return this.$store.getters.GET_CURR_PROJ_TASKS;
    },
    getTasksWithoutSections() {
      return this.getTasks.filter((el) => {
        return (
          //Without section && !substasks
          el.sectionId === null ||
          el.sectionId === undefined ||
          (el.sectionId === 0 &&
            (el.parentId === null ||
              el.parentId === undefined ||
              el.parentId === ""))
        );
      });
    },
  },
  methods: {
    all() {
      this.panel = [...Array(this.getSections.length + 1).keys()].map(
        (k, i) => i
      );
    },
    // Reset the panel
    none() {
      this.panel = [];
    },
    isWithoutSection(task) {
      if (
        task.sectionId === undefined ||
        task.sectionId === null ||
        task.sectionId === 0
      )
        return true;
      else return false;
    },
    selectMode(value) {
      if (this.mode === value) this.mode = "";
      else this.mode = value;
    },
  },
  components: {
    Section,
    TaskCreator,
    TaskEntry,
    SectionCreator,
    ProjectCreator,
  },
};
</script>
<style scoped lang="scss">
.creators {
  margin: 15px 0;
  &__btn {
    margin-right: 15px;
  }
}
</style>
