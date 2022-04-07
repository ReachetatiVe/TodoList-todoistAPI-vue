import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '../components/RedirectPage.vue'
import Creator from "../components/TaskCreator.vue"
import ProjectsList from "../components/ProjectsList.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/AuthorizationView.vue'),
    // component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AuthorizationView.vue'),
  },
  {
    path: '/auth',
    name: 'auth',
    component: Auth,
  },
  {
    path: '/creator',
    name: 'creator',
    component: Creator,
  },
  {
    path: '/project-list',
    name: 'ProjectsList',
    component: ProjectsList
  }
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
