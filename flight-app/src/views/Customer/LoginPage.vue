<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card mt-5">
          <div class="card-body">
            <h2 class="text-center mb-4">Đăng nhập</h2>
            <form @submit.prevent="login">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input v-model="email" id="email" type="email" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Mật khẩu</label>
                <input v-model="password" id="password" type="password" class="form-control" required />
              </div>
              <button type="submit" class="btn btn-primary w-100">Đăng nhập</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../../services/api'
import { jwtDecode } from 'jwt-decode';

const router = useRouter()
const email = ref('')
const password = ref('')

const login = async () => {
  try {
    const res = await api.post('/auth/login', {
      email: email.value,
      password: password.value
    })
    if (res && res.data.data) {
      console.log(res.data.data);
    } else {
      console.error("No data returned from server");
    }
    localStorage.setItem('token', res.data.data.token);
    localStorage.setItem('refresh_token', res.data.data.refresh_token);
    const token = res.data.data.token;
    console.log(token); 
    const parts = token.split('.');
    console.log(parts.length); 
    if (parts.length !== 3) {
      console.error('Token không đúng định dạng JWT');
    }
    const decoded = jwtDecode(token);
    const roles = decoded.roles || []
    const isAdmin = roles.includes('ADMIN')

    alert('Đăng nhập thành công!')

    if (isAdmin) {
      router.push('/admin')
    } else {
      router.push('/')
    }

  }
  catch (error) {
    console.error('Lỗi đăng nhập:', error)
    alert('Đăng nhập thất bại!')
  }
}
</script>

<style scoped>
/* Bạn có thể thêm các style riêng của bạn vào đây */
</style>
