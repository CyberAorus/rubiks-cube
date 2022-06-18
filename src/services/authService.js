const User = require('../models/User');
const bcrypt = require('bcrypt');

const saltRounds = 10;

exports.register = async (userData) => {
    const { username, password, repeatPassword } = userData;
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