import { createApp } from 'vue';

import 'vue-highlight-code/dist/style.css';

import IndexApp from './index.vue';

globalThis.__VUE_OPTIONS_API__ = true
globalThis.__VUE_PROD_DEVTOOLS__ = false;

createApp(IndexApp).mount('#app');
