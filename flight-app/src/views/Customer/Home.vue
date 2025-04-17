<template>
  <div>
    <div class="container">
      <h1 class="text-center my-4">Chào mừng đến với BayNhanh!</h1>
      
      <div class="row">
        <div class="col-md-4" v-for="feature in features" :key="feature.title">
          <div class="card">
            <img src="https://via.placeholder.com/300" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">{{ feature.title }}</h5>
              <p class="card-text">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const features = [
  { title: "Đặt vé dễ dàng", description: "Tìm kiếm và đặt chuyến bay với chỉ vài bước đơn giản." },
  { title: "Giới thiệu các hãng bay", description: "Chúng tôi cung cấp các chuyến bay từ các hãng lớn nhất." },
  { title: "Khám phá các địa điểm", description: "Tìm hiểu về các địa điểm du lịch phổ biến." }
]
</script>

<style scoped>
.card-img-top {
  height: 200px;
  object-fit: cover;
}
</style>
