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
    <!-- <v-select
      v-show="showSelects"
      outlined
      v-model="taskProjectName"
      :items="getProjectNames"
      label="Select project"
    ></v-select> -->
    <v-select
      v-show="showSelects"
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
  mounted() {
    //create new task
  },
  computed: {
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
    showSelects() {
      if (this.info === undefined) return true;
      else if (this.info.parentId === undefined) return true;
      else return false;
    },
  },
  methods: {
    addTask() {
      this.$store.dispatch("addNewTask", {
        content: this.taskContent,
        description: this.taskDescription,
        // projectId: this.searchProjId(),
        sectionId: this.searchSectionId(),
      });
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
