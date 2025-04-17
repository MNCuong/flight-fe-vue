<template>
    <el-menu default-active="1" class="sidebar">
      <el-menu-item index="1">Dashboard</el-menu-item>
      <el-menu-item index="2">Users</el-menu-item>
      <el-menu-item index="3">Settings</el-menu-item>
    </el-menu>
  </template>
  
  <script>
  export default {
    name: 'Sidebar'
  }
  </script>
  
  <style scoped>
  .sidebar {
    width: 200px;
    height: 100vh;
    background-color: #f4f4f4;
  }
  </style>
  