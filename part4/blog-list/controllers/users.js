const bcrypt = require('bcrypt');
const userRouter = require('express').Router();
const User = require('../models/user');
const { nonExistingId } = require('../tests/test_helper');

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { title: 1, url: 1});
    response.json(users);
})

userRouter.post('/', async (request, response, next) => {
    const { username, name, password } = request.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
        username,
        name,
        passwordHash
    })

    try {
        const savedUser = await user.save();
        response.status(201).json(savedUser);
    } catch(e) {
        next(e)
    }

})

module.exports = userRouter;