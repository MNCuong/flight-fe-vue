<template>
    <div class="card">
      <img :src="flight.image" class="card-img-top" alt="Flight Image" />
      <div class="card-body">
        <h5 class="card-title">{{ flight.name }}</h5>
        <p class="card-text">{{ flight.description }}</p>
        <p><strong>Giá: {{ flight.price }}</strong></p>
        <button class="btn btn-primary">Đặt ngay</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['flight'],
  };
  </script>
  
  <style scoped>
  .card {
    width: 18rem;
    margin: 10px;
  }
  .card img {
    height: 180px;
    object-fit: cover;
  }
  </style>
  