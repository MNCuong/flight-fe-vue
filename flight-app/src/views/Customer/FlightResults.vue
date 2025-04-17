<template>
    <div class="container-fluid mt-4">
        <div class="row">
            <!-- Form bên trái -->
            <div class="col-md-3">
                <div class="card p-3 shadow-sm">
                    <h5 class="mb-3">Tìm chuyến bay</h5>
                    <form @submit.prevent="searchFlights">
                        <div class="mb-3">
                            <label class="form-label">Nơi đi</label>
                            <input v-model="search.departure" type="text" class="form-control"
                                placeholder="VD: Hà Nội" />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Nơi đến</label>
                            <input v-model="search.destination" type="text" class="form-control"
                                placeholder="VD: TP.HCM" />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Ngày đi</label>
                            <input v-model="search.date" type="date" class="form-control" />
                        </div>
                        <button type="submit" class="btn btn-primary w-100">Tìm kiếm</button>
                    </form>
                </div>
            </div>

            <!-- Kết quả bên phải -->
            <div class="col-md-9">
                <div class="row">
                    <div class="col-12">
                        <h5>Kết quả chuyến bay</h5>
                    </div>
                    <div class="col-12 mb-3" v-for="(flight, index) in flights" :key="index">
                        <div class="card p-3 shadow-sm">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 class="mb-1">{{ flight.airline.name }}</h6>
                                    <p class="mb-0">
                                        {{ flight.departureAirport.airport }} → {{ flight.arrivalAirport.airport }}
                                    </p>
                                    <small class="text-muted">
                                        Giờ đi: {{ formatTime(flight.departureTime) }} - 
                                        Giờ đến: {{ formatTime(flight.arrivalTime) }}
                                    </small>
                                </div>
                                <div class="text-end">
                                    <p class="fw-bold text-primary mb-1">{{ flight.priceEconomy.toLocaleString() }} VNĐ
                                    </p>
                                    <button class="btn btn-outline-primary btn-sm" @click="toggleDetails(index)">
                                        {{ flight.showDetails ? 'Ẩn chi tiết' : 'Xem chi tiết' }}
                                    </button>
                                    <button class="btn btn-success btn-sm ms-2">Đặt vé</button>
                                </div>
                            </div>

                            <!-- Chi tiết chuyến bay -->
                            <div v-if="flight.showDetails" class="mt-3">
                                <p><strong>Hãng bay (chia sẻ):</strong> {{ flight.flightDetails.codeshared.airlineName }} ({{ flight.flightDetails.codeshared.flightNumber }})</p>
                                <p><strong>Số hiệu:</strong> {{ flight.flightDetails.number }}</p>
                                <p><strong>Máy bay:</strong> {{ flight.aircraft.type }} - {{ flight.aircraft.registration }}</p>
                                <p><strong>Giá Business:</strong> {{ flight.priceBusiness.toLocaleString() }} VNĐ</p>
                            </div>
                        </div>
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
            search: {
                departure: '',
                destination: '',
                date: ''
            },
            flights: []
        };
    },
    methods: {
        async searchFlights() {
            try {
                const response = await api.get('/flights/search-flight', {
                    params: {
                        departure: this.search.departure,
                        destination: this.search.destination,
                        date: this.search.date,
                    }
                });
                
                const result = response.data;
                if (result.code === '200') {
                    this.flights = result.data.map(flight => ({
                        ...flight,
                        showDetails: false
                    }));
                } else {
                    this.flights = [];
                    alert('Không tìm thấy chuyến bay nào!');
                }
            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
            }
        },
        toggleDetails(index) {
            this.flights[index].showDetails = !this.flights[index].showDetails;
        }
    },
    formatTime(datetime) {
        return new Date(datetime).toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
        });
    },

    created() {
        this.search.departure = this.$route.query.departure || '';
        this.search.destination = this.$route.query.destination || '';
        this.search.date = this.$route.query.date || '';

        if (this.search.departure && this.search.destination && this.search.date) {
            this.searchFlights();
        }
    }
};
</script>

<style scoped>
/* Thêm CSS tùy chỉnh ở đây */
</style>
