<template>
  <div class="subject-row">
    <span class="subject">
      <span>{{ subject.name }}</span>
      <span>{{}}</span>
    </span>
    <span class="answers">Svar</span>
    <span class="shows">Visningar</span>
    <span class="latestPost">Senaste Inlägg</span>
  </div>
</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class SubforumRow extends Vue {
  @Prop()
  subject;

  created(){
    console.log(this.subject)
  }
}
</script>

<style lang="scss" scoped>
.subject-row {
  display: grid;
  grid-template-columns: 10% 1fr 10% 10% 10%;
  font-size: 0.8rem;

  .subject {
    grid-column: 1/3;
  }
}
</style>
