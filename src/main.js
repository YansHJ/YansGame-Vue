import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
import io from 'socket.io-client'
const socket = io('http://124.70.5.108:7286')
export default socket
