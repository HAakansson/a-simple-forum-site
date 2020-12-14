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
  display: grid;
  grid-template-rows: 1fr 0.7fr;
  font-family: "Heebo", sans-serif;
  height: 8vh;
  width: 100vw;
}
</style>
