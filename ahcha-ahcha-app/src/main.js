//import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css';

// 거래 내역 보여줄 때 날짜 선택 위한 VCalendar
// npm install v-calendar@next @popperjs/core
import VDatePicker from 'v-calendar';
import 'v-calendar/style.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
 app.use(VDatePicker, {})

app.mount('#app')
