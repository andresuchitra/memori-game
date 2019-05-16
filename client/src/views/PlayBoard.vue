<template>
  <div class="container">
    <h1 class="text-center my-4 py-4">Game Page</h1>
    <div class="row">
      <div class="col-7 pb-3" id="board">
        <div class="row justify-content-center text-center">
          <div>
            <h5 class="mt-4">Memorize the picture below!</h5>

            <button @click.prevent="shuffle" class="btn-sm btn-dark my-2 mx-2">shuffle</button>
            <button @click.prevent="changeGameStatus('running')" class="btn-sm btn-dark my-2 mx-2">Start Game</button>
            <transition-group name="cell" tag="div" class="container-wrap m-0 p-0">
              <Board v-bind:cell="cell" v-bind:img="img" v-for="cell in cells" :key="cell.id" class="cell"></Board> 
            </transition-group>
          </div>
        </div>
      </div>
      <div class="col-4 ml-5 mt-5">
        <div class="row mb-4" id="question">Question Column</div>
        <div class="row" id="chat">Chat Column</div>
      </div>
    </div>
  </div>
</template>

<script>

import _ from 'lodash'
import Board from '@/components/Board.vue'

export default {
  name: "PlayBoard",
  components : {
    Board
  },
  data() {
    return {
      img :['',
          'https://chanelmuslim.com/assets/ce5e821f/monumen-nasional-dari-garden-jadi-taman-bermain.jpg',
          'https://horrorfreaknews.com/wp-content/uploads/2017/07/Valak.jpg',
          'https://horrorfreaknews.com/wp-content/uploads/2017/07/Valak.jpg',
          'https://horrorfreaknews.com/wp-content/uploads/2017/07/Valak.jpg',
          'https://horrorfreaknews.com/wp-content/uploads/2017/07/Valak.jpg',
          'https://horrorfreaknews.com/wp-content/uploads/2017/07/Valak.jpg',
          'https://horrorfreaknews.com/wp-content/uploads/2017/07/Valak.jpg',
          'https://horrorfreaknews.com/wp-content/uploads/2017/07/Valak.jpg',
          'https://avatars2.githubusercontent.com/u/34613865?s=460&v=4',
          'https://miro.medium.com/max/3150/1*OR4HO7FQQto1y4RxjNXufQ.jpeg',
          'http://www.nu.or.id/o-client/nu_or_id/pictures/post/big/1407375152.jpg',
          'https://jualelektronik.com/wp-content/uploads/2017/04/Shimizu-Pompa-Air-Non-Auto-125-Watt-PL-138BIT.jpg',
          'https://lh3.googleusercontent.com/RAd8Wig1orzkjhjRqHeJ_1xnbcC_pxYL0jgLK0A_wTO7Axo9yD9jjNn1JSCRTzMwfvE',
          'https://pbs.twimg.com/profile_images/875996174305472512/upM71pVR.jpg',
          'https://bobandsuewilliams.com/images/thanos-eye-11.jpg',
          'https://cdn-images-1.medium.com/max/1200/1*zpf20IEq4J80W-iTO3U8TA.png'],
      cells: Array.apply(null, { length: 16 }).map(function(_, index) {
        return {
          id: index,
          number: (index % 16) + 1
        };
      }),
      role : localStorage.getItem('role')
    }
  },
  methods: {
    shuffle: function() {
      this.cells = _.shuffle(this.cells);
      this.$store.commit('setGameStatus', '')
    },
    changeGameStatus(value) {
      this.$store.commit('setGameStatus', value)
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#question {
  height: 35vh;
  background-color: white;
  color: black;
}

#chat {
  height: 35vh;
  background-color: white;
  color: black;
}

#board {
  border: 1px solid white;
}

.cell {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 150px;
  height: 150px;
  border: 1px solid #aaa;
  margin-right: -1px;
  margin-bottom: -1px;
}
.cell:nth-child(3n) {
  margin-right: 0;
}
.cell:nth-child(27n) {
  margin-bottom: 0;
}
.cell-move {
  transition: transform 1s;
}

.container-wrap {
  display: flex;
  flex-wrap: wrap;
  width: 600px;
  margin-top: 10px;
}

</style>
