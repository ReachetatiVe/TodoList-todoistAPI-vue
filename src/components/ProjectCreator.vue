<template>
  <div class="project-creator">
    <h1>Create project</h1>
    <v-text-field
      class="project-creator__text-filed"
      label="Project name"
      hide-details="auto"
      v-model="projectName"
    ></v-text-field>
    <v-menu
      offset-y
      class="project-creator__menu"
      max-height="250"
      max-width="250"
      min-width="200"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn  class="project-creator__menu-btn" color="secondary" dark v-bind="attrs" v-on="on">
          <div class="project-creator__color-item">
            <p>Pick color</p>
            <span
              class="project-creator__color"
              v-bind:style="{ backgroundColor: color.hex }"
            ></span>
          </div>
        </v-btn>
      </template>
      <v-list class="project-creator__color-items">
        <v-list-item
          v-for="color in getColors"
          :key="color.id"
          @click="pickColor(color)"
        >
          <v-list-item-title>
            <div class="project-creator__color-item">
              {{ color.name }}
              <span
                class="project-creator__color"
                v-bind:style="{ backgroundColor: color.hex }"
              ></span>
            </div>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <div>
      <v-btn @click="addProject()">Ok</v-btn>
    </div>
  </div>
</template>
<script>
export default {
  name: "Project-Creator",
  data() {
    return {
      projectName: "",
      parentProjId: "",
      color: {},
      projectNames: [],
    };
  },
  mounted() {
    this.color = this.getColors[0];
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
    getColors() {
      return this.$store.getters.GET_COLORS;
    },
  },
  methods: {
    pickColor(color) {
      this.color = color;
    },
    addProject() {
      this.$store.dispatch("addNewProject", {
        name: this.projectName,
        color: this.color.id,
      });
    },
  },
};
</script>
<style scoped lang="scss">
.project-creator {
  &__color {
    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    margin: 0 5px;
    align-items: center;
  }
  &__color-item {
    display: flex;
    justify-content: space-between;
    p {
      margin: 0;
      padding: 0;
    }
  }
  &__text-filed {
    margin-bottom: 15px;
  }
  &__menu-btn{
    margin-bottom: 15px;
  }
}
</style>
