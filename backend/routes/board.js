var express = require('express');
var router = express.Router();
let multer = require('multer');
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk')

const db = require('../models')
const path = require('path')
const fs = require('fs')
const {isLoggedIn,isNotLoggedIn} = require('./middlewares')

// fs.readdir('uploads',(error)=>{
//   if(error){
//     console.log('폴더가 없어 uploads 폴더를 새로 생성합니다')
//     fs.mkdirSync('uploads')
//   }
// })

AWS.config.update({
  accessKeyId:process.env.S3_ACCESS_KEY_ID,
  secretAccessKey:process.env.S3_SECRET_ACCESS_KEY,
  region:'ap-northeast-2'
})



const upload = multer({
  storage:multerS3({
      s3:new AWS.S3(),
      bucket:'node-nam-sns',
      key(req,file,cb){
        cb(null,`original/${Date.now()}${path.basename(file.originalname)}`)
      }
    
  }),
  limits:{fileSize: 5 * 1024 * 1024}

})

const upload2 = multer()


router.post('/img',isLoggedIn,upload.array('image'),(req,res)=>{

    
    res.send(req.files.map(file => file.location))
  })
  
  
router.post('/',isLoggedIn,upload2.none(),async (req,res,next)=>{
  
    try{
      const newBoard = await db.Board.create({
        content: req.body.content,
        
        userId: req.user.id
      })
      const hashtags = req.body.content.match(/#[^\s#]*/g)
      if(hashtags){
      
        const result = await Promise.all(hashtags.map(tag=> db.Hashtag.findOrCreate({ 
          where: {title: tag.slice(1).toLowerCase()}
        })))
    
        await newBoard.addHashtags(result.map(r => r[0]))
      }

      if(req.body.image){
        if(Array.isArray(req.body.image)){
          
          const images = await Promise.all(req.body.image.map(image=>{
            return db.Image.create({src:image})
          }))
          await newBoard.addImages(images)
        }else{
          
          const image = await db.Image.create({src:req.body.image})
          await newBoard.addImages(image)
        }
      }


      const fullBoard = await db.Board.findOne({
        where:{id:newBoard.id},
        include:[{
            model: db.User,
            attributes: ['id','name']
          },{
            model: db.User,
            attributes: ['id'],
            as:'Likers'
          },{
            model: db.Image
          }]
      })
      
      return res.json(fullBoard)
    }catch(err){
      console.log(err)
      next(err)
    }
  })

  router.get('/:id',isLoggedIn,async(req,res,next)=>{
    try{
      const board = await db.Board.findOne({
        where:{id:req.params.id},
        include:[{
          model:db.Image
        }]
      })
      return  res.send(board)
    }catch(err){
      console.error(err)
      next(err)
    }
  })

  router.patch('/:id',isLoggedIn,async (req,res,next)=>{
    try{
       await db.Board.update({
        content: req.body.content
        
      },{
        where:{id:req.params.id}
      })

      const board = await db.Board.findOne({
        where:{id:req.params.id},
        include:[{
          model:db.Image
        }]
      })

      if(req.body.addImage){
        if(Array.isArray(req.body.addImage)){
         
          const images = await Promise.all(req.body.addImage.map(image=>{
            return db.Image.create({src:image})
          }))
          await board.addImages(images)
        }
       }

       if(req.body.removeImage){
         if(Array.isArray(req.body.removeImage)){
           const images = await Promise.all(req.body.removeImage.map(image=>{
             return db.Image.findOne({where:{src:image}})
           }))
           await board.removeImages(images)

         }
       }


      
     
     
      return res.send('성공')
      
    }catch(err){
      console.error(err)
    }
  })

  
  router.delete('/:id',isLoggedIn,async (req,res,next)=>{
    try{
          await db.Board.destroy({
            where:{id:req.params.id}
            ,
            
              
          })
          res.send('삭제성공')
     
    }catch(err){
      console.error(err)
      next(err)
    }
    })
    
    
    router.post('/:id/like',isLoggedIn, async (req,res,next)=>{
      try{
        const board = await db.Board.findOne({where:{id:req.params.id}})
        if(!board){
          return res.send('게시글이 없습니다')
        }
        await board.addLiker(parseInt(req.user.id,10))
        
        res.json({userId:req.user.id})
    }catch(err){
      console.error(err)
      next(err)
    }
    })
    
    router.delete('/:id/like',isLoggedIn, async (req,res,next)=>{
      try{
        const board = await db.Board.findOne({where:{id:req.params.id}})
        if(!board){
          return res.send('게시글이 없습니다')
        }
        await board.removeLiker(parseInt(req.user.id,10))
        res.json({userId:req.user.id})
    }catch(err){
      console.error(err)
      next(err)
    }
    })


    router.get('/:id/comments',async (req,res,next)=>{
        try{
          const board = await db.Board.findOne({where:{id:req.params.id}})
          if(!board){
            return res.send('게시글이 없습니다.')
          }

          const comments = await db.Comment.findAll({
            where:{boardId:req.params.id},
            include:[{
              model: db.User,
              attributes:['id','name']
            }],
            order:[['createdAt','ASC']]
          })

          res.json(comments)

        }catch(err){
          console.error(err)
          next(err)
        }
    })


    router.post('/:id/comment',isLoggedIn,async (req,res,next)=>{
        try{

          const board = await db.Board.findOne({where:{id:req.params.id}})
          if(!board){
            return res.send('글이 없습니다.')
          }

          const newComment = await db.Comment.create({
            userId: req.user.id,
            boardId: req.params.id,
            content: req.body.content
          })

          const fullComment = await db.Comment.findOne({
            where:{id:newComment.id},
            include:[{
              model: db.User,
              attributes:['id','name']
            }]
          })
          res.send(fullComment)
        }catch(err){
          console.error(err)
          next(err)
        }
      
      })
      

    module.exports = router