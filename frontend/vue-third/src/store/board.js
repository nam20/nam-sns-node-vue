import axios from 'axios'
import Vue from 'vue'
import throttle from 'lodash.throttle'

const state = ()=>({
    boards:[],
    imagePaths:[],
    hasMoreBoard:true,
    board:''
})



const mutations = {
    loadBoards(state,payload){
        if(payload.reset){
            state.boards = payload.data
        }else{
            state.boards = state.boards.concat(payload.data)
        }
        state.hasMoreBoard = payload.data.length === 10
        //state.imagePath = []
      
     },
     loadComments(state,payload){
         const index = state.boards.findIndex(v => v.id === payload.boardId)
         //state.boards[index].comments = payload.data 
         Vue.set(state.boards[index], 'comments', payload.data);
     },
     
     addBoard(state,payload){
         state.boards.unshift(payload)
         state.imagePaths = [] 
     },
     removeBoard(state,payload){
         let index = state.boards.findIndex(v => v.id === payload.boardId)
         state.boards.splice(index,1)
     },
     addComment(state,payload){
         let index = state.boards.findIndex(v => v.id === payload.boardId)
         
         state.boards[index].comments.push(payload)
     },
     likeBoard(state,payload){
         let index = state.boards.findIndex(v => v.id === payload.boardId)
         state.boards[index].Likers.push({
             id:payload.userId
         })
     },
     unlikeBoard(state,payload){
         let index = state.boards.findIndex(v => v.id === payload.boardId)
         let userIndex = state.boards[index].Likers.findIndex(v => v.id === payload.userId)
         state.boards[index].Likers.splice(userIndex,1)
     },
     concatImagePaths(state, payload) {
         console.log(payload)
         state.imagePaths = state.imagePaths.concat(payload);
         console.log(state.imagePaths)
     },
     removeImagePath(state, payload) {
         state.imagePaths.splice(payload, 1);
     },
     clearImagePath(state){
         state.imagePaths = []
     },
     loadImagePaths(state,payload){
         state.imagePaths = payload
     },
     getBoardById(state,payload){
       
         state.board = payload
     },
     loadBoard(state,payload){
         state.boards = [payload]
     }
}

const actions = {
    addBoard({commit,state},payload){
           
        axios.post('/board',{
            content:payload.content,
            image:state.imagePaths
        })
        .then(res=>{
            console.log(res);
            commit('addBoard',res.data)
    
         })
        .catch(err=>{
            console.error(err);
                  
         })
     
  },
  removeBoard({commit},payload){
    axios.delete(`/board/${payload}`)
    .then(res=>{
        console.log(res.data)
        commit('removeBoard',{
            boardId:payload
       })
    })
    .catch(err=>{
        console.error(err)
    })
    
  },
  updateBoard({commit,state},payload){
    return axios.patch(`/board/${payload.boardId}`,{
        content:payload.content,
        addImage:payload.addImage,
        removeImage:payload.removeImage
    })
    .then(res=>{
        console.log(res.data)
    })
    .catch(err=>{
        console.error(err)
    })
  },
    addComment({state,commit},payload){

      console.log(payload)
      
      axios.post(`/board/${payload.boardId}/comment`,{
          content:payload.content
        })
      .then(res=>{
          console.log(res)
          commit('addComment',res.data)
          

      })
      .catch(err=>{
          console.log(err)
      })
   },
   loadComments({commit},payload){
      axios.get(`/board/${payload.boardId}/comments`)
      .then(res=>{
          console.log(res)
        commit('loadComments',{
            boardId:payload.boardId,
            data: res.data
        })
      })
      .catch(err=>{
          console.log(err)
      })
   },

    loadBoards:throttle(function({commit,state},payload){
        if(payload && payload.reset){
            return axios.get('/boards?limit=10')
            .then(res=>{
            console.log(res)
            commit('loadBoards',{
                data:res.data,
                reset:true
                })
            })
            .catch(err=>{
            console.error(err)
            })
        }else{
            if(state.hasMoreBoard){
                let lastBoard = state.boards[state.boards.length-1]
                console.log(lastBoard)
                return axios.get(`/boards?lastId=${lastBoard.id}&limit=10`)
                .then(res=>{
                    console.log(res.data)
                    commit('loadBoards',{data:res.data})
                })
                .catch(err=>{
                    console.error(err)
                })
            }
        }
    },3000),
   likeBoard({commit},boardId){
     
    axios({
        method:'post',
        url:`/board/${boardId}/like`
    })
    .then(res=>{
        console.log(res)
        commit('likeBoard',{
            boardId:boardId,
            userId:res.data.userId
        })
      
    })
    .catch(err=>{
        console.log(err)
    })
   },
   unlikeBoard({commit},boardId){
     axios({
        method:'delete',
        url:`/board/${boardId}/like`
    })
    .then(res=>{
        console.log(res)
        commit('unlikeBoard',{
            boardId:boardId,
            userId:res.data.userId
        })
        
    })
    .catch(err=>{
        console.log(err)
    })
   },

    async hashtagSearch({commit},hashtag){
          try{
              const result = await axios({
                  method:'get',
                  url:`/hashtag/${hashtag}`
              })

              console.log(result)
          
          }catch(err){
              console.error(err)
          }
      },

    uploadImages({commit},payload){
        axios.post('/board/img',payload)
        .then(res=>{
            commit('concatImagePaths',res.data)
        })
        .catch(err=>{
            console.error(err)
        })
    },

    getBoardById({commit},payload){
      
       return  axios.get(`/board/${payload}`)
        .then(res=>{
            
            commit('getBoardById',res.data)
        })
        .catch(err=>{
            console.error(err)
        })
    },

    loadHashtagBoards:throttle(function({commit,state},payload){
        if(payload && payload.reset){
            return axios.get(`/hashtag/${payload.hashtag}?limit=10`)
            .then(res=>{
                commit('loadBoards',{
                    data:res.data,
                    reset:true
                })
            })
            .catch(err=>{
                console.error(err)
            })
        }

         if (state.hasMoreBoard) {
            const lastBoard = state.boards[state.boards.length - 1];
            return axios.get(`/hashtag/${payload.hashtag}?lastId=${lastBoard.id}&limit=10`)
            .then((res) => {
                 commit('loadBoards', {
                  data: res.data,
                });
             })
            .catch((err) => {
                 console.error(err);
            });
       }
        
    },3000),

    loadBoard({commit},payload){
        axios.get(`/board/${payload}`)
    },



    loadUserBoards:throttle(function({commit,state},payload){
        if(payload && payload.reset){
           return axios.get(`/user/${payload.userId}/boards?limit=10`)
            .then(res=>{
                commit('loadBoards',{
                    data:res.data,
                    reset:true
                })
            })
            .catch(err=>{
                console.error(err)
            })
        }

        if(state.hasMoreBoard){
            const lastBoard = state.boards[state.boards.length - 1]
            return axios.get(`/user/${payload.userId}/boards?lastId=${lastBoard.id}&limit=10`)
                .then(res=>{
                    commit('loadBoards',{
                        data:res.data
                    })
                })
                .catch(err=>{
                    console.error(err)
                })
        }
        
        
    },3000)
}

export default {
    namespaced:true,
    state,mutations,actions,
}