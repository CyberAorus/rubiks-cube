const Accessory = require('../models/Accessory');

exports.getAll = () => Accessory.find();
exports.getAllUnique = (ids) => Accessory.find({ _id: { $nin: ids } });
exports.create = (accessoryData) => Accessory.create(accessoryData);