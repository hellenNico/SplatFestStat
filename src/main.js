import { createApp } from 'vue'
import './assets/css/destyle.css'
import './assets/css/common.css'
import App from './App.vue'
import store from './store'

createApp(App).use(store).mount('#app')
