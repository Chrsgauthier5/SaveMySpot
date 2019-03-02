const db = require('../models');


exports.showWaitList = async (req, res, next) => {
    try{
        
        const waitingList = await db.Business.find({});

        res.status(200).json(waitingList);
    } catch (err){
        err.status = 400;
        next(err)
    }
};

exports.waitSwitch = async (req, res, next) => {
    try{
       if(await db.User.find({})
    }
}