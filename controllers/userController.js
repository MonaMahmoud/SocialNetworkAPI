//const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// Aggregate function to get the number of students overall
// const headCount = async() =>
//     Student.aggregate()
//     .count('studentCount')
//     .then((numberOfStudents) => numberOfStudents);

// Aggregate function for getting the overall grade using $avg
// const grade = async(studentId) =>
//     Student.aggregate([
//         // only include the given student by using $match
//         { $match: { _id: ObjectId(studentId) } },
//         {
//             $unwind: '$assignments',
//         },
//         {
//             $group: {
//                 _id: ObjectId(studentId),
//                 overallGrade: { $avg: '$assignments.score' },
//             },
//         },
//     ]);

module.exports = {
    // Get all users
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    // Get a single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then((user) =>
                !user ?
                res.status(404).json({ message: 'No user with that ID' }) :
                res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // create a new user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    // Delete a user and remove all linked thoughts
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
            .then((user) =>
                !user ?
                res.status(404).json({ message: 'No such user exists' }) :
                Thought.deleteMany({ _id: { $in: user.thoughts } })
            )
            .then((user) =>
                !user ?
                res.status(404).json({
                    message: 'User deleted, but no thoughts found',
                }) :
                res.json({ message: 'User successfully deleted' })
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Add a friend to a user
    addFriend(req, res) {
        // console.log('You are adding an assignment');
        //console.log(req.body);
        User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.body } }, { runValidators: true, new: true })
            .then((user) =>
                !user ?
                res
                .status(404)
                .json({ message: 'No user found with that ID :(' }) :
                res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Remove friend from a user
    removeFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: { friendId: req.params.friendId } } }, { runValidators: true, new: true })
            .then((user) =>
                !user ?
                res.status(404)
                .json({ message: 'No user found with that ID :(' }) :
                res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
};