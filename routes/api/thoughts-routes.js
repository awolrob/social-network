const router = require('express').Router();
const {
    getAllThoughts,
    createThought,
    getThoughtById,
    updateThoughtById,
    deleteThoughtById,
    postReaction,
    removeReaction
    // removeReply
} = require('../../controllers/thoughts-controller');

// Set up GET all and POST at /api/thoughts
// /api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

// /api/thoughts/:id
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThoughtById)
    .delete(deleteThoughtById);

// //api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

// //api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
    .post(postReaction);


module.exports = router;