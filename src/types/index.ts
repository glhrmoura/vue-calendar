export type ArrowDir = 'top' | 'right' | 'bottom' | 'left';

export type ButtonType = 'arrow' | 'link';

export interface Interval {
  from: string;
  to: string;
}

export interface Range {
  start?: Date;
  end?: Date;
}

export interface WeekDayEvent {
  date: Date;
}

export interface Rule {
  date?: Date;
  wday?: string;
  intervals: Interval[];
}

export interface WeekDay {
  date: Date;
  rule?: Rule;
}

export interface SchedulerData {
  dates: Date[];
  selectedRange: Date[];
  selectionOrigin: Date | null;
  inMutipleSelection: boolean;
  calenderStartDayData: Date;
  weekDays: string[];
}
