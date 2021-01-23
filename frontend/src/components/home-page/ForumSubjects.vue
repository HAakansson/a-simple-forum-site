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
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import HeaderRow from "./HeaderRow";
import SubjectRow from "./SubjectRow";

@Component({
  components: {
    HeaderRow,
    SubjectRow,
  },
})
export default class extends Vue {
  @Prop({ default: null }) forumId;

  compForumId = this.forumId;
  forumName = "";

  get forumSubjects() {
    return this.$store.state.subjectStore.forumSubjects || null;
  }

  goToWritePost() {
    console.log("Go To Post");
  }

  @Watch("$store.state.forumStore.forums", { deep: true })
  onForumsChange(forums) {
    if (!this.$store.state.subjectStore.forumSubjects) {
      this.forumName = forums.find(
        (forum) => this.$route.params.forumName === forum.name
      ).name;
      this.compForumId = forums.find(
        (forum) => this.$route.params.forumName === forum.name
      ).id;
      this.$store.dispatch(
        "subjectStore/fetchAllSubjectsByForumId",
        this.compForumId
      );
    }
  }

  beforeCreate() {
    this.$store.commit("subjectStore/setForumSubjects", null);
  }

  created() {
    console.log("forumId: ", this.forumId);
    this.$store.dispatch(
      "subjectStore/fetchAllSubjectsByForumId",
      this.forumId
    );
  }
}
</script>

<style lang="scss" scoped></style>
