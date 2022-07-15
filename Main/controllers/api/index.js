const router = require('express').Router();
const userRouter = require('./userRouter');
const postRouter = require('./postRouter');

router.use('/', userRouter);

module.exports = router;
