<template>
  <v-container>
    <div>
      <board-card v-for="p in boards" :key="p.id" :board="p" />
    </div>
  </v-container>
</template>

<script>
import boardCard from '../components/boardCard'
export default {
    components:{
        boardCard
    },
    props:['tag']
    ,
    computed:{
        boards(){
            return this.$store.state.board.boards
        },
        hasMoreBoard(){
            return this.$store.state.board.hasMoreBoard
        }
    },
    created(){
        this.$store.dispatch('board/loadHashtagBoards',{
          hashtag:this.tag,
          reset:true
          })
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
            this.$store.dispatch('board/loadHashtagBoards',{
              hashtag:this.tag
            });
          }
        }
      },
    },
}
</script>

<style>

</style>