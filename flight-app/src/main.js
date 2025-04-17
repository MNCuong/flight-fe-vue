import { createApp } from 'vue'
// import Home from './views/Customer/Home.vue'
import HomePage from './layouts/CustomerLayout.vue'

import router from './router'
import './assets/style.scss'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
// import jwt_decode from 'jwt-decode';

// import 'bootstrap-icons/font/bootstrap-icons.css'
// import 'bootstrap-icons/font/bootstrap-icons.css'
// import 'bootstrap-icons/font/bootstrap-icons.js'
// import 'bootstrap-icons/font/bootstrap-icons.eot'
// import 'bootstrap-icons/font/bootstrap-icons.woff'
// import 'bootstrap-icons/font/bootstrap-icons.ttf'   
import 'bootstrap/dist/css/bootstrap.min.css'
createApp(HomePage).use(router).mount('#app')
