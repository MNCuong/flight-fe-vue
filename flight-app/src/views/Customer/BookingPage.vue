<template>
    <div class="container-fluid mt-2 px-0">
        <div class="row">
            <!-- Thông tin chi tiết chuyến bay -->
            <div class="col-md-6">
                <div class="card p-3 shadow-sm">
                    <h6 v-if="flight.airline && flight.airline.name" class="mb-2">
                        {{ flight.airline.name }} - {{ flight.flightDetails.number }}
                    </h6>

                    <div class="row small">
                        <div class="col-md-6 mb-1" v-if="flight.aircraft">
                            <strong>Máy bay:</strong> {{ flight.aircraft.type }} - {{ flight.aircraft.registration }}
                        </div>
                        <div class="col-md-6 mb-1" v-if="flight.priceEconomy">
                            <strong>Giá Economic:</strong> {{ flight.priceEconomy.toLocaleString() }} VNĐ
                        </div>
                
                        <div class="col-md-6 mb-1" v-if="flight.departureTime">
                            <strong>Giờ đi:</strong> {{ formatTime(flight.departureTime) }}
                        </div>
                        <div class="col-md-6 mb-1" v-if="flight.priceEconomy">
                            <strong>Giá Business:</strong> {{ flight.priceBusiness.toLocaleString() }} VNĐ
                        </div>
                        <div class="col-md-6 mb-1" v-if="flight.arrivalTime">
                            <strong>Giờ đến:</strong> {{ formatTime(flight.arrivalTime) }}
                        </div>
                    </div>
                </div>
                <div class="mt-3">
                    <button class="btn"
                        :class="{ 'btn-primary': selectedSeats.length > 0, 'btn-warning': selectedSeats.length === 0 }"
                        @click="bookTickets">
                        Đặt vé
                    </button>
                </div>


                <div class="card p-3 shadow-sm mt-3">
                    <h5>Thông tin hành khách</h5>
                    <p v-if="selectedSeats.length === 0">Chưa chọn ghế nào.</p>
                    <div v-else>
                        <div v-for="seat in selectedSeats" :key="seat.number" class="card p-3 mt-2">
                            <h6>Thông tin hành khách cho ghế {{ seat.number }}</h6>
                            <p class="mb-2 text-muted">Loại ghế: {{ seat.type }}</p>
                            <div class="row">
                                <div class="form-group mb-2 col-md-6">
                                    <label>Họ tên</label>
                                    <input type="text" class="form-control"
                                        v-model="passengerInfos[seat.number].fullName" required>
                                </div>

                                <div class="form-group mb-2 col-md-6">
                                    <label>Ngày sinh</label>
                                    <input type="date" class="form-control"
                                        v-model="passengerInfos[seat.number].dateOfBirth" required>
                                </div>

                                <div class="form-group mb-2 col-md-6">
                                    <label>Giới tính</label>
                                    <select class="form-control" v-model="passengerInfos[seat.number].gender">
                                        <option value="Nam">Nam</option>
                                        <option value="Nữ">Nữ</option>
                                        <option value="Khác">Khác</option>
                                    </select>
                                </div>

                                <div class="form-group mb-2 col-md-6">
                                    <label>Quốc tịch</label>
                                    <input type="text" class="form-control"
                                        v-model="passengerInfos[seat.number].nationality">
                                </div>

                                <div class="form-group mb-2 col-md-6">
                                    <label>Mã quốc tịch</label>
                                    <input type="text" class="form-control"
                                        v-model="passengerInfos[seat.number].nationalityCode">
                                </div>

                                <div class="form-group mb-2 col-md-6">
                                    <label>Mã cá nhân</label>
                                    <input type="text" class="form-control"
                                        v-model="passengerInfos[seat.number].personalCode">
                                </div>

                                <div class="form-group mb-2 col-md-6">
                                    <label>Loại vé</label>
                                    <select class="form-control" v-model="passengerInfos[seat.number].ticketType"
                                        disabled>
                                        <option value="Economic">Economic</option>
                                        <option value="Business">Business</option>
                                    </select>
                                </div>


                            </div>
                        </div>

                    </div>
                </div>

            </div>

            <!-- Danh sách ghế ngồi -->
            <div class="col-md-6">
                <div class="card p-5 shadow-sm">
                    <h5>Danh sách ghế ngồi</h5>
                    <p v-if="flight.aircraft"><strong>Tổng số ghế:</strong> {{ flight.aircraft.seatCapacity }}</p>

                    <div v-if="paginatedSeats.length > 0">
                        <div v-for="(row, rowIndex) in paginatedSeats" :key="rowIndex" class="mb-3">
                            <div class="d-flex justify-content-between">
                                <!-- Nhóm 3 ghế bên trái -->
                                <div class="d-flex">
                                    <button
  v-for="seat in row.slice(0, 3)"
  :key="seat.number"
  class="btn btn-sm seat-button mx-1"
  :class="[
    seat.selected
      ? 'btn-seat-selected'
      : seat.isBooked
      ? 'btn-seat-booked'
      : seat.type === 'Business'
      ? 'btn-seat-business'
      : 'btn-seat-economic'
  ]"
  @click="toggleSeat(seat)"
>
  <i class="fas fa-chair me-1"></i> {{ seat.number }}
</button>

                                </div>
                                <!-- Nhóm 3 ghế bên phải -->
                                <div class="d-flex">
                                    <button
  v-for="seat in row.slice(3,6)"
  :key="seat.number"
  class="btn btn-sm seat-button mx-1"
  :class="[
    seat.selected
      ? 'btn-seat-selected'
      : seat.isBooked
      ? 'btn-seat-booked'
      : seat.type === 'Business'
      ? 'btn-seat-business'
      : 'btn-seat-economic'
  ]"
  @click="toggleSeat(seat)"
