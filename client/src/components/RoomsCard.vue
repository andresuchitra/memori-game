<template>
    <div>
        <h4 class="mb-5">{{room.id}}</h4>
        <span>Players :</span>
        <ul>
            <!-- <li v-for="(player, index) in room.players" :key="index">{{room}}</li> -->
        </ul>
        <div class="row align-items-center">
            <div class="col-5 text-center">
                <input class="name" type="text" placeholder="  input name" v-model="playerName">
            </div>
            <div class="col-6">
                <button class="btn btn-danger mx-1" @click.prevent="addPlayer(room.id)">join</button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props : ['room'],
    data() {
        return {
            playerName : ''
        }
    },
    methods: {
        addPlayer(roomId) {
            this.$emit('create-player', this.playerName, roomId )
        }
    },
}
</script>

<style scoped>
    .name {
        border-radius: 10px;
    }
</style>
