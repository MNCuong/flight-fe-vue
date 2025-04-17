import { createRouter, createWebHistory } from 'vue-router'
// import Home from '../views/Customer/Home.vue'
import LoginPage from '../views/Customer/LoginPage.vue'
import RegisterPage from '../views/Customer/RegisterPage.vue'
import FlightsPage from '../views/Customer/FlightsPage.vue'
import FlightByAirlinePage from '../views/Admin/FlightByAirlinePage.vue'

import HomePage from '../layouts/CustomerLayout.vue'


// Customer Pages
import Home from '../views/Customer/Home.vue'
import AirlinesPage from '../views/Customer/AirlinesPage.vue'
import DestinationsPage from '../views/Customer/DestinationsPage.vue'
import UserProfile from '../views/Customer/UserProfile.vue'
// import ForgotPassword from '../views/Customer/ForgotPassword.vue'
// import FlightsListPage from '../views/Customer/FlightsListPage.vue'
// import FlightDetailPage from '../views/Customer/FlightDetailPage.vue'
// import BookingPage from '../views/Customer/BookingPage.vue'
// import PaymentPage from '../views/Customer/PaymentPage.vue'
// import BookingHistoryPage from '../views/Customer/BookingHistoryPage.vue'

// Admin Pages
import AdminDashboard from '../views/Admin/AdminDashboard.vue'
import FlightManagement from '../views/Admin/FlightManagement.vue'
// import AircraftManagement from '../views/Admin/AircraftManagement.vue'
// import CustomerManagement from '../views/Admin/CustomerManagement.vue'
// import StatisticsPage from '../views/Admin/StatisticsPage.vue'

const routes = [
  { path: '/', name: 'Home', component: Home, meta: { title: 'Trang chủ' } },
  { path: '/login', name: 'Login', component: LoginPage, meta: { title: 'Đăng nhập' } },
  { path: '/register', name: 'Register', component: RegisterPage, meta: { title: 'Đăng ký' } },
  { path: '/flights', name: 'Flights', component: FlightsPage, meta: { title: 'Chuyến bay' } },
  { path: '/airlines', component: AirlinesPage, meta: { title: 'Các hãng hàng không' } },
  { path: '/destinations', component: DestinationsPage, meta: { title: 'Các điểm đến' } },
  { path: '/profile', component: UserProfile, meta: { title: 'Trang cá nhân' } },

  { path: '/admin', component: () => import('@/layouts/AdminLayout.vue'), meta: { title: 'Trang quản trị' ,requiresAuth: true, roles: ['ADMIN']}, children: [
    { path: '', component: AdminDashboard, meta: { title: 'Bảng điều khiển' } },
    { path: 'flight-management', component: FlightManagement, meta: { title: 'Quản lý chuyến bay' } },
    { path: 'flight-by-airline-management', name: 'FlightByAirline', component: FlightByAirlinePage, meta: { title: 'Quản lý chuyến bay theo hãng' } },
  ]},
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
  // Cập nhật tiêu đề trang
  if (to.meta.title) {
    document.title = to.meta.title;
  }

  // Kiểm tra nếu route yêu cầu xác thực
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refresh_token');

    // Nếu không có token hoặc refreshToken, chuyển hướng đến trang đăng nhập
    if (!token || !refreshToken) {
      return next({ path: '/login' });
    }

    try {
      const decoded = jwt_decode(token);
      const roles = decoded.roles || [];

      // Kiểm tra nếu người dùng có vai trò phù hợp
      if (to.meta.roles.some(role => roles.includes(role))) {
        return next();
      } else {
        return next({ path: '/' }); // Chuyển hướng đến trang chủ nếu không có quyền
      }
    } catch (error) {
      console.error('Lỗi giải mã token:', error);
      return next({ path: '/' });
    }
  } else {
    next(); // Nếu không yêu cầu xác thực, tiếp tục điều hướng
  }
});


  