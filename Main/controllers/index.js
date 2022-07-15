const router = require('express').Router();
const apiRouter = require('./api');
const homeRouter = require('./homeRouter');
const postRouter = require('./api/postRouter');
const commentRouter = require('./api/commentRouter');

router.use('/', apiRouter);
router.use('/users', homeRouter);
router.use('/post', postRouter);
router.use('/comment', commentRouter);

module.exports = router;
