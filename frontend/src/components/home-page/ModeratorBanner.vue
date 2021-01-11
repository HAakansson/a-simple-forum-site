<template>
  <div class="moderator-banner">
    <span class="moderators bold"
      >Moderatorer: {{ moderators ? moderators.length : 0 }}</span
    >
    <div v-if="isAdmin" class="moderators-view">
      <span class="text">Moderatorer: </span>
      <select>
        <option v-if="!moderators.length> 0" value>Inga...</option>
        <option v-for="m in moderators" :key="m.email" :value="m.email">{{
          m.email
        }}</option>
      </select>
      <button class="change bg-primary" @click="openChangeModerators">
        Ändra
      </button>
    </div>
    <moderator-settings
      :subforumName="subforumName"
      @close="closeChangeModerators"
    />
  </div>
</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";
import ModeratorSettings from "../moderator-banner/ModeratorSettings";

@Component({
  components: {
    ModeratorSettings,
  },
})
export default class ModeratorBanner extends Vue {
  @Prop()
  subforumName;

  get isAdmin() {
    return this.$store.getters["userStore/isAdmin"]();
  }

  get moderators() {
    return this.$store.state.forumStore.moderators || [];
  }

  openChangeModerators() {
    document.querySelector(".moderator-settings").style.display = "block";
  }

  closeChangeModerators() {
    document.querySelector(".moderator-settings").style.display = "none";
  }

  created() {
    this.$store.dispatch(
      "forumStore/fetchModeratorsForSubforum",
      this.subforumName
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
