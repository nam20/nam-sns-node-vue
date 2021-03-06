const KakaoStrategy = require('passport-kakao').Strategy

const {User} = require('../models')

module.exports = (passport) =>{
    passport.use(new KakaoStrategy({
        clientID: process.env.KAKAO_CLIENT_ID,
        clientSecret:process.env.KAKAO_CLIENT_SECRET,
        callbackURL: 'http://skagmlwns123.duckdns.org/auth/kakao/callback',
    }, async (accessToken, refreshToken,profile,done)=>{

           
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