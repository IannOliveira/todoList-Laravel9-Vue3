import { createRouter, createWebHistory } from 'vue-router'
import LayoutAuth from "@/layouts/Auth.vue";
import LayoutDefault from "@/layouts/Default.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import VerifyEmail from "@/views/VerifyEmail.vue";
import ForgotPassword from "@/views/ForgotPassword.vue";
import ResetPassword from "@/views/ResetPassword.vue";
import Home from "@/views/Home.vue";
import Guard from "@/service/middleware.js";
import Profile from "@/views/Profile.vue";
import Logout from "@/views/Logout.vue";
import TodoTasks from "@/views/TodoTasks.vue";

const routes = [
  {
    path: '/', component: LayoutDefault,
    beforeEnter: Guard.redirectIfNotAuthenticated,
    children: [
      { path: '', name: 'index', component: Home},
      { path: 'perfil', name: 'profile', component: Profile},
      { path: 'todo/:id', name: 'todo-tasks', component: TodoTasks},
    ],
  },
  {
    path: '/login', component: LayoutAuth,
    beforeEnter: Guard.redirectIfAuthenticated,
    children: [
      { path: '', name: 'login', component: Login},
    ],
  },
  {
    path: '/logout', component: LayoutAuth,
    children: [
      { path: '', name: 'logout', component: Logout },
    ],
  },
  {
    path: '/registro', component: LayoutAuth,
    children: [
      { path: '', name: 'register', component: Register},
    ],
  },
  {
    path: '/verificar-email', component: LayoutAuth,
    children: [
      { path: '', name: 'verifyEmail', component: VerifyEmail},
    ],
  },
  {
    path: '/esqueci-senha', component: LayoutAuth,
    children: [
      { path: '', name: 'forgotPassword', component: ForgotPassword},
    ],
  },
  {
    path: '/recuperar-senha', component: LayoutAuth,
    children: [
      { path: '', name: 'resetPassword', component: ResetPassword},
    ],
  },


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
