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
      v-model="taskProjectName"
      :items="getProjectNames"
      label="Select project"
    ></v-select>
    <v-btn @click="addTask">Окей, збс</v-btn>
  </div>
</template>
<script>
export default {
  name: "Redirect-page",
  data() {
    return {
      taskContent: "",
      taskDescription: "",
      taskProjectName: "",
      projectNames: [],
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
  },
  methods: {
    addTask() {
      this.$store.dispatch("addNewTask", {
        content: this.taskContent,
        description: this.taskDescription,
        projectId: this.searchProjId()
      });
    },
    searchProjId() {
      let id;
      this.getProjects.forEach((el) => {
        if (el.name === this.taskProjectName) id = el.id;
      });
      return id;
    },
  },
};
</script>