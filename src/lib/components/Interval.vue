<template>
  <div v-if="interval">
    {{ interval.from }} - {{ interval.to }}
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import type { TimeInterval } from '@/lib/types';

export default defineComponent({
  name: 'Interval',

  props: {
    interval: Object as PropType<TimeInterval>,
  },
});
</script>
