export const subjectStore = {
  namespaced: true,

  state: {
    forumSubjects: null,
    subjects: null,
    subject: null,
  },

  getters: {
    getSubjectById: (state) => (subjectId) => {
      return state.subjects
        ? state.subjects.find((subject) => subject.id === subjectId)
        : null;
    },
  },

  mutations: {
    setSubject(state, payload) {
      state.subject = payload;
    },

    setSubjects(state, payload) {
      state.subjects = payload;
    },

    setForumSubjects(state, payload) {
      state.forumSubjects = payload;
    }
  },

  actions: {
    async fetchAllSubjectsByForumId({ commit }, forumId) {
      let forumSubjects = await fetch(`/api/v1/subjects/forum/${forumId}`);
      forumSubjects = await forumSubjects.json();
      commit("setForumSubjects", forumSubjects);
    },

    async fetchSubjectBySubjectId({ commit }, subjectId) {
      let subject = await fetch(`/api/v1/subjects/${subjectId}`);
      subject = await subject.json();
      commit("setSubject", subject);
    },

    async fetchAllSubjectsBySubforumName({ commit }, subForumName) {
      let subjects = await fetch(`/api/v1/subjects/subforum/${subForumName}`);
      subjects = await subjects.json();
      commit("setSubjects", subjects);
    },

    async postNewSubject(context, subject) {
      let info = await fetch("/api/v1/subjects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subject),
      });
      info = await info.json();
      return info.lastInsertRowid;
    },

    async updateLockSubject(context, payload) {
      let result = await fetch(`/api/v1/subjects/lock/${payload.subjectId}`, {
        method: "POST",
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
