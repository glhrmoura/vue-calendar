<template>
  <th class="week-day-title">
    <slot />
  </th>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'WeekDayTitle',

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
.week-day-title {
  flex-grow: 1;
  text-align: center;
  color: #a8a8a8;
  font-size: 14px;
  padding: 4px;
  font-weight: normal;
}
</style>
