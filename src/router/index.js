import { createRouter, createWebHistory } from "vue-router";
import Login from '@/components/auth/Login.vue';
import Dashboard from '@/components/dashboard/Dashboard.vue';
import ListCheckIns from '@/components/checkins/ListCheckIns.vue';
import ListOldBills from '@/components/checkins/ListOldBills.vue';
import ShowCheckIn from '@/components/checkins/ShowCheckIn.vue';
import ShowBilling from '@/components/checkins/ShowBilling.vue';
import ListBookings from '@/components/bookings/ListBookings.vue';
import ListTodaysArrivals from '@/components/bookings/ListTodaysArrivals.vue';
import ListCancelledBookings from '@/components/bookings/ListCancelledBookings.vue';
import ShowBooking from '@/components/bookings/ShowBooking.vue';
import ListReports from '@/components/reports/ListReports.vue';
import ShowRoomStatus from '@/components/room-status/ShowRoomStatus.vue';
import { useStorage } from '@/services/storage.js';

const routes = [
  { path: '/', component: Dashboard },
  { path: '/login', component: Login },
  { path: '/check-ins', component: ListCheckIns },
  { path: '/check-ins/:id', component: ShowCheckIn },
  { path: '/check-ins/:id/billing', component: ShowBilling },
  { path: '/old-bills', component: ListOldBills },
  { path: '/bookings', component: ListBookings },
  { path: '/todays-arrivals', component: ListTodaysArrivals },
  { path: '/cancelled-bookings', component: ListCancelledBookings },
  { path: '/bookings/:id', component: ShowBooking },
  { path: '/bookings/:id', component: ShowBooking },
  { path: '/reports', component: ListReports },
  { path: '/room-status', component: ShowRoomStatus },
]

export const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

let storage = useStorage();

router.beforeEach(async (to, from) => {
  let token = await storage.get('token');

  if (! token && to.path !== '/login') {
    return '/login';
  }
})