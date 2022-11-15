<template>
  <td
    @mouseup="onClickUp"
    @mouseenter="onEnter"
    @mousedown="onClickDown"
    class="calendar__week__week-day"
    :class="{
      'calendar__week__week-day--in-range': range,
      'calendar__week__week-day--selected': selected,
      'calendar__week__week-day--is-origin': equalSelectionOrigin,
      'calendar__week__week-day--less-origin': lessSelectionOrigin,
      'calendar__week__week-day--larger-origin': biggerSelectionOrigin
    }"
  >
    <div
      class="calendar__week__week-day__day-number"
      :class="{
        'calendar__week__week-day__day-number--highlight': isToday || firstDayMonth
      }"
    >
      <template v-if="isToday">
        <span>
          {{ stringMonth }} {{ stringWeekDay }} {{ monthDay }} (Hoje)
        </span>
      </template>
      <template v-else>
        <span> {{ stringMonth }} {{ monthDay }} </span>
      </template>
    </div>
    <div v-if="range && day.rule" class="calendar__week__week-day__schedules">
      <div
        :key="index"
        v-for="(interval, index) in day.rule.intervals"
        class="calendar__week__week-day__event"
      >
        {{ interval.from }} - {{ interval.to }}
      </div>
    </div>
  </td>
</template>

<script>
import mixinDateHelper from '@/mixins/date-mixin';
import bus from '../event-bus';

export default {
  mixins: [mixinDateHelper],
  data() {
    return {
      selectionTarget: null,
      selectionOrigin: null,
      weekDays: [
        'Domingo',
        'Segunda',
        'Terça',
        'Quarta',
        'Quinta',
        'Sexta',
        'Sábado',
      ],
      months: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
      ],
    };
  },
  props: {
    day: Object,
    selected: Boolean,
    range: Boolean,
  },
  mounted() {
    bus.$on('change-selection-origin', (event) => {
      this.selectionOrigin = event;
    });

    bus.$on('change-selection-target', (event) => {
      this.selectionTarget = event;
    });
  },
  methods: {
    onEnter() {
      this.$emit('mouse-enter-day', {
        date: this.day.date,
      });
    },
    onClickDown() {
      this.$emit('click-day-start', {
        date: this.day.date,
      });
    },
    onClickUp() {
      this.$emit('click-day-end', {
        date: this.day.date,
      });
    },
  },
  computed: {
    isSelectionTarget() {
      return this.sameDay(this.day.date, this.selectionTarget);
    },
    equalSelectionOrigin() {
      return (
        this.isSelectionTarget
        && this.sameDay(this.day.date, this.selectionOrigin)
     );
    },
    lessSelectionOrigin() {
      return (
        this.isSelectionTarget
        && this.day.date < this.selectionOrigin
     );
    },
    biggerSelectionOrigin() {
      return (
        this.isSelectionTarget
        && this.day.date > this.selectionOrigin
     );
    },
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
    stringMonth() {
      return this.months[this.day.date.getMonth()];
    },
    weekDay() {
      return this.day.date.getDay();
    },
    stringWeekDay() {
      return this.weekDays[this.weekDay];
    },
    monthDay() {
      return this.day.date.getDate();
    },
  },
};
</script>

<style lang="scss" scoped>
.calendar__week__week-day {
  position: relative;
  padding: 8px;
  color: #a8a8a8;
  font-size: 11px;
  cursor: pointer;
  background-color: #f6f6f6;
  box-shadow: 0px 0px 0px 1px #cfcaca;
  box-sizing: border-box;

  &.calendar__week__week-day--in-range {
    background-color: #fff;

    .calendar__week__week-day__event {
      border-color: green;
      color: blue;
    }
  }

  &.calendar__week__week-day--is-origin {
    &:before,
    &:after {
      display: block;
    }
  }

  &.calendar__week__week-day--less-origin {
    &:before {
      display: block;
    }
  }

  &.calendar__week__week-day--larger-origin {
    &:after {
      display: block;
    }
  }

  &:before {
    display: none;
    position: absolute;
    top: calc(50% - 10px);
    left: -20px;
    content: "";
    width: 12px;
    height: 20px;
    background-repeat: no-repeat;
  }

  &:after {
    display: none;
    position: absolute;
    top: calc(50% - 10px);
    right: -20px;
    content: "";
    width: 12px;
    height: 20px;
    background-repeat: no-repeat;
  }

  @media (min-width: 769px) {
    &:hover {
      z-index: 10;
      box-shadow: 0px 0px 0px 1px #6382C6;
    }

    &.calendar__week__week-day--selected {
      background-color: #f2f6ff;
      box-shadow: 0px 0px 0px 1px #6382C6;
      z-index: 10;

      .calendar__week__week-day__event {
        background-color: #fff;
      }
    }
  }
}

.calendar__week__week-day__day-number {
  text-align: center;
  text-transform: uppercase;
}

.calendar__week__week-day__day-number--highlight {
  font-weight: 800;
}

.calendar__week__week-day__schedules {
  display: flex;
  flex-direction: column;
  margin-top: 12px;
}

.calendar__week__week-day__event {
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
