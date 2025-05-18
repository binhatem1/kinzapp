const router = require('express').Router();
const { addUser,loginUser,authUser } = require('../controller/user.controller');


router.post('/addUser', addUser);
router.post('/login', loginUser);
router.post('/authUser', authUser);

module.exports = router;