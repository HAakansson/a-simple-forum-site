<template>
  <div class="moderator-settings card">
    <div class="current-subforum">
      <h4 class="subforum">Nuvarande subforum: {{ subforumName }}</h4>
      <p>Moderatorer</p>
      <select class="moderators">
        <option v-for="m in moderators" :key="m.email" :value="m.email">{{
          m.email
        }}</option>
      </select>
    </div>
    <div class="settings">
      <div class="assign-new">
        <h5>Välj ny moderator:</h5>
        <select class="moderators" v-model="newMod">
          <option selected value disabled>Välj moderator...</option>
          <option v-for="u in filteredModerators" :key="u.id" :value="u.id">{{
            u.email
          }}</option>
        </select>
        <button @click="assignModerator">Välj</button>
      </div>
      <div class="delete">
        <h5>Ta bort moderator:</h5>
        <select class="moderators" v-model="removeMod">
          <option selected value disabled>Välj moderator...</option>
          <option v-for="m in moderators" :key="m.id" :value="m.id">{{
            m.email
          }}</option>
        </select>
        <button @click="removeModerator">Ta bort</button>
      </div>
    </div>
    <p v-if="feedback" class="feedback">{{ feedback }}</p>
    <button class="close bg-primary" @click="close">Stäng</button>
  </div>
</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class ModeratorSettings extends Vue {
  @Prop()
  subforumName;

  newMod = "";
  removeMod = "";
  feedback = null;

  get moderators() {
    return this.$store.state.forumStore.moderators || [];
  }

  get allUsers() {
    return this.$store.state.userStore.allUsers || [];
  }

  get filteredModerators() {
    let tempMod = this.moderators.map(m => m.email)
    return this.allUsers.filter((u) => !tempMod.includes(u.email));
  }

  async assignModerator() {
    if (this.newMod) {
      console.log(this.newMod);
      let newModerator = {
        user_id: this.newMod,
        subforumName: this.subforumName,
      };
      let result = await this.$store.dispatch(
        "forumStore/addModeratorToSubforum",
        newModerator
      );
      this.feedback = !result.error ? result.message : result.error;
      if (!result.error) {
        let payload = {
          user_id: this.newMod,
          new_role: 2,
        };
        await this.$store.dispatch("forumStore/updateRoleOnUser", payload);
      }
      this.feedbackTimeout();

      await this.$store.dispatch(
        "forumStore/fetchModeratorsForSubforum",
        this.subforumName
      );
    }
  }

  async removeModerator() {
    if (this.removeMod) {
      console.log(this.removeMod);
      let remModerator = {
        user_id: this.removeMod,
        subforumName: this.subforumName,
      };
      let result = await this.$store.dispatch(
        "forumStore/removeModeratorFromSubforum",
        remModerator
      );
      this.feedback = !result.error ? result.message : result.error;
      if (!result.error) {
        let payload = {
          user_id: this.removeMod,
          new_role: 3,
        };
        await this.$store.dispatch("forumStore/updateRoleOnUser", payload);
      }
      this.feedbackTimeout();

      await this.$store.dispatch(
        "forumStore/fetchModeratorsForSubforum",
        this.subforumName
      );
    }
  }

  feedbackTimeout() {
    setTimeout(() => {
      this.feedback = null;
    }, 3000);
  }

  close() {
    this.$emit("close");
  }

  created() {
    this.$store.dispatch("userStore/fetchAllUsers");
  }
}
</script>

<style lang="scss" scoped>
.moderator-settings {
  background: lightgray;
  border: 1px solid gray;
  border-radius: 5px;
  display: none;
  height: 320px;
  right: 40%;
  top: 30%;
  width: 300px;
  position: absolute;

  h5 {
    margin: 0.5rem 0;
  }

  .current-subforum {
    border-bottom: 1px solid gray;
    display: grid;
    grid-template-columns: 10% 1fr 10%;
    padding-bottom: 0.5rem;

    .subforum {
      grid-column: 2/3;
    }

    .moderators {
      grid-column: 2/3;
      grid-row: 3;
    }

    p {
      justify-self: center;
      grid-column: 2/3;
      grid-row: 2;
    }
  }

  .assign-new,
  .delete {
    display: grid;
    grid-template-columns: 10% 1fr 1fr 10%;

    h5 {
      grid-column: 1/5;
      justify-self: center;
    }

    select {
      grid-column: 2/3;
    }

    button {
      grid-column: 3/4;
    }
  }

  .card {
    /* Add shadows to create the "card" effect */
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    /* On mouse-over, add a deeper shadow */

    &:hover {
      box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }
  }

  .feedback {
    margin-top: 0.5rem;
    text-align: center;
  }

  .close {
    border: none;
    cursor: pointer;
    color: white;
    position: absolute;
    bottom: 2px;
    right: 2px;
  }
}
</style>
