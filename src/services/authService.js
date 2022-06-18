const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { saltRounds, secret } = require('../constants');

exports.register = async (userData) => {
    let { username, password, repeatPassword } = userData;
    //User.create(userData);
    // return form validation message
    if (password !== repeatPassword) {
        throw new Error('Passwords do not match');
    }

    let hashedPassword = await bcrypt.hash(password, saltRounds);
    let createdUser = await User.create({
        username,
        password: hashedPassword
    });

    // let newUser = new User({
    //     username,
    //     password: hashedPassword
    // });

    // await newUser.save();

    return createdUser;
}

exports.login = async ({ username, password }) => {
    let user = await User.findOne({ username });

    if (!user) {
        return null;
    }

    let isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return;
    }

    let result = new Promise((resolve, reject) => {
        jwt.sign({ userId: user._id, username: user.usernmae }, secret, { expiresIn: '2h' }, (err, token) => {
            if (err) {
                return reject(err);
            }
            resolve(token);
        });
    });

    return result;
};






