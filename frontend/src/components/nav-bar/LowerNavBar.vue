<template>
  <div class="lower-navbar-wrapper bg-secondary">
    <div class="lower-navbar container bg-secondary ">
      <p
        class=""
        v-for="subforum in subforums"
        :key="subforum.id"
        @click="goToForumSubjects(subforum)"
      >
        {{ subforum.name }}
      </p>
    </div>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

@Component
export default class LowerNavBar extends Vue {
  get subforums() {
    return this.$store.state.forumStore.forums;
  }

  goToForumSubjects(subforum) {
    if (!this.$route.path.includes("Forumsubjects")) {
      this.$router.push({
        name: "ForumSubjects",
        params: { forumName: subforum.name, forumId: null },
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.lower-navbar-wrapper {
  display: flex;

  .lower-navbar {
    align-items: center;
    color: black;
    display: flex;
    font-size: 0.7rem;

    p {
      cursor: pointer;
      margin: 0;
      margin-right: 2rem;
      padding: 0.3rem;

      &:hover {
        background: gray;
        color: white;
      }

      &:first-child {
        margin-left: -0.3rem;
      }
    }
  }
}
</style>
