const express = require('express');

const db = require('../models');

const router = express.Router();


router.get('/',async (req,res,next)=>{
    try{
    let where = {}
    if(parseInt(req.query.lastId,10)){
      where = {
        id: {
          [db.Sequelize.Op.lt]: parseInt(req.query.lastId,10)
        }
      }
    }

    let result = await db.Board.findAll({
      where,
      include:[{
        model: db.User,
        attributes: ['id','name']
      },{
        model: db.User,
        attributes: ['id'],
        as:'Likers'
      },{
        model: db.Image
      }
    
    ],
      order:[['createdAt','DESC']],
      limit:parseInt(req.query.limit,10)||10
    })
    
    res.json(result)
    }catch(err){
      console.log(err)
    }
  })

  module.exports = router