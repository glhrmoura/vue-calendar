<template>
  <tr class="scheduler__week">
    <slot />
  </tr>
</template>

<style lang="scss" scoped>
.scheduler__week {
  flex-grow: 1;
  display: grid;
  grid-gap: 1px;
  grid-template-columns: repeat(7, minmax(100px, 1fr));
  grid-template-rows: repeat(1, minmax(140px, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(7, minmax(140px, 1fr));
  }
}
</style>
