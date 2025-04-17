<template>
  <div>
    <h2>Danh sách chuyến bay</h2>
    <ul>
      <li v-for="flight in flights" :key="flight.id">
        {{ flight.name }} - {{ flight.departure }} -> {{ flight.destination }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const flights = ref([])

onMounted(async () => {
  try {
    const res = await api.get('/flights') // endpoint thật bạn thay vào
    flights.value = res.data
  } catch (err) {
    alert('Lỗi khi tải chuyến bay')
  }
})
</script>
