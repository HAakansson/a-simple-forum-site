<template>
  <div class="bg-secondary">
    <div class="lower-navbar container ">
      <p>Mat</p>
      <p>Sport</p>
      <p>Vetenskap</p>
    </div>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

@Component
export default class LowerNavBar extends Vue {}
</script>

<style lang="scss" scoped>
.lower-navbar {
  align-items: center;
  color: black;
  display: flex;
  font-size: 0.7rem;
  height: 100%;

  p {
    cursor: pointer;
    margin: 0;
    margin-right: 2rem;
    padding: 0.3rem;

    &:hover {
      background: gray;
      color: white;
    }
  }
}
</style>
