<template>
  <Scheduler
    :range="{ start: new Date('11/05/2022'), end: new Date('11/22/2022') }"
    :rules="[
      {
        date: new Date('11/17/2021'),
        intervals: [
          { from: '09:20', to: '12:45' }
        ]
      }
    ]"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Scheduler from '@/components/Scheduler/index.vue';

export default defineComponent({
  name: 'App',
  components: {
    Scheduler,
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
