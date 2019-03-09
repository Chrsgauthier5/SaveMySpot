const db = require('../models');

// used by Chris in Auth ???
exports.showWaitList = async (req, res, next) => {
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
        // deconstruct the object
        const { id, businessName, numWaiting, waitTime, waitList } = business;
        console.log("displayWaitList: "+waitList);
        // return the wait list only
        res.status(200).json(waitList);
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

exports.updateWaitList = async (req, res, next) => {
    try{
        // const waitingList = await db.Business.find({});
        // res.status(200).json(waitingList);






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
