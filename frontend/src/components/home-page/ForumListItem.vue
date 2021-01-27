<template>
  <div class="forum-list-item">
    <div class="forum-banner bg-primary">
      <p class="name" @click="goToForumSubjects">{{ forum.name }}</p>
      <!-- <span class="collapse-button"
        ><i class="material-icons todo">minimize</i></span
      > -->
    </div>
    <div class="subforum-wrapper">
      <subforum-row
        v-for="subforum in subforums"
        :key="subforum.id"
        :subforum="subforum"
        :forumName="forum.name"
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
    return this.$store.getters["forumStore/subforumsByForumId"](this.forum.id);
  }

  goToForumSubjects(){
    this.$router.push({name: "ForumSubjects", params: {forumName: this.forum.name, forumId: this.forum.id}})
  }
}
</script>

<style lang="scss" scoped>
.forum-list-item {
  .forum-banner {
    align-items: center;
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

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
