import Vue from "vue";
import Vuex from "vuex";
import { forumStore } from "./forumStore";
import { subjectStore } from "./subjectStore";
import { postStore } from "./postStore";
import { userStore } from "./userStore"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lastVisitedPath: null
  },
  getters: {},
  mutations: {
    setLastVisitedPath(state, payload) {
      state.lastVisitedPath = payload;
    }
  },
  actions: {},
  modules: {
    forumStore,
    subjectStore,
    postStore,
    userStore
  },
});
