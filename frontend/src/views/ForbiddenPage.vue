<template>
  <div class="forbidden-page">
    <div class="wrapper">
      <h1>Access to this site is forbidden</h1>
      <h4>Redirecting in {{seconds}} seconds...</h4>
    </div>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

@Component
export default class ForbiddenPage extends Vue {
  seconds = 4;

  mounted(){
    let timer = setInterval(() => {
      this.seconds--
      if(this.seconds === 0) {
        clearInterval(timer)
        this.$router.push("/")
      }
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
.forbidden-page {
  .wrapper {
    h1, h4 {
      text-align: center;
    }
  }
}
</style>
