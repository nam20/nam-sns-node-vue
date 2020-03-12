<template>
  <div>
      <v-container>
          <v-card>
              <v-container>
                  <v-subheader>훠훠가입</v-subheader>
                  <v-text-field v-model="userId" :rules="userIdRules" label="아이디"></v-text-field>
                  <v-text-field v-model="name" :rules="nicknameRules" label="네임"></v-text-field>
                  <v-text-field v-model="password" :rules="passwordRules" label="비밀번호"></v-text-field>
                  <v-text-field v-model="passwordCheck" :rules="passwordCheckRules" label="비밀번호 확인"></v-text-field>
                  <v-btn color="green" @click="onJoin" :disabled="isBlank">가입하기</v-btn>
              </v-container>
          </v-card>
      </v-container>
  </div>
</template>

<script>
export default {
    data(){
        return {
            userId:'',
            name:'',
            password:'',
            passwordCheck:'',
            userIdRules: [
            v => !!v || '아이디는 필수입니다.',
            ],
            nicknameRules: [
            v => !!v || '닉네임은 필수입니다.',
            ],
            passwordRules: [
            v => !!v || '비밀번호는 필수입니다.',
            ],
            passwordCheckRules: [
            v => !!v || '비밀번호 확인은 필수입니다.',
            v => v === this.password || '비밀번호가 일치하지 않습니다.',
            ]
        }
    },
    computed:{
        me(){
            return this.$store.state.user.me
        },
        isBlank(){
            return this.userId === '' || this.name === '' || this.password === '' || this.passwordCheck === ''
        }
    },
    watch:{
        me(value){
            if(value){
                this.$router.push('/')
            }
        }
    },
    methods:{
        onJoin(){
            this.$store.dispatch('user/join',{
                userId: this.userId,
                name: this.name,
                password: this.password
            })
            .then(() => {
              this.$router.push({
                path: '/',
              });
            })
            .catch(() => {
              alert('회원가입 실패');
            });
        }
    }
}
</script>

<style>

</style>