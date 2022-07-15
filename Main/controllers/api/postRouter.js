const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

router.post('/', async (req, res) => {
  try {
    const postData = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.userId,
    });

    res.status(200).json(postData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.get('/:post_id', withAuth, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.post_id, {
      include: [{ model: User, attributes: ['fullname'] }],

      attributes: {
        include: [
          [
            sequelize.fn(
              'DATE_FORMAT',
              sequelize.col('created_at'),
              '%d-%m-%y'
            ),
            'postDate',
          ],
        ],
      },
      raw: true,
      nest: true,
    });

    const commentData = await Comment.findAll({
      where: {
        post_id: req.params.post_id,
      },
      include: [{ model: User, attributes: ['fullname'] }],
      attributes: {
        include: [
          [
            sequelize.fn(
              'DATE_FORMAT',
              sequelize.col('created_at'),
              '%d-%m-%y'
            ),
            'postDate',
          ],
        ],
      },
    });

    const comments = commentData.map((comment) => comment.get({ plain: true }));
    console.log(comments);

    res
      .status(200)
      .render('newcomment', {
        post,
        comments,
        loggedIn: req.session.loggedIn,
        layout: 'main',
      });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.get('/update/:post_id', withAuth, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.post_id, {
      raw: true,
    });
    console.log(post);

    if (post.user_id !== req.session.userId) {
      res
        .status(200)
        .render('/' + req.params.post_id, {
          loggedIn: req.session.loggedIn,
          layout: 'main',
        });
      return;
    }
    res
      .status(200)
      .render('updatepost', {
        post,
        loggedIn: req.session.loggedIn,
        layout: 'main',
      });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.put('/update/:post_id', withAuth, async (req, res) => {
  try {
    const post = await Post.update(req.body, {
      where: { id: req.params.post_id },
    });

    res
      .status(200)
      .json({ post, loggedIn: req.session.loggedIn, layout: 'main' });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete('/delete/:post_id', withAuth, async (req, res) => {
  try {
    const post = await Post.destroy({
      where: { id: req.params.post_id },
    });

    res
      .status(200)
      .json({ post, loggedIn: req.session.loggedIn, layout: 'main' });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
