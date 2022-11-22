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
      class="vue-scheduler__week-day__content"
      :class="{
        'vue-scheduler__week-day__content--highlight': isToday || isFirstDay
      }"
    >
      <span>
        {{ monthLabel }}

        <span class="week-day__weekday-label">
          {{ weekDayLabel }}
        </span>

        {{ monthDayNumber }}
        
        <span v-if="isToday">
          (Today)
        </span>
      </span>
    </div>

    <div
      v-if="weekDay.events && weekDay.events.length"
      class="vue-scheduler__week-day__schedules"
    >
      <Event
        v-for="(event, index) in allEvents.slice(0, 3)"
        :key="index"
        :event="event"
      />
    </div>

    <div class="week-day__more-events" v-if="hasSeveralEvents">
      ...
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
      this.$emit('week-day-click', {
        date: this.weekDay.date,
        events: this.allEvents,
      });
    },

    onMouseUp() {
      this.$emit('week-day-mouse-up', {
        date: this.weekDay.date,
        events: this.allEvents,
      });
    },

    onMouseDown() {
      this.$emit('week-day-mouse-down', {
        date: this.weekDay.date,
        events: this.allEvents,
      });
    },

    onMouseEnter() {
      this.$emit('week-day-mouse-enter', {
        date: this.weekDay.date,
        events: this.allEvents,
      });
    },
  },

  computed: {
    isToday() {
      const currentDate = new Date();

      return (
        this.weekDay.date.getDate() === currentDate.getDate()
        && this.weekDay.date.getMonth() === currentDate.getMonth()
        && this.weekDay.date.getFullYear() === currentDate.getFullYear()
     );
    },

    allEvents() {
      const events = this.weekDay?.events || [];
      
      try {
        return JSON.parse(JSON.stringify(events));
      } catch (error) {
        return [];
      }
    },

    hasSeveralEvents () {
      return this.allEvents.length > 3;
    },

    isFirstDay() {
      return this.monthDayNumber === 1;
    },

    monthDayNumber() {
      return this.weekDay.date.getDate();
    },

    monthLabel() {
      return this.months[this.weekDay.date.getMonth()];
    },

    weekDayLabel() {
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
  min-height: 150px;

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

.vue-scheduler__week-day__content {
  text-align: center;
  text-transform: uppercase;
}

.vue-scheduler__week-day__content--highlight {
  font-weight: 800;
}

.vue-scheduler__week-day__schedules {
  display: flex;
  flex-direction: column;
  margin-top: 12px;
  row-gap: 6px;
}

.week-day__weekday-label {
  @media (min-width: 769px) {
    display: none;
  }
}

.week-day__more-events {
  display: flex;
  justify-content: center;
  line-height: 20px;
  color: #a8a8a8;
  font-size: 24px;
}
</style>
