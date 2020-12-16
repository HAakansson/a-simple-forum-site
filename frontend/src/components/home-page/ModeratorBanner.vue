<template>
  <div class="moderator-banner">
    <span class="moderators bold">Moderatorer (0):</span>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

@Component
export default class ModeratorBanner extends Vue {}
</script>

<style lang="scss" scoped>
.moderator-banner {
  background: lightgray;
  border: 1px solid gray;
  display: flex;
  margin-top: 0.5rem;
  padding: 0 0.3rem;

  .moderators {
    font-size: 0.8rem;
  }

  span {
    margin-right: 0.5rem;
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
