import { createApp } from 'vue'
import './style.css'
import router from './router/index'
import { createPinia } from "pinia"
import App from './App.vue'

const app = createApp(App)
const store = createPinia()
app.use(router)
app.use(store)
app.mount('#app')

console.log(' import.meta.env.MODE: ', import.meta.env.MODE)
console.log(' api地址: ', import.meta.env)
