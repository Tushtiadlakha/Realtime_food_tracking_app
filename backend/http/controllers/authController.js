const flash = require('express-flash');
const User = require('../../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');

function authController()
{
    return{
        login(req,res)
        {
            res.render('auth/login');
        },

        async postLogin(req, res, next)
        {
            const {email, password} =req.body;

            if(!email || !password){
                
                req.flash('err', 'All fields are required');
                req.flash('email',email);

                return res.redirect('/login');
            }
            
            passport.authenticate('local',(err,user,info) => {
                if(err) {
                    req.flash('err', info.message )
                    return next(err)
                }
                if(!user) {
                    req.flash('err', info.message )
                    return res.redirect('/login')
                }
                req.logIn(user, (err) => {
                    if(err) {
                        req.flash('err', info.message ) 
                        return next(err);
                    }

                    return res.redirect('/')
                })
            })(req,res,next)
        },

        register(req,res)
        {
            res.render('auth/register');
        },

        async postRegister(req,res)
        {
            const {username, email, password} =req.body;

            if(!username || !email || !password){
                
                req.flash('err', 'All fields are required');
                req.flash('name', username);
                req.flash('email',email);

                return res.redirect('/register');
            }

            //if user exists
            
            try{
                const existingUser = await User.exists({email:email});

                if(existingUser)
                {
                    req.flash('err', 'Email already exists');
                    req.flash('name', username);
                    req.flash('email',email);

                    return res.redirect('/register');

                }
            }
            catch(err){
                console.log(err);
            }
            

            hashedPassword = await bcrypt.hash(password, 10);

            const user = await new User({
                username,
                email,
                password: hashedPassword
            })

            user.save().then(()=>{
                //login

                return res.redirect('/register')
            }).catch(err =>{
                req.flash('err', 'Something went wrong');

                return res.redirect('/register');
            })
            // const save = await newUser.save();



        },

        logout(req,res)
        {
            req.logout(function(err) {
                if (err) { 
                    return next(err); 
                }
                res.redirect('/login');
            });
        }
    }    
}

module.exports = authController;