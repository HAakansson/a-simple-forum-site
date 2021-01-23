<template>
  <div class="subforum">
    <div class="subforum-banner bg-primary">
      <p class="name todo">{{ forumName }}</p>
    </div>
    <!-- <moderator-banner :subforumName="subforumName" /> -->
    <button class="new-subject" @click="goToWritePost">
      <i class="material-icons">create</i> Nytt ämne
    </button>
    <header-row />
    <div class="subject-wrapper">
      <subject-row
        v-for="subject in forumSubjects"
        :key="subject.id"
        :subject="subject"
      />
    </div>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import HeaderRow from "./HeaderRow";
import SubjectRow from "./SubjectRow";

@Component({
  components: {
    HeaderRow,
    SubjectRow,
  },
})
export default class extends Vue {
  get forumId() {
    return this.$store.state.forumStore.forums.find(
      (forum) => this.$route.params.forumName === forum.name
    ).id;
  }

  get forumName() {
    return this.$store.state.forumStore.forums.find(
      (forum) => this.$route.params.forumName === forum.name
    ).name;
  }

  get forumSubjects() {
    return this.$store.state.subjectStore.forumSubjects;
  }

  goToWritePost(){
    console.log("Go To Post")
  }

  async created() {
    console.log("forumId: ", this.forumId);
    console.log("forumName: ", this.forumName);
    this.$store.dispatch(
      "subjectStore/fetchAllSubjectsByForumId",
      this.forumId
    );
  }
}
</script>

<style lang="scss" scoped></style>
