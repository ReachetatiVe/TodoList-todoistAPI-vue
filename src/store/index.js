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
    tasks: [],
    labels: [],
    currentProject: {},
    selectedTasks: [],
    hasClosedTasks: false,
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
    clientId: "65d3dc9ff5dc4d698a1288bb4a769065",
    clientSecret: "7012a5dd7357481a94736d4304f3bc90",
  },
  getters: {
    GET_CLIENT_ID: (state) => {
      return state.clientId;
    },
    GET_CLIENT_SECRET: (state) => {
      return state.clientSecret;
    },
    GET_TOKEN: (state) => {
      return state.token;
    },
    GET_PROJECTS: (state) => {
      return state.projects;
    },
    GET_SECTIONS: (state) => {
      return state.sections;
    },
    GET_TASKS: (state) => {
      return state.tasks;
    },
    GET_LABELS: (state) => {
      return state.labels;
    },
    GET_CURR_PROJECT: (state) => {
      return state.currentProject;
    },
    GET_COLORS: (state) => {
      return state.colors;
    },
    GET_SELECTED_TASKS: (state) => {
      return state.selectedTasks;
    },
    GET_HAS_CLOSED_TASKS: (state) => {
      return state.hasClosedTasks;
    },
  },
  mutations: {
    SET_CURRENT_PROJECT: (state, payload) => {
      if (payload === null || payload === undefined) return;
      state.currentProject = payload;
    },
    SET_SECTIONS: (state, payload) => {
      if (payload === undefined || payload === null) return;
      if (Array.isArray(payload))
        payload.forEach((element) => {
          state.sections.push(element);
        });
      else state.sections.push(payload);
    },
    SET_TASKS: (state, payload) => {
      if (payload === undefined || payload === null) return;
      if (Array.isArray(payload))
        payload.forEach((element) => {
          state.tasks.push(element);
        });
      else state.tasks.push(payload);
    },
    SET_TASK_TO_SELECTED: (state, payload) => {
      if (payload === undefined || payload === null) return;
      if (Array.isArray(payload))
        payload.forEach((element) => {
          state.selectedTasks.push(element);
        });
      else state.selectedTasks.push(payload);
    },
    SET_HAS_CLOSED_TASKS: (state, payload) => {
      if (payload === undefined || payload === null) return;
      state.hasClosedTasks = payload;
    },
    SET_PROJECTS: (state, payload) => {
      if (payload === undefined || payload === null) return;
      if (Array.isArray(payload))
        payload.forEach((element) => {
          state.projects.push(element);
        });
      else state.projects.push(payload);
    },
    SET_LABELS: (state, payload) => {
      if (payload === undefined || payload === null) return;
      if (Array.isArray(payload))
        payload.forEach((element) => {
          state.labels.push(element);
        });
      else state.labels.push(payload);
    },
    SET_API: (state, payload) => {
      if (payload === undefined || payload === null) return;
      state.api = payload;
    },
    SET_TOKEN: (state, payload) => {
      if (payload === undefined || payload === null) return;
      state.token = payload;
      localStorage.setItem("token", payload);
    },
    UPDATE_PROJECT: (state, payload) => {
      if (
        payload === undefined ||
        payload === null ||
        payload.id === undefined ||
        payload.id === null ||
        payload.name === undefined ||
        payload.name === null ||
        payload.name === ""
      )
        return;
      const index = state.projects.findIndex((p) => p.id === payload.id);
      if (index !== -1) {
        state.projects[index] = payload;
      }
    },
    UPDATE_LABEL: (state, payload) => {
      if (
        payload === undefined ||
        payload === null ||
        payload.id === undefined ||
        payload.id === null ||
        payload.name === undefined ||
        payload.name === null ||
        payload.name === ""
      )
        return;
      const index = state.labels.findIndex((p) => p.id === payload.id);
      if (index !== -1) {
        state.labels[index] = payload;
      }
    },
    DELETE_TASK: (state, payload) => {
      if (
        payload === undefined ||
        payload === null ||
        payload.id === undefined ||
        payload.id === null
      )
        return;
      state.tasks = state.tasks.filter((el) => {
        return el.id !== payload.id;
      });
    },
    DELETE_TASKS_BY_SECTION_ID: (state, payload) => {
      if (payload === undefined || payload === null) return;
      state.tasks = state.tasks.filter((el) => {
        return el.sectionId !== payload;
      });
    },
    DELETE_SECTION: (state, payload) => {
      if (payload === undefined || payload === null) return;
      state.sections = state.sections.filter((el) => {
        return el.id !== payload;
      });
    },
    DELETE_PROJECT: (state, payload) => {
      if (payload === undefined || payload === null) return;
      state.tasks = state.tasks.filter((task) => {
        return task.projectId !== payload;
      });
      state.sections = state.sections.filter((section) => {
        return section.projectId !== payload;
      });
      state.projects = state.projects.filter((proj) => {
        return proj.id !== payload;
      });
    },
    DELETE_LABEL: (state, payload) => {
      if (payload === undefined || payload === null) return;
      state.labels = state.labels.filter((el) => {
        return el.id !== payload;
      });
    },
    DELETE_TASK_FROM_SELECTED: (state, payload) => {
      if (
        payload === undefined ||
        payload === null ||
        payload.id === undefined ||
        payload.id === null
      )
        return;
      state.selectedTasks = state.selectedTasks.filter((el) => {
        return el.id !== payload.id;
      });
    },
    CLEAR_SECTIONS: (state) => {
      state.sections = [];
    },
    CLEAR_PROJECTS: (state) => {
      state.projects = [];
    },
    CLEAR_STORAGE: (state) => {
      state.api = TodoistApi;
      state.token = "";
      state.projects = [];
      state.sections = [];
      state.tasks = [];
      state.labels = [];
      state.currentProject = {};
      state.selectedTasks = [];
      state.hasClosedTasks = false;
    },
  },
  actions: {
    getApi(context, token) {
      const api = new TodoistApi(token);
      context.commit("SET_API", api);
      context.commit("SET_TOKEN", token);
    },
    initialiseStore(context) {
      if (localStorage.getItem("token")) {
        try {
          context.state.token = localStorage.getItem("token");
          const api = new TodoistApi(context.state.token);
          context.commit("SET_API", api);
          context.dispatch("getAllInfo");
        } catch (e) {
          localStorage.removeItem("token");
          console.log(e);
        }
      }
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
        .getSections()
        .then((sections) => {
          context.commit("SET_SECTIONS", sections);
        })
        .catch((error) => console.log(error));
    },

    getAllTasks(context) {
      context.state.tasks = [];
      const api = context.state.api;
      api
        .getTasks()
        .then((tasks) => {
          context.commit("SET_TASKS", tasks);
        })
        .catch((error) => console.log(error));
    },
    getAllLabels(context) {
      context.state.labels = [];
      const api = context.state.api;
      api
        .getLabels()
        .then((labels) => context.commit("SET_LABELS", labels))
        .catch((error) => console.log(error));
    },
    getTaskById(context, taskId) {
      if (taskId === null || taskId === undefined) return;
      const api = context.state.api;
      api
        .getTask(taskId)
        .then((task) => {
          context.commit("SET_TASKS", task);
        })
        .catch((error) => console.log(error));
    },
    getSectionById(context, sectionId) {
      if (sectionId === undefined || sectionId === null) return;
      const api = context.state.api;
      api
        .getSection(sectionId)
        .then((section) => context.commit("SET_SECTIONS", section))
        .catch((error) => console.log(error));
    },
    getCurrentProjectById(context, projId) {
      if (projId === undefined || projId === null) return;
      const api = context.state.api;
      api
        .getProject(projId)
        .then((project) => {
          context.commit("SET_CURRENT_PROJECT", project);
          context.commit("UPDATE_PROJECT", project);
        })
        .catch((error) => console.log(error));
    },
    getAllInfo(context) {
      context.dispatch("getAllProjects");
      context.dispatch("getAllSections");
      context.dispatch("getAllTasks");
      context.dispatch("getAllLabels");
    },
    addNewTask(context, taskInfo) {
      if (
        taskInfo === null ||
        taskInfo === undefined ||
        taskInfo.content === null ||
        taskInfo.content === undefined ||
        taskInfo.content === ""
      )
        return;
      taskInfo.projectId = context.state.currentProject.id;
      const api = context.state.api;
      api
        .addTask(taskInfo)
        .then((task) => {
          context.commit("SET_TASKS", task);
        })
        .catch((error) => console.log(error));
    },
    addNewSection(context, sectionInfo) {
      if (
        sectionInfo === null ||
        sectionInfo === undefined ||
        sectionInfo.name === null ||
        sectionInfo.name === undefined ||
        sectionInfo.name === ""
      )
        return;
      sectionInfo.projectId = context.state.currentProject.id;
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
        projectInfo.name === undefined ||
        projectInfo.name === ""
      )
        return;
      const api = context.state.api;

      api
        .addProject(projectInfo)
        .then((project) => {
          context.commit("SET_PROJECTS", project);
        })
        .catch((error) => console.log(error));
    },
    addNewLabel(context, labelInfo) {
      if (
        labelInfo === null ||
        labelInfo === undefined ||
        labelInfo.name === "" ||
        labelInfo.name === null ||
        labelInfo.name === undefined
      )
        return;
      const api = context.state.api;
      api
        .addLabel(labelInfo)
        .then((label) => {
          context.commit("SET_LABELS", label);
        })
        .catch((error) => console.log(error));
    },
    removeLabelFromTask(context, payload) {
      if (
        payload === undefined ||
        payload === null ||
        payload.task.id === null ||
        payload.task.id === undefined ||
        payload.labelId === null ||
        payload.labelId === undefined ||
        payload.task.labelIds === undefined ||
        payload.task.labelIds === null
      )
        return;
      const newTaskObj = {
        ...payload.task,
      };
      const newLabelIds = payload.task.labelIds.filter((el) => {
        return el !== payload.labelId;
      });
      newTaskObj.labelIds = newLabelIds;
      context.dispatch("updateTask", { id: newTaskObj.id, info: newTaskObj });
    },
    deleteTask(context, taskInfo) {
      if (
        taskInfo.id === null ||
        taskInfo.id === undefined ||
        taskInfo.id === ""
      )
        return;
      const api = context.state.api;
      api
        .deleteTask(taskInfo.id)
        .then((isSuccess) => {
          if (isSuccess) {
            let tasksFromParentSection = context.state.tasks.filter((el) => {
              return el.sectionId === taskInfo.sectionId;
            });
            context.dispatch("deleteTaskChildren", {
              items: tasksFromParentSection,
              item: taskInfo,
            });
          }
        })
        .catch((error) => console.log(error));
    },
    deleteTaskChildren(context, payload) {
      if (payload === undefined || payload === null) return;
      let items = payload.items;
      let item = payload.item;
      if (item.parentdId) {
        items = context.dispatch("deleteTaskChildren", {
          items: items,
          item: item[item.parentId],
        });
      }
      context.commit("DELETE_TASK", item);
      return items;
    },
    deleteSection(context, sectionId) {
      if (sectionId === undefined || sectionId === null) return;
      const api = context.state.api;
      api
        .deleteSection(sectionId)
        .then((isSuccess) => {
          if (isSuccess) {
            context.commit("DELETE_TASKS_BY_SECTION_ID", sectionId);
            context.commit("DELETE_SECTION", sectionId);
          }
        })
        .catch((error) => console.log(error));
    },
    deleteProject(context) {
      const projId = context.state.currentProject.id;
      const api = context.state.api;
      api
        .deleteProject(projId)
        .then((isSuccess) => {
          if (isSuccess) {
            context.state.currentProject = {};
            context.commit("DELETE_PROJECT", projId);
          }
        })
        .catch((error) => console.log(error));
    },
    deleteLabel(context, labelId) {
      if (labelId === null || labelId === undefined) return;
      const api = context.state.api;
      api
        .deleteLabel(labelId)
        .then((isSuccess) => {
          if (isSuccess) {
            context.commit("DELETE_LABEL", labelId);
            context.dispatch("getAllTasks");
          }
        })
        .catch((error) => console.log(error));
    },
    updateTask(context, task) {
      if (
        task === null ||
        task === undefined ||
        task.id === null ||
        task.id === undefined ||
        task.id === "" ||
        task.info.content === ""
      )
        return;
      const api = context.state.api;
      api
        .updateTask(task.id, task.info)
        .then((isSuccess) => {
          if (isSuccess) {
            context.commit("DELETE_TASK", { id: task.id });
            context.dispatch("getTaskById", task.id);
          }
        })
        .catch((error) => console.log(error));
    },
    updateSection(context, section) {
      if (
        section === null ||
        section === undefined ||
        section.id === null ||
        section.id === undefined ||
        section.id === ""
      )
        return;
      const api = context.state.api;
      api
        .updateSection(section.id, section)
        .then((isSuccess) => {
          if (isSuccess) {
            context.commit("DELETE_SECTION", section.id);
            context.dispatch("getSectionById", section.id);
          }
        })
        .catch((error) => console.log(error));
    },
    updateCurrentProject(context, newData) {
      if (
        newData === undefined ||
        newData === null ||
        newData.name === "" ||
        newData.name === undefined ||
        newData.name === null ||
        newData.id === "" ||
        newData.id === undefined ||
        newData.id === null
      )
        return;
      const curProjId = context.state.currentProject.id;
      const api = this.state.api;

      api
        .updateProject(curProjId, newData)
        .then((isSuccess) => {
          console.log(isSuccess);
          context.dispatch("getCurrentProjectById", curProjId);
        })
        .catch((error) => console.log(error));
    },
    updateLabel(context, newData) {
      if (
        newData === null ||
        newData === undefined ||
        newData.id === null ||
        newData.id === undefined ||
        newData.id === "" ||
        newData.name === "" ||
        newData.name === undefined ||
        newData.name === null
      )
        return;
      const api = context.state.api;
      api
        .updateLabel(newData.id, newData)
        .then((isSuccess) => {
          if (isSuccess) {
            context.dispatch("getAllLabels");
            context.dispatch("getAllTasks");
          }
        })
        .catch((error) => console.log(error));
    },
    closeTasks(context) {
      if (
        context.state.selectedTasks === null ||
        context.state.selectedTasks.length < 1
      )
        return;
      context.state.selectedTasks.forEach((element) => {
        context.dispatch("closeTask", element);
      });
    },
    closeTask(context, task) {
      if (
        task === null ||
        task === undefined ||
        task.id === "" ||
        task.id === undefined ||
        task.id === null
      )
        return;
      const api = context.state.api;
      api
        .closeTask(task.id)
        .then((isSuccess) => {
          if (isSuccess) {
            context.commit("SET_HAS_CLOSED_TASKS", true);
            context.commit("DELETE_TASK_FROM_SELECTED", task);
            if (task.parentId === undefined || task.parentId === null)
              context.dispatch("deleteTask", task);
            else task.completed = true;
          }
        })
        .catch((error) => console.log(error));
    },
    reopenTasks(context) {
      context.state.tasks.forEach((el) => {
        if (el.completed === true) {
          context.dispatch("reopenTask", el);
        }
      });
    },
    reopenTask(context, task) {
      if (
        task === null ||
        task === undefined ||
        task.id === "" ||
        task.id === undefined ||
        task.id === null
      )
        return;
      const api = context.state.api;
      api
        .reopenTask(task.id)
        .then((isSuccess) => {
          if (isSuccess) {
            context.commit("SET_HAS_CLOSED_TASKS", false);
            task.completed = false;
          }
        })
        .catch((error) => console.log(error));
    },
  },
  modules: {},
});
