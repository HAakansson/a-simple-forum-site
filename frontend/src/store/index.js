import Vue from "vue";
import Vuex from "vuex";
import { forumStore } from "./forumStore";
import { subjectStore } from "./subjectStore";
import { postStore } from "./postStore";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    forumStore,
    subjectStore,
    postStore,
  },
});
