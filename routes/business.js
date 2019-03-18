const router = require('express').Router();
const handle = require('../handlers')
const auth = require('../middlewares/auth');

router.get('/showBis', handle.showBis); //show everything
// .post(auth, handle.startWaiting)

router.get('/displayWaitList', handle.displayWaitList);
router.get('/displayWaitTime', handle.displayWaitTime);
router.put('/addWaitList', handle.addWaitList);
router.put('/removeWaitList', handle.removeWaitList);
router.put('/changeWait', handle.changeWait);
router.post('/sendText', handle.sendText);

module.exports = router;
