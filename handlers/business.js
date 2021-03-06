const db = require('../models');
const twilio = require('twilio');
const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const twilioNumber = process.env.NUMBER
const client = new twilio(accountSid, authToken); 

// used by Chris in Auth ???
exports.showBis = async (req, res, next) => {
    try{
        const waitingList = await db.Business.find({});
        console.log(waitingList);
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
        const arrUserInfo = {firstname: req.body.user.firstname, lastname: req.body.user.lastname, email: req.body.user.email, number: req.body.user.number}
        console.log(req.body.biz[0].businessName)
        const waitArray = await db.Business.update({businessName: req.body.biz[0].businessName}, {$push: {"waitlist": req.body.user.firstname + " " + req.body.user.lastname}})
        const waitArrayUserInfo = await db.Business.update({businessName: req.body.biz[0].businessName}, {$push: {"waitlistUserInfo": arrUserInfo}})
        res.json({waitArray, waitArrayUserInfo});

    } catch (err){
        err.status = 400;
        next(err)
    }
};
exports.removeWaitList = async (req, res, next) => {
    try{
        console.log(req.body)
        const arrUserInfo = {firstname: req.body.user.firstname, lastname: req.body.user.lastname, email: req.body.user.email}
        const waitArray = await db.Business.update({businessName: req.body.biz[0].businessName}, {$pull: {"waitlist": req.body.user.firstname + " " + req.body.user.lastname}});
        const waitArrayUserInfo = await db.Business.update({businessName: req.body.biz[0].businessName}, {$pull: {"waitlistUserInfo": arrUserInfo}});
        res.status(200).json({
            waitArray,
            waitArrayUserInfo
        });

    } catch (err){
        err.status = 400;
        next(err)
    }
};

exports.changeWait = async (req, res, next) => {
    try{
        const changeWait = await db.Business.update({businessName: req.body.businessInfo[0].businessName}, { $set: { "waitTime": req.body.waitTime}})
        res.status(200).json(changeWait);
    } catch (err){
        err.status = 400;
        next(err)
    }
};

exports.sendText = async (req, res, next) => {
    try{
        const text = await client.messages.create({
            body: req.body.textmessage,
            to: req.body.recipient,  // Text this number
            from: twilioNumber   // From a valid Twilio number
        })
        console.log(text);
        res.status(201).json(text);
    } catch (err){
        err.status = 400;
        res.status(400).json(err)
    }
}

