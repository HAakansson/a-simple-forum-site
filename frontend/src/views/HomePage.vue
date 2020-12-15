<template>
  <div class="home-page">
    <div class="subforum-list"></div>
    <aside class="sidebar"></aside>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.home-page {
  .info-wrapper {
    display: grid;
    grid-template-rows: 1fr 1fr;
    margin-top: 1rem;
  }
}
</style>
