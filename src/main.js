import { registerPlugins } from '@/plugins'
import App from './App.vue'
import { createApp } from 'vue'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
