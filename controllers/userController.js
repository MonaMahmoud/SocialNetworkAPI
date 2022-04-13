const { ObjectId } = require('mongoose').Types;
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
    // Get a single student
    getSingleUser(req, res) {
        Course.findOne({ _id: req.params.userId })
            .select('-__v')
            .then((user) =>
                !user ?
                res.status(404).json({ message: 'No user with that ID' }) :
                res.json(thought)
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

    // Add an assignment to a student
    // addAssignment(req, res) {
    //     console.log('You are adding an assignment');
    //     console.log(req.body);
    //     Student.findOneAndUpdate({ _id: req.params.studentId }, { $addToSet: { assignments: req.body } }, { runValidators: true, new: true })
    //         .then((student) =>
    //             !student ?
    //             res
    //             .status(404)
    //             .json({ message: 'No student found with that ID :(' }) :
    //             res.json(student)
    //         )
    //         .catch((err) => res.status(500).json(err));
    // },
    // // Remove assignment from a student
    // removeAssignment(req, res) {
    //     Student.findOneAndUpdate({ _id: req.params.studentId }, { $pull: { assignment: { assignmentId: req.params.assignmentId } } }, { runValidators: true, new: true })
    //         .then((student) =>
    //             !student ?
    //             res
    //             .status(404)
    //             .json({ message: 'No student found with that ID :(' }) :
    //             res.json(student)
    //         )
    //         .catch((err) => res.status(500).json(err));
    // },
};