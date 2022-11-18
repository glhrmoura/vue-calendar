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

export interface WeekDayActionEvent {
  date: Date;
}

export interface WeekDayEvent {
  date?: Date;
  wday?: string;
  interval: Interval;
}

export interface WeekDay {
  date: Date;
  events: WeekDayEvent[];
}

export interface SchedulerData {
  dates: Date[];
  selectedRange: Date[];
  selectionOrigin: Date | null;
  inMutipleSelection: boolean;
  schedulerStartDayData: Date;
  weekDays: string[];
}
