<template>
  <div class="login-page">
    <div class="login-wrapper">
      <form class="login-form" @submit.prevent="login">
        <div class="input-fields">
          <p>Logga in</p>
          <input type="text" v-model="email" placeholder="Email" />
          <input type="password" v-model="password" placeholder="Lösenord" />
          <button class="bg-primary">Logga in</button>
          <p v-if="feedback" class="feedback">{{ feedback }}</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

@Component
export default class LoginPage extends Vue {
  email = "";
  password = "";
  feedback = null;

  get lastVisitedPath() {
    return this.$store.state.lastVisitedPath;
  }

  async login() {
    let credentials = {
      email: this.email,
      password: this.password,
    };

    this.feedback = "Loggar in...";

    let user = await this.$store.dispatch("userStore/login", credentials);

    if (!user) {
      this.feedback = "Felaktigt användarnamn eller Lösenord...";
      setTimeout(() => {
        this.feedback = null;
      }, 3000);
    } else {
      this.feedback = null;
      if (this.lastVisitedPath) {
        this.$router.push(this.lastVisitedPath);
      } else {
        this.$router.push("/");
      }
    }

    this.email = "";
    this.password = "";
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  .login-wrapper {
    background: lightgray;
    border: 1px solid gray;
    margin: 1rem auto;
    width: 500px;

    form {
      padding: 2rem 0;

      .input-fields {
        margin: 0 auto;
        width: 50%;

        p {
          margin-bottom: 0.5rem;
        }

        input {
          font-size: 0.8rem;
          height: 1.7rem;
          margin-bottom: 0.5rem;
          width: 100%;
        }

        .feedback {
          margin-top: 0.5rem;
          text-align: center;
        }
      }

      button {
        border: none;
        color: white;
        cursor: pointer;
        height: 1.7rem;
        font-size: 0.8rem;
        padding: 5px;
        width: 100%;
      }
    }
  }
}
</style>
