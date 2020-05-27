<template>
  <div style="margin-bottom:20px;">
      
      <v-card>
          <board-content :board="board" />

          <v-card-actions>
             
              <v-btn text color="orange" @click="onClickLike">
                  <v-icon>{{likeIcon}}</v-icon>
              </v-btn>
              <v-btn text color="orange" @click="onToggleComment">
                  <v-icon>mdi-comment-outline</v-icon>
              </v-btn>

              <v-menu offset-y open-on-hover v-if="isWriter"> 
                <template v-slot:activator="{ on }">
                    <v-btn text color="orange" v-on="on">
                    <v-icon>mdi-dots-horizontal</v-icon>
                    </v-btn>
                </template>
                <div style="background: white">
                    <v-btn dark color="red" @click="onRemoveBoard">삭제</v-btn>
                    <v-btn text color="orange"  @click="onEditBoard">수정</v-btn>
                </div>
                </v-menu>
          </v-card-actions>
      </v-card>
      <template v-if="commentOpened">
        <comment-form :boardId="board.id" v-if="me"/>
        <v-list>
            <v-list-item v-for="comment in board.comments" :key="comment.id">
            <v-list-item-avatar color="teal">
                <span>{{comment.user.name}}</span>
            </v-list-item-avatar>
            <v-list-item-content>
                <h3>{{comment.user.name}}</h3>
                <div>{{comment.content}}</div>
            </v-list-item-content>
            </v-list-item>
        </v-list>
        </template>
      
 
     
  </div>
</template>

<script>
import boardContent from './boardContent'
import commentForm from './commentForm'


export default {    
    props:{
        board: Object
    },
    components:{
        boardContent,
        commentForm
    },
    data(){
        return {
            commentOpened: false
        }
    },
    computed:{
        me(){
            return this.$store.state.user.me
        },
        liked(){
            const liked = (this.board.Likers || []).find(v => v.id === (this.me && this.me.id));
            return !!liked; 
        },
        isWriter(){
            return this.board.user.id === this.me.id
        },
        likeIcon(){
            return this.liked ? 'mdi-thumb-up' : 'mdi-thumb-up-outline'
        }
    },
    methods:{
        onClickLike(){
            if(!this.me){
                alert('로그인 요구')
            }

            if(this.liked){
                return this.$store.dispatch('board/unlikeBoard',this.board.id)
            }

                return this.$store.dispatch('board/likeBoard',this.board.id)
        },
        onToggleComment(){
            if(!this.commentOpened){
                this.$store.dispatch('board/loadComments',{boardId:this.board.id})
            }
            this.commentOpened = !this.commentOpened
        },
        onRemoveBoard(){
            this.$store.dispatch('board/removeBoard',this.board.id)
        },
        onEditBoard(){
           this.$router.push(`/update/${this.board.id}`)
        }
    }
}
</script>

<style >

</style>