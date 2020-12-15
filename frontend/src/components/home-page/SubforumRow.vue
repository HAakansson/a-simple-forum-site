<template>
  <div class="subject-row">
    <div class="subject">
      <p class="subject-name bold underline">{{ subforum.name }}</p>
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

  subjectCount = null;
  postCount = null;

  async fetchAllSubjectsBySubforumId(subforumId) {
    let subjectCount = await fetch(`/api/v1/subjects/${subforumId}/count`);
    subjectCount = await subjectCount.json();
    this.subjectCount = subjectCount;
  }

  async fetchAllPostsBySubForumId(subforumId) {
    let postCount = await fetch(`/api/v1/posts/${subforumId}/count`);
    postCount = await postCount.json();
    this.postCount = postCount;
  }

  async created() {
    this.fetchAllSubjectsBySubforumId(this.subforum.id);
    this.fetchAllPostsBySubForumId(this.subforum.id);
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
