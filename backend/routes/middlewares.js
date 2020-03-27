const jwt = require('jsonwebtoken')

exports.isLoggedIn = (req,res,next) =>{
    
    if(req.isAuthenticated()){
        next();
    }else{
        res.send('로그인 필요')
    }
}

exports.isNotLoggedIn = (req,res,next) =>{
    if(!req.isAuthenticated()){
        next();
    }else{
        res.send('로그인이 되어있습니다.')
    }
}