import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '@/pages/index'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path:'/signup',
      component: ()=>import('@/pages/signup')
    },
    {
      path:'/update/:boardId',
      component:()=>import('@/pages/update'),
      props:true
    },
    {
      path:'/profile',
      component:()=>import('@/pages/profile'),
      
    },
    {
      path:'/hashtag/:tag',
      component:()=>import('@/pages/hashtag'),
      props:true
    },
    {
      path:'/board/:id',
      component:()=>import('@/pages/board_id'),
      props:true
    },
    {
      path:'/user/:id',
      component:()=>import('@/pages/user_id'),
      props:true
    }
  ]
})
