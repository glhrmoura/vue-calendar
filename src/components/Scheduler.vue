<template>
  <div class="vue-scheduler">
    <Controls
      v-if="showControls"
      :todayInPage="todayInPage"
      @nextPage="nextPage"
      @backPage="backPage"
      @goToToday="goToToday"
    />

    <table class="vue-scheduler__calendar-content">
      <thead>
        <tr class="vue-scheduler__week-days">
          <WeekDayHeader v-for="weekday in weekDays" :key="weekday">
            {{ weekday }}
          </WeekDayHeader>
        </tr>
      </thead>

      <tbody>
        <Week v-for="(week, index) in weeks" :key="index">
          <WeekDay
            v-for="(weekDay, index) in getWeekDays(week, events)"
            :key="index"
            :weekDay="weekDay"
            :selected="containsDate(selectedDates, weekDay.date)"
            :range="dateIsInRange(weekDay.date, range.start, range.end)"
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

import dateMixin from '@/mixins/date';

import type { SchedulerData, EventDate, DateRange, WeekDayActionData } from '@/types';

import Week from '@/components/Week.vue';
import WeekDay from '@/components/WeekDay.vue';
import WeekDayHeader from '@/components/WeekDayHeader.vue';
import Controls from '@/components/Controls.vue';

export default defineComponent({
  name: 'Scheduler',

  expose: ['goToToday', 'backPage', 'nextPage'],

  components: {
    Week,
    WeekDay,
    WeekDayHeader,
    Controls,
  },

  mixins: [dateMixin],

  data(): SchedulerData {
    return {
      dates: [],
      selectedRange: [],
      selectionOrigin: null,
      inMutipleSelection: false,
      schedulerStartDayData: new Date(),
      weekDays: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
    };
  },

  props: {
    events: {
      type: Array as PropType<EventDate[]>,
      default: () => ([]),
    },

    rows: {
      type: Number,
      default: 5,
    },

    showControls: {
      type: Boolean,
      default: true,
    },

    range: {
      type: Object as PropType<DateRange>,
      default: () => ({}),
    },
  },

  mounted() {
    this.schedulerStartDay = new Date(this.range.start || Date.now());
  },

  watch: {
    'range.start'(newValue) {
      this.schedulerStartDay = new Date(newValue);
    },

    offsetDays() {
      this.generateDays();
    },

    schedulerStartDay() {
      this.generateDays();
    },
  },

  methods: {
    onWeekDayClick(data: WeekDayActionData) {
      this.$emit('selectDate', data);
    },

    onWeekDayMouseUp() {
      if (this.selectedDates.length > 1) {
        this.$emit('selectDates', { dates: this.selectedDates });
      }

      this.selectedRange = [];
      this.inMutipleSelection = false;
      this.selectionOrigin = null;
    },

    onWeekDayMouseEnter(data: WeekDayActionData) {
      if (!this.inMutipleSelection || this.selectedRange.includes(data.date)) return;

      let [minDate, maxDate] = this.datesMinMax(this.selectedRange);

      if (Number(this.selectionOrigin) === Number(minDate)) {
        maxDate = data.date;
      } else {
        minDate = data.date;
      }

      this.selectedRange = this.datesMinMax([minDate, maxDate]);
    },

    onWeekDayMouseDown(data: WeekDayActionData) {
      this.inMutipleSelection = true;
      this.selectionOrigin = data.date;
      this.selectedRange.push(data.date);
    },

    goToToday() {
      this.schedulerStartDay = new Date();
    },

    backPage() {
      const nextDate = this.schedulerStartDay.getDate() - this.offsetDays;
      this.schedulerStartDay = new Date(this.schedulerStartDay.setDate(nextDate));
    },

    nextPage() {
      const nextDate = this.schedulerStartDay.getDate() + this.offsetDays;
      this.schedulerStartDay = new Date(this.schedulerStartDay.setDate(nextDate));
    },

    generateDays() {
      this.dates = this.getDatesInOffset(this.schedulerStartDay, this.offsetDays);
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
      const startTime = this.schedulerStartDay.getTime();
      const endTime = this.calenderEndDay.getTime();

      return startTime <= currTime && currTime <= endTime;
    },

    schedulerStartDay: {
      get() {
        return this.schedulerStartDayData;
      },

      set(value: Date) {
        if (value.getDay()) {
          const weekDay = value.getDay();
          const monthDay = value.getDate();

          value.setDate(monthDay - weekDay);
        }

        this.schedulerStartDayData = value;
      },
    },

    calenderEndDay() {
      const date = new Date(this.schedulerStartDay);
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
  display: grid;
  background-color: #f6f6f6;
  border-radius: 2px 2px 0px 0px;
  box-shadow: 0px 0px 0px 1px #cfcaca;
  grid-template-columns: repeat(7, minmax(100px, 1fr));
}
</style>
