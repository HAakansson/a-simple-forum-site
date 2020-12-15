<template>
  <div class="visitors">
    <p class="visitors-online">
      <span class="bold">10000</span> besökare online (hårdkodad)
    </p>
    <p class="posts"><span class="bold">{{ posts }}</span> inlägg</p>
    <p class="members"><span class="bold">{{ members }}</span> medlemmar</p>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Visitors extends Vue {

  members = null;
  posts = null;

  async fetchTotalNumberOfMembers (){
    let members = await fetch("/api/v1/users/count/getCount");
    members = await members.json();
    this.members = members;
  }

  async fetchTotalNumberOfPosts(){
    let posts = await fetch ("api/v1/posts/count/getCount");
    posts = await posts.json();
    this.posts = posts;
  }

  created(){
    this.fetchTotalNumberOfMembers();
    this.fetchTotalNumberOfPosts();
  }
}
</script>

<style lang="scss" scoped>
.visitors {
  align-items: center;
  display: grid;
  font-size: 0.8rem;
  grid-template-columns: 25% 1fr 10% 10%;
  padding: 0.3rem;

  p {
    margin: 0;
  }

  .posts {
    grid-column: 3/4;
  }

  .posts,
  .members {
    justify-self: right;
  }
}
</style>
