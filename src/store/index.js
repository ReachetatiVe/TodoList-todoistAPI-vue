import Vue from "vue";
import Vuex from "vuex";
import { TodoistApi } from "@doist/todoist-api-typescript";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    api: TodoistApi,
    token: "",
    projects: [],
  },
  getters: {
    GET_TOKEN: (state) => {
      return state.token;
    },
    GET_PROJECTS: (state) => {
      return state.projects;
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
    },
    CLEAR_PROJECTS: (state) => {
      state.projects = [];
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
          console.log(projects);
          context.commit("SET_PROJECTS", projects);
        })
        .catch((error) => console.log(error));
    },
  },
  modules: {},
});
