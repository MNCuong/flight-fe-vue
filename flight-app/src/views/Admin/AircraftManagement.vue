<template>
    <div class="container mt-4">
        <h2>Danh Sách Phi Cơ</h2>
        <div v-if="planes.length > 0">
            <div v-for="(plane, index) in planes" :key="plane.id" class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">{{ plane.registration }} ({{ plane.iata }})</h5>
                    <p><strong>ICAO:</strong> {{ plane.icao }}</p>
                    <p><strong>ICAO24:</strong> {{ plane.icao24 }}</p>
                    <p><strong>Hãng hàng không:</strong> {{ plane.airlines.name }} ({{ plane.airlines.iata }})</p>
                </div>
            </div>
        </div>
        <div v-else>
            <p>Không có phi cơ nào để hiển thị.</p>
        </div>
    </div>
</template>

<script>
import api from '../../services/api'

export default {
    data() {
        return {
            planes: [],
        };
    },
    methods: {
        async fetchPlanes() {
            try {
                const response = await axios.get('/flight/aircraft/list-aircraft-by-airline');

                console.log(response.data); // Kiểm tra dữ liệu trả về từ API
                if (response.data && response.data.code === '200') {
                    this.planes = response.data.data;
                } else {
                    console.error('Không có dữ liệu phi cơ!');
                }
            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
            }
        }
    },
    mounted() {
        this.fetchPlanes()
    },
    watch: {
        $route() {
            this.fetchPlanes()
        }
    },
    created() {
        // Gọi hàm fetchPlanes khi component được tạo
        this.fetchPlanes();
    }
};
</script>

<style scoped>
/* Thêm style nếu cần */
</style>