<template>
  <div class="post">
    <div class="post-banner">
      <div class="timestamp">{{ time }}</div>
      <div class="number bold">#{{ nr }}</div>
    </div>
    <div class="post-wrapper">
      <div class="author-info todo-bg">User nr: {{ post.user_id }}</div>
      <div class="post-content">
        <p class="content">{{ post.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Post extends Vue {
  @Prop()
  post;

  @Prop()
  nr;

  get time() {
    return new Date(this.post.timestamp).toLocaleString();
  }
}
</script>

<style lang="scss" scoped>
.post {
  .post-banner {
    background: gray;
    display: flex;
    font-size: 0.7rem;
    justify-content: space-between;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

  .post-wrapper {
    display: grid;
    grid-template-columns: 20% 80%;

    .author-info {
      // background: lightgray;
      padding: 0.4rem;
    }

    .post-content {
      font-size: 0.8rem;
      min-height: 150px;
      padding: 0.4rem;
    }
  }
}
</style>
