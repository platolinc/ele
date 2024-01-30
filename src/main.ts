// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Tabbar, TabbarItem, Search, Icon, Loading, Skeleton } from 'vant'

import App from './App.vue'
import router from './router'

import 'vant/lib/index.css'
import './assets/common.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(Tabbar)
app.use(TabbarItem)
app.use(Search)
app.use(Icon)
app.use(Loading)
app.use(Skeleton)

const rootValue = 16
const rootWidth = 390
const deviceWidth = document.documentElement.clientWidth
document.documentElement.style.fontSize = (deviceWidth * rootValue) / rootWidth + 'px'

// 3-4
// 4-2
app.mount('#app')
