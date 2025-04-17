<template>
  <div class="container mt-5">
    <div class="card shadow-sm p-4">
      <h4 class="mb-3">Tìm chuyến bay</h4>
      <form @submit.prevent="goToResults">
        <div class="row g-3 align-items-end">
          <div class="col-md-3">
            <label class="form-label">Nơi đi</label>
            <input v-model="search.departure" type="text" class="form-control" placeholder="VD: Hà Nội" />
          </div>
          <div class="col-md-3">
            <label class="form-label">Nơi đến</label>
            <input v-model="search.destination" type="text" class="form-control" placeholder="VD: TP.HCM" />
          </div>
          <div class="col-md-3">
            <label class="form-label">Ngày đi</label>
            <input v-model="search.date" type="date" class="form-control" />
          </div>
          <div class="col-md-3">
            <button type="submit" class="btn btn-primary w-100">Tìm chuyến bay</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: {
        departure: '',
        destination: '',
        date: ''
      }
    };
  },
  methods: {
    goToResults() {
      // Chuyển trang và truyền thông tin tìm kiếm qua query
      this.$router.push({
        name: 'FlightResults',
        query: {
          departure: this.search.departure,
          destination: this.search.destination,
          date: this.search.date
        }
      });
    }
  }
};
</script>
