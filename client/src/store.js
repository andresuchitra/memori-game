import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    gameStatus : ''
  },
  mutations: {
    setGameStatus(state, payload){
      state.gameStatus = payload;
    }
  },
  actions: {

  },
});
