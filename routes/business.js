const router = require('express').Router();
const handle = require('../handlers')
const auth = require('../middlewares/auth');

router.get('/showBis', handle.showWaitList)
router.put('/toggle', handle.toggleLine)



module.exports = router;
