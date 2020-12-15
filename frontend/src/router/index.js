import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../views/HomePage";
import Subforum from "../components/home-page/Subforum";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
    children: [{ path: "", name: "Subforum", component: Subforum }],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
