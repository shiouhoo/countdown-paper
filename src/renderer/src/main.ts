import { createApp } from 'vue';
import App from './App.vue';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import { createPinia } from 'pinia';

import 'virtual:uno.css';
const pinia = createPinia();

const app = createApp(App).use(pinia);

app.mount('#app');