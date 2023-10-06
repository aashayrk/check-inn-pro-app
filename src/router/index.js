import { createRouter, createWebHistory } from "vue-router";
import Login from '@/components/auth/Login.vue';
import Dashboard from '@/components/dashboard/Dashboard.vue';
import ListCheckIns from '@/components/checkins/ListCheckIns.vue';
import ListOldBills from '@/components/checkins/ListOldBills.vue';
import ShowCheckIn from '@/components/checkins/ShowCheckIn.vue';
import ListBookings from '@/components/bookings/ListBookings.vue';
import ShowBooking from '@/components/bookings/ShowBooking.vue';

const routes = [
  {path: '/', component: Dashboard},
  {path: '/login', component: Login},
  {path: '/check-ins', component: ListCheckIns},
  {path: '/check-ins/:id', component: ShowCheckIn},
  {path: '/old-bills', component: ListOldBills},
  {path: '/bookings', component: ListBookings},
  {path: '/bookings/:id', component: ShowBooking},
]

export const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})