const router = require('express').Router();

const handle = require('../handlers')
const auth = require('../middlewares/auth');

router
.route('/')
.get(handle.showWaitList) //show everything
// .post(auth, handle.startWaiting)


module.exports = router;
