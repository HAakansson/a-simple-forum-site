<template>
  <div class="post">
    <div class="post-banner">
      <div class="timestamp">{{ time }}</div>
      <div v-if="post.important" class="important">!VIKTIGT INLÄGG!</div>
      <div class="number bold">#{{ nr }}</div>
    </div>
    <div class="post-wrapper">
      <div class="author-info">user# {{ post.user_id }}</div>
      <div class="post-content" :class="{ important_post: post.important }">
        <p class="content">{{ post.content }}</p>
        <span
          v-if="isAdmin || isModerator"
          class="remove-post"
          @click="removeTodo"
          ><i class="material-icons">delete</i></span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Post extends Vue {
  @Prop()
  post;
  @Prop()
  nr;
  @Prop()
  subforumPath;

  get loggedInUser() {
    return this.$store.state.userStore.loggedInUser;
  }

  get moderators() {
    return this.$store.state.forumStore.moderators;
  }

  get isAdmin() {
    return this.$store.getters["userStore/isAdmin"]();
  }

  get isModerator() {
    if (this.$store.getters["userStore/isModerator"]()) {
      return this.moderators?.find((m) => m.email === this.loggedInUser.email);
    }
    return false;
  }

  get time() {
    return new Date(this.post.timestamp).toLocaleString();
  }

  removeTodo() {
    this.$emit("remove-post", this.post.id);
  }
}
</script>

<style lang="scss" scoped>
.post {
  .post-banner {
    background: gray;
    display: flex;
    font-size: 0.7rem;
    justify-content: space-between;
    padding-left: 0.5rem;
    padding-right: 0.5rem;

    .important {
      color: rgb(160, 160, 70);
      font-weight: bold;
    }
  }

  .post-wrapper {
    display: grid;
    grid-template-columns: 20% 80%;

    .author-info {
      // background: lightgray;
      padding: 0.4rem;
    }

    .post-content {
      position: relative;
      font-size: 0.8rem;
      min-height: 50px;
      padding: 0.4rem;

      .remove-post {
        cursor: pointer;
        bottom: 0;
        position: absolute;
        right: 0;
        user-select: none;
      }
    }

    .important_post {
      background: rgb(160, 160, 70) !important;
    }
  }
}
</style>
