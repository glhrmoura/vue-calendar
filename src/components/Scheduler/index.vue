<template>
  <div class="blv-calendar">
    <div class="blv-calendar__controls">
      <div />
      <div class="blv-calendar__controls__btns">
        <button
          v-if="!todayInPage"
          @click="goToday"
          class="blv-calendar__controls__btn-today"
        >
          Voltar para Hoje
        </button>
        <button
          class="blv-calendar__controls__btn-pagination"
          @click="prevPage"
        >
          Prev
        </button>
        <button
          class="blv-calendar__controls__btn-pagination"
          @click="nextPage"
        >
          Next
        </button>
      </div>
    </div>
    <table class="blv-calendar__calendar-grid">
      <thead>
        <tr
          class="blv-calendar__header__week-days"
        >
          <th class="blv-calendar__header__week-day">
            Domingo
          </th>
          <th class="blv-calendar__header__week-day">
            Segunda
          </th>
          <th class="blv-calendar__header__week-day">
            Terça
          </th>
          <th class="blv-calendar__header__week-day">
            Quarta
          </th>
          <th class="blv-calendar__header__week-day">
            Quinta
          </th>
          <th class="blv-calendar__header__week-day">
            Sexta
          </th>
          <th class="blv-calendar__header__week-day">
            Sabado
          </th>
        </tr>
      </thead>
      <tbody>
        <week v-for="(week, index) in weeks" :key="index">
          <week-day
            v-for="(weekDay, index) in getDatesWithRules(week, rules)"
            :day="weekDay"
            :key="index"
            :selected="has(weekDay.date, selectedDates)"
            :range="inRange(weekDay.date, range.start, range.end)"
            @click-day-end="onClickDayEnd"
            @click-day-start="onClickDayStart"
            @mouse-enter-day="onMouseEnterDay"
          />
        </week>
      </tbody>
    </table>
  </div>
</template>

<script>
import bus from './event-bus';

import mixinDateHelper from '@/mixins/date-mixin';

import Week from './components/Week';
import WeekDay from './components/WeekDay';

export default {
  components: {
    Week,
    WeekDay,
  },
  mixins: [mixinDateHelper],
  data() {
    return {
      dates: [],
      selectedRange: [],
      selectionOrigin: null,
      selectionTarget: null,
      multipleSelection: false,
      calenderStartDayData: new Date(),
    };
  },
  props: {
    rules: {
      type: Array,
      default: () => ([]),
    },
    rows: {
      type: Number,
      default: 5,
    },
    range: {
      type: [Object],
      default: () => ({
        start: new Date(),
        end: null,
      })
    },
  },
  mounted() {
    this.calenderStartDay = new Date(this.range.start || Date.now());
  },
  watch: {
    'range.start'(newVal) {
      this.calenderStartDay = new Date(newVal);
    },
    periodOffset() {
      this.generateDays();
    },
    calenderStartDay() {
      this.generateDays();
    },
    selectionOrigin(newVal) {
      bus.$emit('change-selection-origin', newVal);
    },
    selectionTarget(newVal) {
      bus.$emit('change-selection-target', newVal);
    },
  },
  methods: {
    onMouseEnterDay(event) {
      if (!this.multipleSelection || this.selectedRange.includes(event.date)) return;

      let [minDate, maxDate] = this.datesMinMax(this.selectedRange);

      if (Number(this.selectionOrigin) === Number(minDate)) {
        maxDate = event.date;
      } else {
        minDate = event.date;
      }

      this.selectedRange = this.datesMinMax([minDate, maxDate]);
      this.selectionTarget = event.date;
    },
    onClickDayStart(event) {
      this.multipleSelection = true;
      this.selectionOrigin = event.date;
      this.selectedRange.push(event.date);
      this.selectionTarget = event.date;
    },
    onClickDayEnd(event) {
      this.$emit('select-dates', this.selectedDates);

      this.selectedRange = [];
      this.multipleSelection = false;
      this.selectionOrigin = null;
      this.selectionTarget = null;
    },
    goToday() {
      this.calenderStartDay = new Date();
    },
    prevPage() {
      const nextDate = this.calenderStartDay.getDate() - this.periodOffset;
      this.calenderStartDay = new Date(this.calenderStartDay.setDate(nextDate));
    },
    nextPage() {
      const nextDate = this.calenderStartDay.getDate() + this.periodOffset;
      this.calenderStartDay = new Date(this.calenderStartDay.setDate(nextDate));
    },
    generateDays() {
      this.dates = this.getDatesInOffset(this.calenderStartDay, this.periodOffset);
    },
  },
  computed: {
    weeks() {
      return this.splitArray(this.dates, 7);
    },
    periodOffset() {
      return this.rows * 7;
    },
    selectedDates() {
      const [minDate, maxDate] = this.selectedRange;

      return this.getDatesInRange(minDate, maxDate);
    },
    todayInPage() {
      const currTime = Date.now();
      const startTime = this.calenderStartDay.getTime();
      const endTime = this.calenderEndDay.getTime();

      return (
        startTime <= currTime
        && currTime <= endTime
     );
    },
    calenderStartDay: {
      get() {
        return this.calenderStartDayData;
      },
      set(value) {
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
      date.setDate((monthDay - 1) + this.periodOffset);

      return date;
    },
    userTimezone() {
      const timeZoneString = Intl
        .DateTimeFormat()
        .resolvedOptions()
        .timeZone;

      return `${timeZoneString} UTC ${timeZoneString}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.blv-calendar {
  width: 100%;
  user-select: none;
}

.blv-calendar__calendar-grid {
  display: flex;
  flex-direction: column;
}

.blv-calendar__header__week-days {
  display: flex;
  background-color: black;
  border-radius: 4px 4px 0px 0px;
  border-color: blue;
  display: grid;
  grid-template-columns: repeat(7, minmax(100px, 1fr));
}

.blv-calendar__header__week-day {
  flex-grow: 1;
  text-align: center;
  color: #a8a8a8;
  font-size: 14px;
  padding: 4px;
  font-weight: normal;
}

.blv-calendar__controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.blv-calendar__controls__btns {
  display: flex;
  align-items: center;
}

.blv-calendar__controls__btn-today {
  background-color: transparent;
  border: none;
  outline: none;
  text-decoration: underline;
  font-size: 14px;
  margin-right: 12px;
}

.blv-calendar__controls__btn-pagination {
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
