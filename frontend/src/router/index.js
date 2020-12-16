import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../views/HomePage";
import Forum from "../components/home-page/Forum";
import Subforum from "../components/home-page/Subforum";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
    children: [
      { path: "", name: "Forum", component: Forum },
      { path: "/:forumName/:subforumName", name: "Subforum", component: Subforum },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
