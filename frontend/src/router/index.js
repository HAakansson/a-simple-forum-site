import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../views/HomePage";
import LoginPage from "../views/LoginPage";
import Forum from "../components/home-page/Forum";
import Subforum from "../components/home-page/Subforum";
import Subject from "../components/home-page/Subject";
import WritePostPage from "../views/WritePostPage";
import ForbiddenPage from "../views/ForbiddenPage";
import RegisterPage from "../views/RegisterPage";
import NotExistsPage from "../views/NotExistsPage";
import ForumSubjects from "../components/home-page/ForumSubjects";

import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
    children: [
      { path: "/", name: "Forum", component: Forum },
      {
        path: "/:forumName",
        name: "ForumSubjects",
        component: ForumSubjects,
        props: true,
      },
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
  {
    path: "/register",
    name: "RegisterPage",
    component: RegisterPage,
  },
  {
    path: "*",
    name: "NotExistsPage",
    component: NotExistsPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

async function whoAmI() {
  return await store.dispatch("userStore/fetchLoggedInUser");
}

router.beforeEach(async (to, from, next) => {
  const loggedInPages = ["WritePostPage"];

  if (loggedInPages.includes(to.name)) {
    await whoAmI();
    if (store.state.userStore.loggedInUser) {
      next();
    } else {
      next("/forbidden");
    }
  }
  next();
});

export default router;
