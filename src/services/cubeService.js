const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');

exports.getAll = async (search = '', fromInput, toInput) => {

    const cubes = await Cube.find().lean();

    // const from = Number(fromInput) || 0;
    // const to = Number(toInput) || 6;
    // const filteredCubes = cubes
    //     .filter(cube => cube.name.toLowerCase().includes(search.toLowerCase()))
    //     .filter(cube => cube.difficulty >= from && cube.difficulty <= to);

    return cubes;
};

exports.getOne = (cubeId) => Cube.findById(cubeId);
exports.getOneDetails = (cubeId) => Cube.findById(cubeId).populate('accessories');


exports.create = (cube) => Cube.create(cube);

exports.attachAccessory = async (cubeId, accessoryId) => {
    let cube = await Cube.findById(cubeId);
    let accessory = await Accessory.findById(accessoryId);

    cube.accessories.push(accessory);
    accessory.cubes.push(cube);

    await cube.save();
    await accessory.save();

    return cube;
}