const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
  console.log(req.body);
  try {
    const commentData = await Comment.create({
      comment: req.body.comment,
      post_id: req.body.postId,
      user_id: req.session.userId,
    });

    console.log(commentData);
    res.status(200).json(commentData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
