import type { App, Plugin } from 'vue';

import VueScheduler from '@/components/Scheduler.vue';

export const VueSchedulerPlugin = {
  install(Vue: App) {
    Vue.component('VueScheduler', VueScheduler);
  },
} as Plugin;

export default VueScheduler;
