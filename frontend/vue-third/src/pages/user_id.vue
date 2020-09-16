<template>
  <v-container v-if="other">
    <v-card style="margin-bottom: 20px">
      <v-container>
        {{other.name}}
        <v-row>
          <v-col cols="4">{{other.Followings.length}} 팔로잉</v-col>
          <v-col cols="4">{{other.Followers.length}} 팔로워</v-col>
          <v-col cols="4">{{other.boards.length}} 게시글</v-col>
        </v-row>
      </v-container>
    </v-card>
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
    props:['id'],
    computed:{
        other(){
            return this.$store.state.user.other
        },
        boards(){
            return this.$store.state.board.boards
        },
        hasMoreBoard(){
            return this.$store.state.board.hasMoreBoard
        }
    },
    created(){
        this.$store.dispatch('user/loadOther',this.id)
        this.$store.dispatch('board/loadUserBoards',{
            userId: this.id,
            reset: true
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
      
        if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
          if (this.hasMoreBoard) {
            this.$store.dispatch('board/loadUserBoards',{
              userId: this.id
            });
          }
        }
      },
    },
}
</script>

<style>

</style>