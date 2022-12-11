<template>
  <pre v-highlightjs>
    <code class="html">
      <template v-if="$slots.template">
        &lt;template&gt;
          <slot name="template" />
        &lt;/template&gt;
      </template>

      <template v-if="$slots.script">
        &lt;script&gt;
          <slot name="script" />
        &lt;/script&gt;
      </template>

      <template v-if="$slots.style">
        &lt;style&gt;
          <slot name="style" />
        &lt;/style&gt;
      </template>
    </code>
  </pre>
</template>
