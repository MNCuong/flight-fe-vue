<template>
    <div class="container mt-5">
      <h2>Quản lý chuyến bay</h2>
      <button @click="addFlight" class="btn btn-primary">Thêm chuyến bay mới</button>
      <ul class="list-group mt-4">
        <li class="list-group-item" v-for="flight in flights" :key="flight.id">
          {{ flight.name }} - {{ flight.date }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import api from '../../services/api'
  
  const flights = ref([])
  
  onMounted(async () => {
    const response = await api.get('/flights')
    flights.value = response.data
  })
  
  const addFlight = () => {
    // Logic để thêm chuyến bay mới
  }
  </script>
  