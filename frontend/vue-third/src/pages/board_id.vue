<template>
  <v-container v-if="board">
      <board-card :board="board"/>
  </v-container>
  <div v-else>
      없음
  </div>

</template>

<script>
import boardCard from '../components/boardCard'
export default {
    components:{
        boardCard
    },
    props:['id'],
    computed:{
        board(){
            return this.$store.state.board.boards.find(board => board.id === this.id )
        }
    }

}
</script>

<style>

</style>