var express = require('express');
var router = express.Router();
let multer = require('multer');

const db = require('../models')
const passport = require('passport')
const bcrypt = require('bcrypt')
const {isLoggedIn,isNotLoggedIn} = require('./middlewares')
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

const upload = multer()

router.get('/',isLoggedIn,async (req,res,next)=>{  //유저 정보

   
    res.json(req.user)
  })
  
  
  router.post('/',isNotLoggedIn,async (req,res,next)=>{  //회원가입
      
      const {userId,name,password} = req.body
      try{  
        const exUser = await db.User.findOne({where:{userId}})
        if(exUser){
          return res.send('아이디 중복')
        }
        const hash = await bcrypt.hash(password,12)
        var user = await db.User.create({
          userId,
          name,
          password:hash
        })
  
        return req.login(user,async (loginError)=>{
          if(loginError){
            console.error(loginError)
            return next(loginError)
          }

          const newUser = await db.User.findOne({
            where:{name:name},
            attributes:['id','name'],
            include:[{
                model:db.User,
                attributes:['id','name'],
                as:'Followers'
            },{
                model:db.User,
                attributes:['id','name'],
                as:'Followings'
            },{
                model:db.Board,

            }]
          })
          return res.json(newUser)
        })  
  
        //return res.send('성공')
      }catch(err){
        console.log(err)
        return next(error)
      }
  })

  router.patch('/name',isLoggedIn,async (req,res,next)=>{
      await db.User.update({
          name:req.body.name
      },{
        where:{id:req.user.id}
      })
      const user = await db.User.findOne({
        where:{id:req.user.id}
      })
      res.send(user)

  })
  
  
  router.post('/login',isNotLoggedIn,(req,res,next)=>{
    
    passport.authenticate('local',(authError,user,info)=>{
      if(authError){
        console.error(authError)
        return next(authError)
      }
      if(!user){
        
        return res.send(info.message)
      }
      return req.login(user,async (loginError)=>{
        if(loginError){
          console.error(loginError)
          return next(loginError)
        }

        const newUser = await db.User.findOne({
          where:{userId:req.body.userId},
          attributes:['id','name'],
          include:[{
              model:db.User,
              attributes:['id','name'],
              as:'Followers'
          },{
              model:db.User,
              attributes:['id','name'],
              as:'Followings'
          },{
              model:db.Board,
          }]
        })
        return res.json(newUser)
      
      })  
    })(req,res,next)
  })
  
  router.get('/logout',isLoggedIn,(req,res)=>{
    
    req.logout()
    req.session.destroy()
    res.send('로그아웃 성공')
  })

  router.post('/:id/follow',isLoggedIn,async (req,res,next)=>{

 
    try{
      const user = await db.User.findOne({where:{id:req.user.id}})
      await user.addFollowing(parseInt(req.params.id,10))
      res.send(req.params.id)
    }catch(err){
      console.err(err)
      next(err)
    }
  })
  
  router.delete('/:id/follow',isLoggedIn,async (req,res,next)=>{
  
   
    try{
      const user = await db.User.findOne({where:{id:req.user.id}})
      await user.removeFollowing(parseInt(req.params.id,10))
      res.send(req.params.id)
    }catch(err){
      console.err(err)
      next(err)
    }
  })



  router.get('/:id/followings',isLoggedIn, async (req,res,next)=>{
    try{
      const user = await db.User.findOne({where:{id:req.params.id}})
      const followings = await user.getFollowings({
        attributes:['id','name']
      })
      res.json(followings)
    }catch(err){
      console.error(err)
      next(err)
    }
  })


  router.get('/:id/followers',isLoggedIn,async (req,res,next)=>{
    try{
      const user = await db.User.findOne({where:{id:req.params.id}})
      const followers = await user.getFollowers({
        attributes:['id','name']
      })
      res.json(followers)
    }catch(err){
      console.error(err)
      next(err)
    }
  })



  router.delete('/:id/follower',isLoggedIn,async (req,res,next)=>{
    try{
      const me = await db.User.findOne({
        where:{id:req.user.id}
      })
      await me.removeFollower(req.params.id)
      res.send(req.params.id)
    }catch(err){
      console.error(err)
    }
  })

  router.get('/:id',async (req,res,next)=>{
    try{
      const other = await db.User.findOne({
        where:{id:req.params.id},
        attributes:['id','name'],
        include:[{
            model:db.User,
            attributes:['id','name'],
            as:'Followers'
        },{
            model:db.User,
            attributes:['id','name'],
            as:'Followings'
        },{
            model:db.Board,
            attributes: ['id'],
        }]
      })
      res.send(other)
    }catch(err){
      console.error(err)
      next(err)
    }
  })

  router.get('/:id/boards',async (req,res,next)=>{
    try{
      let where = {
        userId:parseInt(req.params.id,10)
      }
        if(parseInt(req.query.lastId,10)){
        
          where.id = {
            [db.Sequelize.Op.lt] : parseInt(req.query.lastId,10)
          }
          
        }

      const boards = await db.Board.findAll({
        where,
        include: [{
          model: db.User,
          attributes: ['id', 'name'],
        }, {
          model: db.Image,
        }, {
          model: db.User,
          through: 'Like',
          as: 'Likers',
          attributes: ['id'],
        }],
        order:[['createdAt','DESC']],
        limit:parseInt(req.query.limit,10) || 10
      })

      res.json(boards)
    }catch(err){
      console.error(err)
      next(err)
    }
  })


module.exports = router;
