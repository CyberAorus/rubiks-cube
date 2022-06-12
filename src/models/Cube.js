const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        maxlength: 120,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    difficulty: {
        type: Number,
        required: true,
        min: 1,
        max: 6,
    }
});

cubeSchema.path('imageUrl').validate(function (url) {
    return /(http(s?):)/.test(url);
});

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;