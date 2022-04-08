<template>
  <div>
    <h1>{{ getMode }} task</h1>
    <v-text-field
      label="Task content"
      hide-details="auto"
      v-model="taskContent"
    ></v-text-field>
    <v-text-field
      v-model="taskDescription"
      label="Task description"
    ></v-text-field>
    <v-select
      v-if="getMode === 'create'"
      outlined
      v-model="taskSectionName"
      :items="getSectionsNames"
      label="Select section"
    ></v-select>
    <div class="another-project-picker" v-if="getMode === 'edit'">
      <v-select
        outlined
        v-model="taskProjectName"
        :items="getProjectsNames"
        label="Select another project"
      ></v-select>
      <v-select
        v-show="taskProjectName.length > 0"
        outlined
        v-model="taskSectionName"
        :items="getSectionsNames"
        label="Select section"
      ></v-select>
    </div>
    <v-btn color="success" @click="confirmTask()">Ok</v-btn>
  </div>
</template>

<script>
export default {
  name: "Task-Creator",
  props: {
    //sectionId, parentId for new subtasks
    //null for new task
    info: {},
    mode: String,
    sections: [],
  },
  data() {
    return {
      taskContent: "",
      taskDescription: "",
      taskProjectName: "",
      taskSectionName: "",
      projectNames: [],
      sectionsNames: [],
    };
  },
  computed: {
    getProjects() {
      return this.$store.getters.GET_PROJECTS;
    },
    getSections() {
      return this.$store.getters.GET_SECTIONS;
    },
    getFilteredSections() {
      if (this.mode === "create") {
        console.log("CreateMod");
        return this.getSections.filter((el) => {
          return el.projectId === this.getCurrentProject.id;
        });
      } else {
        console.log("EditMod");
        return this.$store.getters.GET_SECTIONS.filter((el) => {
          return el.projectId === this.searchProjId();
        });
      }
    },
    getSectionsNames() {
      const tmp = [];
      this.getFilteredSections.forEach((el) => {
        tmp.push(el.name);
      });
      return tmp;
    },
    getProjectsNames() {
      const tmp = [];
      this.getProjects.forEach((el) => {
        tmp.push(el.name);
      });
      return tmp;
    },
    getMode() {
      return this.mode;
    },
    getCurrentProject() {
      return this.$store.getters.GET_CURR_PROJECT;
    },
    getSelectedProject() {
      return this.$store.getters.GET_SELECTED_PROJECT;
    },
  },
  methods: {
    confirmTask() {
      if (this.mode === "create") this.addTask();
      else this.editTask();
    },
    addTask() {
      this.$store.dispatch("addNewTask", {
        content: this.taskContent,
        description: this.taskDescription,
        sectionId: this.getSectionId(),
        parent_id: this.info.id,
      });
    },
    editTask() {
      console.log("Edit Task");
      //Запрос на update
    },
    getSectionId() {
      if (
        this.info.sectionId === "" ||
        this.info.sectionId === undefined ||
        this.info.sectionId === null
      )
        return this.searchSectionId();
      else return this.info.sectionId;
    },
    searchSectionId() {
      let id;
      this.getSections.forEach((el) => {
        if (el.name === this.taskSectionName) id = el.id;
      });
      return id;
    },
    searchProjId() {
      let id;
      this.getProjects.forEach((el) => {
        if (el.name === this.taskProjectName) id = el.id;
      });
      console.log("searchProjId " + id);
      return id;
    },
  },
};
</script>
