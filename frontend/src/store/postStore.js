export const postStore = {
  namespaced: true,

  state: {
    posts: null
  },

  getters: {
    postsBySubjectId: (state) => (subjectId) => {
      return state.posts?.filter(post => post.subject_id === subjectId);
    }
  }, 

  mutations: {
    setPosts(state, payload) {
      state.posts = payload;
    }
  },

  actions: {
    async fetchAllPostsBySubforumName({ commit }, subforumName) {
      let posts = await fetch(`/api/v1/posts/subforum/${subforumName}`);
      posts = await posts.json()
      console.log(`Posts by subforumName: ${subforumName}: `, posts)
      commit("setPosts", posts);
    }
  },
};
