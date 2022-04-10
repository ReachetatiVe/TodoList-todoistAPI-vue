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
        console.log("CreateMode");
        return this.getSections.filter((el) => {
          return el.projectId === this.getCurrentProject.id;
        });
      } else {
        console.log("EditMode");
        return this.$store.getters.GET_SECTIONS.filter((el) => {
          return el.projectId === this.searchProjId();
        });
      }
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
      //Либо оставить подзадачу как есть и менять только текст/дату
      //Либо переназначить на другой проект, как просто задачу (как в todoist)
      //sectionId, parentId for new subtasks
      //null for new task (not subtask)
      if (this.info === undefined) return -1;
      if (this.mode === "edit") {
        //отдаем в info задачу для изменения
        //Если у задачи есть родитель вернуть его
        if (this.info.parentId === undefined) return -1;
        else return this.info.parentId;
      } //Если create то parentId = id
      else if (this.info.id === undefined) return -1;
      else return this.info.id;
    },
    getSectionId() {
      //При изменениий задачи
      //
      if (this.mode === "create") {
        console.log("getSectionId CREATE");
        if (
          this.info === undefined ||
          this.info.sectionId === "" ||
          this.info.sectionId === undefined ||
          this.info.sectionId === null
        )
          return this.searchSectionId();
        else return this.info.sectionId;
      } //Если mode = "edit" и имя в селекте не менялось, то оставить секцию исходной
      else {
        console.log("getSectionId EDITOR");
        if (this.taskSectionName === "") return this.info.sectionId;
        //А если изменилось то найти по имени в select
        else return this.searchSectionId();
      }
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
      let id = null;
      this.getProjects.forEach((el) => {
        if (el.name === this.taskProjectName) id = el.id;
      });
      return id;
    },

    getInfo() {
      if (this.getSectionId !== -1 && this.getParentId !== -1)
        return {
          content: this.taskContent,
          description: this.taskDescription,
          sectionId: this.getSectionId,
          parent_id: this.getParentId,
        };
      if (this.getSectionId !== -1 && this.getParentId === -1)
        return {
          content: this.taskContent,
          description: this.taskDescription,
          sectionId: this.getSectionId,
        };
      if (this.getSectionId === -1 && this.getParentId !== -1)
        return {
          content: this.taskContent,
          description: this.taskDescription,
          parent_id: this.getParentId,
        };
      if (this.getSectionId === -1 && this.getParentId === -1)
        return {
          content: this.taskContent,
          description: this.taskDescription,
        };
    },
  },
};
</script>
