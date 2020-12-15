<template>
  <div class="forum-list">
    <forum-list-item v-for="forum of forumList" :key="forum.id" :forum="forum" />
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import ForumListItem from "./ForumListItem";

@Component({
  components: {
    ForumListItem,
  },
})
export default class ForumList extends Vue {
  get forumList() {
    return this.$store.state.forumStore.forums;
  }
}
</script>

<style lang="scss" scoped></style>
