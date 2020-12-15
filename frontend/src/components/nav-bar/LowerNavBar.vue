<template>
  <div class="bg-secondary">
    <div class="lower-navbar container ">
      <p v-for="(subforum, index) in subforums" :key="index">{{ subforum }}</p>
    </div>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

@Component
export default class LowerNavBar extends Vue {

  get subforums () {
    return this.$store.state.subforumStore.subforums;
  }

  created() {
    this.$store.dispatch("subforumStore/fetchAllSubforums");
  }
}
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

    &:first-child {
      margin-left: -0.3rem;
    }

    &:hover {
      background: gray;
      color: white;
    }
  }
}
</style>
