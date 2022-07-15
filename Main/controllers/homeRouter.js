const router = require('express').Router();
const withAuth = require('../utils/auth');
const Post = require('../models/Post');
const User = require('../models/User');
const sequelize = require('../config/connection');

router.get('/', async (req, res) => {
  try {
    const dbPosts = await Post.findAll({
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
    const posts = dbPosts.map((post) => post.get({ plain: true }));
    console.log(posts);
    res
      .status(200)
      .render('homepage', {
        loggedIn: req.session.loggedIn,
        posts,
        layout: 'main',
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  try {
    res.render('login', { layout: 'main' });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const dbPosts = await Post.findAll({
      include: [{ model: User, attributes: ['fullname'] }],
      where: {
        user_id: req.session.userId,
      },
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

    const posts = dbPosts.map((post) => post.get({ plain: true }));
    console.log(posts);
    res.render('dashboard', {
      posts: posts,
      loggedIn: req.session.loggedIn,
      layout: 'main',
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/newUser', async (req, res) => {
  try {
    res.render('signup', { layout: 'main' });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/newPost', withAuth, async (req, res) => {
  try {
    res.render('createpost', {
      loggedIn: req.session.loggedIn,
      layout: 'main',
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGOUT
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
