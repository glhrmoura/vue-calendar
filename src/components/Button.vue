<template>
  <button
    :class="{
      'button__link': typeIs('link'),
      'button__arrow': typeIs('arrow'),
    }"
  >
    {{ label }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    label: String,

    type: {
      type: String,
      default: 'link',
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
.button__link {
  background-color: transparent;
  border: none;
  outline: none;
  text-decoration: underline;
  font-size: 14px;
  margin-right: 12px;
}

.button__arrow {
  background-color: transparent;
  border: none;
  outline: none;
  transition: all 0.1s;

  &:active {
    transform: scale(0.8);
  }

  &:not(:last-child) {
    margin-right: 12px;
  }
}
</style>
