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
    tasksInCurrentSection: [],
    currentProject: {},
    selectedProject: {},
    selectedTasks: [],
    closedTasks: [],
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
    GET_TASKS: (state) => {
      return state.tasks;
    },
    GET_CURR_PROJECT: (state) => {
      return state.currentProject;
    },
    GET_SELECTED_PROJECT: (state) => {
      return state.selectedProject;
    },
    GET_COLORS: (state) => {
      return state.colors;
    },
    GET_SELECTED_TASKS: (state) => {
      return state.selectedTasks;
    },
    GET_CLOSED_TASKS: (state) => {
      return state.closedTasks;
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
    SET_CURRENT_PROJECT: (state, payload) => {
      if (payload === null || payload === undefined) return;
      state.currentProject = payload;
    },
    SET_SECTIONS: (state, payload) => {
      if (Array.isArray(payload))
        payload.forEach((element) => {
          state.sections.push(element);
        });
      else state.sections.push(payload);
    },
    SET_TASKS: (state, payload) => {
      if (Array.isArray(payload))
        payload.forEach((element) => {
          state.tasks.push(element);
        });
      else state.tasks.push(payload);
    },
    SET_TASKS_IN_CURRENT_SECTION: (state, payload) => {
      if (Array.isArray(payload))
        payload.forEach((element) => {
          state.tasksInCurrentSection.push(element);
        });
      else state.tasksInCurrentSection.push(payload);
    },
    SET_TASK_TO_SELECTED: (state, payload) => {
      console.log("setSelected");
      console.log(payload);
      if (Array.isArray(payload))
        payload.forEach((element) => {
          state.selectedTasks.push(element);
        });
      else state.selectedTasks.push(payload);
    },
    SET_TASK_TO_CLOSED: (state, payload) => {
      state.closedTasks.push(payload);
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
    //! рекурсивное удаление
    DELETE_TASK: (state, payload) => {
      //просто удаляет задачу по id в массиве
      state.tasks = state.tasks.filter((el) => {
        return el.id !== payload.id;
      });
    },
    DELETE_TASK_FROM_SELECTED: (state, payload) => {
      state.selectedTasks = state.selectedTasks.filter((el) => {
        return el.id !== payload.id;
      });
    },
    DELETE_TASK_FROM_CLOSED: (state, payload) => {
      state.closedTasks = state.closedTasks.filter((el) => {
        return el !== payload;
      });
    },
    CLEAR_SECTIONS: (state) => {
      state.sections = [];
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
          console.log("ACTION: get all tasks");
          context.commit("SET_TASKS", tasks);
        })
        .catch((error) => console.log(error));
    },
    getTasksInSection(context, sectionId) {
      if (sectionId === null || sectionId === undefined) return;
      context.state.tasksInCurrentSection = [];
      const api = context.state.api;
      api
        .getTasks()
        .then((tasks) => {
          context.commit("SET_TASKS_IN_CURRENT_SECTION", tasks);
        })
        .catch((error) => console.log(error));
    },
    getTaskById(context, taskId) {
      console.log("getTaskByID ДО ЗАПРОСА");
      console.log("taskID: " + taskId);
      const api = context.state.api;
      api
        .getTask(taskId)
        .then((task) => {
          console.log("getTaskByID внутри колбэка");
          console.log(task);
          context.commit("SET_TASKS", task);
        })
        .catch((error) => console.log(error));
    },
    getAllInfo(context) {
      context.dispatch("getAllProjects");
      context.dispatch("getAllSections");
      context.dispatch("getAllTasks");
    },
    addNewTask(context, taskInfo) {
      console.log("Add new task info (store):");
      console.log(taskInfo);
      if (
        taskInfo === null ||
        taskInfo === undefined ||
        taskInfo.content === null ||
        taskInfo.content === undefined
      )
        return;
      taskInfo.projectId = context.state.currentProject.id;
      const api = context.state.api;
      api
        .addTask(taskInfo)
        .then((task) => {
          console.log("taskfrom server (store):");
          console.log(task);
          context.commit("SET_TASKS", task);
        })
        .catch((error) => console.log(error));
    },
    addNewSection(context, sectionInfo) {
      if (
        sectionInfo === null ||
        sectionInfo === undefined ||
        sectionInfo.name === null ||
        sectionInfo.name === undefined
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
          // if (isSuccess) context.dispatch("getAllTasks");
          if (isSuccess) {
            let tasksFromParentSection = context.state.tasks.filter((el) => {
              return el.sectionId === taskInfo.sectionId;
            });
            context.dispatch("deleteTasksChildren", {
              items: tasksFromParentSection,
              item: taskInfo,
            });
          }
        })
        .catch((error) => console.log(error));
    },
    deleteTasksChildren(context, payload) {
      let items = payload.items;
      let item = payload.item;
      if (item.parentdId) {
        items = context.dispatch("deleteTasksChildren", {
          items: items,
          item: item[item.parentId],
        });
      }
      context.commit("DELETE_TASK", item);
      return items;
    },
    updateTask(context, task) {
      console.log("Action: updateTask");
      console.log(task);
      if (task.id === null || task.id === undefined || task.id === "") return;
      const api = context.state.api;
      api
        .updateTask(task.id, task.info)
        .then((isSuccess) => {
          if (isSuccess) {
            context.commit("DELETE_TASK", { id: task.id });
            context.dispatch("getTaskById", task.id);
            // context.commit("DELETE_TASK_ID_FROM_CLOSED", taskId);
            // console.log(isSuccess);
            // context.dispatch("getAllTasks");
          }
        })
        .catch((error) => console.log(error));
    },
    //! А че не синхронно? Слишком много раз грузит задачи, в update, reopen тоже
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
      const api = context.state.api;
      api
        .closeTask(task.id)
        .then((isSuccess) => {
          if (isSuccess) {
            context.commit("DELETE_TASK_FROM_SELECTED", task);
            context.state.tasks.forEach((el) => {
              if (el.id === task.id) {
                el.completed = true;
                //Удалить если корневая, закрыть если subtask
                if (task.parentId === undefined || task.parentId === null)
                  context.dispatch("deleteTask", task);
                else context.commit("SET_TASK_TO_CLOSED", task)
              }
            });
          }
        })
        .catch((error) => console.log(error));
    },
    reopenTasks(context) {
      context.state.closedTasks.forEach((el) => {
        context.dispatch("reopenTask", el);
      });
    },
    reopenTask(context, taskId) {
      const api = context.state.api;
      api
        .reopenTask(taskId)
        .then((isSuccess) => {
          if (isSuccess) {
            // context.dispatch("")
            context.dispatch("getAllTasks");
            context.commit("DELETE_TASK_ID_FROM_CLOSED", taskId);
            // context.dispatch("getTaskById", taskId);
          }
        })
        .catch((error) => console.log(error));
    },
  },
  modules: {},
});
