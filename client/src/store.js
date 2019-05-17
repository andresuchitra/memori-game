/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import db from './fb'


Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    room: {},
    currentQuestion: '',
    currentIndex: 0,
    players: [],
    user: '',
    gameStatus: 'active',
  },
  mutations: {
    setGameStatus(state, payload) {
      state.gameStatus = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setNextQuestion(state, index) {
      state.currentIndex = index;
      if (state.room.questionList) {
        if (state.currentIndex === 10) {
          state.currentQuestion = {
            question: 'YAYY...Game is completed!',
          };
        } else {
          state.currentQuestion = state.room.questionList[state.currentIndex];
        }
      } else {
        state.currentQuestion = 'QUESTIONS LIST EMPTY!';
      }
    },
    setCurrentQuestion(state, payload) {
      state.currentQuestion = payload;
    },
    setRoom(state, payload) {
      state.room = payload
    },
    setMyName(state, payload) {
      state.myName = payload
    },
    setMyScore(state,payload){
      state.myScore = payload
    },
    setPlayers(state,payload){
      state.players = payload
    },
    setMyDocId(state,payload){
      state.myDocId = payload
    },
  },
  actions: {
    goToNextQuestion(context) {
      const roomDocRef = db.doc(`room/${context.state.room.id}`);
      let nextQuestionIndex;

      roomDocRef.get()
        .then((doc) => {
          console.log(doc);
          nextQuestionIndex = doc.data().currentQuestion + 1;
          console.log('next qindex..', nextQuestionIndex);

          roomDocRef.update({
            currentQuestion: nextQuestionIndex,
          })
            .then(() => {
              context.commit('setNextQuestion', nextQuestionIndex);
            })
            .catch((error) => {
              console.error('Error updating document: ', error);
            });
        })
        .catch((err) => {
          console.log(err);
        });

      if (typeof (nextQuestionIndex) !== 'number') nextQuestionIndex = 0;
    },
    getRoom(context, payload) {
      let room;
      db.doc(`room/${payload}`).onSnapshot((doc) => {
        const data = doc.data();
        // to change
        if (doc.exists) {
          console.log(data);
          room = data;
          context.commit('setRoom', room);
          context.state.room.id = doc.id;
          context.commit('setNextQuestion', room.currentQuestion);
        } else {
          console.log(`Room: ${payload} does NOT exist!`);
        }
      });
    },
    restartGame(context) {
      db.doc(`room/${context.state.room.id}`).update({
        currentQuestion: 0,
      })
        .then(() => {
          context.commit('setNextQuestion', 0);
        })
        .catch((error) => {
          console.error('Error updating document: ', error);
        });
    },
    updateScore(context, updatedPlayer) {
      let players;
      const docRef = db.doc(`room/${context.state.room.id}`);

      docRef.get()
        .then((doc) => {
          if (doc.exists) {
            // eslint-disable-next-line prefer-destructuring
            players = doc.data().players;
            
            console.log(players);

            players.forEach((x) => {
              if (x.name === updatedPlayer.name) {
                x.score = updatedPlayer.score;
              }
            });

            docRef.update({ players })
              .then(() => {
                console.log(`Player ${updatedPlayer.name} score is successfully updated..`);
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            console.log(`Room: ${context.state.room.id  } does not exist`);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addPlayerToRoom(context, payload) {
      
      db
        .collection('room').doc(payload.room)
        .get()
        .then(function(docRef){
          let players = {
            ...docRef.data(), 
            id : docRef.id
          }
          players.players.push({
            name : payload.name,
            score : 0,
            winner : false
          })
          return players
        })
        .then((players)=> {
          localStorage.setItem('playerName',payload.name)
          
          db
            .collection('room').doc(payload.room)
            .set(players)
        })
        .then(()=> {
          db
            .collection('room').doc(context.state.room)
            .collection('players').doc(docRef.id)
            .onSnapshot(function(doc) {
              context.commit("setMyName",doc.data().name)
              context.commit("setMyScore", doc.data().score)
              context.dispatch("listenToPlayers")
              context.dispatch("listenToRoom") 
            })
        })
        .catch(function(error){
          console.error('Error adding document', error);
        })
    },
  },
});
