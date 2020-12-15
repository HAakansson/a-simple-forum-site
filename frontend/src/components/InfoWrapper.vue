<template>
  <div class="info-wrapper bg-secondary">
    <visitors />
    <support />
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import Visitors from "./info-wrapper/Visitors";
import Support from "./info-wrapper/Support";

@Component({
  components: {
    Visitors,
    Support,
  },
})
export default class InfoWrapper extends Vue {}
</script>

<style lang="scss" scoped>
  .info-wrapper {
    margin-top: 1rem;
  }
</style>
