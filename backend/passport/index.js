const {User,Board} = require('../models')

const local = require('./localStrategy')
const kakao = require('./kakaoStrategy')
const facebook = require('./facebookStraregy')
const google = require('./googleStrategy')
const naver = require('./naverStrategy')


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
     naver(passport)
}