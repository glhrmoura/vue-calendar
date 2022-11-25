<template>
  <div v-if="event" class="week-day-event">
    <Interval :interval="event.interval" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import type { EventDate } from '@/types';

import Interval from '@/components/Interval.vue';

export default defineComponent({
  nane: 'Event',

  components: {
    Interval,
  },

  props: {
    event: Object as PropType<EventDate>,
  },
});
</script>

<style scoped lang="scss">
.week-day-event {
  background-color: inherit;
  color: #A8A8A8;
  border-radius: 4px;
  padding: 4px 0px;
  text-align: center;
  border: 1px solid #A8A8A8;

  @media (max-width: 768px) {
    text-align: center;
    padding: 8px 8px;
  }
}
</style>
