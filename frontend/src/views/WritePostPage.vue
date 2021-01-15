<template>
  <div class="write-post-page">
    <div class="subforum-banner bg-primary">
      <p class="name">{{ lastVisitedPath }}</p>
    </div>
    <div class="post-header">
      {{ ifNewPostNotNewSubject ? "Svara på ämne" : "Posta ett nytt ämne" }}
    </div>
    <div class="write-post">
      <form class="post-form" @submit.prevent="postNewPost">
        <input
          v-if="!ifNewPostNotNewSubject"
          type="text"
          placeholder="Rubrik"
          v-model="header"
          required
        />
        <textarea
          :class="{ important: checked }"
          placeholder="Ditt inlägg"
          v-model="content"
          required
        ></textarea>
        <div class="post-options">
          <button class="send-post bg-primary">Skapa inlägg</button>
          <label for="important-post">Viktigt?</label>
          <input
            class="check-important"
            id="important-post"
            type="checkbox"
            v-model="checked"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { Vue, Component, Watch } from "vue-property-decorator";

@Component
export default class WritePostPage extends Vue {
  header = "";
  content = "";
  checked = false;

  @Watch("checked")
  onCheckedChange(val) {
    console.log(val);
  }

  get lastVisitedPath() {
    if (localStorage.getItem("lastVisitedPath")) {
      return JSON.parse(localStorage.getItem("lastVisitedPath"));
    } else {
      let lastVisitedPathCorrect = this.$store.state.lastVisitedPath
        .replace("/", "")
        .replace(/%20/g, " ");

      localStorage.setItem(
        "lastVisitedPath",
        JSON.stringify(lastVisitedPathCorrect)
      );
      return lastVisitedPathCorrect;
    }
  }

  get ifNewPostNotNewSubject() {
    let regex = /\d/g;
    return regex.test(this.lastVisitedPath.split("/").pop());
  }

  get subjectId() {
    return this.ifNewPostNotNewSubject
      ? this.$store.state.lastVisitedPath.split("/").pop()
      : null;
  }

  async postNewPost() {
    let important = this.checked ? 1 : 0;

    if (this.ifNewPostNotNewSubject) {
      let post = {
        content: this.content,
        subject_id: this.subjectId,
        important: important,
      };
      this.$store.dispatch("postStore/postNewPost", post);
      this.$router.push(this.lastVisitedPath);
    } else {
      let subject = {
        name: this.header,
        subforumName: this.lastVisitedPath.split("/").pop(),
      };

      let newSubjectId = await this.$store.dispatch(
        "subjectStore/postNewSubject",
        subject
      );

      let post = {
        content: this.content,
        subject_id: newSubjectId,
        important: important,
      };

      this.$store.dispatch("postStore/postNewPost", post);
      this.$router.push(this.lastVisitedPath);
    }
  }

  beforeDestroy() {
    localStorage.removeItem("lastVisitedPath");
  }
}
</script>

<style lang="scss" scoped>
.write-post-page {
  background: lightgray;
  border: 1px solid gray;
  margin: 1rem auto;

  .subforum-banner {
    border: 1px solid black;
    color: lightgray;
    padding: 0 0.3rem;
    width: 100%;

    .name {
      cursor: pointer;

      &:hover {
        color: white;
      }
    }
  }

  .post-header {
    background: rgb(194, 193, 193);
    border-bottom: 1px solid gray;
    padding: 0.5rem;
  }

  .write-post {
    .post-form {
      margin: 1rem auto;
      width: 70%;

      input {
        font-size: 0.8rem;
        height: 1.7rem;
        width: 100%;
      }

      textarea {
        height: 300px;
        margin-top: 1rem;
        width: 100%;
      }

      .important {
        background: rgb(160, 160, 70);
      }

      .send-post {
        color: white;
      }

      .post-options {
        align-items: center;
        display: grid;
        grid-gap: 5px;
        grid-template-columns: 20% 13% 5% 1fr;

        input {
          height: 22px;
          margin: 0;
        }

        label {
          justify-self: center;
        }
      }
    }
  }
}
</style>
