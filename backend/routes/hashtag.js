var express = require('express');
var router = express.Router();
const db = require('../models')


const {isLoggedIn,isNotLoggedIn} = require('./middlewares')

router.get('/:tag',async (req,res,next)=>{

    const tag = req.params.tag
    if(!tag){
      return res.send('검색어 입력 요구')
    }
  
    try{
  
        let where = {}
        if(parseInt(req.query.lastId,10)){
          where = {
            id:{
              [db.Sequelize.Op.lt] : parseInt(req.query.lastId,10)
            }
          }
        }

       const boards = await db.Board.findAll({
          where,
          
          include:[{
            model:db.Hashtag,
            where:{title:req.params.tag}
          },{
            model:db.User,
            attributes:['id','name']    
          },{
            model:db.User,
            attributes:['id'],
            as:'Likers'
          },{
            model:db.Image
          }],
          order:[['createdAt','DESC']],
          limit:parseInt(req.query.limit,10) || 10

        })
      
      res.send(boards)
  
    }catch(err){
      console.error(err)
      next(err)
    }
  })





module.exports = router