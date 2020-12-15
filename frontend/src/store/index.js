import Vue from "vue";
import Vuex from "vuex";
import { subforumStore } from "./subforumStore";
import { subjectStore } from "./subjectStore";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    subforumStore,
    subjectStore,
  },
});
