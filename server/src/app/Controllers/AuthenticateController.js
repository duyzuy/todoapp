const Joi = require('joi');
const bcrypt = require('bcrypt');
const { dbModels } = require('../Models')
const db = dbModels();
const {registerValidation, logInValidation} = require('../Validations/AuthValidation')
var jwt = require('jsonwebtoken');
const { RESTMethods } = require('msw');

class Authenticate {

    signup = async (req, res) => {

        const userData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            phone: req.body.phone

        }
        //validations data
        const {error} = registerValidation(userData)
        if(error) return res.json({message: error.details[0].message, status: 400})


        //check if email exist or not
        const emailExist = await db.User.findOne({where: {email: userData.email}})
        if(emailExist) return res.json({message: "email already exists", status: 400})

        //password hash
        const salt = bcrypt.genSaltSync(10);
        const hasedPassword = await bcrypt.hashSync(userData.password, salt);
        userData.password = hasedPassword;

        //create user
        try{
            const user = await db.User.create(userData)
            user.save()
            return res.json({data: user, status: 201, message: "Register success"})
        }catch(err){
            return res.json({message: err, status: 400})
        }

    }

    login = async (req, res, next) => {
   
        
        const userLogin = {
            email: req.body.email,
            password: req.body.password
        }
        //validation data
        const {error} = logInValidation(userLogin)
        if(error) return res.json({message: error.details[0].message, status: 400} )

        //check user in db
        const user = await db.User.findOne({where: {email: userLogin.email}})
        if(!user) return res.json({message: "email is not exists", status: 400})

        //compare password
        const match = await bcrypt.compare(userLogin.password, user.password);
        if(!match) return res.json({message: "password or username wrong!", status: 400})

        //sign header token
        const token = jwt.sign({id: user.id}, process.env.SECRET_TOKEN, {
            expiresIn: '1d'
        })
        res.header('auth-token', token)
        
        res.json({
            token: token, 
            status: 200,
            user: {
                id: user.id,
                firstName: user.firstName, 
                lastName: user.lastName,
                username: user.username,
                phone: user.phone,
                email: user.email,

            }, 
            message: "login success"})

        
        next()

    }

    accessToken = async (req, res) => {
        const token = req.header('auth-token');
        if(!token) return res.json({message: 'Access denied', status: 401})
    
        try{
            //verify token
            const verified = jwt.verify(token, process.env.SECRET_TOKEN)
            req.user = verified;
            const userId = verified.id;
       
            //get user from token
            const user = await db.User.findOne({where: {id: userId}})
            if(!user) return res.json({message: "user was deleted", status: 400})
            
            return res.json({user: {
                id: user.id,
                firstName: user.firstName, 
                lastName: user.lastName,
                username: user.username,
                phone: user.phone,
                email: user.email,
            }, status: 200}) 
           
        }catch(err){
            res.json({message: "invalid token", status: 400})
        }
    }
    logout() {

    }
    
}

module.exports = new Authenticate