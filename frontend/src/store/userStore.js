export const userStore = {
  namespaced: true,

  state: {
    loggedInUser: null,
  },

  mutations: {
    setLoggedInUser(state, payload) {
      state.loggedInUser = payload;
    },
  },

  actions: {
    async fetchLoggedInUser({ commit }) {
      let user = await fetch("/auth/v1/whoami");
      user = await user.json();
      console.log("User: ", user);
      commit("setLoggedInUser", user);
    },

    async login({ commit }, credentials) {
      let user = await fetch("/auth/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      user = await user.json();
      console.log("User: ", user);
      if (!user) {
        console.log("Could not log in!")
      }
      commit("setLoggedInUser", user);
    },

    async logout({ commit }) {
      let result = await fetch("/auth/v1/logout");
      result = await result.json();
      console.log(result);
      commit("setLoggedInUser", null);
    }
  },
};
