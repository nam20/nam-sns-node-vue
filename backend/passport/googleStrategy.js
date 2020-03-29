const GoogleStrategy = require('passport-google-oauth20')
require('dotenv').config();
const {User} = require('../models')

module.exports = (passport) => {

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:'http://35.231.123.89/auth/google/callback'
    },async (accessToken, refreshToken, profile, done)=>{
        try{
            console.log(profile)
            const exUser = await User.findOne({
                where:{
                    snsId:profile.id,
                    provider:'google'
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