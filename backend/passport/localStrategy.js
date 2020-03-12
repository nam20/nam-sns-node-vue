const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const {User} = require('../models')

module.exports = (passport) =>{
    passport.use(new LocalStrategy({
        usernameField: 'userId',
        passwordField: 'password'
    },async (userId,password,done)=>{
        try{
            const exUser = await User.findOne({where:{userId}})
            if(!exUser){
                return done(null,false,{message:'아이디 틀림'})
            }
            const result = await bcrypt.compare(password,exUser.password)
            if(result){
                return done(null,exUser)
            }else{
                return done(null,false,{message:'비번 불일치'})
            }
        }catch(error){
            console.error(error)
            return done(error)
        }
    }))
}