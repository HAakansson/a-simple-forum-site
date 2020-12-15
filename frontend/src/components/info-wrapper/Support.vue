<template>
  <div class="support bg-primary">
    <p class="support-text bold">Stöd forumet</p>
    <p class="swish">Swish: <span class="bold">123 456 789 10</span></p>
    <p class="bank">Bankgiro: <span class="bold">123-4567</span></p>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Support extends Vue {}
</script>

<style lang="scss" scoped>
.support {
  align-items: center;
  color: lightgray;
  display: flex;
  font-size: 0.8rem;
  padding: 0.3rem;

  .support-text {
    color: goldenrod;
  }

  p {
    margin: 0;
    margin-right: 0.7rem;
  }
}
</style>
