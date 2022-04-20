import Vue from "vue";
import VueRouter from "vue-router";
import Auth from "../components/RedirectPage.vue";
import ProjectsList from "../components/ProjectsList.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AuthorizationView.vue"),
  },
  {
    path: "/auth",
    name: "auth",
    component: Auth,
  },
  {
    path: "/projects-list",
    name: "ProjectsList",
    component: ProjectsList,
    meta: {
      title: "Projects",
    },
    children: [
      {
        path: "calendar",
        name: "Calendar",
        meta: {
          title: "Calendar",
        },
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/CalendarView.vue"),
      },
      {
        path: "label-browser",
        name: "Labels",
        meta: {
          title: "Labels",
        },
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/LabelBrowserView.vue"),
      },
      {
        path: "project-browser",
        name: "Projects",
        meta: {
          title: "Projects",
        },
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/ProjectBrowserView.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
