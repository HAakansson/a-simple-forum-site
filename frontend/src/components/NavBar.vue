<template>
  <nav class="navbar">
    <upper-nav-bar />
    <lower-nav-bar />
  </nav>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import UpperNavBar from "./nav-bar/UpperNavBar";
import LowerNavBar from "./nav-bar/LowerNavBar";

@Component({
  components: {
    UpperNavBar,
    LowerNavBar,
  },
})
export default class NavBar extends Vue {}
</script>

<style lang="scss" scoped>
.navbar {
  border-bottom: 1px solid rgb(25, 25, 25);

  display: grid;
  grid-template-rows: 1fr 0.7fr;
  height: 8vh;
  width: 100vw;
}
</style>
