<template>
  <div class="subject-row">
    <div class="subject">
      <p class="subject-name bold underline">{{ subject.name }}</p>
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
export default class SubjectRow extends Vue {
  @Prop()
  subject;
}
</script>

<style lang="scss" scoped>
.subject-row {
  display: grid;
  font-size: 0.8rem;
  grid-template-columns: 1fr 1fr;
}
</style>
