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
         
          <!-- <div v-if="board">돼냐</div> -->
        </div>
      </v-container>
  </v-card>
</template>

<script>

export default {
    data(){
        return {
            content:'',
            originImagePaths:[],
            removeImage:[],
            addImage:[],
           
          
        }
    },
    props:['boardId'],
    computed:{
        // board(){
        //     return this.$store.state.board.board
        // },
        imagePaths(){
            return this.$store.state.board.imagePaths
        },
        board(){
            return this.$store.state.board.board
        },
        me(){
            return this.$store.state.user.me
        }
    },
  
    created(){
       
        this.$store.dispatch('user/loadUser')

        this.$store.dispatch('board/getBoardById',this.boardId)
        .then(()=>{
           
           
            if(this.board){
               
                this.originImagePaths = this.board.images.map(image=>image.src)
               
                this.content = this.board.content
                this.$store.commit('board/loadImagePaths',this.board.images.map(img => img.src))
            }
        })
     

        
    },
    methods:{
        
        submitBoard(){
           
            
             this.addImage = this.imagePaths.filter(img=> !this.originImagePaths.includes(img))
             this.removeImage = this.originImagePaths.filter(img=> !this.imagePaths.includes(img))
             
            this.$store.dispatch('board/updateBoard',{
                content:this.content,
                boardId:this.boardId,
                addImage:this.addImage,
                removeImage:this.removeImage
            })
            .then(()=>{
             
                
                this.$router.push('/')
            })
        },
        onChangeImages(e){
            console.log(this.$refs.image.files)
            console.log(e.target.files, e.target.files.forEach);
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
    },
    beforeDestroy(){
        this.$store.commit('board/clearImagePath')
    }
}
</script>

<style>

</style>