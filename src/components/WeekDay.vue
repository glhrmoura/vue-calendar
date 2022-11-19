<template>
  <td
    @click="onClick"
    @mouseup="onMouseUp"
    @mouseenter="onMouseEnter"
    @mousedown="onMouseDown"
    class="vue-scheduler__week-day"
    :class="{
      'vue-scheduler__week-day--in-range': range,
      'vue-scheduler__week-day--selected': selected,
    }"
  >
    <div
      class="vue-scheduler__week-day__info"
      :class="{
        'vue-scheduler__week-day__info--highlight': isToday || firstDayMonth
      }"
    >
      <span v-if="isToday">
        {{ stringMonth }} {{ stringWeekDay }} {{ monthDay }} (Today)
      </span>

      <span v-else>
        {{ stringMonth }} {{ monthDay }}
      </span>
    </div>

    <div
      v-if="weekDay.events && weekDay.events.length"
      class="vue-scheduler__week-day__schedules"
    >
      <Event
        v-for="(event, index) in weekDay.events"
        :key="index"
        :event="event"
        class="vue-scheduler__week-day__event"
      />
    </div>
  </td>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import type { WeekDay } from '@/types';

import dateMixin from '@/mixins/date';

import Event from '@/components/Event.vue';

export default defineComponent({
  name: 'WeekDay',

  mixins: [dateMixin],

  components: {
    Event,
  },

  data() {
    return {
      weekDays: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
    };
  },

  props: {
    range: Boolean,

    selected: Boolean,

    weekDay: {
      type: Object as PropType<WeekDay>,
      default: () => ({}),
    },
  },

  methods: {
    onClick() {
      this.$emit('week-day-click', { date: this.weekDay.date });
    },

    onMouseUp() {
      this.$emit('week-day-mouse-up', { date: this.weekDay.date });
    },

    onMouseDown() {
      this.$emit('week-day-mouse-down', { date: this.weekDay.date });
    },

    onMouseEnter() {
      this.$emit('week-day-mouse-enter', { date: this.weekDay.date });
    },
  },

  computed: {
    isToday() {
      const currDate = new Date();

      return (
        this.weekDay.date.getDate() === currDate.getDate()
        && this.weekDay.date.getMonth() === currDate.getMonth()
        && this.weekDay.date.getFullYear() === currDate.getFullYear()
     );
    },

    firstDayMonth() {
      return this.monthDay === 1;
    },

    monthDay() {
      return this.weekDay.date.getDate();
    },

    stringMonth() {
      return this.months[this.weekDay.date.getMonth()];
    },

    stringWeekDay() {
      return this.weekDays[this.weekDay.date.getDay()];
    },
  },
});
</script>

<style lang="scss" scoped>
.vue-scheduler__week-day {
  position: relative;
  padding: 8px;
  color: #a8a8a8;
  font-size: 11px;
  cursor: pointer;
  background-color: #f6f6f6;
  box-shadow: 0px 0px 0px 1px #cfcaca;
  box-sizing: border-box;
  max-height: 150px;

  &.vue-scheduler__week-day--in-range {
    background-color: #fff;
  }

  @media (min-width: 769px) {
    &:hover {
      z-index: 10;
      box-shadow: 0px 0px 0px 1px #6382C6;
    }

    &.vue-scheduler__week-day--selected {
      background-color: #f2f6ff;
      box-shadow: 0px 0px 0px 1px #6382C6;
      z-index: 10;
    }
  }
}

.vue-scheduler__week-day__info {
  text-align: center;
  text-transform: uppercase;
}

.vue-scheduler__week-day__info--highlight {
  font-weight: 800;
}

.vue-scheduler__week-day__schedules {
  display: flex;
  flex-direction: column;
  margin-top: 12px;
  row-gap: 6px;
}
</style>
