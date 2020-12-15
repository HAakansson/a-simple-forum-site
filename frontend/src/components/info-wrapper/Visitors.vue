<template>
  <div class="visitors">
    <p class="visitors-online">
      <span class="bold">10000</span> besökare online
    </p>
    <p class="posts"><span class="bold">1000</span> inlägg</p>
    <p class="members"><span class="bold">2</span> medlemmar</p>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Visitors extends Vue {}
</script>

<style lang="scss" scoped>
.visitors {
  align-items: center;
  display: grid;
  font-size: 0.8rem;
  grid-template-columns: 15% 1fr 10% 10%;
  padding: 0.3rem;

  p {
    margin: 0;
  }

  .posts {
    grid-column: 3/4;
  }

  .posts,
  .members {
    justify-self: right;
  }
}
</style>
