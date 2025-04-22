<template>
    <div>
        <table class="table">
            <thead>
                <tr>
                    <th>Mã chuyến</th>
                    <th>Hãng bay</th>
                    <th>Điểm đi</th>
                    <th>Điểm đến</th>
                    <th>Giờ đi</th>
                    <th>Giá (Economy)</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="flight in flightList" :key="flight.flightDetails.id">
                    <td>{{ flight.flightDetails.number }}</td>
                    <td>{{ flight.airline.name }}</td>
                    <td>{{ flight.departureAirport.airport }}</td>
                    <td>{{ flight.arrivalAirport.airport }}</td>
                    <td>{{ formatDate(flight.departureTime) }}</td>
                    <td>{{ formatPrice(flight.priceEconomy) }}</td>
                </tr>
            </tbody>
        </table>


        <div class="pagination">
            <button @click="prevPage" :disabled="page === 0">Trước</button>

            <span>Trang {{ page + 1 }} / {{ totalPages }}</span>

            <button @click="nextPage" :disabled="page >= totalPages - 1">Sau</button>

            <!-- Nút chọn trang theo số -->
            <div class="page-numbers">
                <button v-for="n in totalPages" :key="n" :class="{ active: page === n - 1 }" @click="goToPage(n - 1)">
                    {{ n }}
                </button>
            </div>
        </div>

    </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../../services/api';

const flightList = ref([]);
const page = ref(0);
const size = ref(3);
const totalPages = ref(0);
const selectedPage = ref(0);

const goToPage = (pageNum) => {
  page.value = pageNum;
  selectedPage.value = pageNum;
  fetchFlights();
};

const fetchFlights = async () => {
  try {
    const response = await api.get('/flights/list', {
      params: {
        page: page.value,
        size: size.value
      }
    });
    flightList.value = response.data.data.content;
    totalPages.value = response.data.data.totalPages;
  } catch (error) {
    console.error('Lỗi khi fetch flights:', error);
  }
};

const formatDate = (datetime) => {
  return new Date(datetime).toLocaleString('vi-VN');
};

const formatPrice = (price) => {
  return price.toLocaleString('vi-VN') + ' ₫';
};

const prevPage = () => {
  if (page.value > 0) {
    page.value--;
    selectedPage.value = page.value;
    fetchFlights();
  }
};

const nextPage = () => {
  if (page.value < totalPages.value - 1) {
    page.value++;
    selectedPage.value = page.value;
    fetchFlights();
  }
};

onMounted(() => {
  fetchFlights();
  selectedPage.value = page.value;
});
</script>

<style scoped>
.page-numbers {
    display: inline-flex;
    gap: 4px;
    margin-left: 16px;
}

.page-numbers button {
    padding: 5px 10px;
    border: 1px solid #ccc;
    background-color: white;
    cursor: pointer;
}

.page-numbers button.active {
    background-color: #007bff;
    color: white;
    font-weight: bold;
}
</style>