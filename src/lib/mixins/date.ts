import type { EventDate, WeekDay, DateRange } from '@/lib/types';

const WEEK_DAYS_TITLES_LOW = [
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
      return dates.some((dateItem) => this.isEqual(date, dateItem));
    },

    split(array: Date[] = [], subLen: number): Array<Date[]> {
      const output = [];

      for (let i = 0; i < array.length; i += subLen) {
        output.push(array.slice(i, i + subLen));
      }

      return output;
    },

    isValid(date?: Date): date is Date {
      return !isNaN(Number(date));
    },

    isEqual(date1?: Date, date2?: Date) {
      if (!this.isValid(date1) || !this.isValid(date2)) return false;

      return date1.toDateString() === date2.toDateString();
    },

    isBigger(date1: Date, date2: Date) {
      return Number(date1) > Number(date2);
    },

    isBiggerOrEqual(date1: Date, date2: Date) {
      return this.isBigger(date1, date2) || this.isEqual(date1, date2);
    },

    isEqualWeeDay(wday1: string | string[] | undefined, wday2: string) {
      return wday1?.includes(wday2);
    },

    getWeekDayTitle(date: Date) {
      return WEEK_DAYS_TITLES_LOW[date.getDay()];
    },

    getWeekDays(dates: Date[] = [], events: EventDate[] = []): WeekDay[] {
      return dates.map((date: Date) => ({
        date,
        events: events?.filter((event) => (
          event.all ||
          this.isEqual(event.date, date)) ||
          this.isEqualWeeDay(event.wday, this.getWeekDayTitle(date)),
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
      const dates = [];
      const start = new Date(startDate);
      const end = new Date(endDate);

      while (start <= end) {
        dates.push(new Date(start));
        start.setDate(start.getDate() + 1);
      }

      return dates;
    },

    getDatesInOffset(date: Date, offset: number): Date[] {
      const dates = [];

      for (let i = 1; i <= offset; i++) {
        dates.push(date);
        date = new Date(date);
        date.setDate(date.getDate() + 1);
      }

      return dates;
    },

    isInRange(date: Date, range: DateRange) {
      const rangeStart = new Date(range.start);
      const rangeEnd = new Date(range.end as Date);
      
      rangeStart.setHours(0, 0, 0);
      rangeEnd.setHours(23, 59, 59);
      
      return Number(rangeStart) <= Number(date) && Number(date) <= Number(rangeEnd);
    },

    isInRanges(date: Date, ranges: DateRange[]) {
      const isBiggerOrEqualThenNow = this.isBiggerOrEqual(date, new Date);

      if (!isBiggerOrEqualThenNow) return false;

      if ((!Array.isArray(ranges) || !ranges.length) && isBiggerOrEqualThenNow) {
        return true;
      }

      return ranges?.some((range) => {
        const rangeStartIsValid = this.isValid(range.start);
        const rangeEndIsValid = this.isValid(range.end);
  
        if (!rangeStartIsValid && isBiggerOrEqualThenNow) {
          return true;
        }

        if (!rangeEndIsValid && this.isBiggerOrEqual(date, range.start)) {
          return true;
        }

        if (!rangeStartIsValid && rangeEndIsValid) {
          return false;
        }

        return this.isInRange(date, range);
      });
    },
  },
};
