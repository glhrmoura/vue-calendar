import type { EventDate, WeekDay, DateRange } from '@/types';

const WEEK_DAYS = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

export default {
  methods: {
    contains(date: Date, dates: Date[]) {
      return Boolean(dates.find((dateItem) => this.equalDay(date, dateItem)));
    },

    split(array: Date[] = [], subLen: number): Array<Date[]> {
      const output = [];

      for (let i = 0; i < array.length; i += subLen) {
        output.push(array.slice(i, i + subLen));
      }

      return output;
    },

    biggerOrEqual (date1: Date, date2: Date) {
      return Number(date1) > Number(date2) || this.equalDay(date1, date2);
    },

    isValid(date?: Date): date is Date {
      return !isNaN(Number(date));
    },

    equalDay(date1?: Date, date2?: Date) {
      if (!this.isValid(date1) || !this.isValid(date2)) {
        return false;
      }

      return date1.toDateString() === date2.toDateString();
    },

    getWeekDays(dates: Date[] = [], events: EventDate[] = []): WeekDay[] {
      return dates.map((date: Date) => ({
        date,
        events: events.filter((event) => (
          this.equalDay(event.date, date)) ||
          event.wday === WEEK_DAYS[date.getDay()],
        ),
      }));
    },

    getMinAndMax(dates: Date[] = []) {
      return [
        new Date(Math.min(...dates.map(Number))),
        new Date(Math.max(...dates.map(Number))),
      ];
    },

    getDatesInRange(startDate: Date, endDate: Date = startDate) {
      const days = [];
      const start = new Date(startDate);
      const end = new Date(endDate);

      while (start <= end) {
        days.push(new Date(start));
        start.setDate(start.getDate() + 1);
      }

      return days;
    },

    getDatesInOffset(date: Date, offset: number): Date[] {
      const days = [];

      for (let i = 1; i <= offset; i++) {
        days.push(date);
        date = new Date(date);
        date.setDate(date.getDate() + 1);
      }

      return days;
    },

    inRanges(date: Date, ranges: DateRange[]) {
      if (!this.biggerOrEqual(date, new Date)) return false;

      if (!Array.isArray(ranges) && this.biggerOrEqual(date, new Date)) {
        return true;
      }

      return ranges?.some((range) => {
        const startIsValid = this.isValid(range.start);
        const endIsValid = this.isValid(range.end);
  
        if (!startIsValid && this.biggerOrEqual(date, new Date)) {
          return true;
        }

        if (!endIsValid && this.biggerOrEqual(date, range.start)) {
          return true;
        }

        if (!startIsValid && endIsValid) {
          return false;
        }

        const start = new Date(range.start);
        const end = new Date(range.end as Date);
        
        start.setHours(0, 0, 0);
        end.setHours(23, 59, 59);
        
        return Number(start) <= Number(date) && Number(date) <= Number(end);
      });
    },
  },
};
