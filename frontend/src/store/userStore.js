export const userStore = {
  namespaced: true,

  state: {
    loggedInUser: null,
    allUsers: null,
  },

  getters: {
    isModerator: (state) => () => {
      if (state.loggedInUser) {
        return (
          state.loggedInUser.role === "moderator" ||
          state.loggedInUser.role === 2
        );
      } else {
        return false;
      }
    },

    isAdmin: (state) => () => {
      if (state.loggedInUser) {
        return (
          state.loggedInUser.role === "admin" || state.loggedInUser.role === 1
        );
      } else {
        return false;
      }
    },
  },

  mutations: {
    setLoggedInUser(state, payload) {
      state.loggedInUser = payload;
    },

    setAllUsers(state, payload) {
      state.allUsers = payload;
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
        console.log("Could not log in!");
      }
      commit("setLoggedInUser", user);
      return user;
    },

    async logout({ commit }) {
      let result = await fetch("/auth/v1/logout");
      result = await result.json();
      console.log(result);
      commit("setLoggedInUser", null);
    },

    async fetchAllUsers({ commit }) {
      let users = await fetch("/api/v1/users");
      users = await users.json();
      console.log("Users: ", users);
      commit("setAllUsers", users);
    },

    async registerUser(context, credentials) {
      let user = await fetch("/auth/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      user = await user.json();
      return user;
    },
  },
};
