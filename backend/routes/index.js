var express = require('express');
var router = express.Router();
const passport = require('passport')

const path = require('path')




router.get('/', (req, res, next) =>{
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});


router.get('/auth/google',passport.authenticate('google',{ scope:
  ['profile']}))

router.get('/auth/google/callback',passport.authenticate('google',{
  failureRedirect:'/'
}),(req,res)=>{
  res.redirect('/')
})


router.get('/auth/facebook',passport.authenticate('facebook',{ scope:
  ['public_profile', 'email']}))

router.get('/auth/facebook/callback',passport.authenticate('facebook',{
  failureRedirect:'/'
}),(req,res)=>{

  
  res.redirect('/#')
  
  
})











module.exports = router;
