<p align="center">
  <img style="object: contain; height: 150px" alt="RapidAPI" src="https://raw.githubusercontent.com/glhrmoura/vue-scheduler/main/static/logo.png">
</p>

# 📅 Vue Scheduler

A library to assist in scheduling appointments

## Install

```bash
$ npm install @glhrm/vue-scheduler --save

or 

$ yarn add @glhrm/vue-scheduler
```

## Usage

```html
<template>
  <VueScheduler
    :events="events"
    :ranges="ranges"
  />
</template>

<script>
  import VueScheduler from '@glhrm/vue-scheduler';

  export default {
    components: {
      VueScheduler,
    },
  
    data() {
      return {
        events: [
          {
            all: true,
            interval: { from: '05:00', to: '06:00' },
          },
          {
            date: new Date,
            interval: { from: '06:00', to: '08:45' },
          },
          {
            wday: ['monday', 'wednesday', 'thursday', 'friday'],
            interval: { from: '09:00', to: '11:00' },
          },
          {
            wday: 'thursday',
            interval: { from: '11:00', to: '12:00' },
          },
        ],

        ranges: [
          {
            start: new Date,
            end: new Date,
          },
          {
            start: new Date,
            end: new Date,
          },
          {
          /**
           * Passing only the {start} property we will have a range that will 
           * start on the given date and cover all subsequent dates
           **/
            start: new Date,
          },
        ],
      };
    },
  };
</script>
```

## Properties

#### Scheduler

| Property      | Description                                                | Type                | Default        |
| ------------- | ---------------------------------------------------------- | ------------------- | -------------- |
| events        | Events that will be shown on the scheduler                 | [Event[]](#event)   | `[]`           |
| ranges        | A range of dates that will be highlighted in the scheduler | [Range[]](#range)   | `[]`           |
| rows          | Number of lines that the scheduler will show               | `Number`            | `5`            |
| controls      | Indicates whether action buttons will be shown             | `Boolean`           | `true`         |

#### Event

| Property          |  Description                                                                                        |  Type                 |
| ----------------- | --------------------------------------------------------------------------------------------------- | --------------------- |
| wday              | Used to define recurring events                                                                     | `String or String[]`  |
| date              | Used to set events on fixed dates (Takes precedence over `wday`)                                    | `Date`                |
| all               | Used to define that an event will happen every day. This property takes precedence over all others  | `Boolean`             |
| interval          | An object that informs the start and end time of the event                                          | [Interval](#interval) |

#### Range

| Property        |  Description       |  Type  |
| --------------- | ------------------ | ------ |
| start           | Range start date   | `Date` |
| end             | Range end date     | `Date` |

#### Interval

| Property        |  Description         |  Type    |
| --------------- | -------------------- | -------- |
| from            | Event start time     | `String` |
| to              | Event end time       | `String` |


## Events

| Name            | Description                                                     | Callback Arguments      |
| --------------- | --------------------------------------------------------------- | ----------------------- |
| select-date     | When only one date is selected with a simple click              | `{ date: Date   }`      |
| select-dates    | When multiple dates are selected by clicking and dragging       | `{ dates: Date[] }`     |


## License

[MIT](https://github.com/glhrmoura/vue-scheduler/blob/main/LICENSE)

Copyright (c) Guilherme Moura
