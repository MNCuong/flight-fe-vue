<template>
    <div class="container mt-4">
        <h3>{{ isEdit ? 'Chỉnh sửa' : 'Thêm mới' }} Phi Cơ</h3>
        <form @submit.prevent="handleSubmit">
            <div class="mb-3">
                <label>Mã số đăng ký</label>
                <input v-model="form.registration" type="text" class="form-control" required />
            </div>

            <div class="mb-3">
                <label>IATA</label>
                <input v-model="form.iata" type="text" class="form-control" readonly />
            </div>

            <div class="mb-3">
                <label>ICAO</label>
                <input v-model="form.icao" type="text" class="form-control" readonly />
            </div>

            <div class="mb-3">
                <label>Trạng thái</label>
                <select v-model="form.status" class="form-select">
                    <option v-for="type in aircraftStatuses" :key="type.value" :value="type.value">
                        {{ type.label }}
                    </option>
                </select>
            </div>

            <div class="mb-3">
                <label>Loại máy bay</label>
                <select v-model="form.type" class="form-select" @change="handleTypeChange">
                    <option v-for="type in aircraftTypes" :key="type.value" :value="type.value">
                        {{ type.label }}
                    </option>
                </select>
            </div>


            <div class="mb-3">
                <label>Hãng hàng không</label>
                <div v-if="currentAirline">
                    <p class="form-control-plaintext">
                        <input type="text" class="form-control" :value="`${currentAirline} (${currentAirline.iata})`"
                            readonly />
                    </p>
                </div>

            </div>
            <button type="submit" class="btn btn-success">{{ isEdit ? 'Cập nhật' : 'Thêm mới' }}</button>
            <button type="#" @click="returnPage()" class="btn btn-primary">Quay lại</button>

        </form>
    </div>
</template>

<script>
import api from '../services/api';
import { jwtDecode } from 'jwt-decode';
export default {
    props: ['id'],
    data() {
        return {
            form: {
                registration: '',
                iata: '',
                icao: '',
                icao24: '',
                status: 'ACTIVE',
                type: 'AIRBUS_A320',
                airlinesId: null,
                currentAirline: null,
            },
            airlines: [],
            isEdit: false,
            // Enum status
            aircraftStatuses: [
                { value: 'ACTIVE', label: 'Hoạt động' },
                { value: 'INACTIVE', label: 'Không hoạt động' }
            ],
            // Enum type with IATA and ICAO codes
            aircraftTypes: [
                { value: 'AIRBUS_A320', label: 'Airbus A320', iata: 'A320', icao: 'A320' },
                { value: 'AIRBUS_A321', label: 'Airbus A321', iata: 'A321', icao: 'A321' },
                { value: 'BOEING_737_800', label: 'Boeing 737-800', iata: 'B738', icao: 'B738' },
                { value: 'BOEING_737_MAX_8', label: 'Boeing 737 MAX 8', iata: 'B38M', icao: 'B38M' },
                { value: 'BOEING_787_9', label: 'Boeing 787-9', iata: 'B789', icao: 'B789' },
                { value: 'AIRBUS_A350_900', label: 'Airbus A350-900', iata: 'A359', icao: 'A359' },
                { value: 'BOEING_777_300ER', label: 'Boeing 777-300ER', iata: '77W', icao: '77W' },
                { value: 'AIRBUS_A380', label: 'Airbus A380', iata: 'A388', icao: 'A388' },
            ]
        };
    },



    methods: {
        async fetchCurrentUserAirline() {
            const email = await this.getEmailFromToken();
            if (!email) return;

            const res = await api.get(`/user/info-by-email?email=${email}`);
            const userData = res.data.data;

            if (userData && userData.full_name) {
                const airlineName = userData.full_name.split('_')[1];
                this.currentAirline = airlineName;
            }

            console.log("Current Airline: ", this.currentAirline);

            if (this.currentAirline) {
                await this.fetchAirlines();
            }
        },


        async getEmailFromToken() {
            console.log("Fetching email from token...");
            const token = localStorage.getItem('token');
            console.log("Token: ", token); // Log token ra console
            if (!token) return null;
            const decodedToken = jwtDecode(token);
            const email = decodedToken.sub;
            return email;
        }
        ,
        async returnPage() {
            this.$router.push('/admin/aircraft-management');
        },
        async fetchAirlines() {
            const res = await api.get('/flights/flight/airlines');
            this.airlines = res.data.data;
            console.log("All Airlines: ", this.airlines);

            const airline = await this.airlines.find(airline => airline.name && airline.name.includes(this.currentAirline));

            if (airline) {
                this.currentAirline = `${airline.name} (${airline.iata})`;
            } else {
                this.currentAirline = this.currentAirline || "Hãng không tìm thấy";
            }
        }
        ,
        async fetchAircraft() {
            if (this.id) {
                this.isEdit = true;
                const res = await api.get(`/flight/aircraft/get-aircraft/${this.id}`);
                const data = res.data.data;
                this.form = {
                    registration: data.registration,
                    iata: data.iata,
                    icao: data.icao,
                    icao24: data.icao24,
                    status: data.status,
                    type: data.type,
                    airlinesId: data.airlines.id,
                };
                this.currentAirline = data.airlines;
            }
        },
        handleTypeChange() {
            const selectedType = this.aircraftTypes.find(type => type.value === this.form.type);
            if (selectedType) {
                this.form.iata = selectedType.iata;
                this.form.icao = selectedType.icao;
            }
        },
        async handleSubmit() {
            if (this.isEdit) {
                await api.put(`/flight/aircraft/${this.id}`, this.form);
                alert('Cập nhật thành công!');
            } else {
                await api.post('flight/aircraft/add-aircraft', this.form);
                alert('Thêm mới thành công!');
            }
            this.$router.push('/aircraft');
        }
    },
    created() {
        console.log("Aircraft ID:", this.id);
        this.fetchCurrentUserAirline()
        this.fetchAirlines();
        this.getEmailFromToken()
        this.fetchAirlines();
        this.fetchAircraft();
    }, watch: {
        '$route.params.id'(newId) {
            this.id = newId;
            this.fetchAircraft();
        }
    }

};
</script>