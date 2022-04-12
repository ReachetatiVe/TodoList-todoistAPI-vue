<template>
  <v-col class="task-creator">
    <v-row>
      <h1>{{ getMode }} task</h1>
    </v-row>
    <v-row>
      <v-text-field
        label="Task content"
        hide-details="auto"
        v-model="taskContent"
        :rules="rules"
      ></v-text-field>
    </v-row>
    <v-row>
      <v-text-field
        v-model="taskDescription"
        label="Task description"
      ></v-text-field>
    </v-row>
    <v-row>
      <v-select
        v-if="getMode === 'create' && getParentId === -1"
        outlined
        v-model="taskSectionName"
        :items="getSectionsNames"
        label="Select section"
      ></v-select>
    </v-row>
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
      <v-date-picker v-model="taskDate" class="mt-4"></v-date-picker>
    </v-row>
    <v-row max-width="100" justify="center" class="task-creator__btns">
      <v-btn color="success" @click="confirmTask()" class="task-creator__btn"
        >Ok</v-btn
      >
      <v-btn color="red" @click="$emit('cancelFunc')" class="task-creator__btn"
        >Cancel</v-btn
      >
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: "Task-Creator",
  props: {
    info: {},
    mode: String,
    sections: [],
  },
  data() {
    return {
      taskDate: "",
      taskContent: "",
      taskDescription: "",
      taskProjectName: "",
      taskSectionName: "",
      sectionsNames: [],
      selectedLabelsNames: [],
      rules: [(value) => !!value || "Required."],
    };
  },
  computed: {
    getThisInfo() {
      return this.info;
    },
    getProjects() {
      return this.$store.getters.GET_PROJECTS;
    },
    getLabels() {
      return this.$store.getters.GET_LABELS;
    },
    getLabelsNames() {
      const tmp = [];
      if (this.mode === "create")
        this.getLabels.forEach((el) => {
          tmp.push(el.name);
        });
      else
        this.getLabels.forEach((label) => {
          if (!this.getThisInfo.labelIds.includes(label.id))
            tmp.push(label.name);
        });
      return tmp;
    },
    getSections() {
      return this.$store.getters.GET_SECTIONS;
    },
    getFilteredSections() {
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
    getSectionsNames() {
      const tmp = [];
      tmp.push("None");
      this.getFilteredSections.forEach((el) => {
        tmp.push(el.name);
      });
      return tmp;
    },
    getParentId() {
      if (this.getThisInfo === undefined || this.getThisInfo.id === undefined)
        return -1;
      else return this.getThisInfo.id;
    },
    getSectionId() {
      if (
        this.getThisInfo === undefined ||
        this.getThisInfo.sectionId === "" ||
        this.getThisInfo.sectionId === undefined ||
        this.getThisInfo.sectionId === null
      )
        return this.searchSectionId();
      else return this.getThisInfo.sectionId;
    },
  },
  methods: {
    confirmTask() {
      if (this.mode === "create") this.addTask();
      else this.editTask();
    },
    addTask() {
      if (
        this.taskContent !== "" &&
        this.taskContent !== undefined &&
        this.taskContent !== null
      ) {
        this.$store.dispatch("addNewTask", this.getInfo());
        this.$emit("cancelFunc");
      }
    },
    editTask() {
      this.$store.dispatch("updateTask", {
        id: this.getThisInfo.id,
        info: this.getInfo(),
      });
      this.$emit("cancelFunc");
    },

    searchSectionId() {
      let id = -1;
      if (
        this.taskSectionName !== "None" &&
        this.taskSectionName !== "" &&
        this.taskSectionName !== null &&
        this.taskSectionName !== undefined
      ) {
        id = this.getSections.find((el) => el.name === this.taskSectionName).id;
      }
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
        description: this.taskDescription,
      };
      if (
        this.taskContent !== "" &&
        this.taskContent !== null &&
        this.taskContent !== undefined
      )
        InfoObj.content = this.taskContent;
      if (this.getSectionId !== -1 && this.getSectionId !== 0)
        InfoObj.sectionId = this.getSectionId;
      if (this.getParentId !== -1) InfoObj.parentId = this.getParentId;
      if (
        this.taskDate !== "" &&
        this.taskDate !== null &&
        this.taskDate !== undefined
      )
        InfoObj.due_date = this.taskDate;
      let labelIds = [];
      if (
        this.getThisInfo !== undefined &&
        this.getThisInfo.labelIds !== undefined &&
        this.getThisInfo.labelIds.length > 0
      )
        labelIds = [...this.getThisInfo.labelIds];
      if (this.selectedLabelsNames.length > 0) {
        this.selectedLabelsNames.forEach((labelName) => {
          let id = this.searchLabelIdByName(labelName);
          if (id !== -1) labelIds.push(id);
        });
      }
      if (labelIds.length > 0) InfoObj.label_ids = labelIds;
      return InfoObj;
    },
  },
  mounted() {
    if (this.mode !== "create") {
      if (this.getThisInfo !== undefined) {
        if (this.getThisInfo.content !== undefined)
          this.taskContent = this.getThisInfo.content;
        if (this.getThisInfo.description !== undefined)
          this.taskDescription = this.getThisInfo.description;
        if (this.getThisInfo.due !== undefined)
          this.taskDate = this.getThisInfo.due.date;
      }
    }
  },
};
</script>
<style lang="scss" scoped>
.task-creator {
  &__btns {
    position: relative;
  }
  &__btn {
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
