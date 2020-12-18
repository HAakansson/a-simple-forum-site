<template>
  <div class="subject-row">
    <span class="subject">
      <span class="name">{{ subject.name }}</span>
      <span class="creator">{{ subject.creator }}</span>
    </span>
    <span class="answers">{TODO}</span>
    <span class="shows">{TODO}</span>
    <span class="latestPost">{TODO}</span>
  </div>
</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class SubforumRow extends Vue {
  @Prop()
  subject;

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
