const router = require('express').Router();
const handle = require('../handlers');
const auth = require('../middlewares/auth.js');

router.get('/', auth, handle.getUsers);
router.post('/register', handle.register);
router.post('/login', handle.login);





module.exports = router;