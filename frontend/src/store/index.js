import Vue from "vue";
import Vuex from "vuex";
import { forumStore } from "./forumStore";
import { subjectStore } from "./subjectStore";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    forumStore,
    subjectStore,
  },
});
