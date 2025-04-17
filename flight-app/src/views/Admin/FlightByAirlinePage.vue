<template>
  <div class="container mt-4">
    <h2 class="mb-4">Danh sách chuyến bay</h2>

    <div v-if="flights.length === 0">Không có chuyến bay nào.</div>

    <div v-for="(flight, index) in flights" :key="index" class="card mb-3">
      <div class="card-body">
        <h5 class="card-title">{{ flight.flightDetails.number }} - {{ flight.airline.name }}</h5>
        <p class="card-text">
          ✈️ Từ: <strong>{{ flight.departureAirport.airport }}</strong><br />
          🛬 Đến: <strong>{{ flight.arrivalAirport.airport }}</strong><br />
          🕑 Thời gian khởi hành: {{ formatDateTime(flight.departureTime) }}<br />
          🕑 Thời gian đến: {{ formatDateTime(flight.arrivalTime) }}<br />
          💺 Giá Economy: {{ formatCurrency(flight.priceEconomy) }}<br />
          💼 Giá Business: {{ formatCurrency(flight.priceBusiness) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../../services/api'
import { useRouter } from 'vue-router'

const flights = ref([])
//   const router = useRouter()

const getFlights = async () => {
  try {
    const res = await api.get('/flights/all-flight-by-airline')
    if (res.data && res.data.code === '200') {
      flights.value = res.data.data
    } else {
      console.error('Không nhận được danh sách chuyến bay hợp lệ.')
    }
  } catch (error) {
    console.error('Lỗi khi gọi API:', error)
  }
}

const formatDateTime = (dateStr) => {
  const d = new Date(dateStr)
  return d.toLocaleString('vi-VN')
}

const formatCurrency = (val) => {
  return val.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
}

// Gọi API khi trang được mounted
onMounted(() => {
  getFlights()
})
</script>

<style scoped>
.card {
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>