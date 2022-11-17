import { App, Plugin } from 'vue';

import Scheduler from '@/components/Scheduler.vue';

export const VueSchedulerPlugin = {
  install(Vue: App) {
    Vue.component('VueScheduler', Scheduler);
  }
} as Plugin;

export default Scheduler;
