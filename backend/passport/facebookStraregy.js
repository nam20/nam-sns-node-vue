const FacebookStrategy = require('passport-facebook')
require('dotenv').config();
const {User} = require('../models')

module.exports = (passport) => {

    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret:process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL:'http://35.231.123.89/auth/facebook/callback'
    },async (accessToken, refreshToken, profile, done)=>{
        try{
            console.log(profile)
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