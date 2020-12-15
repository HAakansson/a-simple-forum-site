<template>
  <div class="subforum-list">
    <subforum-list-item v-for="subforum of subforumList" :key="subforum.id" :subforum="subforum" />
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import SubforumListItem from "./SubforumListItem";

@Component({
  components: {
    SubforumListItem,
  },
})
export default class SubforumList extends Vue {
  get subforumList() {
    return this.$store.state.subforumStore.subforums;
  }
}
</script>

<style lang="scss" scoped></style>
