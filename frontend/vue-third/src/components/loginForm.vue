<template>
  <div>
      <v-container v-if="!me">
          <v-card>
              <v-form>
                  <v-container>
                      <v-text-field v-model="userId" label="아이디"></v-text-field>
                      <v-text-field v-model="password" label="비밀번호"></v-text-field>
                      
                      <v-btn @click="onLogIn">로그인</v-btn>
                      <v-btn @click="$router.push('/signup')">회원가입</v-btn>
                      <!-- <a href="http://35.231.123.89/auth/facebook" style="text-decoration-line: none;"><v-btn >페북</v-btn></a>
                      <a href="http://35.231.123.89/auth/google" style="text-decoration-line: none;"><v-btn >구글</v-btn></a> -->
                      <a href="http://35.231.123.89/auth/kakao" style="text-decoration-line: none;"><v-btn >카카오</v-btn></a>
                      <a href="http://35.231.123.89/auth/naver" style="text-decoration-line: none;"><v-btn >네이버</v-btn></a>
                      
                  </v-container>
              </v-form>
          </v-card>
      </v-container>
      <v-container v-else>
            <v-card>
                <v-container>
                    {{me.name}}
                    <v-btn @click="onLogOut">로그아웃</v-btn>
                    <v-row>
                        <v-col cols="4">{{me.Followings.length}} 팔로잉</v-col>
                        <v-col cols="4">{{me.Followers.length}} 팔로워</v-col>
                        <v-col cols="4">{{me.boards.length}} 게시글</v-col>
                    </v-row>
                </v-container>
            </v-card>
      </v-container>
      

      <!-- <div v-if="!me">
          <input type="text" v-model="userId" placeholder="userId">
          <input type="text" v-model="password" placeholder="password">
          <input type="text" v-model="name" placeholder="name">
          <button @click="$store.dispatch('user/join',{userId,name,password})">조인</button>
          <button @click="$store.dispatch('user/login',{userId,password})">로그인</button>
      </div>
      <div v-else>
          <button @click="$store.dispatch('user/logout')">로그아웃</button>
      </div> -->
  </div>
</template>

<script>
export default {
    data(){
        return {
            userId:'',
            password:'',
            name:''
        }
    },
    

    computed:{
        me(){
            return this.$store.state.user.me
        }
    },
    methods:{
        onLogIn(){
            this.$store.dispatch('user/login',{
                userId:this.userId,
                password:this.password
            })
            .then(()=>{
                this.userId = '',
                this.password = ''
            })
        },
        onLogOut(){
            this.$store.dispatch('user/logout')
        },
        // facebookLogin(){
        //     this.$store.dispatch('user/facebookLogin')
        // },
        // googleLogin(){
        //     this.$store.dispatch('user/googleLogin')
        // }
        
        
    },
    created(){
          
            this.$store.dispatch('user/loadUser')
        
      
    }
}
</script>

<style>

</style>