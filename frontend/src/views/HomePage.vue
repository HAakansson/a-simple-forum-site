<template>
  <div class="home-page">
    <router-view />
    <aside-bar />
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import AsideBar from "../components/AsideBar";

@Component({
  components: {
    AsideBar
  }
})
export default class Home extends Vue {
}
</script>

<style lang="scss" scoped>
.home-page {
  column-gap: 10px;
  display: grid;
  grid-template-columns: 3fr 1fr;
  margin-top: 1rem;
}
</style>
