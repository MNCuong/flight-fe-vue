import { createApp } from 'vue';
// import Home from './views/Customer/Home.vue'
import HomePage from './layouts/CustomerLayout.vue';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './assets/style.scss';
import './assets/style/main.scss';

// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/js/bootstrap.js';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/scss/styles.scss'; 
// import 'bootstrap/scss/bootstrap.scss'; 

createApp(HomePage).use(router).mount('#app')
