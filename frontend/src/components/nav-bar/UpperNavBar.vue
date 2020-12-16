<template>
  <div class="upper-navbar-wrapper bg-primary">
    <div class="upper-navbar container">
      <p class="new-subjects">Nya Ämnen</p>
      <p class="new-posts">Nya Inlägg</p>
      <p class="register">Bli Medlem</p>
      <p class="login-logout">Logga in</p>
    </div>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

@Component
export default class UpperNavBar extends Vue {}
</script>

<style lang="scss" scoped>
.upper-navbar-wrapper {
  display: flex;

  .upper-navbar {
    align-items: center;
    color: lightgray;
    display: grid;
    font-size: 0.8rem;
    grid-template-columns: 10% 10% 1fr 10% 10%;
    justify-items: center;

    p {
      cursor: pointer;
      margin: 0;

      &:hover {
        color: white;
      }
    }

    .register {
      grid-column: 4/5;
    }

    .new-subjects,
    .new-posts {
      justify-self: start;
    }

    .register,
    .login-logout {
      justify-self: end;
    }
  }
}
</style>
