<template>
  <div class="forum-list-item">
    <div class="forum-banner bg-primary">
      <p class="name">{{ forum.name }}</p>
      <span class="collapse-button material-icons">minimize</span>
    </div>
    <div class="subforum-wrapper">
      <subforum-row
        v-for="subforum in subforums"
        :key="subforum.id"
        :subforum="subforum"
      />
    </div>
  </div>
</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";
import SubforumRow from "./SubforumRow";

@Component({
  components: {
    SubforumRow,
  },
})
export default class ForumListItem extends Vue {
  @Prop()
  forum;

  get subforums() {
    return this.$store.state.forumStore.subforums?.filter(
      (subforum) => subforum.forum_id === this.forum.id
    );
  }
}
</script>

<style lang="scss" scoped>
.forum-list-item {
  .forum-banner {
    display: flex;
    color: lightgray;
    justify-content: space-between;
    padding: 0 0.3rem;

    .name,
    .collapse-button {
      cursor: pointer;

      &:hover {
        color: white;
      }
    }
  }

  .subforum-wrapper {
    border: 1px solid lightgray;
    margin: 0.3rem 0;
  }
}
</style>
