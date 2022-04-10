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
      v-if="getMode === 'create' && getParentId === -1"
      outlined
      v-model="taskSectionName"
      :items="getSectionsNames"
      label="Select section"
    ></v-select>
    <!-- <div class="another-project-picker" v-if="getMode === 'edit'">
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
    </div> -->
    <v-row justify="center">
    <v-date-picker
      v-model="date"
      class="mt-4"
    ></v-date-picker>
  </v-row>
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
      date: "",
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
      console.log("CreateMode");
      return this.getSections.filter((el) => {
        return el.projectId === this.getCurrentProject.id;
      });
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
    getSectionsNames() {
      const tmp = [];
      tmp.push("None");
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
    getParentId() {
      if (this.info === undefined || this.info.id === undefined) return -1;
      else return this.info.id;
    },
    getSectionId() {
      if (
        this.info === undefined ||
        this.info.sectionId === "" ||
        this.info.sectionId === undefined ||
        this.info.sectionId === null
      )
        return this.searchSectionId();
      else return this.info.sectionId;
    },
  },
  methods: {
    confirmTask() {
      if (this.mode === "create") this.addTask();
      else this.editTask();
    },
    addTask() {
      this.$store.dispatch("addNewTask", this.getInfo());
    },
    editTask() {
      this.$store.dispatch("updateTask", {
        id: this.info.id,
        info: this.getInfo(),
      });
    },

    searchSectionId() {
      //Ищет id секции по имени из select
      let id = -1;
      this.getSections.forEach((el) => {
        if (el.name === this.taskSectionName) id = el.id;
      });
      return id;
    },
    searchProjId() {
      //Ищет id проекта по имени из select
      let id = null;
      this.getProjects.forEach((el) => {
        if (el.name === this.taskProjectName) id = el.id;
      });
      return id;
    },

    getInfo() {
      const InfoObj = {
        content: this.taskContent,
        description: this.taskDescription,
      };
      if (this.getSectionId !== -1) InfoObj.sectionId = this.getSectionId;
      if (this.getParentId !== -1) InfoObj.parentId = this.getParentId;
      if (this.data !=="" || this.data !== null || this.data !== undefined) InfoObj.due_date = this.date;
      return InfoObj;
    },
  },
};
</script>
