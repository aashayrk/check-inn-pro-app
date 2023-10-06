import { createRouter, createWebHistory } from "vue-router";
import Login from '@/components/auth/Login.vue';
import Dashboard from '@/components/dashboard/Dashboard.vue';
import ListCheckIns from '@/components/checkins/ListCheckIns.vue';
import ShowCheckIn from '@/components/checkins/ShowCheckIn.vue';

const routes = [
  {path: '/', component: Dashboard},
  {path: '/login', component: Login},
  {path: '/check-ins', component: ListCheckIns},
  {path: '/check-ins/:id', component: ShowCheckIn},
]

export const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})