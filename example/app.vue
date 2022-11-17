<template>
  <Scheduler
    :range="range"
    :rules="rules"
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
      end: new Date('11/22/2022'),
    },

    rules: [
      {
        date: new Date('11/17/2022'),
        intervals: [
          { from: '09:20', to: '12:45' },
        ],
      },
    ],
  }),
});
</script>
