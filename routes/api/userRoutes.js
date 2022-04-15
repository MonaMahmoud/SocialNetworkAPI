const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    addFriend,
    removeFriend,
    updateUser,

} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser);


router.route('/:userId/friends/:friendId').post(addFriend);

router.route('/:userId').put(updateUser);

router.route('/:userId/friends/:friendId').delete(removeFriend);

module.exports = router;