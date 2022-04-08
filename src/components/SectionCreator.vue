<template>
  <div class="section-creator">
    <h1 class="section-creator__header">Create section</h1>
    <v-text-field
      class="section-creator__text-filed"
      label="Section name"
      hide-details="auto"
      v-model="sectionName"
    ></v-text-field>
    <v-select
      class="section-creator__select"
      outlined
      v-model="taskProjectName"
      :items="getProjectNames"
      label="Select project"
    >
    </v-select>
    <v-btn @click="addSection" color="success">Ok</v-btn>
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
        projectId: this.searchProjId(),
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

<style lang="scss">
.section-creator {

		// .section-creator__header

		&__header {
		}

		// .section-creator__text-filed

		&__text-filed {
      margin-bottom: 15px;
		}

		// .section-creator__select

		&__select {
		}
}

</style>
