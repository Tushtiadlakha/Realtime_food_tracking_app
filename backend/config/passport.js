const LocalStrategy = require('passport-local').Strategy
const Users = require('../models/user');
const bcrypt = require('bcrypt')

function init(passport) {
    passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        // Login
        // check if email exists
        const user = await Users.findOne({ email: email })
        if(!user) {
            return done(null, false, { message: 'No user with this email' })
        }

        bcrypt.compare(password, user.password).then(match => {
            if(match) {
                return done(null, user, { message: 'Logged in succesfully' })
            }
            return done(null, false, { message: 'Wrong username or password' })
        }).catch(err => {
            return done(null, false, { message: 'Something went wrong' })
        })
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    // passport.deserializeUser((id, done) => {
    //     Users.findOne({_id: id}, (err, user) => {
    //         done(err, user)
    //     })
    // })

    
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await Users.findOne({_id : id});
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    });

}

module.exports = init;