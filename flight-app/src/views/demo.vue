<template>
    <div class="container mt-5">
      <h2>Thông tin cá nhân</h2>
      <form @submit.prevent="updateProfile">
        <div class="mb-3">
          <label for="name" class="form-label">Tên</label>
          <input type="text" class="form-control" id="name" v-model="user.name" required />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input type="email" class="form-control" id="email" v-model="user.email" required />
        </div>
        <button type="submit" class="btn btn-primary">Cập nhật</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import api from '../services/api'
  
  const user = ref({ name: '', email: '' })
  
  const updateProfile = async () => {
    try {
      await api.put('/user/profile', user.value)
      alert('Cập nhật thành công!')
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }
  </script>
  
  <style scoped>
  form {
    max-width: 600px;
    margin: 0 auto;
  }
  </style>
  