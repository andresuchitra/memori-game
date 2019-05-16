/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import db from './fb';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    room: '',
  },
  mutations: {
    setRoom(state, payload) {
      state.room = payload;
    },
  },
  actions: {
    getRoom(context) {
      db.collection('room').onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          context.commit('setRoom', doc.data());
          console.log('room got...', context.state.room);
        });
      });
    },
  },
});
