<template>
  <div class="forum">
    <div class="forums-wrapper">
      <forum-list />
    </div>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import ForumList from "./ForumList";

@Component({
  components: {
    ForumList,
  },
})
export default class Forum extends Vue {
  created() {
    this.$store.dispatch("forumStore/fetchAllSubforums");
  }
}
</script>

<style lang="scss" scoped></style>
