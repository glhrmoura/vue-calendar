<template>
  <div class="app">
    <h1 class="app-title">
      Vue Scheduler
    </h1>

    <VueScheduler
      :events="events"
      :ranges="ranges"
      @selectDate="onSelectDate"
      @selectDates="onSelectDates"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import VueScheduler from '@/index';
import type { WeekDayActionData } from '@/types';

export default defineComponent({
  name: 'App',

  components: {
    VueScheduler,
  },

  data: () => ({
    events: [
      {
        all: true,
        interval: { from: '05:00', to: '06:00' },
      },
      {
        date: new Date(),
        interval: { from: '06:00', to: '08:45' },
      },
      {
        wday: ['monday', 'wednesday', 'thursday', 'friday'],
        interval: { from: '09:00', to: '11:00' },
      },
      {
        wday: 'thursday',
        interval: { from: '11:00', to: '12:00' },
      },
      {
        wday: 'thursday',
        interval: { from: '14:00', to: '17:00' },
      },
      {
        wday: 'thursday',
        interval: { from: '18:00', to: '19:00' },
      },
    ],

    ranges: [
      {
        start: new Date(),
        end: new Date(Date.now() + (86400000 * 6)),
      },
      {
        start: new Date(Date.now() + (86400000 * 40)),
        end: new Date(Date.now() + (86400000 * 51)),
      },
      {
        start: new Date(Date.now() + (86400000 * 75)),
      },
    ],
  }),

  methods: {
    onSelectDate(data: WeekDayActionData) {
      alert(JSON.stringify(data, null, 4));
    },

    onSelectDates(data: WeekDayActionData) {
      alert(JSON.stringify(data, null, 4));
    },
  },
});
</script>

<style>
body {
  font-family: sans-serif;
}

.app {
  max-width: 910px;
  margin: 94px auto;
}

.app-title {
  margin: 0px;
  margin-bottom: 64px;
  text-align: center; 
}
</style>
