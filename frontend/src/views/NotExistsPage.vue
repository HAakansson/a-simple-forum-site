<template>
  <div class="does-not-exists">
    <h1>This page does not exists...</h1>
    <h4>Redirecting in {{ seconds }} seconds...</h4>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

@Component
export default class NotExistsPage extends Vue {
  seconds = 4;

  mounted() {
    let timer = setInterval(() => {
      this.seconds--;
      if (this.seconds === 0) {
        clearInterval(timer);
        this.$router.push("/");
      }
    }, 1000);
  }
}
</script>

<style lang="scss" scoped>
.does-not-exists {
  h1,
  h4 {
    text-align: center;
  }
}
</style>
