const Cube = require('../models/Cube');

exports.getAll = async (search = '', fromInput, toInput) => {
    
    return await Cube.find().lean();
    
    // const from = Number(fromInput) || 0;
    // const to = Number(toInput) || 6;
    // const filteredCubes = cubes
    //     .filter(cube => cube.name.toLowerCase().includes(search.toLowerCase()))
    //     .filter(cube => cube.difficulty >= from && cube.difficulty <= to);

    // return filteredCubes;
};

exports.getOne = (cubeId) => Cube.findById(cubeId);

exports.create = (cube) => Cube.create(cube);