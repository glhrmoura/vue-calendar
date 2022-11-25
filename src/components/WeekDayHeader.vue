<template>
  <th class="week-day-header">
    <slot />
  </th>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'WeekDayHeader',

  props: {
    label: String,

    type: {
      type: String,
      default: 'link',
    },
  },
});
</script>

<style lang="scss" scoped>
.week-day-header {
  flex-grow: 1;
  text-align: center;
  color: #000000;
  font-size: 14px;
  padding: 6px;
  font-weight: normal;
}
</style>
