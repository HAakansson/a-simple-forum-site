<template>
  <div class="subject-row">
    <span class="subject" @click="goToSubject">
      <span class="name">{{ subject.name }}</span>
      <span class="creator">{{ subject.creator }}</span>
    </span>
    <span class="answers todo">svar</span>
    <span class="shows todo">visningar</span>
    <span class="latestPost todo">senaste</span>
  </div>
</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class SubforumRow extends Vue {
  @Prop()
  subject;

  goToSubject() {
    let path;
    if (this.$route.path.includes("/Forumsubjects")) {
      path = `/Subject/${this.subject.forum_name}/${this.subject.subforum_name}`;
    } else {
      path = this.$route.path.replace("/Subforum", "/Subject");
    }
    this.$router.push(`${path}/${this.subject.id}`);
  }

  created() {
  }
}
</script>

<style lang="scss" scoped>
.subject-row {
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
  display: grid;
  grid-template-columns: 10% 1fr 10% 10% 20%;
  font-size: 0.8rem;
  padding: 0.3rem;

  &:first-child {
    border-top: 3px solid lightgray;
  }

  &:nth-child(even) {
    background: rgb(235, 235, 235);
  }

  &:hover {
    background: lightgray;
  }

  .subject {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    grid-column: 1/3;

    .name {
      font-size: 0.7rem;
    }

    .creator {
      color: gray;
      font-size: 0.6rem;
    }
  }
}
</style>
