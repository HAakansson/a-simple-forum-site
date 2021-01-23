export const forumStore = {
  namespaced: true,

  state: {
    forums: null,
    subforums: null,
    moderators: null,
  },

  getters: {
    subforumsByForumId: (state) => (forumId) => {
      return state.subforums?.filter(
        (subforum) => subforum.forum_id === forumId
      );
    },
  },

  mutations: {
    setForums(state, payload) {
      state.forums = payload;
    },
    setSubforums(state, payload) {
      state.subforums = payload;
    },
    setModerators(state, payload) {
      state.moderators = payload;
    },
  },

  actions: {
    async fetchAllForums({ commit }) {
      let forums = await fetch("/api/v1/forums");
      forums = await forums.json();
      console.log("Forums: ", forums)
      commit("setForums", forums);
    },
    
    async fetchAllSubforums({ commit }) {
      let subforums = await fetch("/api/v1/subforums");
      subforums = await subforums.json();
      commit("setSubforums", subforums);
    },

    async fetchModeratorsForSubforum({ commit }, subforumName) {
      let moderators = await fetch(
        `/api/v1/subforums/moderators/${subforumName}`
      );
      moderators = await moderators.json();
      commit("setModerators", moderators);
    },

    async addModeratorToSubforum(context, newMod) {
      let result = await fetch("/api/v1/subforums/new-moderator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMod),
      });
      result = await result.json();
      return result;
    },

    async removeModeratorFromSubforum(context, remMod) {
      let result = await fetch("/api/v1/subforums/remove-moderator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(remMod),
      });
      result = await result.json();
      return result;
    },

    async updateRoleOnUser(context, payload) {
      let result = await fetch("/api/v1/subforums/update-moderator", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      result = await result.json();
      return result;
    },
  },
};
