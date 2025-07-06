const flash = require('express-flash');
const User = require('../../models/user');
const bcrypt = require('bcrypt');

function authController()
{
    return{
        login(req,res)
        {
            res.render('auth/login');
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
            User.exists({email:email}).then(result => {
                if(result)
                {
                    req.flash('err', 'Email already exists');
                    req.flash('name', username);
                    req.flash('email',email);

                    return res.redirect('/register');

                }
            });

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



        }
    }    
}

module.exports = authController;