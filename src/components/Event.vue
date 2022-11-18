<template>
  <div v-if="event" class="vue-scheduler__week-day__event">
    <Interval :interval="event.interval" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import type { WeekDayEvent } from '@/types';

import Interval from '@/components/Interval.vue';

export default defineComponent({
  nane: 'Event',

  components: {
    Interval,
  },

  props: {
    event: Object as PropType<WeekDayEvent>,
  },
});
</script>

<style scoped lang="scss">
.vue-scheduler__week-day__event {
  background-color: inherit;
  color: #cfcaca;
  border-radius: 44px;
  padding: 4px 0px;
  text-align: center;
  border: 1px solid #cfcaca;

  @media (max-width: 768px) {
    text-align: center;
    padding: 8px 8px;
  }
}
</style>
