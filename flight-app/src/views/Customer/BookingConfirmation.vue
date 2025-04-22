<template>
    <div class="container-fluid mt-4 px-4">
        <div class="row">
            <div class="col-md-8">
                <div class="card shadow-sm border-0 p-4 mb-3">
                    <h6 class="card-title text-primary">Thông tin chuyến bay</h6>
                    <div class="flight-info">
                        <strong>Hãng bay:</strong> {{ flight.airline.name }} - {{ flight.flightDetails.number }} <br>
                        <strong>Giờ đi:</strong> {{ formatTime(flight.departureTime) }} <br>
                        <strong>Giờ đến:</strong> {{ formatTime(flight.arrivalTime) }} <br>
                        <strong>Giá Economy:</strong> {{ flight.priceEconomy.toLocaleString() }} VNĐ <br>
                        <strong>Giá Business:</strong> {{ flight.priceBusiness.toLocaleString() }} VNĐ <br>
                    </div>
                </div>

                <!-- Hiển thị thông tin hành khách -->
                <div class="mt-4">
                    <h6 class="text-primary">Thông tin hành khách</h6>
                    <div class="passenger-container">
                        <div v-for="seat in selectedSeats" :key="seat.number" class="passenger-info">
                            <p><strong>Ghế {{ seat.number }}</strong></p>
                            <span>Loại vé: {{ passengerInfos[seat.number].ticketType }}</span>

                            <p><strong>Họ tên:</strong> {{ passengerInfos[seat.number].fullName }}</p>
                            <p><strong>Ngày sinh:</strong> {{ passengerInfos[seat.number].dateOfBirth }}</p>
                            <p><strong>Giới tính:</strong> {{ passengerInfos[seat.number].gender }}</p>
                            <p><strong>Quốc tịch:</strong> {{ passengerInfos[seat.number].nationality }}</p>
                            <p><strong>Mã cá nhân:</strong> {{ passengerInfos[seat.number].personalCode }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Thông tin tổng cộng và nút xác nhận -->
            <div class="col-md-4">
                <div class="card shadow-sm border-0 p-4 mb-3">
                    <h4 class="card-title text-primary">Xác nhận thông tin</h4>
                    <p><strong>Số lượng vé Economy:</strong> {{ getTicketCount('economy') }}</p>
                    <p><strong>Số lượng vé Business:</strong> {{ getTicketCount('business') }}</p>
                    <p><strong>Tổng tiền:</strong> {{ totalAmount.toLocaleString() }} VNĐ</p>
                    <div class="d-flex justify-content-end">
                        <button class="btn btn-outline-primary btn-lg" @click="goBack">Quay lại</button>
                        <button class="btn btn-success btn-lg" @click="confirmBooking">Xác nhận</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '../../services/api'

export default {
    data() {
        return {
            flight: {},
            selectedSeats: [],
            passengerInfos: {},
            totalAmount: 0,
        }
    },
    methods: {
        async fetchFlightDetails() {
            try {
                const response = await api.get(`/flights/flight/${this.$route.params.id}`)
                this.flight = response.data.data
                this.calculateTotalAmount()
            } catch (error) {
                console.error('Lỗi khi lấy thông tin chuyến bay:', error)
            }
        },
        formatTime(datetime) {
            return new Date(datetime).toLocaleTimeString('vi-VN', {
                hour: '2-digit',
                minute: '2-digit'
            })
        },
        goBack() {
            this.$router.push(`/booking/${this.$route.params.id}`);
        },
        calculateTotalAmount() {
            let economyCount = this.getTicketCount('economy')
            let businessCount = this.getTicketCount('business')

            this.totalAmount = (economyCount * this.flight.priceEconomy) +
                (businessCount * this.flight.priceBusiness)
        },
        async confirmBooking() {
            try {
                const paymentPayload = {
                    amount_raw: this.totalAmount.toString(),
                    bankCode: '',
                    bookingId: this.flight.id.toString(),
                    typeService: 'PLANE',
                };

                const response = await api.post('/payment/pay', paymentPayload);
                localStorage.setItem('flight', JSON.stringify(this.flight));
                localStorage.setItem('totalAmount', this.totalAmount.toString());

                if (response.data && response.data.data) {
                    window.location.href = response.data.data;
                } else {
                    alert('Không nhận được URL thanh toán từ VNPAY');
                }
            } catch (error) {
                console.error('Lỗi khi gọi thanh toán:', error);
                alert('Thanh toán thất bại. Vui lòng thử lại.');
            }
        },
        getTicketCount(ticketType) {
            return this.selectedSeats.filter(seat => {
                const type = seat.type?.toLowerCase()
                return (ticketType === 'economy' && type === 'economic') ||
                    (ticketType === 'business' && type === 'business')
            }).length
        }


    },
    mounted() {
       
        // console.log("Selected Seats:", selectedSeats);
        console.log("Passenger Infos:", passengerInfos);
        
    }
    ,
    created() {
        this.selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')) || [];
        this.passengerInfos = JSON.parse(localStorage.getItem('passengerInfos')) || {};
     
        if (this.selectedSeats.length === 0) {
            alert('Không có ghế nào được chọn!')
            this.$router.push('/seat-selection')
            return
        }
        this.fetchFlightDetails()
    }
}
</script>

<style lang="scss">
.container-fluid {
    max-width: 1200px;
    margin: 0 auto;
}

.card {
    border-radius: 8px;
}

.flight-info {
    font-size: 1rem;
    line-height: 1.6;
}

.passenger-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: start;
}

.passenger-info {
    background-color: #f9f9f9;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    width: calc(33.33% - 20px);
    /* 3 ô trong mỗi hàng */
    box-sizing: border-box;
}

.passenger-info p {
    margin: 5px 0;
}

.text-primary {
    color: #007bff !important;
}

.mt-4 {
    margin-top: 1.5rem !important;
}

.btn-lg {
    font-size: 1.1rem;
    padding: 10px 20px;
}

@media (max-width: 768px) {
    .passenger-info {
        width: 100%;
    }
}
</style>
