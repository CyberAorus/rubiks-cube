const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imgaeUrl: {
        type: String,
        required: true,
        validate: {
            validator: function () {
                return this.imgaeUrl.startsWith('http');
            },
            message: 'Image URL must start with http or https',
        },
    },
    description: {
        type: String,
        required: true,
        maxLength: 120,
    }
});

const Accessory = mongoose.model('Accessory', accessorySchema);
module.exports = Accessory;
