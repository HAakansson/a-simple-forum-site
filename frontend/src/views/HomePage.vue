<template>
  <div class="home-page">
    <router-view />
    <aside class="sidebar"></aside>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

@Component()
export default class Home extends Vue {
  created() {
    this.$store.dispatch("subjectStore/fetchAllSubjects");
  }
}
</script>

<style lang="scss" scoped>
.home-page {
  display: grid;
  grid-template-columns: 3fr 1fr;
  margin-top: 1rem;
}
</style>
