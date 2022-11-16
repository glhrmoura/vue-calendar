<template>
  <div class="vue-scheduler">
    <div class="vue-scheduler__controls">
      <div class="vue-scheduler__controls-buttons">
        <Button
          v-if="!todayInPage"
          type="link"
          label="Back to Today"
          @click="goToToday"
        />

        <Button
          type="arrow"
          label="Back"
          @click="prevPage"
        />

        <Button
          type="arrow"
          label="Next"
          @click="nextPage"
        />
      </div>
    </div>

    <table class="vue-scheduler__calendar-content">
      <thead>
        <tr class="vue-scheduler__week-days">
          <WeekDayTitle v-for="weekday in weekDays" :key="weekday">
            {{ weekday }}
          </WeekDayTitle>
        </tr>
      </thead>

      <tbody>
        <Week v-for="(week, index) in weeks" :key="index">
          <WeekDay
            v-for="(weekDay, index) in getDatesWithRules(week, rules)"
            :day="weekDay"
            :key="index"
            :selected="has(weekDay.date, selectedDates)"
            :range="inRange(weekDay.date, range.start, range.end)"
            @weekDayClick="onWeekDayClick"
            @weekDayMouseUp="onWeekDayMouseUp"
            @weekDayMouseDown="onWeekDayMouseDown"
            @weekDayMouseEnter="onWeekDayMouseEnter"
          />
        </Week>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import mixinDateHelper from '@/mixins/date';

import type { SchedulerData, Rule, Range, WeekDayEvent } from '@/types';

import Week from '@/components/Week.vue';
import Button from '@/components/Button.vue';
import WeekDay from '@/components/WeekDay.vue';
import WeekDayTitle from '@/components/WeekDayTitle.vue';

export default defineComponent({
  name: 'Scheduler',

  components: {
    Week,
    Button,
    WeekDay,
    WeekDayTitle,
  },

  mixins: [mixinDateHelper],

  data(): SchedulerData {
    return {
      dates: [],
      selectedRange: [],
      selectionOrigin: null,
      inMutipleSelection: false,
      calenderStartDayData: new Date(),
      weekDays: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ],
    };
  },

  props: {
    rules: {
      type: Array as PropType<Rule[]>,
      default: () => ([]),
    },

    rows: {
      type: Number,
      default: 5,
    },

    range: {
      type: Object as PropType<Range>,
      default: () => ({ start: new Date() }),
    }
  },

  mounted() {
    this.calenderStartDay = new Date(this.range.start || Date.now());
  },

  watch: {
    'range.start'(newValue) {
      this.calenderStartDay = new Date(newValue);
    },

    offsetDays() {
      this.generateDays();
    },

    calenderStartDay() {
      this.generateDays();
    },
  },

  methods: {
    onWeekDayClick(event: WeekDayEvent) {
      this.$emit('select-date', event);
    },

    onWeekDayMouseUp() {
      if (this.selectedDates.length > 1) {
        this.$emit('select-dates', this.selectedDates);
      }

      this.selectedRange = [];
      this.inMutipleSelection = false;
      this.selectionOrigin = null;
    },

    onWeekDayMouseEnter(event: WeekDayEvent) {
      if (!this.inMutipleSelection || this.selectedRange.includes(event.date)) return;

      let [minDate, maxDate] = this.datesMinMax(this.selectedRange);

      if (Number(this.selectionOrigin) === Number(minDate)) {
        maxDate = event.date;
      } else {
        minDate = event.date;
      }

      this.selectedRange = this.datesMinMax([minDate, maxDate]);
    },

    onWeekDayMouseDown(event: WeekDayEvent) {
      this.inMutipleSelection = true;
      this.selectionOrigin = event.date;
      this.selectedRange.push(event.date);
    },

    goToToday() {
      this.calenderStartDay = new Date();
    },

    prevPage() {
      const nextDate = this.calenderStartDay.getDate() - this.offsetDays;
      this.calenderStartDay = new Date(this.calenderStartDay.setDate(nextDate));
    },

    nextPage() {
      const nextDate = this.calenderStartDay.getDate() + this.offsetDays;
      this.calenderStartDay = new Date(this.calenderStartDay.setDate(nextDate));
    },

    generateDays() {
      this.dates = this.getDatesInOffset(this.calenderStartDay, this.offsetDays);
    },
  },
  computed: {
    offsetDays() {
      return this.rows * 7;
    },

    weeks() {
      return this.splitArray(this.dates, 7);
    },

    selectedDates() {
      const [minDate, maxDate] = this.selectedRange;

      return this.getDatesInRange(minDate, maxDate);
    },

    todayInPage() {
      const currTime = Date.now();
      const startTime = this.calenderStartDay.getTime();
      const endTime = this.calenderEndDay.getTime();

      return startTime <= currTime && currTime <= endTime;
    },

    calenderStartDay: {
      get() {
        return this.calenderStartDayData;
      },

      set(value: Date) {
        if (value.getDay()) {
          const weekDay = value.getDay();
          const monthDay = value.getDate();

          value.setDate(monthDay - weekDay);
        }

        this.calenderStartDayData = value;
      },
    },

    calenderEndDay() {
      const date = new Date(this.calenderStartDay);
      const monthDay = date.getDate();

      date.setHours(23, 59, 59);
      date.setDate((monthDay - 1) + this.offsetDays);

      return date;
    },
  },
});
</script>

<style lang="scss" scoped>
.vue-scheduler {
  width: 100%;
  user-select: none;
}

.vue-scheduler__calendar-content {
  display: flex;
  flex-direction: column;
}

.vue-scheduler__week-days {
  display: flex;
  background-color: red;
  border-radius: 4px 4px 0px 0px;
  border-color: blue;
  display: grid;
  grid-template-columns: repeat(7, minmax(100px, 1fr));
}

.vue-scheduler__controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.vue-scheduler__controls-buttons {
  display: flex;
  align-items: center;
}
</style>
