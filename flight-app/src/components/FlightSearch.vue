<template>
    <div class="flight-search">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <label for="from">Nơi đi</label>
            <input type="text" class="form-control" id="from" v-model="from" placeholder="Nơi đi" />
          </div>
          <div class="col-md-4">
            <label for="to">Nơi đến</label>
            <input type="text" class="form-control" id="to" v-model="to" placeholder="Nơi đến" />
          </div>
          <div class="col-md-4">
            <label for="departureDate">Ngày bay</label>
            <input type="date" class="form-control" id="departureDate" v-model="departureDate" />
          </div>
        </div>
        <button class="btn btn-primary mt-3" @click="searchFlights">Tìm chuyến bay</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        from: '',
        to: '',
        departureDate: '',
      };
    },
    methods: {
      searchFlights() {
        this.$router.push({ name: 'FlightResults', query: { from: this.from, to: this.to, date: this.departureDate } });
      },
    },
  };
  </script>
  
  <style scoped>
  .flight-search {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
  }
  </style>
  