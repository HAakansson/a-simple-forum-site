<template>
  <div class="aside-bar">
    <search />
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import Search from "./aside-bar/Search";

@Component({
  components: {
    Search,
  },
})
export default class AsideBar extends Vue {}
</script>

<style lang="scss" scoped>
.aside-bar {
  background: rgb(230, 225, 220);
  height: 100%;
  padding: 0.4rem;
}
</style>
