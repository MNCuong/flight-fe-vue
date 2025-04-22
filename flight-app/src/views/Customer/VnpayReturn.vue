<template>
  <div class="text-center mt-10">
    <div v-if="success">
      <h2 class="text-green-500 text-2xl font-bold">Thanh toán thành công!</h2>
      <p class="mt-2">Cảm ơn bạn đã đặt vé. Mã giao dịch: {{ transactionId }}</p>
    </div>
    <div v-else>
      <h2 class="text-red-500 text-2xl font-bold">Thanh toán thất bại!</h2>
      <p class="mt-2">Vui lòng thử lại hoặc liên hệ hỗ trợ.</p>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import api from '../../services/api';

const success = ref(false);
const transactionId = ref('');

onMounted(async () => {
  const query = useRoute().query;

  if (query.vnp_ResponseCode === '00') {
    success.value = true;
    transactionId.value = query.vnp_TransactionNo;

    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')) || [];
    const passengerInfos = JSON.parse(localStorage.getItem('passengerInfos')) || {};
    const flight = JSON.parse(localStorage.getItem('flight')) || {};
    const totalAmount = parseFloat(localStorage.getItem('totalAmount')) || 0;
    // Log toàn bộ dữ liệu để kiểm tra
    console.log("Selected Seats:", selectedSeats);
    console.log("Passenger Infos:", passengerInfos);
    console.log("Flight Info:", flight);
    console.log("Total Amount:", totalAmount);
    // Build payload khớp với FlightBookingRequest
    const flightBookingRequest = {
      transactionId: transactionId.value,
      userProfileFlight: selectedSeats.map(seat => ({
        ...passengerInfos[seat.number]
      })),
      flightCode: flight.code,
      aircraftModel: flight.aircraftModel,
      seatNumber: selectedSeats.map(seat => seat.number),
      seatTotal: selectedSeats.length,
      totalPrice: totalAmount,
      flightDate: new Date(flight.departureTime).toLocaleDateString('en-CA'),
      departureTime: new Date(flight.departureTime).toLocaleTimeString('en-GB', { hour12: false }),
      arrivalTime: new Date(flight.arrivalTime).toLocaleTimeString('en-GB', { hour12: false }) 
    };

    try {
      await api.post('/customer/flight/flight-booking', flightBookingRequest);
      localStorage.removeItem('selectedSeats');
      localStorage.removeItem('passengerInfos');
      localStorage.removeItem('flight');
      localStorage.removeItem('totalAmount');
    } catch (err) {
      console.error("Lỗi khi gửi yêu cầu đặt vé:", err);
    }

  } else {
    success.value = false;
  }
});
</script>