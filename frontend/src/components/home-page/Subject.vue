<template>
  <div class="subject">
    <div class="subject-banner bg-primary">
      <p class="name todo">{{ subforumPath }}</p>
    </div>
    <h3 class="subject-header">{{ subject.name }}</h3>
    <button class="reply" @click="goToWritePost">
      <i class="material-icons">reply</i> Svara
    </button>
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
import { Vue, Component } from "vue-property-decorator";
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

  get posts() {
    return this.$store.state.postStore.posts;
  }

  get loggedInUser() {
    return this.$store.state.userStore.loggedInUser;
  }

  goToWritePost() {
    if (this.loggedInUser) {
      this.$router.push("/write-post");
    } else {
      this.$router.push("/login");
    }
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
    console.log("Remove post by id: ", postId);
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
    this.putImportantPostsAtTop()
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

  .reply {
    align-items: center;
    background: lightgray;
    border: 1px solid gray;
    cursor: pointer;
    display: inline-flex;
    font-size: 0.6rem;

    i {
      font-size: 1rem;
    }
  }
}
</style>
