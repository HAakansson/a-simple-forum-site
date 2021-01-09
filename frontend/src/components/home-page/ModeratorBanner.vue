<template>
  <div class="moderator-banner">
    <span class="moderators bold">Moderatorer: {{moderators ? moderators.length : 0 }}</span>
    <div v-if="isAdmin" class="moderators-view">
      <span class="text">Moderatorer: </span>
      <select>
        <option v-for="m in moderators" :key="m.email" :value="m.email">{{
          m.email
        }}</option>
      </select>
      <button class="change bg-primary">Ändra</button>
    </div>
  </div>
</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class ModeratorBanner extends Vue {
  @Prop()
  subForumName;

  get isAdmin() {
    return this.$store.getters["userStore/isAdmin"]();
  }

  get moderators() {
    return this.$store.state.forumStore.moderators;
  }

  created() {
    this.$store.dispatch(
      "forumStore/fetchModeratorsForSubforum",
      this.subForumName
    );
  }
}
</script>

<style lang="scss" scoped>
.moderator-banner {
  align-items: center;
  background: lightgray;
  border: 1px solid gray;
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  padding: 0 0.3rem;

  .moderators {
    font-size: 0.8rem;
  }

  .moderators-view {
    .text {
      font-size: 0.7rem;
    }

    .change {
      border: none;
      cursor: pointer;
      color: whitesmoke;
      margin-left: 0.5rem;
    }
  }

  span {
    margin-right: 0.5rem;
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
