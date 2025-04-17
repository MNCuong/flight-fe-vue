<template>
    <el-card class="p-4">
      <h3 class="text-lg font-semibold mb-4">Tìm chuyến bay</h3>
      <el-form :model="search" label-position="top" @submit.prevent="onSearch">
        <el-form-item label="Nơi đi">
          <el-input v-model="search.departure" placeholder="TP. Hồ Chí Minh"></el-input>
        </el-form-item>
        <el-form-item label="Nơi đến">
          <el-input v-model="search.destination" placeholder="Hà Nội"></el-input>
        </el-form-item>
        <el-form-item label="Ngày đi">
          <el-date-picker v-model="search.date" type="date" placeholder="Chọn ngày"></el-date-picker>
        </el-form-item>
        <el-button type="primary" @click="onSearch">Tìm chuyến bay</el-button>
      </el-form>
    </el-card>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  const search = ref({
    departure: '',
    destination: '',
    date: '',
  })
  
  const onSearch = () => {
    router.push({
      name: 'FlightResults',
      query: { ...search.value },
    })
  }
  </script>
  