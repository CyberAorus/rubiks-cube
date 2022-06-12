const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: function () {
                return this.imageUrl.startsWith('http');
            },
            message: 'Image URL must start with http or https',
        },
    },
    description: {
        type: String,
        required: true,
        maxLength: 120,
    },
    cubes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cube',
    }],
});

const Accessory = mongoose.model('Accessory', accessorySchema);
module.exports = Accessory;
