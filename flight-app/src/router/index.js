import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Customer/Home.vue';
import FlightResults from '../views/Customer/FlightResults.vue';
import LoginPage from '../views/Customer/LoginPage.vue';
import RegisterPage from '../views/Customer/RegisterPage.vue';
import FlightsPage from '../views/Customer/FlightsPage.vue';
import AdminDashboard from '../views/Admin/AdminDashboard.vue';
import FlightManagement from '../views/Admin/FlightManagement.vue';
import AircraftManagement from '../views/Admin/AircraftManagement.vue';
import AircraftManagementAdd from '../views/Admin/AircraftAddView.vue';
import AircraftManagementEdit from '../views/Admin/AircraftEditView.vue';
import BookingPage from '../views/Customer/BookingPage.vue';
import FlightByAirlinePage from '../views/Admin/FlightByAirlinePage.vue';
import demopage from '../views/Customer/demo.vue';
import BookingConfirmation from '@/views/Customer/BookingConfirmation.vue'

const routes = [
  { path: '/', component: Home, meta: { title: 'Trang chủ' } },
  { path: '/login', name: 'Login', component: LoginPage, meta: { title: 'Đăng nhập' } },
  { path: '/register', name: 'Register', component: RegisterPage, meta: { title: 'Đăng ký' } },
  { path: '/flights', name: 'FlightResults', component: FlightResults, meta: { title: 'Chuyến bay' } },
  { path: '/flights-page', name: 'FlightsPage', component: FlightsPage, meta: { title: 'Chuyến bay' } },
  { path: '/demopage', name: 'demopage', component: demopage, meta: { title: 'demo' } },
  {
    path: '/booking-confirmation/:id',
    name: 'BookingConfirmation',
    component: BookingConfirmation
  },
  {
    path: '/vnpay-return',
    name: 'VnpayReturn',
    component: () => import('@/views/Customer/VnpayReturn.vue')
  }
  ,
  {
    path: '/booking/:id',
    name: 'BookingPage',
    component: BookingPage, meta: { title: 'Đặt vé' }
  },


  {
    path: '/admin', component: () => import('@/layouts/AdminLayout.vue'), meta: { title: 'Trang quản trị', requiresAuth: true, roles: ['ADMIN'] }, children: [
      { path: '', component: AdminDashboard, meta: { title: 'Bảng điều khiển' } },
      { path: 'flight-management', component: FlightManagement, meta: { title: 'Quản lý chuyến bay' } },
      { path: 'aircraft-management', component: AircraftManagement, meta: { title: 'Quản lý Phi cơ' } },
      {
        path: '/aircraft-management/add',
        component: AircraftManagementAdd,
        meta: { title: 'Thêm mới phi cơ' }
      },
      {
        path: '/aircraft-management/edit/:id',
        component: AircraftManagementEdit,
        meta: { title: 'Chỉnh sửa phi cơ' },
      },

      { path: 'flight-by-airline-management', name: 'FlightByAirline', component: FlightByAirlinePage, meta: { title: 'Quản lý chuyến bay theo hãng' } },
    ]
  },
];








const router = createRouter({
  history: createWebHistory('/flightapp/'),
  routes,
})

export default router
import { jwtDecode } from 'jwt-decode';

router.beforeEach((to) => {
  const title = to.meta.title || 'Flights App';
  document.title = title;
});
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refresh_token');
    if (!token || !refreshToken) {
      return next({ path: '/login' });
    }

    try {
      const decoded = jwtDecode(token);
      const roles = decoded.roles || [];
      if (to.meta.roles.some(role => roles.includes(role))) {
        return next();
      } else {
        return next({ path: '/' });
      }
    } catch (error) {
      console.error('Lỗi giải mã token:', error);
      return next({ path: '/' });
    }
  } else {
    next();
  }
});


