<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Danh sách chuyến bay</h2>
    <div v-if="loading" class="text-center">Đang tải...</div>
    <div v-else>
      <div v-if="flights.length === 0" class="alert alert-warning">
        Không có chuyến bay nào.
      </div>
      <div v-else>
        <div v-for="(flight, index) in flights" :key="index" class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">{{ flight.flightDetails.number }} - {{ flight.airline.name }}</h5>
            <p class="card-text">
              <strong>Khởi hành:</strong> {{ formatDate(flight.departureTime) }} tại {{ flight.departureAirport.airport
              }} <br />
              <strong>Đến nơi:</strong> {{ formatDate(flight.arrivalTime) }} tại {{ flight.arrivalAirport.airport }}
              <br />
              <strong>Giá vé (Economy):</strong> {{ formatPrice(flight.priceEconomy) }} VND <br />
              <strong>Giá vé (Business):</strong> {{ formatPrice(flight.priceBusiness) }} VND
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import api from '../../services/api'

const flights = ref([])
const loading = ref(true)

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleString('vi-VN')
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN').format(price)
}

onMounted(async () => {
  try {
    const res = await api.get('/flights/all-flight')
    flights.value = res.data.data || []
  } catch (error) {
    console.error('Lỗi khi tải chuyến bay:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.card {
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
