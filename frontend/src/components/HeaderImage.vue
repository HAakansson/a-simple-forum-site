<template>
  <div class="header">
    <h1 class="primary">Forumet</h1>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Header extends Vue {}
</script>

<style lang="scss" scoped>
.header {
  align-items: center;
  background-image: url("https://www.aa.com/content/images/customer-service/programs-products/group-meeting-travel-banner.jpg");
  background-repeat: no-repeat;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  display: flex;
  font-family: "Patua One", cursive;
  height: 35vh;
  justify-content: center;
  margin-top: 1rem;

  h1 {
    font-size: 4rem;
  }
}
</style>
