const NaverStrategy = require('passport-naver').Strategy

const {User} = require('../models')

module.exports = (passport) =>{
    passport.use(new NaverStrategy({
        clientID:process.env.NAVER_CLIENT_ID,
        clientSecret:process.env.NAVER_CLIENT_SECRET,
        callbackURL: 'http://35.231.123.89/auth/naver/callback',
    }, async (accessToken, refreshToken,profile,done)=>{
            console.log('==========')
            console.log(profile)
            console.log('==========')
        try{
            const exUser = await User.findOne({where:{snsID:profile.id,provider:'naver'}})
            if(exUser){
                done(null,exUser)
            }else{
                const newUser = await User.create({
                    name:profile.displayName,
                    userId:profile.id,
                    snsId:profile.id,
                    provider: 'naver'
                })
                done(null,newUser)
            }
        }catch(error){
            console.log(error)
            done(error)
        }
    }))
}