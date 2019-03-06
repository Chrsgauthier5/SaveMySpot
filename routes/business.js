const router = require('express').Router();
const handle = require('../handlers')
const auth = require('../middlewares/auth');

router.get('/showBis', auth, handle.showWaitList) //show everything
// .post(auth, handle.startWaiting)


module.exports = router;
