import { createApp } from 'vue';

import App from './app.vue';

import VueHighlightJS from 'vue3-highlightjs';
import 'highlight.js/styles/nord.css';

createApp(App)
  .use(VueHighlightJS)
  .mount('#app');
