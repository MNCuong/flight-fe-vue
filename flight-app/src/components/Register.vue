<template>
  <form @submit.prevent="register">
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button type="submit">Đăng ký</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import api from '../services/api'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const register = async () => {
  try {
    await api.post('/auth/register', { email: email.value, password: password.value })
    router.push('/login')
  } catch (err) {
    alert('Đăng ký thất bại')
  }
}
</script>
