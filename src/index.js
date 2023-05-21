import { createApp } from 'vue';

import 'vue-highlight-code/dist/style.css';

import App from './app.vue';

globalThis.__VUE_OPTIONS_API__ = true
globalThis.__VUE_PROD_DEVTOOLS__ = false;

createApp(App).mount('#app');
