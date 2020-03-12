import axios from 'axios'

const state = () => ({
    me:'',


    followingList:[],
    followerList:[],
    other:''
})

const mutations = {
    addFollower(state, payload) {
        state.followerList.push(payload);
    },
    addFollowing(state, payload) {
        state.followingList.push(payload);
    },

    setMe(state,payload){
      state.me = payload
    },
    setOther(state,payload){
        state.other = payload
    },
    changeName(state,payload){
        state.me.name = payload.name
    },
    
    loadFollowings(state,payload){
        state.followingList = payload
    },
    loadFollowers(state,payload){
        state.followerList = payload
    },

    
    following(state,payload){
        state.me.Followings.push({id:payload.userId})
    },
    removeFollowing(state,payload){
        let index = state.me.Followings.findIndex(v => v.id === payload.userId);
        state.me.Followings.splice(index, 1);
        index = state.followingList.findIndex(v => v.id === payload.userId);
        state.followingList.splice(index, 1);
    },


    removeFollower(state,payload){   // 자신을 팔로우하는 팔로워를 쳐낸다?
        let index = state.me.Followers.findIndex(v => v.id === payload.userId);
        state.me.Followers.splice(index,1)
        index = state.followerList.findIndex(v => v.id === payload.userId)
        state.followerList.splice(index,1)
    }
}

const actions = {
    loadUser({commit,state}){
        
        return axios.get('/user')
       .then(res=>{
            console.log(res)
            if(typeof res.data === 'object') commit('setMe',res.data)
           
        })
       .catch(err=>{
           console.log(err)
       })
   },
   loadOther({commit},payload){
        axios.get(`/user/${payload}`)
        .then(res=>{
            commit('setOther',res.data)
        })
        .catch(err=>{
            console.error(err)
        })
   },

  join({commit},payload){


   axios.post('/user',{
       userId:payload.userId,
       name: payload.name,
       password: payload.password
   })
   .then(res=>{
       console.log(res)
       if(typeof res.data === 'object') commit('setMe',res.data)
   })
   .catch(err=>{
       console.log(err)
   })
 },
   login({commit},payload){
    
     return axios.post('/user/login',{
       userId:payload.userId,
       password:payload.password
     })
     .then(res=>{
         console.log(res)
         if(typeof res.data === 'object') commit('setMe',res.data)
     })
     .catch(err=>{
         console.log(err)
     })
   },

   logout({commit}){
     axios({
         method:'get',
         url:'/user/logout'
     })
     .then(res=>{
         console.log(res)
         commit('setMe','')
     })
     .catch(err=>[
         console.log(err)
     ])
  },  

  follow({commit},userId){
       axios({
           method:'post',
           url:`/user/${userId}/follow`
       })
       .then(res=>{
           console.log(res)
           commit('following',{
               userId : res.data
           })
       })         
       .catch(err=>{
           console.log(err)
       })
   },
   unfollow({commit},userId){
       axios({
           method:'delete',
           url:`/user/${userId}/follow`
       })
       .then(res=>{
           console.log(res)
           commit('removeFollowing',{
               userId : res.data
           })
        
       })         
       .catch(err=>{
           console.log(err)
       })
   },
   changeName({commit},payload){
        axios.patch('/user/name',{
            name:payload
        })
        .then(res=>{
            commit('changeName',res.data)
        })
        .catch(err=>{
            console.error(err)
        })
   },



   
   loadFollowings({commit,state},payload){
       axios.get(`user/${state.me.id}/followings`)
       .then(res=>{
           console.log(res.data)
           commit('loadFollowings',res.data)
       })
       .catch(err=>{
           console.error(err)
       })
   },
   loadFollowers({commit,state},payload){
       axios.get(`user/${state.me.id}/followers`)
       .then(res=>{
        console.log(res.data)
           commit('loadFollowers',res.data)
       })
       .catch(err=>{
           console.error(err)
       })
   },

   removeFollower({commit},userId){
       axios.delete(`user/${userId}/follower`)
       .then(res=>{

           commit('removeFollower',{
               userId: userId
           })
       })
       .catch(err=>{
           console.error(err)
       })
   }
}

export default {
    namespaced:true,
    state,mutations,actions,

}