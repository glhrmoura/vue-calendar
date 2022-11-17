<template>
  <div class="vue-scheduler__controls">
    <div class="vue-scheduler__controls-buttons">
      <Button
        v-if="!todayInPage"
        type="link"
        label="Back to Today"
        @click="onGoToToday"
      />

      <Button
        type="arrow"
        :arrowOnLeft="true"
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
  name: 'Scheduler',

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
.vue-scheduler__controls {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
}

.vue-scheduler__controls-buttons {
  display: flex;
  align-items: center;
  column-gap: 12px;
}
</style>
