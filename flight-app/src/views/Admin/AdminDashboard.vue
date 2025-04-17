<template>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-2">
          <div class="list-group">
            <router-link to="/admin/flight-management" class="list-group-item list-group-item-action">Quản lý chuyến bay</router-link>
            <router-link to="/admin/aircraft-management" class="list-group-item list-group-item-action">Quản lý phi cơ</router-link>
            <router-link to="/admin/customer-management" class="list-group-item list-group-item-action">Quản lý khách hàng</router-link>
            <router-link to="/admin/statistics" class="list-group-item list-group-item-action">Thống kê báo cáo</router-link>
          </div>
        </div>
        <div class="col-md-10">
          <router-view></router-view> <!-- Nội dung thay đổi khi bấm vào menu -->
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  </script>
  