import Vue from "vue";
import Vuex from "vuex";
import { subforumStore } from "./subforumStore";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    subforumStore,
  },
});
