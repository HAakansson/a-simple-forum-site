<template>
  <div class="subject">
    <div class="subject-banner bg-primary">
      <p class="name todo">{{ subforumPath }}</p>
    </div>
    <h3 class="subject-header">{{ subject.name }}</h3>
    <div class="subject-options">
      <button class="reply" @click="goToWritePost">
        <i class="material-icons">reply</i> Svara
      </button>
      <p v-if="locked" class="feedback"><i>Tråden är stängd</i></p>
      <button
        v-if="isAdmin || isModerator"
        class="lock-subject"
        @click="lockOrOpenSubject"
      >
        {{ !locked ? "Lås Tråd" : "Öppna Tråd" }}
      </button>
    </div>
    <post
      v-for="(post, i) in posts"
      :key="post.id"
      :post="post"
      :nr="i + 1"
      :subforumPath="subforumPath"
      @remove-post="removePost"
    />
  </div>
</template>

<script>
import { Vue, Component, Watch } from "vue-property-decorator";
import Post from "./Post";

@Component({
  components: {
    Post,
  },
})
export default class Subject extends Vue {
  get subforumPath() {
    return this.$route.path.replace("/", "").replace(/%20/g, " ");
  }
  get subforumName() {
    return this.subforumPath.split("/")[1];
  }
  get subjectId() {
    return parseInt(this.$route.path.split("/").pop());
  }
  get subject() {
    return this.$store.state.subjectStore.subject || "Laddar";
  }
  get locked() {
    return this.subject.locked == 1 ? true : false;
  }
  set locked(newVal) {
    this.subject.locked = newVal;
  }
  get posts() {
    return this.$store.state.postStore.posts;
  }
  get moderators() {
    return this.$store.state.forumStore.moderators;
  }
  get loggedInUser() {
    return this.$store.state.userStore.loggedInUser;
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

  @Watch("locked", {immediate: true})
  onLockedChange(newVal) {
    setTimeout(() => {
      let btn = document.querySelector(".reply");
      btn.disabled = newVal;
    }, 0);
  }

  goToWritePost() {
    if (this.loggedInUser) {
      this.$router.push("/write-post");
    } else {
      this.$router.push("/login");
    }
  }

  lockOrOpenSubject() {
    this.locked = this.locked ? false : true;
    let lockedSubject = this.locked ? 1 : 0;
    let btn = document.querySelector(".reply");
    btn.disabled = this.locked ? true : false;
    this.$store.dispatch("subjectStore/updateLockSubject", {
      locked: lockedSubject,
      subjectId: this.subjectId,
    });
  }

  async removePost(postId) {
    let updatedPosts = this.posts.filter((p) => postId !== p.id);
    this.$store.commit("postStore/setPosts", updatedPosts);
    let response = await this.$store.dispatch("postStore/deletePost", postId);
    if (response.message) {
      this.$store.dispatch(
        "postStore/fetchAllPostsBySubjectId",
        this.subjectId
      );
    }
  }

  putImportantPostsAtTop() {
    let importantPosts = this.posts.filter((p) => p.important === 1);
    let sortedPosts = this.posts.filter((p) => p.important !== 1);
    sortedPosts.unshift(...importantPosts);
    this.$store.commit("postStore/setPosts", sortedPosts);
  }

  async created() {
    await this.$store.dispatch(
      "subjectStore/fetchSubjectBySubjectId",
      this.subjectId
    );
    await this.$store.dispatch(
      "postStore/fetchAllPostsBySubjectId",
      this.subjectId
    );
    await this.$store.dispatch(
      "forumStore/fetchModeratorsForSubforum",
      this.subforumName
    );
    this.putImportantPostsAtTop();
  }

  async beforeDestroy() {
    await this.$store.commit("postStore/setPosts", null);
  }
}
</script>

<style lang="scss" scoped>
.subject {
  .subject-banner {
    align-items: center;
    border: 1px solid black;
    display: flex;
    color: lightgray;
    justify-content: space-between;
    padding: 0 0.3rem;
  }

  .subject-header {
    margin: 0.6rem 0;
  }

  .subject-options {
    align-items: center;
    display: flex;
    margin-bottom: 0.5rem;
    justify-content: space-between;

    .feedback {
      font-size: 0.8rem;
      font-weight: bold;
    }

    .reply,
    .lock-subject {
      align-items: center;
      background: lightgray;
      border: 1px solid gray;
      cursor: pointer;
      display: inline-flex;
      font-size: 0.6rem;
      height: 20px;

      i {
        font-size: 1rem;
      }
    }
  }
}
</style>
