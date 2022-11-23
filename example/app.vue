<template>
  <VueScheduler
    :events="events"
    :ranges="ranges"
    @selectDate="onSelectDate"
    @selectDates="onSelectDates"
  />
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
        date: new Date('12/06/2022'),
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
        start: new Date('11/16/2022'),
        end: new Date('12/02/2022'),
      },
      {
        start: new Date('01/13/2023'),
        end: new Date('01/19/2023'),
      },
      {
        start: new Date('04/19/2023'),
      },
    ],
  }),

  methods: {
    onSelectDate(data: WeekDayActionData) {
      console.log('selectDate: ', data);
    },

    onSelectDates(data: WeekDayActionData) {
      console.log('selectDates: ', data);
    },
  },
});
</script>
