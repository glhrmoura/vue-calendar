<template>
  <Scheduler
    :events="events"
    :ranges="ranges"
    @selectDate="onSelectDate"
    @selectDates="onSelectDates"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Scheduler from '@/index';
import type { WeekDayActionData } from '@/types';

export default defineComponent({
  name: 'App',

  components: {
    Scheduler,
  },

  data: () => ({
    events: [
      {
        wday: 'friday',
        interval: { from: '09:20', to: '12:45' },
      },
      {
        date: new Date('11/17/2022'),
        interval: { from: '09:20', to: '12:45' },
      },
      {
        date: new Date('11/17/2022'),
        interval: { from: '09:20', to: '12:45' },
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
