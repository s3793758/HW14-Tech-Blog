const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  // console.log("in withAuth",req.session.loggedIn);
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;
