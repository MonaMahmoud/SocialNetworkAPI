const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    addFriend,
    removeFriend,
    // addAssignment,
    // removeAssignment,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser);

// /api/users/:studentId/assignments
router.route('/:userId/friend').post(addFriend);

// /api/students/:studentId/assignments/:assignmentId
router.route('/:userId/friend/:friendId').delete(removeFriend);

module.exports = router;