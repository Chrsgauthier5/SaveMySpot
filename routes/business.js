const router = require('express').Router();
const handle = require('../handlers')
const auth = require('../middlewares/auth');

router.get('/showBis', handle.showBis); //show everything
// .post(auth, handle.startWaiting)

router.get('/displayWaitList', handle.displayWaitList);
router.get('/displayWaitTime', handle.displayWaitTime);
router.post('/updateWaitList', handle.updateWaitList);
router.post('/updateWaitTime', handle.updateWaitTime);

module.exports = router;
