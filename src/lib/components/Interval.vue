<template>
  <div v-if="interval" class="vue-scheduler__week-day__event">
    {{ interval.from }} - {{ interval.to }}
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import type { Interval } from '@/types';

export default defineComponent({
  props: {
    interval: Object as PropType<Interval>,
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

  &:not(:first-child) {
    margin-top: 8px;
  }

  @media (max-width: 768px) {
    text-align: center;
    padding: 8px 8px;
  }
}
</style>
