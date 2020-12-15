<template>
  <div class="subforum">
    <div class="subforums-wrapper">
      <subforum-list />
    </div>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import SubforumList from "./SubforumList";

@Component({
  components: {
    SubforumList,
  },
})
export default class Subforum extends Vue {}
</script>

<style lang="scss" scoped></style>
