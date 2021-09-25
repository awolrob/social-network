const router = require('express').Router();
const {
    getAllThoughts,
    createThought,
    getThoughtById,
    updateThoughtById,
    deleteThoughtById
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


module.exports = router;