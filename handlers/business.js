const db = require('../models');

// used by Chris in Auth ???
exports.showBis = async (req, res, next) => {
    try{
        const waitingList = await db.Business.find({});
        res.status(200).json(waitingList);
    } catch (err){
        err.status = 400;
        next(err)
    }
};

exports.displayWaitList = async (req, res, next) => {
    try{
        // find the single document in the businesses collection
        // assign to business
        // may change to findOne() once we expand to multiple businesses
        const business = await db.Business.find({});
        // destructure the object
        const { id, businessName, numWaiting, waitTime, waitlist } = business[0];
        console.log("displayWaitList: "+ waitlist);
        // return the wait list only
        res.status(200).json(waitlist);
    } catch (err){
        err.status = 400;
        next(err)
    }
};




exports.displayWaitTime = async (req, res, next) => {
    try{
        // find the single document in the businesses collection
        // assign to business
        // may change to findOne() once we expand to multiple businesses
        const business = await db.Business.find({});
        // deconstruct the object
        const { id, businessName, numWaiting, waitTime, waitList } = business;
        console.log("displayWaitTime: "+waitTime);
        // return the wait list only
        res.status(200).json(waitTime);
    } catch (err){
        err.status = 400;
        next(err)
    }
};

exports.addWaitList = async (req, res, next) => {
    try{
        console.log(req.body)
        const waitArray = await db.Business.update({businessName: req.body.biz[0].businessName}, {$push: {"waitlist": req.body.user.firstname + " " + req.body.user.lastname}})
        res.json(waitArray);

    } catch (err){
        err.status = 400;
        next(err)
    }
};
exports.removeWaitList = async (req, res, next) => {
    try{
        console.log(req.body)
        const waitArray = await db.Business.update({businessName: req.body.biz[0].businessName}, {$pull: {"waitlist": req.body.user.firstname + " " + req.body.user.lastname}});
        res.json(waitArray);

    } catch (err){
        err.status = 400;
        next(err)
    }
};

exports.updateWaitTime = async (req, res, next) => {
    try{
        // const waitingList = await db.Business.find({});
        // res.status(200).json(waitingList);
    } catch (err){
        err.status = 400;
        next(err)
    }
};
