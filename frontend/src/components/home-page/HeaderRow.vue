<template>
  <div class="header-row">
    <span class="subject underline bold">Ämne</span>
    <span class="latestNew underline bold">Senast startade trådar</span>
    <span class="answers underline bold">Svar</span>
    <span class="shows underline bold">Visningar</span>
    <span class="latestPost underline bold">Senaste Inlägg</span>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

@Component
export default class HeaderRow extends Vue {

  async getTotalNumberOfPosts(){
    
  }
}
</script>

<style lang="scss" scoped>
.header-row {
  display: grid;
  grid-template-columns: 10% 1fr 10% 10% 20%;
  font-size: 0.8rem;
  margin-top: 0.8rem;

  span {
    cursor: pointer;

    &:hover {
      color: gray;
    }
  }
}
</style>
