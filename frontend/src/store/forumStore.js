export const forumStore = {
  namespaced: true,

  state: {
    forums: null,
    subforums: null,
  },
  
  getters: {
    subforumsByForumId: (state) => (forumId) => {
      return state.subforums?.filter(subforum => subforum.forum_id === forumId)
    }
  },

  mutations: {
    setForums(state, payload) {
      state.forums = payload;
    },
    setSubforums(state, payload) {
      state.subforums = payload;
    },
  },

  actions: {
    async fetchAllForums({ commit }) {
      let forums = await fetch("/api/v1/forums");
      forums = await forums.json();
      console.log("Forums: ", forums);
      commit("setForums", forums);
    },
    async fetchAllSubforums({ commit }) {
      let subforums = await fetch("/api/v1/subforums");
      subforums = await subforums.json();
      console.log("Subforums: ", subforums);
      commit("setSubforums", subforums);
    },
  },
};
