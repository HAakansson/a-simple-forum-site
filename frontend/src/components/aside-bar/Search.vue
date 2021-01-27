<template>
  <div v-if="false" class="search bg-secondary">
    <form class="search-form" @submit.prevent>
      <input class="todo-bg" type="text" placeholder="Sök..." />
      <button class="search-button bg-primary">
        <i class="material-icons">search</i>
      </button>
    </form>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Search extends Vue {}
</script>

<style lang="scss" scoped>
.search {
  border: 1px solid lightgray;
  display: flex;
  justify-content: center;
  padding: 1rem;

  .search-form {
    display: flex;

    input {
      padding: 0.3rem;
    }
    .search-button {
      align-items: center;
      border: none;
      cursor: pointer;
      display: flex;

      i {
        color: white;
        font-size: 0.9rem;
      }
    }
  }
}
</style>
