<template>
  <div class="subject-row">
    <div class="subject">
      <p class="subject-name bold underline">{{ subforum.name }}</p>
      <div class="subject-info">1000 ämnen</div>
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
  }

  .newest-post {
    background: rgb(220, 220, 220);

    border-left: 1px solid lightgray;
    padding-left: 0.5rem;
  }
}
</style>
