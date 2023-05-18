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
      <template v-for="example in examples" :key="example.title">
        <h2>
          {{ example.title }}
        </h2>

        <HighCode
          class="code-container"
          :codeValue="example.code"
          langName=" "
          fontSize="13px"
          :copy="false"
          :theme="'dark'"
          height="auto"
          width="100%"
        />

        <VueCalendar
          :rows="rowsNumber"
          :events="example.data.events"
          :ranges="example.data.ranges"
          @selectDate="onSelectDate"
          @selectDates="onSelectDates"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

import { HighCode } from 'vue-highlight-code';
import VueCalendar from '@glhrmoura/vue-calendar';

import NPMIcon from './components/icons/NPM.vue';
import GithubIcon from './components/icons/Github.vue';

import examples from './examples';

export default defineComponent({
  name: 'App',

  components: {
    NPMIcon,
    GithubIcon,
    HighCode,
    VueCalendar,
  },

  data: () => ({
    examples,
  
    rowsNumber: 1,
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
  padding: 24px 16px !important;
  z-index: 0 !important;

  .code_header {
    display: none !important;
  }

  .hljs-name, .hljs-title.class_ {
    color: #71C6B1;
  }

  .hljs-variable.constant_, .hljs-attr {
    color: #AADAFA;
  }

  .hljs-keyword {
    color: #679AD1;
  }
}
</style>
