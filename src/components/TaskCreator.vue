<template>
  <div>
    <h1>Create task</h1>
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
      outlined
      v-model="taskProjectName"
      :items="getProjectNames"
      label="Select project"
    ></v-select>
    <v-select
      outlined
      v-model="taskSectionName"
      :items="getSectionsNames"
      label="Select section"
    ></v-select>
    <v-btn color="success" @click="addTask">Ok</v-btn>
  </div>
</template>

<script>
export default {
  name: "Task-Creator",
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
    getProjectNames() {
      this.getProjects.forEach((element) => {
        this.projectNames.push(element.name);
      });
      return this.projectNames;
    },
    getProjects() {
      return this.$store.getters.GET_PROJECTS;
    },
    getSectionsNames() {
      this.getSections.forEach((element) => {
        this.sectionsNames.push(element.name);
      });
      return this.sectionsNames;
    },
    getSections() {
      return this.$store.getters.GET_SECTIONS;
    },
  },
  methods: {
    addTask() {
      this.$store.dispatch("addNewTask", {
        content: this.taskContent,
        description: this.taskDescription,
        projectId: this.searchProjId(),
        sectionId: this.searchSectionId(),
      });
    },
    searchProjId() {
      let id;
      this.getProjects.forEach((el) => {
        if (el.name === this.taskProjectName) id = el.id;
      });
      return id;
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
