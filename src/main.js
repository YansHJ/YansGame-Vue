import { createApp } from 'vue'
import App from './App.vue'
import io from 'socket.io-client'

createApp(App).mount('#app')
const socket = io('http://124.70.5.108:7286')
// const socket = io('http://localhost:7286')
export default socket
