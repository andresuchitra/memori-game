<template>
  <div class="container my-2 py-2">
    <div class="row my-4 py-2">
      <div class="col-lg-4 col-md-3 col-sm-2">
        <h1>Room Page</h1>
        <h6>{{list}}</h6>
        <label for>Room Name</label>
        <input v-model="roomName" type="text" class="form-control" placeholder="Enter room name">
        <button @click.prevent="createRoom" type="submit" class="btn btn-primary mt-3">Create Room</button>
      </div>
    </div>
    <div class="row my-4 py-2">
      <h3>Rooms Available :</h3>
    </div>
    <div class="row my-1 py-1" v-if="list" >
      <RoomsCard v-on:create-player="createPlayers" class="mx-5 px-5 my-5 py-5 rooms" :room="room" v-for="(room, index) in list" :key="index"></RoomsCard>
    </div>
  </div>
</template>

<script>

  import RoomsCard from '@/components/RoomsCard.vue'
  import db from '../fb'
import PlayBoardVue from './PlayBoard.vue';
export default {
 name : 'roomPage',
 components : {
   RoomsCard
 },
 data() {
   return {
     list : [],
     roomName : ''
   }
 },
 created() {
  this.listRoom();
 },
 mounted() {
   
 },
 methods: {
   listRoom() {
    db.collection('room').get()
    .then((querySnapshot)=> {
    
      querySnapshot.forEach(doc => {
         this.list.push(doc.data())
      })
    })
   },
   createRoom() {
     db.collection('room')
       .doc(this.roomName)
       .set({
         currentQuestion: 0,
         gameStatus : 'active',
         players : [],
         questionList : [
           {
             answer : 'https://pajulahti.com/wp-content/uploads/2017/04/500x500.jpeg',
             nextQuestion : false,
             question : 'Kuma?'
           },
           {
             answer : 'http://www.nu.or.id/o-client/nu_or_id/pictures/post/big/1407375152.jpg',
             nextQuestion : false,
             question : 'Makanan khas lebaran ?'
           },
           {
             answer : 'https://jualelektronik.com/wp-content/uploads/2017/04/Shimizu-Pompa-Air-Non-Auto-125-Watt-PL-138BIT.jpg',
             nextQuestion : false,
             question : 'Sedotannya kuat, semburannya kenceng?'
           },
           {
             answer : 'https://avatars2.githubusercontent.com/u/34613865?s=460&v=4',
             nextQuestion : false,
             question : 'Dimana Wika Silo?'
           },
           {
             answer : 'https://miro.medium.com/max/3150/1*OR4HO7FQQto1y4RxjNXufQ.jpeg',
             nextQuestion : false,
             question : 'Dimana Vimitri?'
           },
           {
             answer : 'https://bobandsuewilliams.com/images/thanos-eye-11.jpg',
             nextQuestion : false,
             question : 'You should have gone for the head!'
           },
           {
             answer : 'https://cdn-images-1.medium.com/max/1200/1*zpf20IEq4J80W-iTO3U8TA.png',
             nextQuestion : false,
             question : 'Mana yang merupakan Lambang Vue Mastery?'
           },
           {
             answer : 'https://pbs.twimg.com/profile_images/875996174305472512/upM71pVR.jpg',
             nextQuestion : false,
             question : 'Mana lamabang Vue?'
           },
           {
             answer : 'https://lh3.googleusercontent.com/RAd8Wig1orzkjhjRqHeJ_1xnbcC_pxYL0jgLK0A_wTO7Axo9yD9jjNn1JSCRTzMwfvE',
             nextQuestion : false,
             question : 'Mana lambang Firebase?'
           },
         ]
       })
       .then(()=> {
        console.log('new room created!');
        
       })
       .catch(err => {
         console.log(err);
       })
   },
   createPlayers(playerName, roomId) {
     let payload = {
       name : playerName,
       room : roomId
     }
     this.$store.commit('setUser', {name: playerName, score: 0, winner: false})
     localStorage.setItem('playerName',playerName)
     this.$store.dispatch('addPlayerToRoom', payload)
   },
 },
};
</script>

<style scoped>
  .rooms {
    border: 1px solid white;
    border-radius: 15px;
  }
</style>
