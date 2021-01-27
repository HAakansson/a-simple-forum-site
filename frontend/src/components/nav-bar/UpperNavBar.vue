<template>
  <div class="upper-navbar-wrapper bg-primary">
    <div class="upper-navbar container">
      <p class="home" @click="goToHome">Hem</p>
      <!-- <p class="new-posts todo">Nya Inlägg</p>  -->
      <p v-if="!user" class="register" @click="register">Bli Medlem</p>
      <p v-else class="user">{{user? user.username.toUpperCase() : "" }}</p>
      <p class="login-logout" @click="loginLogout">{{user ? "Logga ut" : "Logga in"}}</p>
    </div>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

@Component
export default class UpperNavBar extends Vue {
  get user () {
    return this.$store.state.userStore.loggedInUser;
  }

  goToHome(){
    if (this.$route.path !== "/"){
      this.$router.push("/")
    }
  }

  async loginLogout(e){
    if(e.target.innerText === "Logga in" && this.$route.path !== "/login") {
      this.$router.push("/login");
    } else if (e.target.innerText === "Logga ut") {
      await this.$store.dispatch("userStore/logout");
    }
  }

  async register(){
    this.$router.push("/register");
  }
}
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
      // cursor: pointer;
      margin: 0;

      // &:hover {
      //   color: white;
      // }
    }

    .register,
    .user {
      grid-column: 4/5;
    }

    .new-subjects,
    .new-posts {
      justify-self: start;
    }

    .register,
    .user,
    .login-logout {
      justify-self: end;
    }

    .login-logout,
    .register,
    .home {
      cursor: pointer;

      &:hover {
        color: white;
      }
    }

  }
}
</style>
