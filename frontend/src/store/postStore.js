export const postStore = {
  namespaced: true,

  state: {
    posts: null,
  },

  getters: {
    getPostsBySubjectId: (state) => (subjectId) => {
      return state.posts?.filter((post) => post.subject_id === subjectId);
    },
  },

  mutations: {
    setPosts(state, payload) {
      state.posts = payload;
    },
  },

  actions: {
    async fetchAllPostsBySubjectId({ commit }, subjectId) {
      let posts = await fetch(`/api/v1/posts/subject/${subjectId}`);
      posts = await posts.json();
      console.log(`Posts by subforumId: ${subjectId}: `, posts);
      commit("setPosts", posts);
    },
  },
};
