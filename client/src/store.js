import Vue from 'vue';
import Vuex from 'vuex';
// import db from './fb';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      name : ""
    }
  },
  mutations: {
    setPlayerName(state, payload){
      state.name = payload
    }
  },
  actions: {

  },
});
