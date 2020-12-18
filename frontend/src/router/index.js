import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../views/HomePage";
import Forum from "../components/home-page/Forum";
import Subforum from "../components/home-page/Subforum";
import Subject from "../components/home-page/Subject";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
    children: [
      { path: "", name: "Forum", component: Forum },
      { path: "/:forumName/:subforumName", name: "Subforum", component: Subforum },
      { path: "/:forumName/:subforumName/:subjectId", name: "Subject", component: Subject}
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
