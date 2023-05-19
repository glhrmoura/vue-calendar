const DAY_MILLISECONDS = 86400000;

export default [
  {
    title: 'Example 1',
    data: {
      events: [
        {
          all: true,
          interval: { from: '05:00', to: '06:00' },
        },
        {
          date: new Date(),
          interval: { from: '06:00', to: '08:45' },
        },
      ],

      ranges: [
        {
          start: new Date(),
          end: new Date(Date.now() + DAY_MILLISECONDS * 8),
        },
      ],
    },
    code: `<template>
  <VueCalendar
    :events="events"
    :ranges="ranges"
  />
</template>

\<script\>
const DAY_MILLISECONDS = 86400000;

export default {
  data: () => ({
    events: [
      {
        all: true,
        interval: { from: '05:00', to: '06:00' },
      },
      {
        date: new Date(),
        interval: { from: '06:00', to: '08:45' },
      },
    ],

    ranges: [
      {
        start: new Date(),
        end: new Date(Date.now() + (DAY_MILLISECONDS * 8)),
      },
    ],
  })
}
\</script\>`,
  },
  {
    title: 'Example 2',
    data: {
      events: [
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
          start: new Date(Date.now() + DAY_MILLISECONDS * 40),
          end: new Date(Date.now() + DAY_MILLISECONDS * 51),
        },
        {
          start: new Date(Date.now() + DAY_MILLISECONDS * 75),
        },
      ],
    },
    code: `<template>
  <VueCalendar
    :events="events"
    :ranges="ranges"
  />
</template>

\<script\>
const DAY_MILLISECONDS = 86400000;

export default {
  data: () => ({
    events: [
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
        start: new Date(Date.now() + (DAY_MILLISECONDS * 40)),
        end: new Date(Date.now() + (DAY_MILLISECONDS * 51)),
      },
      {
        start: new Date(Date.now() + (DAY_MILLISECONDS * 75)),
      },
    ],
  })
}
\</script\>`,
  },
  {
    title: 'Example 3',
    data: {
      ranges: [],

      events: [
        {
          wday: 'thursday',
          interval: { from: '14:00', to: '17:00' },
        },
        {
          wday: 'monday',
          interval: { from: '18:00', to: '19:00' },
        },
      ],
    },
    code: `<template>
  <VueCalendar :events="events" />
</template>

\<script\>
export default {
  data: () => ({
    events: [
      {
        wday: 'thursday',
        interval: { from: '14:00', to: '17:00' },
      },
      {
        wday: 'monday',
        interval: { from: '18:00', to: '19:00' },
      },
    ],
  }),
};
\</script\>`,
  },
];
