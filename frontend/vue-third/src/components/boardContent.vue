<template>
  <div>
      
      <board-image :images="board.images" /> 
      <v-card-title>
          <h3>
              <router-link :to="`/user/${board.user.id}`" style="text-decoration:none;color:black">{{board.user.name}}</router-link>
              
              <v-btn v-if="canFollow" @click="onFollow">팔로우</v-btn>
              <v-btn v-if="canUnFollow" @click="onUnFollow">언팔로우</v-btn>
          </h3>
      </v-card-title>
      <v-card-text style="text-align:left;">
          <div>
              <template v-for="(node,i) in nodes">
                  <router-link v-if="node.startsWith('#')" :to="`/hashtag/${node.slice(1)}`" :key="i" style="text-decoration:none">{{node}}</router-link>
                  <template v-else>{{node}}<template>
              </template>
          </div>
           <div>{{$moment(board.createdAt).fromNow()}}</div>
      </v-card-text>
  </div>
</template>

<script>
import boardImage from './boardImage'

export default {
    props:{
        board: Object
    },
    components:{
        boardImage
    },
    computed:{
        nodes(){
            return this.board.content.split(/(#[^\s#]+)/)
        },
        me(){
            return this.$store.state.user.me
        },
        canFollow(){
            return this.me && this.me.id !== this.board.user.id && !this.me.Followings.find(v => v.id === this.board.user.id)
        },
        canUnFollow(){
            return this.me && this.me.id !== this.board.user.id && this.me.Followings.find(v => v.id === this.board.user.id)
        }   
    },
    methods:{
        onFollow(){
            this.$store.dispatch('user/follow',this.board.user.id)
        },
        onUnFollow(){
            this.$store.dispatch('user/unfollow',this.board.user.id)
        }
    }
}
</script>

<style>

</style>