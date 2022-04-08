import Vue from "vue";
import Vuex from "vuex";
import { TodoistApi } from "@doist/todoist-api-typescript";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    api: TodoistApi,
    token: "",
    projects: [],
    sections: [],
    currentProjId: "",
    currentProject: {},
    curProjTasks: [],
    colors: [
      {
        id: 30,
        name: "berry_red",
        hex: "#b8256f",
      },
      {
        id: 31,
        name: "red",
        hex: "#db4035",
      },
      {
        id: 32,
        name: "orange",
        hex: "#ff9933",
      },
      {
        id: 33,
        name: "yellow",
        hex: "#fad000",
      },
      {
        id: 34,
        name: "olive_green",
        hex: "#afb83b",
      },
      {
        id: 35,
        name: "lime_green",
        hex: "#7ecc49",
      },
      {
        id: 36,
        name: "green",
        hex: "#299438",
      },
      {
        id: 37,
        name: "mint_green",
        hex: "#6accbc",
      },
      {
        id: 38,
        name: "teal",
        hex: "#158fad",
      },
      {
        id: 39,
        name: "sky_blue",
        hex: "#14aaf5",
      },
      {
        id: 40,
        name: "light_blue",
        hex: "#96c3eb",
      },
      {
        id: 41,
        name: "blue",
        hex: "#4073ff",
      },
      {
        id: 42,
        name: "grape",
        hex: "#884dff",
      },
      {
        id: 43,
        name: "violet",
        hex: "#af38eb",
      },
      {
        id: 44,
        name: "lavender",
        hex: "#eb96eb",
      },
      {
        id: 45,
        name: "magenta",
        hex: "#e05194",
      },
      {
        id: 46,
        name: "salmon",
        hex: "#ff8d85",
      },
      {
        id: 47,
        name: "charcoal",
        hex: "#808080",
      },
      {
        id: 48,
        name: "grey",
        hex: "#b8b8b8",
      },
      {
        id: 49,
        name: "taupe",
        hex: "#ccac93",
      },
    ],
  },
  getters: {
    GET_TOKEN: (state) => {
      return state.token;
    },
    GET_PROJECTS: (state) => {
      return state.projects;
    },
    GET_SECTIONS: (state) => {
      return state.sections;
    },
    GET_CURR_PROJ_TASKS: (state) => {
      return state.curProjTasks;
    },
    GET_CURR_PROJ_ID: (state) => {
      return state.currentProjId;
    },
    GET_CURR_PROJECT: (state) =>{
      return state.currentProject;
    },
    GET_COLORS: (state) => {
      return state.colors;
    },
  },
  mutations: {
    initialiseStore(state) {
      if (localStorage.getItem("token")) {
        try {
          state.token = localStorage.getItem("token");
        } catch (e) {
          localStorage.removeItem("token");
        }
      }
    },
    SET_CURRENT_PROJECT_ID: (state, payload) => {
      state.currentProjId = payload;
    },
    SET_CURRENT_PROJECT: (state, payload) => {
      if (payload === null || payload === undefined) return;
      state.currentProject = payload;
    },
    SET_CURR_PROJ_TASKS: (state, payload) => {
      if (Array.isArray(payload))
        payload.forEach((element) => {
          state.curProjTasks.push(element);
        });
      else state.curProjTasks.push(payload);
    },
    SET_SECTIONS: (state, payload) => {
      if (Array.isArray(payload))
        payload.forEach((element) => {
          state.sections.push(element);
        });
      else state.sections.push(payload);
    },
    SET_PROJECTS: (state, payload) => {
      if (Array.isArray(payload))
        payload.forEach((element) => {
          state.projects.push(element);
        });
      else state.projects.push(payload);
    },
    SET_API: (state, payload) => {
      state.api = payload;
    },
    SET_TOKEN: (state, payload) => {
      state.token = payload;
      localStorage.setItem("token", payload);
    },
    CLEAR_SECTIONS: (state) => {
      state.sections = [];
    },
    CLEAR_PROJECTS: (state) => {
      state.projects = [];
    },
    CLEAR_CURR_PROJ_TASKS: (state) => {
      state.curProjTasks = [];
    },
  },
  actions: {
    getApi(context, token) {
      const api = new TodoistApi(token);
      context.commit("SET_API", api);
      context.commit("SET_TOKEN", token);
    },
    getAllProjects(context) {
      context.commit("CLEAR_PROJECTS");
      const api = context.state.api;
      api
        .getProjects()
        .then((projects) => {
          context.commit("SET_PROJECTS", projects);
        })
        .catch((error) => console.log(error));
    },
    getAllSections(context) {
      context.commit("CLEAR_SECTIONS");
      const api = context.state.api;
      api
        .getSections(context.state.currentProject.id)
        .then((sections) => {
          context.commit("SET_SECTIONS", sections);
        })
        .catch((error) => console.log(error));
    },
    getTasksInProject(context) {
      context.commit("CLEAR_CURR_PROJ_TASKS");
      const api = context.state.api;
      api
        .getTasks({ project_id: context.state.currentProject.id })
        .then((tasks) => {
          context.commit("SET_CURR_PROJ_TASKS", tasks);
        })
        .catch((error) => console.log(error));
    },
    getCurrentProjInfo(context) {
      context.dispatch("getAllSections");
      context.dispatch("getTasksInProject");
    },
    addNewTask(context, taskInfo) {
      console.log(taskInfo);
      if (
        taskInfo === null ||
        taskInfo === undefined ||
        taskInfo.content === null ||
        taskInfo.content === undefined
      )
        return;
      const api = context.state.api;

      api
        .addTask(taskInfo)
        .then((task) => {
          context.commit("SET_CURR_PROJ_TASKS", task);
        })
        .catch((error) => console.log(error));
    },
    addNewSection(context, sectionInfo) {
      if (
        sectionInfo === null ||
        sectionInfo === undefined ||
        sectionInfo.name === null ||
        sectionInfo.name === undefined ||
        sectionInfo.projectId === null ||
        sectionInfo.projectId === undefined
      )
        return;
      const api = context.state.api;
      api
        .addSection(sectionInfo)
        .then((section) => {
          context.commit("SET_SECTIONS", section);
        })
        .catch((error) => console.log(error));
    },
    addNewProject(context, projectInfo) {
      if (
        projectInfo === null ||
        projectInfo === undefined ||
        projectInfo.name === null ||
        projectInfo.name === undefined
      )
        return;
      const api = context.state.api;

      api
        .addProject(projectInfo)
        .then((project) => {
          console.log(project);
          context.commit("SET_PROJECTS", project);
        })
        .catch((error) => console.log(error));
    },
  },
  modules: {},
});
