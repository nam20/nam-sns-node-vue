<template>
  
  <v-card style="margin-bottom:20px;">
      <v-container>
          <v-textarea label="내용 입력" v-model="content">   
          </v-textarea>
          <v-btn color="green" absolute right @click="submitBoard">등록</v-btn>
          <input type="file" ref="image" @change="onChangeImages" hidden multiple>
          <v-btn type="button" @click="onClickImageUpload">이미지 업로드</v-btn>
          <div>
          <div v-for="(p, i) in imagePaths" :key="p" style="display: inline-block">
            <img :src="p" :alt="p" style="width: 200px">
            <div>
              <button @click="removeImagePath(i)" type="button">제거</button>
            </div>
          </div>
        </div>
      </v-container>
  </v-card>
</template>

<script>
export default {
    data(){
        return {
            content:''
        }
    },
    computed:{
        me(){
            return this.$store.state.user.me
        },
        imagePaths(){
            return this.$store.state.board.imagePaths
        }
    },
    methods:{
        submitBoard(){
            const image = this.$refs.image.files
            this.$store.dispatch('board/addBoard',{
                content:this.content
            })
            .then(()=>{
                this.content = ''
            })
        },
        onChangeImages(e){
           
            const imageFormData = new FormData();
            [].forEach.call(e.target.files,(f)=>{
                imageFormData.append('image',f)
            })
            this.$store.dispatch('board/uploadImages',imageFormData)
        },
        removeImagePath(index){
            this.$store.commit('board/removeImagePath',index)
        },
        onClickImageUpload(){
            this.$refs.image.click();
        }
    }
}
</script>

<style>

</style>