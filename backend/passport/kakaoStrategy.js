const KakaoStrategy = require('passport-kakao').Strategy

const {User} = require('../models')

module.exports = (passport) =>{
    passport.use(new KakaoStrategy({
        clientID: process.env.KAKAO_ID,
        clientSecret:process.env.KAKAO_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/auth/kakao/callback',
    }, async (accessToken, refreshToken,profile,done)=>{

            console.log(profile)
        try{
            const exUser = await User.findOne({where:{snsID:profile.id,provider:'kakao'}})
            if(exUser){
                done(null,exUser)
            }else{
                const newUser = await User.create({
                    name:profile.displayName,
                    userId:profile.id,
                    snsId:profile.id,
                    provider: 'kakao'
                })
                done(null,newUser)
            }
        }catch(error){
            console.log(error)
            done(error)
        }
    }))
}