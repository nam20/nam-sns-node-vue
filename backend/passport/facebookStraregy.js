const FacebookStrategy = require('passport-facebook')
require('dotenv').config();
const {User} = require('../models')

module.exports = (passport) => {

    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret:process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL:'http://skagmlwns123.duckdns.org/auth/facebook/callback'
    },async (accessToken, refreshToken, profile, done)=>{
        try{
           
            const exUser = await User.findOne({
                where:{
                    snsId:profile.id,
                    provider:'facebook'
                }
            })

            if(exUser){
                done(null,exUser)
            }else{
                const newUser = await User.create({
                    name:profile.displayName,
                    userId:profile.id,
                    snsId:profile.id,
                    provider:profile.provider
                })
                done(null,newUser)
            }

        }catch(err){
            console.error(err)
        }
    }))
}