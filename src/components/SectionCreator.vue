<template>
    <div>
    <h1>Create task</h1>
    <v-text-field
      label="Section name"
      hide-details="auto"
      v-model="sectionName"
    ></v-text-field>
    <v-select
      v-model="taskProjectName"
      :items="getProjectNames"
      label="Select project"
    ></v-select>
    <v-btn @click="addSection">Окей, збс</v-btn>
  </div>
</template>
<script>
export default {
  name: "Section-Creator",
  data() {
    return {
      sectionName: "",
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
    addSection() {
      this.$store.dispatch("addNewSection", {
        name: this.sectionName,
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