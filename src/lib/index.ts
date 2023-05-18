import type { App, Plugin } from 'vue';

import VueCalendar from '@/lib/components/Calendar.vue';

export const VueCalendarPlugin = {
  install(Vue: App) {
    Vue.component('VueCalendar', VueCalendar);
  },
} as Plugin;

export default VueCalendar;
