<template>
    <div class="container mt-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h2>Danh Sách Phi Cơ</h2>
        <button class="btn btn-primary" @click="addPlane">+ Thêm Phi Cơ</button>
      </div>
  
      <div v-if="planes.length > 0">
        <div v-for="(plane, index) in planes" :key="plane.id" class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">{{ plane.registration }} ({{ plane.iata }})</h5>
            <p><strong>ICAO:</strong> {{ plane.icao }}</p>
            <p><strong>ICAO24:</strong> {{ plane.icao24 }}</p>
            <p><strong>Hãng hàng không:</strong> {{ plane.airlines.name }} ({{ plane.airlines.iata }})</p>
  
            <div class="mt-3">
              <button class="btn btn-warning me-2" @click="editPlane(plane.id)">Sửa</button>
              <button class="btn btn-danger" @click="deletePlane(plane.id)">Xóa</button>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Không có phi cơ nào để hiển thị.</p>
      </div>
  
      <!-- Use Pagination Component -->
      <Pagination :page="page" :totalPages="totalPages" @update:page="updatePage"></Pagination>
    </div>
  </template>
  
  <script>
  import api from '../../services/api';
  import Pagination from '@/components/Pagination.vue'; // Import the Pagination component
  
  export default {
    components: {
      Pagination
    },
    data() {
      return {
        planes: [],
        page: 0,
        size: 3,
        totalPages: 0
      };
    },
    methods: {
      async fetchPlanes() {
        try {
          const response = await api.get('/flight/aircraft/list-aircraft-by-airline', {
            params: {
              page: this.page,
              size: this.size
            }
          });
          if (response.data && response.data.code === '200') {
            this.planes = response.data.data.content;
            this.totalPages = response.data.data.totalPages;
          } else {
            console.error('Không có dữ liệu phi cơ!');
          }
        } catch (error) {
          console.error('Lỗi khi gọi API:', error);
        }
      },
      addPlane() {
        this.$router.push('/aircraft-management/add');
      },
      editPlane(id) {
        this.$router.push(`/aircraft-management/edit/${id}`);
      },
      async deletePlane(id) {
        if (confirm('Bạn có chắc muốn xóa phi cơ này không?')) {
          try {
            const response = await api.delete(`/flight/aircraft/${id}`);
            if (response.data && response.data.code === '200') {
              alert('Xóa thành công!');
              this.fetchPlanes();
            } else {
              alert('Xóa thất bại!');
            }
          } catch (error) {
            console.error('Lỗi khi xóa phi cơ:', error);
            alert('Đã xảy ra lỗi khi xóa!');
          }
        }
      },
      updatePage(newPage) {
        this.page = newPage;
        this.fetchPlanes();  // Fetch data after page change
      }
    },
    created() {
      this.fetchPlanes();
    }
  };
  </script>
  