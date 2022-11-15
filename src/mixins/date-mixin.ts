const WEEK_DAYS = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday'
];

export default {
  methods: {
    has (date: Date, dates: Date[]) {
      return Boolean(dates.find(dt => this.sameDay(date, dt)));
    },
    datesMinMax (dates = []) {
      return [
        new Date(Math.min(...dates)),
        new Date(Math.max(...dates)),
      ];
    },
    splitArray (array: [], subLen: number) {
      const output = [];

      for (let i = 0; i < array.length; i += subLen) {
        output.push(array.slice(i, i + subLen));
      }

      return output;
    },
    getDatesWithRules (dates = [], rules = []) {
      type Rule = {
        date?: Date;
        wday?: string;
        intervals: { from: string, to: string }[];
      };

      return dates.map((date: Date) => ({
        date,
        rule: (
          rules.find((rule: Rule) => this.sameDay(rule.date, date)) ||
          rules.find((rule: Rule) => rule.wday === WEEK_DAYS[date.getDay()])
        ),
      }))
    },
    getDatesInRange (startDate: Date, endDate: Date = startDate) {
      const days = [];
      const start = new Date(startDate);
      const end = new Date(endDate);

      while (start <= end) {
        days.push(new Date(start));
        start.setDate(start.getDate() + 1);
      }

      return days;
    },
    getDatesInOffset (date: Date, offset: number) {
      const days = [];
      
      for (let i = 1; i <= offset; i++) {
        days.push(date);
        date = new Date(date);
        date.setDate(date.getDate() + 1)
      }

      return days;
    },
    sameDay (date1?: Date, date2?: Date) {
      if (!date1 || !date2) return false;
      
      date1 = new Date(date1);
      date2 = new Date(date2);
      
      if (isNaN(Number(date1)) || isNaN(Number(date2))) {
        return false;
      }
      
      return date1.toDateString() === date2.toDateString();
    },
    inRange (date: Date, startRange: Date, endRange: Date) {
      if (startRange && endRange) {
        const start = new Date(startRange);
        const end = new Date(endRange);

        start.setHours(0, 0, 0);
        end.setHours(23, 59, 59);

        return (Number(start) <= Number(date) && Number(date) <= Number(end));
      }

      if (Number(date) < Date.now() && !this.sameDay(date, new Date)) return false;

      return true;
    },
  },
};
