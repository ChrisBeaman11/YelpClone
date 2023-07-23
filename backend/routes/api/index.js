const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const { restoreUser } = require("../../utils/auth.js");
const locationsRouter = require('./locations.js');
const reviewsRouter = require('./reviews.js')
// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);
router.use('/locations', locationsRouter);
router.use('/reviews', reviewsRouter);
router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
