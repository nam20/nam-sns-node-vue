const local = require('./localStrategy')
const kakao = require('./kakaoStrategy')
const {User,Board} = require('../models')
const facebook = require('./facebookStraregy')
const google = require('./googleStrategy')

module.exports = (passport) =>{
    passport.serializeUser((user,done)=>{
        done(null,user.id)
    })

    passport.deserializeUser((id,done)=>{
        User.findOne({where:{id},
        attributes:['id','name'],
        include:[{
            model:User,
            attributes:['id','name'],
            as:'Followers'
        },{
            model:User,
            attributes:['id','name'],
            as:'Followings'
        },{
            model:Board
        }]
        })
        .then(user => done(null,user))
        .catch(err => done(err))
    })

     local(passport)
     facebook(passport)
     google(passport)
     kakao(passport)
}