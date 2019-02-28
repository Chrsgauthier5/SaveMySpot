const jwt = require('jsonwebtoken');

const db = require('../models/');


exports.register = async (req, res, next) => { //async functions will use try/catch
    try{
        const user = await db.User.create(req.body); //creates user from body
        const {id, username} = user;
        

        // const token = jwt.sign({id, username}, process.env.SECRET);

        res.status(201).json({id, username, token});
    } catch(err){
        if (err.code === 11000){
            err.message = 'Sorry, that username or email is already taken';
        }
        next(err)
    }
};


exports.login = async (req, res, next) => {
    try{
        const user = await db.User.findOne({username: req.body.username});
        const {id, username} = user;
        const valid = await user.comparePassword(req.body.password);// returns Boolean

        if (valid) {  // if valid returned true (passwords matched)
            // const token = jwt.sign({id, username}, process.env.SECRET);
            
            res.status(200).json({
                id,
                username
            });
        }
        else{
            throw new Error()
        }
    } catch(err){
        err.message = 'Invalid Username or Password';

        next(err);
    }
};

//need to: npm install jsonwebtoken.  Also add to .env a secret.  SECRET='ThisIsATemporarySecret'

