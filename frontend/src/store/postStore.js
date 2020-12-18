export const postStore = {
  namespaced: true,

  state: {
    posts: null
  },

  mutations: {
    setPosts(state, payload) {
      state.posts = payload;
    }
  },

  actions: {},
};
