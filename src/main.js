import {createApp} from 'vue'
import {createStore} from 'vuex'
import App from './App.vue'
import router from './router'
import 'element-plus/theme-chalk/dark/css-vars.css'

const store = createStore({
    state() {
        return {
            bookName: '',
        }
    },
    mutations: {
        setBookName(state, bookName) {
            state.bookName = bookName
        }
    }
})

const app = createApp(App)

app.use(router)
app.use(store)

app.mount('#app')
