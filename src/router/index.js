import { createRouter, createWebHistory } from "vue-router";
import Login from '@/components/auth/Login.vue';
import Dashboard from '@/components/dashboard/Dashboard.vue';
import ListCheckIns from '@/components/checkins/ListCheckIns.vue';
import ListOldBills from '@/components/checkins/ListOldBills.vue';
import ShowCheckIn from '@/components/checkins/ShowCheckIn.vue';
import ListBookings from '@/components/bookings/ListBookings.vue';
import ShowBooking from '@/components/bookings/ShowBooking.vue';
import ListReports from '@/components/reports/ListReports.vue';
import ShowRoomStatus from '@/components/room-status/ShowRoomStatus.vue';

const routes = [
  {path: '/', component: Dashboard},
  {path: '/login', component: Login},
  {path: '/check-ins', component: ListCheckIns},
  {path: '/check-ins/:id', component: ShowCheckIn},
  {path: '/old-bills', component: ListOldBills},
  {path: '/bookings', component: ListBookings},
  {path: '/bookings/:id', component: ShowBooking},
  {path: '/reports', component: ListReports},
  {path: '/room-status', component: ShowRoomStatus},
]

export const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})