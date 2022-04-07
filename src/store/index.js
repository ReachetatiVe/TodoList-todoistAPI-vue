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
    curProjTasks: [],
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
    SET_CURR_PROJ_TASKS: (state, payload) => {
      if (Array.isArray(payload))
        payload.forEach((element) => {
          state.curProjTasks.push(element);
        });
      else state.curProjTasks.push(payload);
    },
    SET_SECTIONS: (state, payload) => {
      payload.forEach((element) => {
        state.sections.push(element);
      });
    },
    SET_PROJECTS: (state, payload) => {
      payload.forEach((element) => {
        state.projects.push(element);
      });
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
        .getSections(context.state.currentProjId)
        .then((sections) => {
          context.commit("SET_SECTIONS", sections);
        })
        .catch((error) => console.log(error));
    },
    getTasksInProject(context) {
      context.commit("CLEAR_CURR_PROJ_TASKS");
      const api = context.state.api;
      api
        .getTasks({ project_id: context.state.currentProjId })
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
          console.log(task);
          context.commit("SET_CURR_PROJ_TASKS", task);
        })
        .catch((error) => console.log(error));
    },
  },
  modules: {},
});
