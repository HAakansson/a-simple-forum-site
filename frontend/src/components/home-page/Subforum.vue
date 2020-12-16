<template>
  <div class="subforum">
    <div class="subforum-banner bg-primary">
      <p class="name">{{ subforumPath }}</p>
    </div>
    <moderator-banner />
    <div class="subject-wrapper">
      <subject-row
        v-for="subject in subjects"
        :key="subject.id"
        :subject="subject"
      />
    </div>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import ModeratorBanner from "./ModeratorBanner.vue";
import SubjectRow from "./SubjectRow";

@Component({
  components: {
    ModeratorBanner,
    SubjectRow,
  },
})
export default class Subforum extends Vue {
  subjects = null;

  get subforumPath() {
    return this.$route.path.replace("/", "");
  }

  get subForumName() {
    return this.subforumPath.split("/").pop();
  }

  async fetchAllSubjectsBySubforumName() {
    let subjects = await fetch(`/api/v1/subjects/${this.subForumName}`);
    subjects = await subjects.json();
    this.subjects = subjects;
  }

  created() {
    this.fetchAllSubjectsBySubforumName();
  }
}
</script>

<style lang="scss" scoped>
.subforum {
  .subforum-banner {
    align-items: center;
    border: 1px solid black;
    display: flex;
    color: lightgray;
    justify-content: space-between;
    padding: 0 0.3rem;

    .name {
      cursor: pointer;

      &:hover {
        color: white;
      }
    }
  }
}
</style>
