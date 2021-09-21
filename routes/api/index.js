const router = require('express').Router();
// const commentRoutes = require('./comment-routes');
const usersRoutes = require('./users-routes');

// router.use('/comments', commentRoutes);
router.use('/users', usersRoutes);

module.exports = router;
