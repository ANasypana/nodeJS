const express = require('express');
const { getAllUsers, getUser, createUser, updateUser, removeUser } = require('./route');

const createUserSchema = require('../../schemas/createUserSchema');
const validator = require('../../utils/validator');


const router = express.Router();

router.get('/', getAllUsers);
router.post('/', [validator(createUserSchema)], createUser);

router.get('/:userId', getUser);
router.put('/:userId', updateUser);
router.delete('/:userId', removeUser);

module.exports = router;
