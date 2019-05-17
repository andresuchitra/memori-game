<template>
  <div class="flip-box">
    <div class="flip-box-inner">
      <div class="flip-box-front">
       <span></span>
      </div>
      <div class="flip-box-back">
         <a href="#">
          <img v-if="this.$store.state.gameStatus == 'running'" :src="img[cell.number]" alt srcset>
          <img v-else src="" alt="" style="background-color:black">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props : ['cell','img'],
    methods: {
      sendAnswer(answer) {
        console.log(this.$store.state.user);
        let player = this.$store.state.room.players.find(x => x.name === this.$store.state.user.name)

        if(player) {
          player.score += answer;
          console.log('new score...', player);
          this.$store.dispatch('updateScore', player)
        }
        else {
          player = {
            name: localStorage.getItem('playerName'),
            score: 0,
          }
        }
      },
      answer() {
        let answerImg = this.$props.img[this.$props.cell.number];
        
        if(this.$store.state.currentQuestion && (answerImg === this.$store.state.currentQuestion.answer)) {
          console.log('correct!');
          this.sendAnswer(1)
        }
        else {
          console.log('wrong!');
          this.sendAnswer(0)
        }

        this.$store.dispatch('goToNextQuestion')
      },
    },
};
</script>

<style scoped>
img {
  width: 150px;
  height: 150px;
  border: 1px solid white
}

span {
  background-color: black
}


.flip-box {
  background-color: transparent;
  width: 150px;
  height: 150px;
  border: 1px solid black;
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
}

/* This container is needed to position the front and back side */
.flip-box-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

/* Do an horizontal flip when you move the mouse over the flip box container */
.flip-box:hover .flip-box-inner {
  transform: rotateY(180deg);
}

/* Position the front and back side */
.flip-box-front, .flip-box-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

/* Style the front side (fallback if image is missing) */
.flip-box-front {
  background-color: black;
  color: black;
}

/* Style the back side */
.flip-box-back {
  background-color: black;
  color: black;
  transform: rotateY(180deg);
}

</style>
