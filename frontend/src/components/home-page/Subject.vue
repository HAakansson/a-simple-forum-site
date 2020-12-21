<template>
  <div class="subject">
    <div class="subject-banner bg-primary">
      <p class="name">{{ subforumPath }}</p>
    </div>
    <h3 class="subject-header">{{ subject.name }}</h3>
    <button class="reply"><i class="material-icons">reply</i> Svara</button>
    <post v-for="(post, i) in posts" :key="post.id" :post="post" :nr="i+1" />
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
    return this.$route.path.replace("/", "");
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

  created() {
    this.$store.dispatch(
      "subjectStore/fetchSubjectBySubjectId",
      this.subjectId
    );
    this.$store.dispatch("postStore/fetchAllPostsBySubjectId", this.subjectId);
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
