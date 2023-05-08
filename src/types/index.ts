export type ButtonType = 'arrow' | 'link';

export type ArrowDirection = 'top' | 'right' | 'bottom' | 'left';

export interface TimeInterval {
  from: string;
  to: string;
}

export interface DateRange {
  start: Date;
  end?: Date;
}

export interface EventDate {
  date?: Date;
  all?: boolean;
  wday?: string | string[];
  interval: TimeInterval;
}

export interface WeekDay {
  date: Date;
  events: EventDate[];
}

export interface WeekDayActionData {
  date: Date;
  events: Event[];
}

export interface CalendarData {
  dates: Date[];
  selectedRange: Date[];
  selectionOrigin: Date | null;
  inMutipleSelection: boolean;
  calendarStartDayData: Date;
  weekDays: string[];
}
