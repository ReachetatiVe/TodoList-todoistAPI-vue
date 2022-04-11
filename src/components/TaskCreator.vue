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
    <v-row>
      <v-col cols="12">
        <v-combobox
          v-model="selectedLabelsNames"
          :items="getLabelsNames"
          label="Labels"
          multiple
          outlined
          dense
        ></v-combobox>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-date-picker v-model="date" class="mt-4"></v-date-picker>
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
      selectedLabelsNames: [],
    };
  },
  computed: {
    getProjects() {
      return this.$store.getters.GET_PROJECTS;
    },
    getLabels() {
      console.log("Геттер");
      return this.$store.getters.GET_LABELS;
    },
    getLabelsNames() {
      //Если создать задачу, то доступны все лейблы, иначе только те, которых нет
      const tmp = [];
      if (this.mode === "create")
        this.getLabels.forEach((el) => {
          tmp.push(el.name);
        });
      else
        this.getLabels.forEach((label) => {
          if (!this.info.labelIds.includes(label.id)) tmp.push(label.name);
        });
      return tmp;
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
    searchLabelIdByName(labelName) {
      let labelId = -1;
      this.getLabels.forEach((label) => {
        if (label.name === labelName) labelId = label.id;
      });
      return labelId;
    },

    getInfo() {
      const InfoObj = {
        content: this.taskContent,
        description: this.taskDescription,
      };
      if (this.getSectionId !== -1) InfoObj.sectionId = this.getSectionId;
      if (this.getParentId !== -1) InfoObj.parentId = this.getParentId;
      if (this.data !== "" || this.data !== null || this.data !== undefined)
        InfoObj.due_date = this.date;
      let labelIds = [];
      if (
        this.info !== undefined &&
        this.info.labelIds !== undefined &&
        this.info.labelIds.length > 0
      )
        labelIds = [...this.info.labelIds];
      if (this.selectedLabelsNames.length > 0) {
        this.selectedLabelsNames.forEach((labelName) => {
          let id = this.searchLabelIdByName(labelName);
          if (id !== -1) labelIds.push(id);
        });
      }
      if (labelIds.length>0)
      InfoObj.label_ids  = labelIds;
      return InfoObj;
    },
  },
};
</script>
