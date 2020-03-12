<template>
 
  <v-container>
      <board-form v-if="me" />
      <div>
        <board-card v-for="board in boards" :key="board.id" :board="board"/>
      </div>
  </v-container>
</template>

<script>
import boardCard from '../components/boardCard'
import boardForm from '../components/boardForm'

export default {
    components:{
        boardCard,
        boardForm
    },
    data(){
        return {

        }
    },
    computed:{
        me(){
            return this.$store.state.user.me
        },
        boards(){
            return this.$store.state.board.boards
        },
        hasMoreBoard(){
            return this.$store.state.board.hasMoreBoard
        }

    },
    created(){
        
        
        
        this.$store.dispatch('board/loadBoards',{reset:true})

    },
    mounted() {
      window.addEventListener('scroll', this.onScroll);
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.onScroll);
    },
    methods: {
      onScroll() {
        console.log('onscroll');
        if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
          if (this.hasMoreBoard) {
            this.$store.dispatch('board/loadBoards');
          }
        }
      },
    },
    

    
}
</script>

<style>

</style>