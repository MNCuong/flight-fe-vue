<template>
    <div class="container mt-5">
      <h2>Giới thiệu các Hãng Bay</h2>
      <div class="row">
        <div class="col-md-4" v-for="airline in airlines" :key="airline.id">
          <div class="card">
            <img :src="airline.image" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">{{ airline.name }}</h5>
              <p class="card-text">{{ airline.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const airlines = ref([
    {
      id: 1,
      name: 'Vietnam Airlines',
      description: 'Vietnam Airlines is the national flag carrier and largest airline in Vietnam.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Vietnam_Airlines_Logo_2015.svg'
    },
    {
      id: 2,
      name: 'VietJet Air',
      description: 'VietJet Air is a low-cost airline, one of the fastest growing carriers in Asia.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/VietJet_Air_logo.svg'
    },
    {
      id: 3,
      name: 'Bamboo Airways',
      description: 'Bamboo Airways is a new Vietnamese airline offering both domestic and international flights.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Bamboo_Airways_logo.svg'
    },
    {
      id: 4,
      name: 'Jetstar Pacific',
      description: 'Jetstar Pacific is a low-cost airline based in Vietnam, serving many domestic and regional destinations.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Jetstar_Pacific_logo.svg'
    }
  ])
  </script>
  
  <style scoped>
  .card-img-top {
    height: 200px;
    object-fit: cover;
  }
  </style>
  