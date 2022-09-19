import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
import io from 'socket.io-client'
const socket = io('http://127.0.0.1:8080')
export default socket
