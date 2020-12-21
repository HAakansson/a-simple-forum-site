<template>
  <div class="post">
    <div class="timestamp"></div>
  </div>
</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Post extends Vue {
  @Prop()
  post;

}
</script>

<style lang="scss" scoped>

</style>