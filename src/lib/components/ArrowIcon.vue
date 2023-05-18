<template>
  <svg
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    :class="`arrow-icon--${dir}`"
    :style="{ width: `${size}`, height: `${size}` }"
  >
    <path
      fill="currentColor"
      d="M340.864 149.312a30.592 30.592 0 000 42.752L652.736 512 340.864 831.872a30.592 30.592 0 000 
      42.752 29.12 29.12 0 0041.728 0L714.24 534.336a32 32 0 000-44.672L382.592 149.376a29.12 29.12 
      0 00-41.728 0z"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { ArrowDirection } from '@/lib/types';

export default defineComponent({
  name: 'ArrowIcon',

  props: {
    dir: {
      type: String as PropType<ArrowDirection>,
      default: 'right',
    },

    size: {
      type: Number,
      default: 16,
    },
  },
});
</script>

<style lang="scss" scoped>
.arrow-icon--top {
  transform: rotateZ(-90deg);
}

.arrow-icon--right {
  transform: rotateZ(0deg);
}

.arrow-icon--bottom {
  transform: rotateZ(90deg);
}

.arrow-icon--left {
  transform: rotateZ(180deg);
}
</style>
