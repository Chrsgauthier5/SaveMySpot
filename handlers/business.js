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


exports.toggleLine = async (req, res, next) => {
    try {
        const user = await db.User.findOne({email: req.body.email})
        console.log(user);
        const toggleUser = await db.User.update({ email: req.body.email }, {$set: {inLine: !user.inLine}});
        console.log(toggleUser);
            res.status(200).json({
                toggleUser
            });
            
        }
        catch (err) {
        
            err.message = 'Failed to update user';

        next(err);
    }
};

