<template>
    <div class="d-flex min-vh-100">
      <!-- Sidebar -->
      <div class="sidebar bg-primary text-white p-3">
        <div class="sidebar-header mb-4 text-center">
          <h4 class="logo">✈️ BayNhanh Admin</h4>
        </div>
  
        <ul class="nav flex-column">
          <li class="nav-item mb-2">
            <router-link to="/admin/flights" class="nav-link text-white" exact-active-class="active">
              <i class="bi bi-airplane-engines me-2"></i>Quản lý chuyến bay
            </router-link>
          </li>
          <li class="nav-item mb-2">
            <router-link to="/admin/aircrafts" class="nav-link text-white" exact-active-class="active">
              <i class="bi bi-building-gear me-2"></i>Quản lý phi cơ
            </router-link>
          </li>
          
          <li class="nav-item mb-2">
          <router-link to="/admin/reports" class="nav-link text-white" exact-active-class="active">
            <i class="bi bi-bar-chart-line me-2"></i>Thống kê báo cáo
          </router-link>
        </li>
        <li class="nav-item mt-4">
          <router-link to="/" class="nav-link text-light">
            <i class="bi bi-house-door me-2"></i>Quay về trang chủ
          </router-link>
        </li>
      </ul>
    </div>

    <!-- Main Content -->
    <div class="flex-grow-1 p-4" style="background-color: #f8f9fa">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  width: 250px;
  min-height: 100vh;
  position: sticky;
  top: 0;
}

.logo {
  font-weight: bold;
}

.nav-link.active {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
}
</style>
