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
      v-show="showSelects"
      outlined
      v-model="taskSectionName"
      :items="getSectionsNames"
      label="Select section"
    ></v-select>
    <div class="another-project-picker" v-if="getMode==='edit'">
      <v-select
        outlined
        v-model="taskSectionName"
        :items="getProjectsNames"
        label="Select another project"
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
    getProjects(){
      return this.$store.getters.GET_PROJECTS;
    },
    getSections() {
      return this.$store.getters.GET_SECTIONS;
    },
    getSectionsNames() {
      const tmp = [];
      this.getSections.forEach((el) => {
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
    showSelects() {
      if (this.info === undefined) return true;
      else if (this.info.parentId === undefined) return true;
      else return false;
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
        sectionId: this.searchSectionId(),
      });
    },
    editTask() {
      console.log("Edit Task");
      //Запрос на update
    },
    searchSectionId() {
      let id;
      this.getSections.forEach((el) => {
        if (el.name === this.taskSectionName) id = el.id;
      });
      return id;
    },
  },
};
</script>
