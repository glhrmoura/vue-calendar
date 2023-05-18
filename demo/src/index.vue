<template>
  <div class="app-demo">
    <header class="app-demo__header">
      <h1 class="app-demo__title">
        Vue Calendar
      </h1>

      <div class="app-demo__header-links">
        <a
          title="github"
          target="_blank"
          class="header-link"
          href="https://github.com/glhrmoura/vue-calendar"
        >
          <GithubIcon />
        </a>

        <a
          title="npm"
          target="_blank"
          class="header-link"
          href="https://www.npmjs.com/package/@glhrmoura/vue-calendar"
        >
          <NPMIcon />
        </a>
      </div>
    </header>

    <div class="app-demo__content">
      <h2>
        Example 1
      </h2>

      <HighCode
        class="code-container"
        :codeValue="codes.example1"
        langName=" "
        fontSize="12px"
        :copy="false"
        :theme="'dark'"
        height="auto"
        width="100%"
      />

      <VueCalendar
        :rows="rowsNumber"
        :events="calendar1.events"
        :ranges="calendar1.ranges"
        @selectDate="onSelectDate"
        @selectDates="onSelectDates"
      />

      <h2>
        Example 2
      </h2>

      <HighCode
        class="code-container"
        :codeValue="codes.example2"
        langName=" "
        fontSize="12px"
        :theme="'dark'"
        :copy="false"
        height="auto"
        width="100%"
        borderRadius="6px"
      />

      <VueCalendar
        :rows="rowsNumber"
        :events="calendar2.events"
        :ranges="calendar2.ranges"
        @selectDate="onSelectDate"
        @selectDates="onSelectDates"
      />

      <h2>
        Example 3
      </h2>

      <HighCode
        class="code-container"
        :codeValue="codes.example3"
        langName=" "
        fontSize="12px"
        :theme="'dark'"
        :copy="false"
        height="auto"
        width="100%"
        borderRadius="6px"
      />

      <VueCalendar
        :rows="rowsNumber"
        :events="calendar3.events"
        :ranges="calendar3.ranges"
        @selectDate="onSelectDate"
        @selectDates="onSelectDates"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

import { HighCode } from 'vue-highlight-code';
import VueCalendar from '@glhrmoura/vue-calendar';

import codes from './config/codes';

import NPMIcon from './components/icons/NPM.vue';
import GithubIcon from './components/icons/Github.vue';

const DAY_MILLISECONDS = 86400000;

export default defineComponent({
  name: 'Index',

  components: {
    NPMIcon,
    GithubIcon,
    HighCode,
    VueCalendar,
  },

  data: () => ({
    rowsNumber: 1,

    codes,

    calendar1: {
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
    },

    calendar2: {
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
    },

    calendar3: {
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
  
      ranges: [],
    },
  }),

  mounted() {
    this.rowsNumber = window.innerWidth > 768 ? 5 : 1;
    window.addEventListener('resize', () => this.rowsNumber = window.innerWidth > 768 ? 5 : 1);
  },

  methods: {
    onSelectDate(data) {
      alert(JSON.stringify(data, null, 4));
    },

    onSelectDates(data) {
      alert(JSON.stringify(data, null, 4));
    },
  },
});
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;400;600;700;900&display=swap');

* {
  box-sizing: border-box  ;
}

body {
  font-family: Inter, sans-serif;
  margin: 0px;
}

pre {
  max-width: 100%;
}

h1 {
  font-weight: 700;
}

h2 {
  font-weight: 400;
  font-size: 22px;
}

.app-demo {
  display: flex;
  justify-content: center;
}

.app-demo__header {
  position: fixed;
  width: 100%;
  top: 0px;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  background-color: #FFFFFF80;
  backdrop-filter: saturate(50%) blur(8px);
  border-bottom: 1px solid #3C3C3C1F;
}

.app-demo__header-links {
  display: flex;
  align-items: center;
  column-gap: 6px;
}

.header-link {
  opacity: .5;
  transition: .15s opacity;

  &:hover {
    opacity: 1;
  }
}

.app-demo__title {
  margin: 0px;
  font-size: 22px;
}

.app-demo__content {
  flex: 1;
  max-width: 910px;
  width: 100%;
  padding: 0px 16px;
  margin: 100px 0px 64px;
  position: relative;
}

.code-container {
  margin: 24px 0px;
  padding: 24px 0px !important;
  z-index: 0 !important;

  .code_header {
    display: none !important;
  }
}
</style>
