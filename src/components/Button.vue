<template>
  <div
    :class="{
      'vue-calendar-button-container': true,
      'vue-calendar-button-container--arrow-left': arrowOnLeft,
    }"
  >
    <button
      v-if="label"
      :class="{
        'vue-calendar-button': true,
        'vue-calendar-button--link': typeIs('link'),
        'vue-calendar-button--arrow': typeIs('arrow'),
      }"
    >
      {{ label }}
    </button>

    <ArrowIcon v-if="typeIs('arrow')" :size="arrowSize" :dir="arrowDir" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { ButtonType, ArrowDirection } from '@/types';

import ArrowIcon from '@/components/ArrowIcon.vue';

export default defineComponent({
  name: 'Button',

  components: {
    ArrowIcon,
  },

  props: {
    label: String,

    type: {
      type: String as PropType<ButtonType>,
      default: 'link',
    },

    arrowSize: Number,

    arrowDir: String as PropType<ArrowDirection>,

    arrowOnLeft: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    typeIs(type: string): boolean {
      return this.type === type;
    },
  },
});
</script>

<style lang="scss" scoped>
.vue-calendar-button-container {
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 4px;

  &--arrow-left {
    flex-direction: row-reverse;
  }

  &, .vue-calendar-button {
    cursor: pointer;
  }
}

.vue-calendar-button {
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 12px;
  padding: 0px;
  
  &--link {
    text-decoration: underline;
  }
}
</style>
