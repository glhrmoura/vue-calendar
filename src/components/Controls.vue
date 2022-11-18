<template>
  <div class="vue-scheduler-controls">
    <div class="vue-scheduler-controls__content">
      <Button
        v-if="!todayInPage"
        type="link"
        label="Back to Today"
        @click="onGoToToday"
      />

      <Button
        type="arrow"
        arrowDir="left"
        @click="onBackPage"
      />

      <Button
        type="arrow"
        @click="onNextPage"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Button from '@/components/Button.vue';

export default defineComponent({
  name: 'Controls',

  components: {
    Button,
  },

  props: {
    todayInPage: Boolean,
  },

  methods: {
    onNextPage() {
      this.$emit('nextPage');
    },

    onBackPage() {
      this.$emit('backPage');
    },

    onGoToToday() {
      this.$emit('goToToday');
    },
  },
});
</script>

<style lang="scss" scoped>
.vue-scheduler-controls {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
}

.vue-scheduler-controls__content {
  display: flex;
  align-items: center;
  column-gap: 12px;
}
</style>