>
  <i class="fas fa-chair me-1"></i> {{ seat.number }}
</button>

                                </div>
                            </div>
                        </div>
                        <!-- Pagination -->
                        <div class="mt-3 d-flex justify-content-between">
                            <button class="btn btn-outline-primary" :disabled="currentPage === 1"
                                @click="changePage(currentPage - 1)">Trang trước</button>
                            <span>Trang {{ currentPage }} / {{ totalPages }}</span>
                            <button class="btn btn-outline-primary" :disabled="currentPage === totalPages"
                                @click="changePage(currentPage + 1)">Trang sau</button>
                        </div>
                    </div>

                    <div v-else>
                        <p>Không có ghế nào để hiển thị.</p>
                    </div>
                </div>
                <ErrorModal ref="errorModal" />

            </div>
        </div>


    </div>
</template>

<script>
import api from '../../services/api'
import ErrorModal from '../../components/ErrorModal.vue'

export default {
    components: {
        ErrorModal
    },
    data() {
        return {
            flight: {},
            seatLayout: [],
            selectedSeats: [],
            currentPage: 1,
            seatsPerPage: 18,
            passengerInfos: {},
        }
    },
    methods: {
        async bookTickets() {
            if (this.selectedSeats.length === 0) {
                this.$refs.errorModal.openModal('Vui lòng chọn ít nhất 1 ghế!');
                return;
            }

            localStorage.setItem('selectedSeats', JSON.stringify(this.selectedSeats))
            localStorage.setItem('passengerInfos', JSON.stringify(this.passengerInfos))

            console.log(JSON.parse(localStorage.getItem('selectedSeats')), JSON.parse(localStorage.getItem('passengerInfos')))
            if (JSON.parse(localStorage.getItem('selectedSeats')).length === 0) {
                alert('Không có ghế nào được chọn!')
                // this.$router.push('/seat-selection')
                return
            }
            this.$router.push(`/booking-confirmation/${this.flight.id}`);
        },

        async fetchFlightDetails() {
            try {
                const response = await api.get(`/flights/flight/${this.$route.params.id}`)
                this.flight = response.data.data

                const capacity = this.flight.aircraft.seatCapacity || 0
                const seatsPerRowLetters = ['A', 'B', 'C', 'D', 'E', 'F']
                const numRows = Math.ceil(capacity / seatsPerRowLetters.length)
                const layout = []

                // for (let i = 1; i <= numRows; i++) {
                //     const row = seatsPerRowLetters.map(letter => ({
                //         number: `${i}${letter}`,
                //         isBooked: false,
                //         selected: false
                //     }))
                //     layout.push(row)
                // }
                for (let i = 1; i <= numRows; i++) {
                    const row = seatsPerRowLetters.map(letter => {
                        const seatNumber = `${i}${letter}`;
                        const isBusiness = i >= 1 && i <= 5;

                        return {
                            number: seatNumber,
                            isBooked: false,
                            selected: false,
                            type: isBusiness ? 'Business' : 'Economic'
                        };
                    });
                    layout.push(row);
                }

                this.seatLayout = layout
            } catch (error) {
                console.error('Lỗi khi lấy thông tin chuyến bay:', error)
            }
        },
        toggleSeat(seat) {
            if (seat.isBooked) return
            if (seat.selected) {
                seat.selected = false
            } else {
                if (this.selectedSeats.length < 5) {
                    seat.selected = true;
                    this.passengerInfos[seat.number] = {
                        fullName: '',
                        email: '',
                        phone: '',
                        dateOfBirth: '',
                        gender: '',
                        nationality: '',
                        nationalityCode: '',
                        personalCode: '',
                        ticketType: seat.type
                    };
                } else {
                    this.$refs.errorModal.openModal('Bạn chỉ có thể chọn tối đa 5 ghế!');
                    return
                }
            }
            this.selectedSeats = this.seatLayout.flat().filter(s => s.selected)
        },
        formatTime(datetime) {
            return new Date(datetime).toLocaleTimeString('vi-VN', {
                hour: '2-digit',
                minute: '2-digit'
            })
        },
        changePage(page) {
            if (page < 1 || page > this.totalPages) return
            this.currentPage = page
        }

    },
    computed: {
        paginatedSeats() {
            const start = (this.currentPage - 1) * this.seatsPerPage
            const end = start + this.seatsPerPage
            return this.seatLayout.slice(start, end)
        },
        totalPages() {
            return Math.ceil(this.seatLayout.length / this.seatsPerPage)
        }
    },
    created() {
        this.fetchFlightDetails()
    }
}
</script>

<style scoped>
.btn.disabled {
    pointer-events: none;
}
.seat-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-weight: 500;
}

.btn-seat-selected {
  background-color: #28a745;
  color: white;
  border-color: #28a745;
}

.btn-seat-booked {
  background-color: #6c757d;
  color: white;
  border-color: #6c757d;
  pointer-events: none;
}

.btn-seat-business {
  background-color: rgba(0, 123, 255, 0.3); /* xanh dương nhạt */
  color: #004085;
  border-color: rgba(0, 123, 255, 0.5);
}

.btn-seat-economic {
  background-color: rgba(255, 193, 7, 0.3); /* vàng nhạt */
  color: #856404;
  border-color: rgba(255, 193, 7, 0.5);
}


</style>