<template>
    <div class="container mt-5">
      <h2>Khám phá các địa điểm du lịch hấp dẫn</h2>
      <div class="row">
        <div class="col-md-4" v-for="destination in destinations" :key="destination.name">
          <div class="card">
            <img :src="destination.image" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">{{ destination.name }}</h5>
              <p class="card-text">{{ destination.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const destinations = [
    { name: "Đà Nẵng", image: "https://via.placeholder.com/200", description: "Thành phố biển tuyệt đẹp." },
    { name: "Phú Quốc", image: "https://via.placeholder.com/200", description: "Khu nghỉ dưỡng lý tưởng." },
    { name: "Sapa", image: "https://via.placeholder.com/200", description: "Nơi lý tưởng để thư giãn." }
  ]
  </script>
  
  <style scoped>
  .card-img-top {
    height: 200px;
    object-fit: cover;
  }
  </style>
  