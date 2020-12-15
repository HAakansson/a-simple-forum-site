<template>
  <div class="subforum-list-item">
    <div class="subforum-banner bg-primary">
      <p class="name">{{ subforum.name }}</p>
      <span class="collapse-button material-icons">minimize</span>
    </div>
    <div class="subject-wrapper">
      <subject-row />
    </div>
  </div>
</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";
import SubjectRow from "./SubjectRow";

@Component({
  components: {
    SubjectRow,
  },
})
export default class SubforumListItem extends Vue {
  @Prop()
  subforum;
}
</script>

<style lang="scss" scoped>
.subforum-list-item {
  .subforum-banner {
    display: flex;
    color: lightgray;
    justify-content: space-between;
    padding: 0 0.3rem;

    .name,
    .collapse-button {
      cursor: pointer;

      &:hover {
        color: white;
      }
    }
  }
}
</style>
