const router = require('express').Router();
const { User } = require('../../models');

router.post('/newUser', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.userFullname = userData.fullname;
      req.session.loggedIn = true;
      console.log(req.session.loggedIn);

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/chkLogin', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({
          message: 'Incorrect email or password, please try again',
          title: 'Incorrect Login',
        });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({
          message: 'Incorrect email or password, please try again',
          title: 'Incorrect Login',
        });
      return;
    }

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.userFullname = userData.fullname;
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
