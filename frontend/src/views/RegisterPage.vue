<template>
  <div class="login-page">
    <div class="login-wrapper">
      <form class="login-form" @submit.prevent="register">
        <div class="input-fields">
          <p>Registrera ny användare</p>
          <input
            type="text"
            v-model="email"
            placeholder="Email"
            required
            @blur="validateEmail"
          />
          <input
            type="text"
            v-model="username"
            placeholder="Användarnamn"
            required
          />
          <input
            type="password"
            v-model="password"
            placeholder="Lösenord"
            required
            @blur="validatePassword"
          />
          <button class="bg-primary register-button">Registrera</button>
          <p v-if="feedback" class="feedback">{{ feedback }}</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

@Component
export default class RegisterPage extends Vue {
  email = "";
  password = "";
  username = "";
  feedback = null;
  emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

  get lastVisitedPath() {
    return this.$store.state.lastVisitedPath;
  }

  validateEmail() {
    let btn = document.querySelector(".register-button");

    if (this.emailRegex.test(this.email)) {
      btn.disabled = false;
      btn.classList.add("bg-primary");
      btn.style.cursor = "pointer";
    } else {
      btn.disabled = true;
      btn.classList.remove("bg-primary");
      btn.style.cursor = "not-allowed";
      this.feedback = "Felaktig email";
      setTimeout(() => {
        this.feedback = null;
      }, 3000);
    }
  }

  validatePassword() {
    let btn = document.querySelector(".register-button");
    if (this.passwordRegex.test(this.password)) {
      btn.disabled = false;
      btn.classList.add("bg-primary");
      btn.style.cursor = "pointer";
    } else {
      btn.disabled = true;
      btn.classList.remove("bg-primary");
      btn.style.cursor = "not-allowed";
      this.feedback =
        "Lösenordet måste innehålla minst: en liten bokstav, en stor bokstav, en siffra samt vara minst 8 tecken långt.";
      setTimeout(() => {
        this.feedback = null;
      }, 3000);
    }
  }

  async register() {
    let credentials = {
      email: this.email,
      username: this.username,
      password: this.password,
      role: 3,
    };

    this.feedback = "Registrerar och loggar in...";

    let user = await this.$store.dispatch(
      "userStore/registerUser",
      credentials
    );
    if (user.error) {
      this.feedback = user.error;
      setTimeout(() => {
        this.feedback = null;
        return;
      }, 3000);
    } else {
      let user = this.$store.dispatch("userStore/login", credentials);
      if (!user) {
        this.feedback = "Felaktigt användarnamn eller Lösenord...";
        setTimeout(() => {
          this.feedback = null;
        }, 3000);
      } else {
        this.$router.push("/");
      }
    }
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
