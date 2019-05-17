<template>
  <div class="container my-2 py-2">
    <div class="row my-4 py-2">
      <div class="col-lg-4 col-md-3 col-sm-2">
        <h1>Room Page</h1>

        <label for>Room Name</label>
        <input type="text" class="form-control" placeholder="Enter room name">
        <button @click.prevent="createRoom" type="submit" class="btn btn-primary mt-3">Create Room</button>
      </div>
    </div>
    <div class="row my-4 py-2">
    </div>
  </div>
</template>

<script>
export default {
 data() {
   return {
     
   }
 },
 methods: {
   createRoom() {
     
   }
 },
};
</script>

<style scoped>
</style>
