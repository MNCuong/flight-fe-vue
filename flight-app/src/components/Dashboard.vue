<template>
    <div class="dashboard">
      <el-row>
        <el-col :span="8">
          <el-card>
            <div class="card-content">
              <h3>Total Users</h3>
              <p>120</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card>
            <div class="card-content">
              <h3>Total Revenue</h3>
              <p>$2,340</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card>
            <div class="card-content">
              <h3>Active Orders</h3>
              <p>45</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Dashboard'
  }
  </script>
  
  <style scoped>
  .card-content {
    text-align: center;
  }
  </style>
  