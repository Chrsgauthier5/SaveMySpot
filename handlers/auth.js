const jwt = require('jsonwebtoken');
const db = require('../models');


exports.getUsers = async (req, res, next) => {
    try {
        const users = await db.User.find()
        return res.status(200).json(users);
    } catch (err) {
        return ({
            status: 400,
            message: err.message
        });
    }
};

exports.register = async (req, res, next) => { //async functions will use try/catch
    try {
        const user = await db.User.create(req.body); //creates user from body
        const { id, email, firstname, lastname, businessUser } = user;


        const token = jwt.sign({ id, email }, process.env.SECRET); // can set as cookie & have access to it

        console.log(id, email, token)
        res.status(201).json({
            id,
            email,
            firstname,
            lastname,
            businessUser,
            token
        });
    } catch (err) {
        // if (err.code === 11000){
            console.log(err);
       err.message = 'Sorry, that username or email is already taken';
    }
       next(err);
    

};


exports.login = async (req, res, next) => {
    try {
        const user = await db.User.findOne({ email: req.body.email });
        console.log(user);
        const { id, email, firstname, lastname, businessUser } = user;
        const valid = await user.comparePassword(req.body.password);// returns Boolean
        console.log(valid);
        if (valid) {  // if valid returned true (passwords matched)
            const token = jwt.sign({ id, email }, process.env.SECRET);

            res.status(200).json({
                id,
                email,
                firstname,
                lastname,
                businessUser,
                token
            });
            console.log(id, email, token)
        }
        else {
            throw new Error()
        }
    } catch (err) {
        err.message = 'Invalid Email or Password';

        next(err);
    }

};
