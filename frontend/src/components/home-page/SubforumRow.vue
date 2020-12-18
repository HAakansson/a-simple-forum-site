<template>
  <div class="subject-row">
    <div class="subject">
      <router-link class="subject-name bold underline" :to="`${subforumPath}`">{{ subforum.name }}</router-link>
      <div class="subforum-info">
        <span v-if="subjectCount !== null" class="subject-info"
          >{{ subjectCount }} ämnen -
        </span>
        <span v-if="postCount !== null" class="subject-info"
          >{{ postCount }} inlägg</span
        >
      </div>
    </div>

    <div class="newest-post">
      <p>Hejsan</p>
    </div>
  </div>
</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class SubforumRow extends Vue {
  @Prop()
  subforum;

  @Prop()
  forumName;

  subjectCount = null;
  postCount = null;

  get subforumPath() {
    return `/${this.forumName}/${this.subforum.name}`;
  }

  async fetchTotalNumberOfSubjectsBySubforumId(subforumId) {
    let subjectCount = await fetch(`/api/v1/subjects/${subforumId}/count`);
    subjectCount = await subjectCount.json();
    this.subjectCount = subjectCount;
  }

  async fetchTotalNumberOfPostsBySubForumId(subforumId) {
    let postCount = await fetch(`/api/v1/posts/subforum/${subforumId}/getTotalCount`);
    postCount = await postCount.json();
    this.postCount = postCount;
  }

  async created() {
    this.fetchTotalNumberOfSubjectsBySubforumId(this.subforum.id);
    this.fetchTotalNumberOfPostsBySubForumId(this.subforum.id);
  }
}
</script>

<style lang="scss" scoped>
.subject-row {
  border-bottom: 1px solid lightgray;
  display: grid;
  font-size: 0.8rem;
  grid-template-columns: 1fr 1fr;

  &:last-child {
    border-bottom: none;
  }

  .subject {
    background: rgb(240, 240, 240);
    padding-left: 0.5rem;

    .subject-name {
      color: black;
      cursor: pointer;
    }

    .subforum.info {
      display: flex;
    }
  }

  .newest-post {
    background: rgb(220, 220, 220);

    border-left: 1px solid lightgray;
    padding-left: 0.5rem;
  }
}
</style>
