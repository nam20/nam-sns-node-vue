<template>
  <!-- <div>
      <input type="text" v-model="content">
      <button @click="submitComment">등록</button>
  </div> -->
  <v-container>
      <v-textarea v-model="content">

      </v-textarea>
      <v-btn color="green" dark absolute  right @click="submitComment">등록</v-btn>
  </v-container>
</template>

<script>
export default {
    props:{
        boardId:{
            type:String,
            required:true
        }
    },
    data(){
        return {
            content:''
        }
    },
    computed:{
        me(){
            return this.$store.state.user.me
        }
    },
    methods:{
        submitComment(){
            this.$store.dispatch('board/addComment',{
                boardId: this.boardId,
                content: this.content
            })
            .then(()=>{
                this.content = ''
            })
        }
    }
}
</script>

<style>

</style>