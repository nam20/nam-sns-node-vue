<template>
  
  <v-container v-if="me">
    <v-card style="margin-bottom: 20px">
      <v-container>
        <v-subheader>내 프로필</v-subheader>
        
          <v-text-field
            v-model="name"
            label="네임"
            :rules="nameRules"
            required
          />
          <v-btn color="blue" class="white--text" type="submit" :disabled="!name" @click="onChangename">
            수정
          </v-btn>
        
      </v-container>
    </v-card>
    <v-card style="margin-bottom: 20px">
      <v-container>
        <v-subheader>팔로잉</v-subheader>
        <follow-list :list="followingList" :on-remove-user="removeFollowing" />
        <!-- <v-btn v-if="hasMoreFollowing" dark color="blue" style="width: 100%" @click="loadMoreFollowings" >더보기</v-btn> -->
      </v-container>
    </v-card>
    <v-card style="margin-bottom: 20px">
      <v-container>
        <v-subheader>팔로워</v-subheader>
        <follow-list :list="followerList" :on-remove-user="removeFollower" />
        <!-- <v-btn v-if="hasMoreFollower" dark color="blue" style="width: 100%" @click="loadMoreFollowers" >더보기</v-btn> -->
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import followList from '../components/followList'
export default {
   
    components:{
        followList
    },
    data(){
        return {
            name: '',
            nameRules: [
            v => !!v || '네임은 필수입니다.',
            ],
        }
    },
    methods:{
        onChangename(){
            this.$store.dispatch('user/changeName',this.name)
        },

        removeFollowing(userId) {
            this.$store.dispatch('user/unfollow',  userId );
        },
        removeFollower(userId) {
            this.$store.dispatch('user/removeFollower',  userId );
        }
    },
    computed:{
        
        followerList() {
            return this.$store.state.user.followerList;
        },
        followingList() {
            return this.$store.state.user.followingList;
        },
        me(){
          return this.$store.state.user.me
        }
    },
   
    created(){
       this.$store.dispatch('user/loadUser')
       .then(()=>{
         if(!this.me){
           return this.$router.push('/')
         }else{
            this.name = this.me.name
            this.$store.dispatch('user/loadFollowers')
            this.$store.dispatch('user/loadFollowings')
         }
            
       })
            
        

        
    }
}
</script>

<style>

</style>