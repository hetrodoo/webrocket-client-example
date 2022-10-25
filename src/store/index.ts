import { createStore } from 'vuex';

export default createStore({
  state: {
    people: [],
  },
  getters: {
    GET_PEOPLE(state) {
      return state.people;
    },
  },
  mutations: {
    SET_PEOPLE(state, payload) {
      state.people = payload;
    },
  },
  actions: {},
  modules: {},
});
