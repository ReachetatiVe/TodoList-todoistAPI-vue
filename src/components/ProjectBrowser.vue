<template>
  <div class="project">
    <div class="project__header">
      <div class="project__title">
        <h1 class="project__title-text" v-bind:style="{ color: getColorById }">
          {{ getCurrentProject.name }}
        </h1>
        <div class="project__header-controls">
          <v-btn elevation="2" icon small class="project__header-control"
            ><v-icon hover @click.stop="editProject()">{{
              icons.mdiPencil
            }}</v-icon>
          </v-btn>
          <v-btn
            elevation="2"
            icon
            color="red darken-2"
            small
            class="project__header-control"
            ><v-icon hover @click.stop="deleteProject()">{{
              icons.mdiDelete
            }}</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="creators">
        <div class="creators__btns">
          <v-btn
            color="primary"
            large
            class="creators__btn"
            v-for="item in modes"
            :key="item.id"
            @click="selectMode(item)"
            >Add {{ item }}</v-btn
          >
          <v-btn
            v-show="getSelectedTasks.length > 0"
            color="error"
            large
            class="creators__btn"
            @click="closeTasks()"
            >Close tasks</v-btn
          >
          <v-btn
            v-show="getHasClosedTasks"
            color="warning"
            large
            class="creators__btn"
            @click="reopenTasks()"
            >Reopen tasks</v-btn
          >
        </div>
        <TaskCreator v-if="mode === 'task'" v-bind:mode="'create'" />
        <SectionCreator v-if="mode === 'section'" v-bind:mode="'create'" />
        <ProjectCreator v-if="mode === 'project'" v-bind:mode="'create'" />
      </div>
    </div>
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
    <v-overlay :value="showOverlay">
      <ProjectCreator v-bind:mode="'edit'" />
      <v-btn color="success" @click="showOverlay = false"> Hide Overlay </v-btn>
    </v-overlay>
  </div>
</template>

<script>
import Section from "./Section.vue";
import TaskCreator from "./TaskCreator.vue";
import SectionCreator from "./SectionCreator.vue";
import ProjectCreator from "./ProjectCreator.vue";
import TaskEntry from "./TaskEntry.vue";
import { mdiPencil, mdiDelete } from "@mdi/js";

export default {
  data() {
    return {
      panel: [],
      showTaskCreator: false,
      mode: "",
      modes: ["task", "section", "project"],
      icons: {
        mdiPencil,
        mdiDelete,
      },
      showOverlay: false,
    };
  },
  computed: {
    getCurrentProject() {
      return this.$store.getters.GET_CURR_PROJECT;
    },
    getSections() {
      return this.$store.getters.GET_SECTIONS.filter((el) => {
        return el.projectId === this.getCurrentProject.id;
      });
    },
    getTasks() {
      return this.$store.getters.GET_TASKS.filter((el) => {
        return el.projectId === this.getCurrentProject.id;
      });
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
    getSelectedTasks() {
      return this.$store.getters.GET_SELECTED_TASKS;
    },
    getHasClosedTasks() {
      return this.$store.getters.GET_HAS_CLOSED_TASKS;
    },
    getColorById() {
      let color = "#fff";
      this.$store.getters.GET_COLORS.forEach((element) => {
        if (element.id === this.getCurrentProject.color) color = element.hex;
      });
      return color;
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

    closeTasks() {
      this.$store.dispatch("closeTasks");
    },
    reopenTasks() {
      this.$store.dispatch("reopenTasks");
    },
    editProject() {
      console.log("Edit project");
      this.showOverlay = true;
    },
    deleteProject() {
      this.$store.dispatch("deleteProject");
    },
  },
  components: {
    Section,
    TaskCreator,
    TaskEntry,
    SectionCreator,
    ProjectCreator,
  },
  mounted() {
    this.mode = "";
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
.project {
  &__title {
    display: flex;
    // max-width: 50%;
    // justify-content: space-between;
    align-items: center;
  }
  &__title-text {
    margin-right: 10px;
  }
  &__header-controls {
    position: relative;
  }
  &__header-control {
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
