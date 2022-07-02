import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.scss';
import App from './App.vue';
import router from './router';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
import UI from '@/gam-lib-ui/vue/ui';
dayjs.extend(customParseFormat);
dayjs.extend(duration);

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(UI);

app.mount('#app');
