<template>
  <div id='chatComponents' class="container">
    <h4 style='text-align:center'><b>Chat Rooms</b></h4>
    <div style="background-color:#C4C4C4">
      <ul id="myList">
        <li v-for="chat in chatsss">
          {{chat.user}} : {{chat.message}}
        </li>
      </ul>
    </div>
    <form @submit.prevent="sendChat()">
      <div class="form-row">
        <input type="text" name="message" id="message" v-model="message" style="width:260px"
          class="form-control">
        <input type="submit" value="Send" class="btn btn-success" style="margin-left: 10px;">
      </div>
    </form>
  </div>
</template>

<script>
  import firebase from 'firebase/app';
  import 'firebase/firestore';

  var db = firebase.firestore();

  export default {
    name: "chat",
    data() {
      return {
        chatsss: [],
        message: "",
        name: "Rudy",
        room: "123"
      }
    },
    methods: {
      sendChat() {
        var data = {
          message: this.message,
          room: this.room,
          user: this.name,
          time: new Date
        }
        db
          .collection("chats")
          .doc()
          .set(data);
        this.message = ''

      }
    },
    watch:{
      chatsss : () => {
      var myList = document.getElementById('myList');
      myList.innerHTML = '';
      }
    },
    created() {
    var chatTemp = [];
    db
    .collection("chats")
    .where("room", "==", this.room)
    .orderBy("time", "desc")
    .onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        chatTemp.push(doc.data());
      });
    });
    console.log('firebas=0000==', chatTemp)
    this.chatsss = chatTemp
  }
  }
</script>

<style scoped>
  chatComponents {
    position: fixed;
    overflow-y: scroll;
  }

  ul {
    list-style: none;
    height: 140px;
    overflow-y: auto;
    overflow-x: none;
  }
</style>