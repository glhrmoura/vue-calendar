<template>
  <div class="vue-calendar">
    <Controls
      v-if="controls"
      :todayInPage="todayInPage"
      @nextPage="nextPage"
      @backPage="backPage"
      @goToToday="goToToday"
    />

    <table class="vue-calendar__calendar-content">
      <thead>
        <tr class="vue-calendar__week-days">
          <WeekDayHeader v-for="weekDay in weekDays" :key="weekDay">
            {{ weekDay }}
          </WeekDayHeader>
        </tr>
      </thead>

      <tbody>
        <Week v-for="(week, index) in weeks" :key="index">
          <WeekDay
            v-for="(weekDay, index) in getWeekDays(week, events)"
            :key="index"
            :weekDay="weekDay"
            :range="isInRanges(weekDay.date, ranges)"
            :selected="contains(weekDay.date, selectedDates)"
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

import type { CalendarData, EventDate, DateRange, WeekDayActionData } from '@/types';

import Week from '@/components/Week.vue';
import WeekDay from '@/components/WeekDay.vue';
import Controls from '@/components/Controls.vue';
import WeekDayHeader from '@/components/WeekDayHeader.vue';

export default defineComponent({
  name: 'Calendar',

  expose: ['goToToday', 'backPage', 'nextPage'],

  components: {
    Week,
    WeekDay,
    WeekDayHeader,
    Controls,
  },

  mixins: [dateMixin],

  data(): CalendarData {
    return {
      dates: [],
      selectedRange: [],
      selectionOrigin: null,
      inMutipleSelection: false,
      calendarStartDayData: new Date(),
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

    controls: {
      type: Boolean,
      default: true,
    },

    ranges: {
      type: Array as PropType<DateRange[]>,
      default: () => ([]),
    },
  },

  mounted() {
    this.calendarStartDay = new Date;
  },

  watch: {
    offsetDays() {
      this.generateDays();
    },

    calendarStartDay() {
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
      if (!this.inMutipleSelection) return;

      let [minDate, maxDate] = this.getMinAndMax(this.selectedRange);

      if (Number(this.selectionOrigin) === Number(minDate)) {
        maxDate = data.date;
      } else {
        minDate = data.date;
      }

      this.selectedRange = this.getMinAndMax([minDate, maxDate]);
    },

    onWeekDayMouseDown(data: WeekDayActionData) {
      this.inMutipleSelection = true;
      this.selectionOrigin = data.date;
      this.selectedRange.push(data.date);
    },

    goToToday() {
      this.calendarStartDay = new Date();
    },

    backPage() {
      const nextDate = this.calendarStartDay.getDate() - this.offsetDays;
      this.calendarStartDay = new Date(this.calendarStartDay.setDate(nextDate));
    },

    nextPage() {
      const nextDate = this.calendarStartDay.getDate() + this.offsetDays;
      this.calendarStartDay = new Date(this.calendarStartDay.setDate(nextDate));
    },

    generateDays() {
      this.dates = this.getDatesInOffset(this.calendarStartDay, this.offsetDays);
    },
  },

  computed: {
    offsetDays() {
      return this.rows * 7;
    },

    weeks() {
      return this.split(this.dates, 7);
    },

    selectedDates() {
      const [minDate, maxDate] = this.selectedRange;

      return this.getDatesInRange(minDate, maxDate);
    },

    todayInPage() {
      const currTime = Date.now();
      const startTime = this.calendarStartDay.getTime();
      const endTime = this.calenderEndDay.getTime();

      return startTime <= currTime && currTime <= endTime;
    },

    calendarStartDay: {
      get() {
        return this.calendarStartDayData;
      },

      set(value: Date) {
        if (value.getDay()) {
          const weekDay = value.getDay();
          const monthDay = value.getDate();

          value.setDate(monthDay - weekDay);
        }

        this.calendarStartDayData = value;
      },
    },

    calenderEndDay() {
      const date = new Date(this.calendarStartDay);
      const monthDay = date.getDate();

      date.setHours(23, 59, 59);
      date.setDate((monthDay - 1) + this.offsetDays);

      return date;
    },
  },
});
</script>

<style lang="scss" scoped>
.vue-calendar {
  width: 100%;
  user-select: none;
  font-family: sans-serif;
}

.vue-calendar__calendar-content {
  display: flex;
  flex-direction: column;
}

.vue-calendar__week-days {
  display: grid;
  background-color: #FFFFFF;
  border-radius: 2px 2px 0px 0px;
  box-shadow: 0px 0px 0px 1px #D5D4DF;
  grid-template-columns: repeat(7, minmax(100px, 1fr));

  @media (max-width: 768px) {
    display: none;
  }
}
</style>
