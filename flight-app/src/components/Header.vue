<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand">✈️ BayNhanh</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
  
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link" exact-active-class="active">Trang chủ</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/flights" class="nav-link" exact-active-class="active">Danh sách chuyến bay</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/destinations" class="nav-link" exact-active-class="active">Địa điểm du lịch</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/airlines" class="nav-link" exact-active-class="active">Hãng bay</router-link>
            </li>
  
            <!-- Nếu chưa login -->
            <li class="nav-item" v-if="!isLoggedIn">
              <router-link to="/login" class="nav-link">Đăng nhập / Đăng ký</router-link>
            </li>
  
            <!-- Nếu đã login -->
            <li class="nav-item dropdown" v-else>
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                <i class="bi bi-person-circle fs-5"></i>
              </a>
              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <router-link class="dropdown-item" to="/booking-history">Lịch sử đặt vé</router-link>
                </li>
                <li>
                  <router-link class="dropdown-item" to="/profile">Thay đổi thông tin</router-link>
                </li>
                <li>
                  <button class="dropdown-item text-danger" @click="logout">Đăng xuất</button>
                </li>
              </ul>
            </li>
  
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const isLoggedIn = ref(false)
  
  onMounted(() => {
    const token = localStorage.getItem('token')
    isLoggedIn.value = !!token
  })
  
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refresh_token');
    window.location.href = '/' // hoặc reload nếu cần
  }
  </script>
  
  <style scoped>
  .navbar-brand {
    font-weight: bold;
    font-size: 1.5rem;
  }
  .nav-link.active {
    font-weight: bold;
    text-decoration: underline;
  }
  </style>
  