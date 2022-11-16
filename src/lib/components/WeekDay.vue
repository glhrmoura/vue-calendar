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
      class="vue-scheduler__week-day__day-number"
      :class="{
        'vue-scheduler__week-day__day-number--highlight': isToday || firstDayMonth
      }"
    >
      <span v-if="isToday">
        {{ stringMonth }} {{ stringWeekDay }} {{ monthDay }} (Today)
      </span>

      <span v-else>
        {{ stringMonth }} {{ monthDay }}
      </span>
    </div>

    <div v-if="range && day.rule" class="vue-scheduler__week-day__schedules">
      <div
        :key="index"
        v-for="(interval, index) in day.rule.intervals"
        class="vue-scheduler__week-day__event"
      >
        {{ interval.from }} - {{ interval.to }}
      </div>
    </div>
  </td>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import type { WeekDay } from '@/types';

import dateMixin from '@/mixins/date';

export default defineComponent({
  name: 'WeekDay',

  mixins: [dateMixin],

  data() {
    return {
      selectionTarget: null,
      selectionOrigin: null,
      weekDays: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
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
        'December'
      ],
    };
  },

  props: {
    range: Boolean,
    selected: Boolean,
    day: {
      type: Object as PropType<WeekDay>,
      default: () => ({}),
    },
  },

  methods: {
    onClick() {
      this.$emit('week-day-click', { date: this.day.date });
    },

    onMouseUp() {
      this.$emit('week-day-mouse-up', { date: this.day.date });
    },

    onMouseDown() {
      this.$emit('week-day-mouse-down', { date: this.day.date });
    },

    onMouseEnter() {
      this.$emit('week-day-mouse-enter', { date: this.day.date });
    },
  },

  computed: {
    isToday() {
      const currDate = new Date();

      return (
        this.day.date.getDate() === currDate.getDate()
        && this.day.date.getMonth() === currDate.getMonth()
        && this.day.date.getFullYear() === currDate.getFullYear()
     );
    },

    firstDayMonth() {
      return this.monthDay === 1;
    },

    weekDay() {
      return this.day.date.getDay();
    },

    month() {
      return this.day.date.getMonth();
    },

    monthDay() {
      return this.day.date.getDate();
    },

    stringMonth() {
      return this.months[this.month];
    },

    stringWeekDay() {
      return this.weekDays[this.weekDay];
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

  &.vue-scheduler__week-day--in-range {
    background-color: #fff;

    .vue-scheduler__week-day__event {
      border-color: green;
      color: blue;
    }
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

      .vue-scheduler__week-day__event {
        background-color: #fff;
      }
    }
  }
}

.vue-scheduler__week-day__day-number {
  text-align: center;
  text-transform: uppercase;
}

.vue-scheduler__week-day__day-number--highlight {
  font-weight: 800;
}

.vue-scheduler__week-day__schedules {
  display: flex;
  flex-direction: column;
  margin-top: 12px;
}

.vue-scheduler__week-day__event {
  background-color: inherit;
  border-color: green;
  color: blue;
  border-radius: 44px;
  padding: 4px 0px;
  text-align: center;

  &:not(:first-child) {
    margin-top: 8px;
  }

  @media (max-width: 768px) {
    text-align: center;
    padding: 8px 8px;
  }
}
</style>
