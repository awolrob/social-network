const { User, Thought } = require('../models');

const usersController = {
  // get all Users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        populate: { path: 'reactions' },
        select: '-__v'
      })
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        populate: { path: 'reactions' },
        select: '-__v'
      })
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => {
        console.log(dbUserData.thoughts[0]._id.toString())
        console.log(dbUserData.username)
        res.json(dbUserData)
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // createUser
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },

  // update user by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // delete user by ID
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => {
        return Thought.deleteMany({ _id: { $in: dbUserData.thoughts } })
      })
      .then(() => {
        res.sendStatus(200)
      })
      .catch(err => res.json(err));
  }
};

module.exports = usersController;
