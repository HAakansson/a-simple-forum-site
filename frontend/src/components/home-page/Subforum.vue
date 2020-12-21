<template>
  <div class="subforum">
    <div class="subforum-banner bg-primary">
      <p class="name">{{ subforumPath }}</p>
    </div>
    <moderator-banner />
    <button class="new-subject">
      <i class="material-icons">create</i> Nytt ämne
    </button>
    <header-row />
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
import ModeratorBanner from "./ModeratorBanner";
import HeaderRow from "./HeaderRow";
import SubjectRow from "./SubjectRow";

@Component({
  components: {
    ModeratorBanner,
    HeaderRow,
    SubjectRow,
  },
})
export default class Subforum extends Vue {
  get subjects() {
    return this.$store.state.subjectStore.subjects;
  }

  get subforumPath() {
    return this.$route.path.replace("/", "");
  }

  get subForumName() {
    return this.subforumPath.split("/").pop();
  }

  created() {
    this.$store.dispatch(
      "subjectStore/fetchAllSubjectsBySubforumName",
      this.subForumName
    );
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

  .new-subject {
    align-items: center;
    background: lightgray;
    border: 1px solid gray;
    cursor: pointer;
    display: inline-flex;
    font-size: 0.7rem;
    justify-content: space-between;
    margin-top: 0.5rem;

    i {
      font-size: 1rem;
      margin-right: 0.5rem;
    }
  }

  .subject-wrapper {
    margin-top: 0.8rem;
  }
}
</style>
