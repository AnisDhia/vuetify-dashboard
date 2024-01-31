import Vue from 'vue'
import VueRouter from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import StudentsView from '../views/students/index.vue'
import TeachersView from '../views/teachers/index.vue'
import GroupsView from '../views/groups/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/students',
    name: 'students',
    component: StudentsView
  },
  {
    path: '/teachers',
    name: 'teachers',
    component: TeachersView
  },
  {
    path: '/groups',
    name: 'groups',
    component: GroupsView
  }
]

const router = new VueRouter({
  routes
})

export default router
