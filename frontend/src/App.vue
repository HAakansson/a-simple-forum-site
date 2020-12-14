<template>
  <div id="app">
    <nav-bar />
    <router-view />
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import NavBar from "./components/home-page/NavBar";

@Component({
  components: {
    NavBar,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Heebo&display=swap');

* {
  box-sizing: border-box;
}

body {
  background: lightgray;
  margin: 0;
  padding: 0;
}

.bg-primary {
  background: rgb(25, 25, 25);
}

.bg-secondary {
  background: whitesmoke;
}

.container {
  margin: 0 auto;
  width: 70%
}
</style>
