// 📁 src/layouts/CustomerLayout.vue
<template>
  <div>
    <Header />
    <main class="container mt-4">
      <!-- <h2>{{ pageTitle }}</h2> -->
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { ref } from 'vue'

const pageTitle = ref('Trang chủ')

function updateTitle(newTitle) {
  pageTitle.value = newTitle
      window.location.reload()

}
</script>

<style scoped>
main {
  min-height: 60vh;
}
</style>
