<template>
  <div id="app">
    <nav-bar />
    <main class="container bg-secondary">
      <header-image />
      <info-wrapper />
      <router-view />
    </main>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import NavBar from "./components/NavBar";
import HeaderImage from "./components/HeaderImage";
import InfoWrapper from "./components/InfoWrapper";

@Component({
  components: {
    NavBar,
    HeaderImage,
    InfoWrapper,
  },
})
export default class App extends Vue {
  created() {
    this.$store.dispatch("forumStore/fetchAllForums");
  }
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Heebo&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Patua+One&display=swap");

* {
  box-sizing: border-box;
}

body {
  background: lightgrey;
  font-family: "Heebo", sans-serif;
  margin: 0;
  padding: 0;
}

.bg-primary {
  background: rgb(25, 25, 25);
}

.bg-secondary {
  background: whitesmoke;
}

.bold {
  font-weight: bolder;
}

.container {
  margin: 0 auto;
  width: 70%;
}

main {
  padding: 1rem;
}

p {
  margin: 0;
}

.primary {
  color: rgb(25, 25, 25);
}

.secondary {
  color: whitesmoke;
}

.underline {
  text-decoration: underline;
}
</style>
