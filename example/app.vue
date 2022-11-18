<template>
  <Scheduler
    :range="range"
    :events="events"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Scheduler from '@/components/Scheduler.vue';

export default defineComponent({
  name: 'App',

  components: {
    Scheduler,
  },

  data: () => ({
    range: {
      start: new Date('11/05/2022'),
      end: new Date('12/22/2022'),
    },

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
  }),
});
</script>
