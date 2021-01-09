import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../views/HomePage";
import LoginPage from "../views/LoginPage";
import Forum from "../components/home-page/Forum";
import Subforum from "../components/home-page/Subforum";
import Subject from "../components/home-page/Subject";
import WritePostPage from "../views/WritePostPage";
import ForbiddenPage from "../views/ForbiddenPage";

import store from "../store/index"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
    children: [
      { path: "", name: "Forum", component: Forum },
      {
        path: "/:forumName/:subforumName",
        name: "Subforum",
        component: Subforum,
      },
      {
        path: "/:forumName/:subforumName/:subjectId",
        name: "Subject",
        component: Subject,
      },
    ],
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage,
  },
  {
    path: "/write-post",
    name: "WritePostPage",
    component: WritePostPage,
  },
  {
    path: "/forbidden",
    name: "ForbiddenPage",
    component: ForbiddenPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  const isLoggedIn = store.state.userStore.loggedInUser;
  const loggedInPages = ["WritePostPage"];
  if (loggedInPages.includes(to.name)) {
    if (isLoggedIn) {
      next()
    } else {
      next("/forbidden")
    }
  }
  next();
});

export default router;
